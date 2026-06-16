export interface User {
  id: string;
  name: string;
  email: string;
  totalLinks: number;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}
