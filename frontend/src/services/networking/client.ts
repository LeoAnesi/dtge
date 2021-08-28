import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { store } from 'redux/store';
import { getUserToken } from 'redux/Login';
import { checkToken } from 'services/token';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

const backendBaseUrl = process.env.REACT_APP_API_BASE_URL ?? '';

class HttpClient {
  httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
    });
  }

  async authenticatedRequest<T>(
    method: Method,
    endpoint: string,
    data: Record<string, unknown> | null,
  ) {
    let token = null;
    await checkToken();
    token = getUserToken(store.getState());

    const requestConfig: AxiosRequestConfig = {
      method,
      url: endpoint,
      headers: { Authorization: `Bearer ${token}` },
    };

    if (['post', 'put', 'patch'].includes(method) && data) {
      requestConfig.data = data;
    }

    try {
      return await this.httpClient.request<T>(requestConfig);
    } catch (error) {
      throw error;
    }
  }

  async unauthenticatedRequest<T>(
    method: Method,
    endpoint: string,
    data: Record<string, unknown> | null,
    withCredentials: boolean,
  ) {
    const requestConfig: AxiosRequestConfig = {
      method,
      url: endpoint,
      withCredentials,
    };

    if (['post', 'put', 'patch'].includes(method) && data) {
      requestConfig.data = data;
    }
    return await this.httpClient.request<T>(requestConfig);
  }

  async request<T>(
    method: Method,
    endpoint: string,
    data: Record<string, unknown> | null = null,
    isAuthenticated = true,
  ) {
    if (isAuthenticated) {
      return this.authenticatedRequest<T>(method, endpoint, data);
    }

    return this.unauthenticatedRequest<T>(method, endpoint, data, false);
  }

  get<T>(endpoint: string, isAuthenticated = true) {
    return this.request<T>('get', endpoint, null, isAuthenticated);
  }

  post<T>(endpoint: string, data: Record<string, unknown>, isAuthenticated = true) {
    return this.request<T>('post', endpoint, data, isAuthenticated);
  }

  put<T>(endpoint: string, data: Record<string, unknown>, isAuthenticated = true) {
    return this.request<T>('put', endpoint, data, isAuthenticated);
  }

  delete<T>(endpoint: string, isAuthenticated = true) {
    return this.request<T>('delete', endpoint, {}, isAuthenticated);
  }

  async login(data: Record<string, unknown>) {
    const result = await this.unauthenticatedRequest<{ access: string }>(
      'post',
      '/auth/jwt/create',
      data,
      true,
    );
    const token: string | undefined = result?.data.access;
    return token;
  }

  async logout() {
    await this.post('/auth/jwt/logout', {}, false);
  }

  async refreshToken() {
    const response = await this.unauthenticatedRequest<{ access: string }>(
      'post',
      '/auth/jwt/refresh',
      null,
      true,
    );
    return response?.data.access;
  }
}

const httpClient = new HttpClient(backendBaseUrl);

export default httpClient;
