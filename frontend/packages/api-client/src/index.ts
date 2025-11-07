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
      const url = endpoint.startsWith('http') 
        ? endpoint 
        : `${this.baseUrl}${endpoint}`;
      
      console.log('🌐 API Request:', {
        method: options.method || 'GET',
        url,
      });

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      console.log('📥 API Response:', {
        status: response.status,
        ok: response.ok,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.error('❌ API Error Response:', errorText);
        
        let error: ApiError;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = {
            code: 'HTTP_ERROR',
            message: `Request failed with status ${response.status}`,
          };
        }
        
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        console.error('❌ Request failed:', error.message);
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  // Auth endpoints
  async login(data: LoginRequest): Promise<AuthResponse> {
  
    return this.request<AuthResponse>('login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async signup(data: SignupRequest): Promise<AuthResponse> {

    return this.request<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async socialAuth(data: SocialAuthRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/social', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async logout(accessToken: string): Promise<void> {
    return this.request<void>('/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  // User endpoints
  async getCurrentUser(accessToken: string): Promise<User> {
    return this.request<User>('/me', {
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

  // Track endpoints (port 8084)
  async createTrack(
    accessToken: string,
    data: {
      title: string;
      description: string;
      privacy: string;
      points: Point[];
    }
  ): Promise<any> {
    return this.request('/api/tracks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  }

  async getTrack(accessToken: string, trackId: string): Promise<any> {
    return this.request(`/api/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async searchTracks(
    accessToken: string,
    query?: string,
    privacy?: string
  ): Promise<any[]> {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (privacy) params.append('privacy', privacy);

    return this.request(`/api/tracks?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getPopularTracks(accessToken: string): Promise<any[]> {
    return this.request('/api/tracks/popular', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async uploadTrackPhotos(
    accessToken: string,
    trackId: string,
    files: File[]
  ): Promise<any[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/api/tracks/${trackId}/photos`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to upload photos');
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Social endpoints (port 8085)
  async getFriends(accessToken: string): Promise<any[]> {
    return this.request('/api/friends', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async sendFriendRequest(
    accessToken: string,
    friendId: string
  ): Promise<void> {
    return this.request('/api/friends/request', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ friendId }),
    });
  }

  async acceptFriendRequest(
    accessToken: string,
    requestId: string
  ): Promise<void> {
    return this.request(`/api/friends/accept/${requestId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async rejectFriendRequest(
    accessToken: string,
    requestId: string
  ): Promise<void> {
    return this.request(`/api/friends/reject/${requestId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getFeed(accessToken: string, limit: number = 50): Promise<any[]> {
    return this.request(`/api/feed?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async addComment(
    accessToken: string,
    trackId: string,
    content: string
  ): Promise<any> {
    return this.request(`/api/tracks/${trackId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    });
  }

  async getComments(accessToken: string, trackId: string): Promise<any[]> {
    return this.request(`/api/tracks/${trackId}/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async likeTrack(accessToken: string, trackId: string): Promise<void> {
    return this.request(`/api/tracks/${trackId}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async unlikeTrack(accessToken: string, trackId: string): Promise<void> {
    return this.request(`/api/tracks/${trackId}/like`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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


// Helper to get auth service URL
function getAuthServiceUrl(): string {
  try {
    const Config = require('react-native-config').default;
    return Config.AUTH_SERVICE_URL || 'http://63.179.161.152:8083/api/auth';
  } catch {
    return 'http://63.179.161.152:8083/api/auth';
  }
}

// Export singleton with auth service URL
export const apiClient = new ApiClient(getAuthServiceUrl());