import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    accessExpTime: number;
    refreshExpTime: number;
    userType: string;
    userID: number;
}

class AuthService {
    async storeToken(tokens: AuthTokens): Promise<void> {
        try {
            await AsyncStorage.multiSet([
                ['accessToken', tokens.accessToken],
                ['refreshToken', tokens.refreshToken],
                ['accessExpTime', tokens.accessExpTime.toString()],
                ['refreshExpTime', tokens.refreshExpTime.toString()],
                ['userType', tokens.userType],
                ['userID', tokens.userID.toString()]
            ]);
        } catch (error) {
            console.error('Error storing tokens:', error);
            throw new Error('Failed to store authentication tokens');
        }
    }

    async getToken(): Promise<AuthTokens | null> {
        try {
            const tokens = await AsyncStorage.multiGet(['accessToken', 'refreshToken', 'accessExpTime', 'refreshExpTime', 'userType', 'userID']);
            const [accessToken, refreshToken, accessExpTime, refreshExpTime, userType, userID] = tokens.map(([_, value]) => value);

            if (!accessToken || !refreshToken || !accessExpTime || !refreshExpTime || !userType || !userID) {
                return null;
            }

            return {accessToken, refreshToken, accessExpTime: Number(accessExpTime), refreshExpTime: Number(refreshExpTime), userType, userID: Number(userID)};
        } catch (error) {
            console.error('Error retrieving tokens:', error);
            throw new Error('Failed to retrieve authentication tokens');
        }
    }

    async removeToken(): Promise<void> {
        try {
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'accessExpTime', 'refreshExpTime', 'userType', 'userID']);
        } catch (error) {
            console.error('Error removing tokens:', error);
            throw new Error('Failed to remove authentication tokens');
        }
    }
}

export default new AuthService();