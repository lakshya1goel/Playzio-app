# 🎮 Playzio - Real-time Multiplayer Game

A React Native multiplayer game application where players compete in real-time typing challenges with live chat functionality.

## 📱 Features

### 🔐 Authentication
- **Google Sign-in**: Secure authentication using Google OAuth
- **Guest Mode**: Play without registration using a custom username
- **Token Management**: Automatic token refresh and secure storage

### 🏠 Room Management
- **Create Rooms**: Set up public or private game rooms
- **Join Rooms**: Enter rooms using room codes or browse available public rooms
- **Real-time Updates**: Live player count and room status updates

### 🎯 Game Features
- **Turn-based Gameplay**: Players take turns in a circular formation
- **Lives System**: Each player starts with 3 lives
- **Real-time Typing**: Live typing indicators show what other players are typing
- **Answer Feedback**: Visual feedback for correct/incorrect answers
- **Timer Component**: Countdown timer for each turn
- **Animated UI**: Smooth animations for turn changes, life decreases, and feedback

### 💬 Chat System
- **Real-time Chat**: WebSocket-powered chat during gameplay

### 🎨 Visual Features
- **Player Avatars**: Unique player images arranged in a circle
- **Current Turn Indicator**: Golden border and animations for active player
- **Life Indicators**: Visual representation of remaining lives
- **Responsive Design**: Optimized for different screen sizes
- **Answer Feedback**: "GREAT!" and "OOPS!" notifications for answers

## 🛠️ Tech Stack

- **React Native** 0.80.0
- **TypeScript** 5.0.4
- **Redux Toolkit** for state management
- **React Navigation** for routing
- **WebSocket** for real-time communication
- **Google Sign-in** for authentication
- **Axios** for HTTP requests
- **React Native Reanimated** for animations

## 📦 Installation

### Prerequisites
- Node.js >= 18
- React Native development environment
- Android Studio (for Android)
- Xcode (for iOS)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playzio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # API Base URL
   BASE_URL=your_base_url
   
   # WebSocket URLs
   WEBSOCKET_URL=your_game_ws_server_url
   CHAT_WEBSOCKET_URL=your_chat_ws_server_url
   
   # Google OAuth Client ID
   WEBCLIENT_ID=your_google_oauth_client_id
   ```
   
   **Important:** Replace the following with your actual values:
   - `your_google_oauth_client_id` - Your Google OAuth client ID from Google Cloud Console

4. **iOS Setup** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

5. **Run the application**
   ```bash
   # Start Metro bundler first
   npx react-native start
   
   # Then in a new terminal, run the app
   # For Android
   npx react-native run-android
   
   # For iOS
   npx react-native run-ios
   ```

## 🏗️ Project Structure

```
src/
├── navigation/           # Navigation configuration
├── presentation/
│   ├── component/       # Reusable components
│   │   ├── chatComponent/      # Chat functionality
│   │   ├── gameComponent/      # Game board and logic
│   │   └── BackgroundWrapper.tsx
│   └── screen/          # Screen components
│       ├── auth/        # Authentication screens
│       ├── room/        # Room management screens
│       └── game/        # Game screen
├── service/             # API and WebSocket services
│   ├── ApiService.ts
│   ├── AuthService.ts
│   ├── GameWebsocketService.ts
│   └── ChatWebsocketService.ts
└── store/               # Redux store configuration
    ├── slices/          # Redux slices
    └── types/           # TypeScript interfaces
```

## 🎮 How to Play

1. **Authentication**: Sign in with Google or play as a guest
2. **Room Selection**: Create a new room or join an existing one
3. **Gameplay**: 
   - Players take turns in circular order
   - Type answers within the time limit
   - Lose a life for incorrect answers
   - Last player standing wins!
4. **Chat**: Communicate with other players during the game

## 🔧 Development

### Available Scripts
- `npx react-native start` - Start Metro bundler
- `npx react-native run-android` - Run on Android
- `npx react-native run-ios` - Run on iOS

## 🎨 UI/UX Features

- **Circular Player Layout**: Players arranged in a circle around the game board
- **Turn Animations**: Smooth transitions between player turns
- **Life Decrease Animation**: Visual feedback when players lose lives
- **Answer Feedback**: Immediate visual confirmation of correct/incorrect answers
- **Responsive Chat**: Alternating message colors and member list
- **Loading States**: Smooth loading indicators throughout the app

## 🔒 Security

- Secure token storage using AsyncStorage
- Automatic token refresh
- Input validation and sanitization
- WebSocket connection management

## 🔗 Backend Repository

The backend server for this React Native app is built with Go and available at:
**[Playzio Backend](https://github.com/lakshya1goel/Playzio)**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support & Contact

**Lakshya Goel**
- 📧 Email: lakshya1234goel@gmail.com
- 🐱 GitHub: [@lakshya1goel](https://github.com/lakshya1goel)

For support and questions, please open an issue in the repository.

---

**Happy Gaming! 🎮**
