import AuthService from './AuthService';
import EventEmitter from 'eventemitter3';
import { store } from '@/store';
import { MESSAGE_TYPES, GameMessage, JoinPayload, AnswerPayload, TypingPayload, PongPayload } from '@/store/types/websocket';

class GameWebSocketService extends EventEmitter {
    private socket: WebSocket | null = null;
    private roomId: number | null = null;
    private wsUrl: string | null = null;
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 5;
    private reconnectDelay: number = 1000;
    private isReconnecting: boolean = false;
    private reconnectTimeout: NodeJS.Timeout | null = null;

    connect = async (url: string) => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            return;
        }

        this.wsUrl = url;
        await this.createConnection();
    };

    private createConnection = async () => {
        try {
            const tokens = await AuthService.getToken();
            const token = tokens?.accessToken || '';

            this.socket = new WebSocket(this.wsUrl!, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            this.socket.onopen = () => {
                console.log('WebSocket connected');
                this.isReconnecting = false;
                this.reconnectAttempts = 0;
                this.reconnectDelay = 1000;
                this.emit('connected', {});
                
                if (this.roomId !== null) {
                    console.log('Auto-rejoining room:', this.roomId);
                    this.joinRoom(this.roomId);
                }
            };

            this.socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('Received message:', data);
                    
                    if (data.type === MESSAGE_TYPES.PING) {
                        this.handlePing(data);
                        return;
                    }
                    
                    const messageRoomId = data.payload?.room_id;
                    if (!messageRoomId || messageRoomId === this.roomId) {
                        this.emit(data.type, data);
                    }
                } catch (e) {
                    console.error('Invalid JSON message', e);
                }
            };

            this.socket.onerror = (error) => {
                console.log('WebSocket error', error);
                this.emit('error', error);
            };

            this.socket.onclose = (event) => {
                console.log('WebSocket closed', event);
                console.log('WebSocket disconnected, code:', event.code, 'reason:', event.reason);
                this.emit('disconnected', { code: event.code, reason: event.reason });
                this.socket = null;
                
                if (event.code === 1000 || this.isReconnecting) {
                    return;
                }
                
                this.attemptReconnect();
            };
        } catch (error) {
            console.error('Failed to create WebSocket connection:', error);
            this.attemptReconnect();
        }
    };

    private attemptReconnect = () => {
        if (this.isReconnecting || this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.log('Max reconnection attempts reached or already reconnecting');
            this.emit('reconnect_failed', { attempts: this.reconnectAttempts });
            return;
        }

        this.isReconnecting = true;
        this.reconnectAttempts++;
        
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.emit('reconnecting', { attempt: this.reconnectAttempts });

        const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1), 30000);
        
        this.reconnectTimeout = setTimeout(() => {
            this.createConnection();
        }, delay);
    };

    private handlePing = (pingMessage: any) => {
        if (this.socket?.readyState === WebSocket.OPEN) {
            const pongMessage: GameMessage = {
                type: MESSAGE_TYPES.PONG,
                payload: {
                    timestamp: pingMessage.payload.timestamp,
                } as PongPayload,
            };
            this.socket.send(JSON.stringify(pongMessage));
        }
    };

    joinRoom = (roomId: number) => {
        this.roomId = roomId;
        if (this.socket?.readyState === WebSocket.OPEN) {
            const message: GameMessage = {
                type: MESSAGE_TYPES.JOIN,
                payload: {
                    room_id: roomId,
                } as JoinPayload,
            };
            this.socket.send(JSON.stringify(message));
        } else {
            console.log('WebSocket not open. Cannot join group.');
        }
    };

    answer = (content: string) => {
        if (this.socket?.readyState === WebSocket.OPEN) {
            const message: GameMessage = {
                type: MESSAGE_TYPES.ANSWER,
                payload: {
                    answer: content,
                } as AnswerPayload,
            };
            this.socket.send(JSON.stringify(message));
        } else {
            console.log('WebSocket not open. Cannot send message.');
        }
    };

    leaveRoom = () => {
        if (this.socket?.readyState === WebSocket.OPEN) {
            if (this.roomId === null) {
                console.log('No group joined.');
                return;
            }
            const message: GameMessage = {
                type: MESSAGE_TYPES.LEAVE,
                payload: {
                    room_id: this.roomId,
                },
            };
            this.socket.send(JSON.stringify(message));
            console.log(`Leaving room ${this.roomId}`);
            this.roomId = null;
        } else {
            console.log('WebSocket not open. Cannot leave room.');
        }
    };

    typing = (content: string) => {
        if (this.socket?.readyState === WebSocket.OPEN) {
            const state = store.getState();
            const userId = state.auth.user_id;
            
            const message: GameMessage = {
                type: MESSAGE_TYPES.TYPING,
                payload: {
                    text: content,
                    room_id: this.roomId!,
                    user_id: userId!,
                } as TypingPayload,
            };
            this.socket.send(JSON.stringify(message));
        } else {
            console.log('WebSocket not open. Cannot send typing.');
        }
    };

    reconnect = () => {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        this.reconnectAttempts = 0;
        this.isReconnecting = false;
        this.createConnection();
    };

    disconnect = () => {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        this.isReconnecting = false;
        this.reconnectAttempts = 0;
        this.roomId = null;
        this.socket?.close();
    };

    getConnectionStatus = () => {
        return {
            isConnected: this.socket?.readyState === WebSocket.OPEN,
            isReconnecting: this.isReconnecting,
            reconnectAttempts: this.reconnectAttempts,
            roomId: this.roomId,
        };
    };
}

const gameWs = new GameWebSocketService();
export default gameWs;
