import AuthService from './AuthService';
import EventEmitter from 'eventemitter3';

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
                    
                    if (data.type === 'ping') {
                        this.handlePing(data);
                        return;
                    }
                    
                    if (!data.room_id || data.room_id === this.roomId) {
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
            const pongMessage = {
                type: 'pong',
                payload: {
                    timestamp: pingMessage.payload.timestamp,
                },
            };
            this.socket.send(JSON.stringify(pongMessage));
        }
    };

    joinRoom = (roomId: number) => {
        this.roomId = roomId;
        if (this.socket?.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: 'join',
                room_id: roomId,
                payload: {
                    "message": "Joining group",
                },
            });
            this.socket.send(message);
        } else {
            console.log('WebSocket not open. Cannot join group.');
        }
    };

    answer = (content: string) => {
        if (this.socket?.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: 'answer',
                room_id: this.roomId,
                payload: {
                    "answer": content,
                },
            });
            this.socket.send(message);
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
            const message = JSON.stringify({
                type: 'leave',
                room_id: this.roomId,
                payload: {
                    "message": "Leaving room",
                },
            });
            this.socket.send(message);
            console.log(`Leaving room ${this.roomId}`);
            this.roomId = null;
        } else {
            console.log('WebSocket not open. Cannot leave room.');
        }
    };

    typing = (content: string) => {
        if (this.socket?.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: 'typing',
                room_id: this.roomId,
                payload: {
                    "text": content,
                },
            });
            this.socket.send(message);
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
