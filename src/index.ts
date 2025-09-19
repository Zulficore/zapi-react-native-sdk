/**
 * ZAPI React Native SDK - Main Export
 * 
 * ZAPI React Native SDK - Complete API wrapper for ZAPI services with authentication, AI chat, realtime features.
 * React Native 0.79+ uyumlu, TypeScript ile yazılmış, birebir PHP SDK işlevselliği.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * @license MIT
 * 
 * @example
 * import { ZAPI } from 'zapi-react-native-sdk';
 * 
 * const zapi = new ZAPI({
 *   apiKey: 'your_api_key',
 *   appId: 'your_app_id'
 * });
 * 
 * // Kullanıcı girişi
 * const login = await zapi.auth.login('user@example.com', 'password');
 * zapi.setBearerToken(login.data.token);
 * 
 * // AI yanıtı oluştur
 * const response = await zapi.responses.create({
 *   model: 'gpt-3.5-turbo',
 *   messages: [{ role: 'user', content: 'Merhaba!' }]
 * });
 */

// Main class

// HTTP Client
export { HttpClient } from './http/HttpClient';

// Exceptions
export {
  ZAPIException,
  AuthenticationException,
  ValidationException,
  RateLimitException,
  ServerException,
} from './exceptions';

// Endpoints
export {
  BaseEndpoint,
  Auth,
  User as UserEndpoint,
  Admin,
  Apps,
  AIProvider,
  APIKeys,
  Audio,
  AuthFirebase,
  AuthOAuth,
  Backup,
  Config,
  Content,
  Debug,
  Docs,
  Embeddings,
  Images,
  Info,
  Logs,
  MailTemplates,
  Notifications,
  Plans,
  Realtime,
  Roles,
  Subscription,
  System,
  Upload,
  Responses,
  Webhook,
  Functions,
  OAuthMetadata,
  Metadata,
  Video,
  Users,
  Logger,
  AppleTest,
} from './endpoints';

// Types
export type {
  ApiResponse,
  PaginatedResponse,
  PaginationInfo,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  DeviceInfo,
  User as UserType,
  UserData,
  UserSubscription,
  Plan,
  PlanLimits,
  UsageInfo,
  BillingInfo,
  AIResponseRequest,
  ChatMessage,
  FunctionDefinition,
  FunctionCall,
  AIResponse,
  AIChoice,
  TokenUsage,
  FileUploadRequest,
  FileUploadResponse,
  App,
  AppSettings,
  ApiKey,
  WebSocketMessage,
  WebSocketConfig,
  NotificationRequest,
  NotificationResponse,
  SystemConfig,
  ZAPIError,
  ZAPIConfig,
  HttpClientConfig,
  RequestOptions,
  ListOptions,
  SearchOptions,
  OAuthProvider,
  OAuthLoginRequest,
  AnalyticsEvent,
  AnalyticsResponse,
} from './types';

// Default export
import { ZAPI } from './ZAPI';
export { ZAPI as default };
