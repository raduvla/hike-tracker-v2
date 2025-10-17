import type {
  User,
  LoginRequest,
  SignupRequest,
  AuthResponse,
  Point,
  IngestBatchRequest,
  SocialAuthRequest,
  ApiError,
  TrackingSession,
} from '@hike-tracker/shared-types';

export class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string, timeout: number = 30000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          code: 'UNKNOWN_ERROR',
          message: `Request failed with status ${response.status}`,
        }));
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  // Auth endpoints
  async login(data: LoginRequest): Promise<AuthResponse> {
    // TODO: Replace with real API call
    // Mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            username: data.username,
            email: `${data.username}@example.com`,
            createdAt: new Date().toISOString(),
          },
          tokens: {
            accessToken: 'mock_access_token',
            refreshToken: 'mock_refresh_token',
          },
        });
      }, 500);
    });

    // Real implementation:
    // return this.request<AuthResponse>('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
  }

  async signup(data: SignupRequest): Promise<AuthResponse> {
    // TODO: Replace with real API call
    // Mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: Date.now().toString(),
            username: data.username,
            email: data.email,
            createdAt: new Date().toISOString(),
          },
          tokens: {
            accessToken: 'mock_access_token',
            refreshToken: 'mock_refresh_token',
          },
        });
      }, 500);
    });

    // Real implementation:
    // return this.request<AuthResponse>('/auth/signup', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
  }

  async socialAuth(data: SocialAuthRequest): Promise<AuthResponse> {
    // TODO: Replace with real API call
    // Mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: Date.now().toString(),
            username: `${data.provider}_user`,
            email: `user@${data.provider}.com`,
            createdAt: new Date().toISOString(),
          },
          tokens: {
            accessToken: 'mock_access_token',
            refreshToken: 'mock_refresh_token',
          },
        });
      }, 500);
    });

    // Real implementation:
    // return this.request<AuthResponse>('/auth/social', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async logout(accessToken: string): Promise<void> {
    return this.request<void>('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  // User endpoints
  async getCurrentUser(accessToken: string): Promise<User> {
    return this.request<User>('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async updateUser(
    accessToken: string,
    userId: string,
    data: Partial<User>
  ): Promise<User> {
    return this.request<User>(`/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  }

  // Tracking endpoints
  async sendBatch(
    accessToken: string,
    points: Point[],
    deviceId: string = 'unknown'
  ): Promise<void> {
    const body: IngestBatchRequest = {
      deviceId,
      batchId: `batch-${Date.now()}`,
      idempotencyKey: `key-${Date.now()}`,
      points,
    };

    return this.request<void>('/v1/ingest/points', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
  }

  async getTrackingSessions(
    accessToken: string,
    userId: string
  ): Promise<TrackingSession[]> {
    return this.request<TrackingSession[]>(`/tracking/sessions/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getTrackingSession(
    accessToken: string,
    sessionId: string
  ): Promise<TrackingSession> {
    return this.request<TrackingSession>(`/tracking/sessions/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async createTrackingSession(
    accessToken: string,
    userId: string
  ): Promise<TrackingSession> {
    return this.request<TrackingSession>('/tracking/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ userId }),
    });
  }

  async endTrackingSession(
    accessToken: string,
    sessionId: string
  ): Promise<TrackingSession> {
    return this.request<TrackingSession>(
      `/tracking/sessions/${sessionId}/end`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}

// Export singleton instance
export const apiClient = new ApiClient(
  process.env.BACKEND_BASE_URL || 'http://localhost:3000'
);