import AuthService from './AuthService';
import { CHAT_MESSAGE_TYPES } from '@/store/types/websocket';

class ChatWebSocketService {
    private socket: WebSocket | null = null;
    private roomId: number | null = null;
    private messageListener: ((message: any) => void) | null = null;

    connect = async (url: string) => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            return;
        }

        const tokens = await AuthService.getToken();
        const token = tokens?.accessToken || '';

        this.socket = new WebSocket(url, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        this.socket.onopen = () => {
            console.log('Chat WebSocket connected');
            if (this.roomId !== null) {
                this.joinRoom(this.roomId);
            }
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received message:', data);
                if (
                    data?.type === CHAT_MESSAGE_TYPES.CHAT_CONTENT &&
                    data?.room_id === this.roomId &&
                    this.messageListener
                ) {
                    this.messageListener(data);
                }
            } catch (e) {
                console.error('Invalid JSON message', e);
            }
        };
    
        this.socket.onerror = (error) => {
            console.log('Chat WebSocket error', error);
        };

        this.socket.onclose = () => {
            console.log('Chat WebSocket disconnected');
            this.socket = null;
            this.messageListener = null;
            this.roomId = null;
        };
    };

    joinRoom = (roomId: number) => {
        this.roomId = roomId;
        if (this.socket?.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: CHAT_MESSAGE_TYPES.JOIN,
                body: 'Joining room',
                room_id: roomId,
            });
            this.socket.send(message);
        } else {
            console.log('WebSocket not open. Cannot join group.');
        }
    };

    leaveRoom = () => {
        if (this.socket?.readyState === WebSocket.OPEN) {
            if (this.roomId === null) {
                console.log('No room joined.');
                return;
            }
            const message = JSON.stringify({
                type: CHAT_MESSAGE_TYPES.LEAVE,
                body: 'Leaving room',
                room_id: this.roomId,
            });
            this.socket.send(message);
            this.roomId = null;
        } else {
            console.log('WebSocket not open. Cannot leave group.');
        }
    };

    sendMessage = (content: string) => {
        if (this.socket?.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: CHAT_MESSAGE_TYPES.CHAT_CONTENT,
                body: content,
                room_id: this.roomId,
            });
            this.socket.send(message);
        } else {
            console.log('WebSocket not open. Cannot send message.');
        }
    };

    setMessageListener = (listener: ((message: any) => void) | null) => {
        this.messageListener = listener;
    };

    disconnect = () => {
        this.socket?.close();
    };
}

const chatWs = new ChatWebSocketService();
export default chatWs;