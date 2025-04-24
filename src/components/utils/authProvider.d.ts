import { ReactNode, Context } from 'react';

declare type AuthContextType = {
  token: string | null;
  login: (userToken: string, role: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: string | null;
};

declare const authContext: Context<AuthContextType | undefined>;

export declare const AuthProvider: ({ children }: { children: ReactNode }) => JSX.Element;
export declare const useAuth: () => AuthContextType;