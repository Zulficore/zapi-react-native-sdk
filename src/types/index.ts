/**
 * ZAPI React Native SDK - Type Definitions
 * 
 * Bu dosya ZAPI SDK'sında kullanılan tüm tip tanımlarını içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */

// HTTP Request/Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string | number;
  details?: any;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

// Authentication Types
export interface LoginRequest {
  emailOrPhone: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: DeviceInfo;
}

export interface LoginResponse extends ApiResponse {
  data: {
    token: string;
    refreshToken: string;
    expiresIn: number;
    user: User;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptTerms?: boolean;
  deviceInfo?: DeviceInfo;
}

export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: 'ios' | 'android' | 'web';
  osVersion: string;
  appVersion: string;
  userAgent?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  subscription: UserSubscription;
  userData?: UserData;
}

export interface UserData {
  silentwing?: {
    role?: string;
    plan?: string;
    profession?: string;
    website?: string;
    city?: string;
    district?: string;
    country?: string;
    bio?: string;
    isActive?: boolean;
  };
}

export interface UserSubscription {
  plan: Plan;
  usage: UsageInfo;
  billing: BillingInfo;
  expiresAt?: string;
  isActive: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  limits: PlanLimits;
  features: string[];
  isPopular: boolean;
}

export interface PlanLimits {
  dailyMessageLimit: number;
  monthlyMessageLimit: number;
  maxTokensPerRequest: number;
  maxFileSize: number;
  maxFilesPerRequest: number;
  apiCallsPerMinute: number;
}

export interface UsageInfo {
  dailyMessages: number;
  monthlyMessages: number;
  totalTokens: number;
  totalRequests: number;
  resetAt: string;
}

export interface BillingInfo {
  cycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  status: 'active' | 'cancelled' | 'past_due';
}

// AI Response Types
export interface AIResponseRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string[];
  stream?: boolean;
  functions?: FunctionDefinition[];
  function_call?: string | FunctionCall;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
  function_call?: FunctionCall;
}

export interface FunctionDefinition {
  name: string;
  description?: string;
  parameters: any;
}

export interface FunctionCall {
  name: string;
  arguments: string;
}

export interface AIResponse extends ApiResponse {
  data: {
    id: string;
    model: string;
    choices: AIChoice[];
    usage: TokenUsage;
    created: number;
    status: 'completed' | 'processing' | 'failed';
    title?: string;
    tags?: string[];
    category?: string;
    isFavorite?: boolean;
  };
}

export interface AIChoice {
  index: number;
  message: ChatMessage;
  finish_reason: string;
  delta?: ChatMessage;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

// File Upload Types
export interface FileUploadRequest {
  file: {
    uri: string;
    type: string;
    name: string;
    size?: number;
  };
  folder?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface FileUploadResponse extends ApiResponse {
  data: {
    file: {
      id: string;
      filename: string;
      originalName: string;
      mimeType: string;
      size: number;
      url: string;
      thumbnailUrl?: string;
      folder: string;
      tags: string[];
      metadata: Record<string, any>;
      createdAt: string;
      updatedAt: string;
    };
  };
}

// App Types
export interface App {
  id: string;
  name: string;
  description: string;
  icon?: string;
  status: 'active' | 'inactive' | 'suspended';
  settings: AppSettings;
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  allowedDomains: string[];
  allowedIps: string[];
  rateLimit: {
    requestsPerMinute: number;
    requestsPerHour: number;
    requestsPerDay: number;
  };
  features: {
    aiChat: boolean;
    fileUpload: boolean;
    realtime: boolean;
    webhooks: boolean;
  };
}

// API Key Types
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  isActive: boolean;
  lastUsed?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// WebSocket Types
export interface WebSocketMessage {
  type: 'message' | 'typing' | 'status' | 'error';
  data: any;
  timestamp: number;
  id?: string;
}

export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

// Notification Types
export interface NotificationRequest {
  to: string | string[];
  subject?: string;
  content: string;
  template?: string;
  variables?: Record<string, any>;
  type: 'email' | 'sms' | 'push';
  priority?: 'low' | 'normal' | 'high';
}

export interface NotificationResponse extends ApiResponse {
  data: {
    notificationId: string;
    status: 'sent' | 'pending' | 'failed';
    message: string;
    sentAt: string;
  };
}

// System Types
export interface SystemConfig {
  version: string;
  environment: 'development' | 'staging' | 'production';
  apiUrl: string;
  wsUrl: string;
  features: {
    aiChat: boolean;
    fileUpload: boolean;
    realtime: boolean;
    notifications: boolean;
    analytics: boolean;
  };
  limits: {
    maxFileSize: number;
    maxRequestSize: number;
    requestTimeout: number;
  };
}

// Error Types
export interface ZAPIError {
  type: string;
  message: string;
  code: string | number;
  httpStatusCode?: number;
  details?: any;
  field?: string;
  stack?: string;
}

// SDK Configuration Types
export interface ZAPIConfig {
  apiKey: string;
  appId: string;
  baseUrl?: string;
  timeout?: number;
  debug?: boolean;
  bearerToken?: string;
  deviceInfo?: DeviceInfo;
  storage?: {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  };
}

// HTTP Client Types
export interface HttpClientConfig {
  baseUrl: string;
  apiKey: string;
  appId: string;
  timeout: number;
  debug: boolean;
  bearerToken?: string;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

// Endpoint Response Types
export interface ListOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, any>;
}

export interface SearchOptions extends ListOptions {
  query: string;
  fields?: string[];
  dateFrom?: string;
  dateTo?: string;
}

// OAuth Types
export interface OAuthProvider {
  id: string;
  name: string;
  clientId: string;
  scopes: string[];
  isEnabled: boolean;
}

export interface OAuthLoginRequest {
  provider: string;
  code: string;
  redirectUri?: string;
  state?: string;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
}

export interface AnalyticsResponse extends ApiResponse {
  data: {
    eventId: string;
    processed: boolean;
    timestamp: number;
  };
}
