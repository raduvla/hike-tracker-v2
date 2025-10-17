import type {
  User,
  AuthTokens,
  LoginRequest,
  SignupRequest,
  SocialProvider,
} from '@hike-tracker/shared-types';
import { ApiClient } from '@hike-tracker/api-client';
import { config } from '@hike-tracker/config';
import { validateEmail, validatePassword, validateUsername } from '@hike-tracker/utils';

export interface StorageAdapter {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
}

export class AuthService {
  private apiClient: ApiClient;
  private storage: StorageAdapter;

  constructor(apiClient: ApiClient, storage: StorageAdapter) {
    this.apiClient = apiClient;
    this.storage = storage;
  }

  async login(username: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    if (!username.trim()) {
      throw new Error('Username is required');
    }

    if (!password.trim()) {
      throw new Error('Password is required');
    }

    const data: LoginRequest = { username, password };
    const response = await this.apiClient.login(data);

    // Store tokens and user
    await this.saveAuth(response.user, response.tokens);

    return response;
  }

  async signup(username: string, email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    // Validation
    if (!validateUsername(username, config.validation.minUsernameLength, config.validation.maxUsernameLength)) {
      throw new Error(
        `Username must be between ${config.validation.minUsernameLength} and ${config.validation.maxUsernameLength} characters`
      );
    }

    if (!validateEmail(email)) {
      throw new Error('Invalid email address');
    }

    if (!validatePassword(password, config.validation.minPasswordLength)) {
      throw new Error(`Password must be at least ${config.validation.minPasswordLength} characters`);
    }

    const data: SignupRequest = { username, email, password };
    const response = await this.apiClient.signup(data);

    // Store tokens and user
    await this.saveAuth(response.user, response.tokens);

    return response;
  }

  async socialLogin(provider: SocialProvider, token: string): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.apiClient.socialAuth({ provider, token });

    // Store tokens and user
    await this.saveAuth(response.user, response.tokens);

    return response;
  }

  async logout(): Promise<void> {
    const tokens = await this.getTokens();
    
    if (tokens?.accessToken) {
      try {
        await this.apiClient.logout(tokens.accessToken);
      } catch (error) {
        console.warn('Logout API call failed:', error);
        // Continue with local logout even if API call fails
      }
    }

    await this.clearAuth();
  }

  async refreshToken(): Promise<AuthTokens | null> {
    const tokens = await this.getTokens();
    
    if (!tokens?.refreshToken) {
      return null;
    }

    try {
      const response = await this.apiClient.refreshToken(tokens.refreshToken);
      await this.saveAuth(response.user, response.tokens);
      return response.tokens;
    } catch (error) {
      // If refresh fails, clear auth
      await this.clearAuth();
      return null;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const userJson = await this.storage.getItem(config.auth.userStorageKey);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  async getTokens(): Promise<AuthTokens | null> {
    const tokensJson = await this.storage.getItem(config.auth.tokenStorageKey);
    if (!tokensJson) return null;

    try {
      return JSON.parse(tokensJson);
    } catch {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    const tokens = await this.getTokens();
    return !!(user && tokens);
  }

  private async saveAuth(user: User, tokens: AuthTokens): Promise<void> {
    await this.storage.setItem(config.auth.userStorageKey, JSON.stringify(user));
    await this.storage.setItem(config.auth.tokenStorageKey, JSON.stringify(tokens));
  }

  private async clearAuth(): Promise<void> {
    await this.storage.removeItem(config.auth.userStorageKey);
    await this.storage.removeItem(config.auth.tokenStorageKey);
  }
}