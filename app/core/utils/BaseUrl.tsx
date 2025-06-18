// utils/BaseUrl.tsx

export interface AppEnv {
  AUTH_PORT: string;
  SOCIAL_PORT: number;
  HOST?: string;
}

export const APP_ENV: AppEnv = {
  AUTH_PORT: "http://192.168.1.15:8070",         // Changed to port number only
  SOCIAL_PORT: 8093,       // Changed to port number only
  HOST: process.env.EXPO_PUBLIC_HOST || '192.168.1.15',
};

console.log("APP_ENV", APP_ENV);

export default function BASE_URL(host: string, port: number): string {
  if (/^https?:\/\//i.test(host)) {
    return host; // Return full URL if host contains protocol
  }
  return `http://${host}:${port}`;
}

interface SocketUrlParams {
  host: string;
  namespace?: string;
  port?: number;
  queryParams?: string;
}

export const SOCKET_URL = ({
  host,
  namespace = "",
  port,
  queryParams = ""
}: SocketUrlParams): string => {
  const hasProtocol = /^wss?:\/\//i.test(host);
  const protocol = host.startsWith('https') ? 'wss' : 'ws';
  
  if (hasProtocol) {
    return `${host.replace(/^https?/, 'ws')}/${namespace}${queryParams}`;
  }
  
  if (!port) {
    throw new Error('Port is required for non-protocol based hosts');
  }
  
  return `${protocol}://${host}:${port}/${namespace}${queryParams}`;
};

// Utility type for environment configuration
export type EnvironmentConfig = {
  authBaseUrl: string;
  socialBaseUrl: string;
};

export const getEnvironmentConfig = (): EnvironmentConfig => ({
  authBaseUrl: BASE_URL(APP_ENV.HOST || 'localhost', APP_ENV.AUTH_PORT),
  socialBaseUrl: BASE_URL(APP_ENV.HOST || 'localhost', APP_ENV.SOCIAL_PORT)
});