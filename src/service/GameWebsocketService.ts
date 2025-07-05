import AuthService from './AuthService';

class GameWebSocketService {
    private socket: WebSocket | null = null;
    private roomId: number | null = null;
    private listener: ((message: any) => void) | null = null;

    connect = async (url: string) => {
        if (this.socket) {
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
            console.log('WebSocket connected');
            if (this.roomId !== null) {
                this.joinRoom(this.roomId);
            }
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received message:', data);
                if (data?.room_id === this.roomId && this.listener) {
                    this.listener(data);
                }
            } catch (e) {
                console.error('Invalid JSON message', e);
            }
        };

        this.socket.onerror = (error) => {
            console.log('WebSocket error', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
            this.socket = null;
            this.listener = null;
            this.roomId = 0;
        };
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
            this.roomId = 0;
        } else {
            console.log('WebSocket not open. Cannot leave room.');
        }
    };

    startGame = () => {
        if (this.socket?.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: 'start_game',
                room_id: this.roomId,
                payload: {
                    "message": "Starting game",
                },
            });
            this.socket.send(message);
        } else {
            console.log('WebSocket not open. Cannot start game.');
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

    setlistener = (listener: ((message: any) => void) | null) => {
        this.listener = listener;
    };

    disconnect = () => {
        this.socket?.close();
    };
}

const gameWs = new GameWebSocketService();
export default gameWs;
