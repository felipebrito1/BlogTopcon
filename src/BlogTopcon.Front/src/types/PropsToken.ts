export interface PropsToken {
    token: string | null;
    setToken: (token: string|null) => void;
    isAdmin: string;
    setIsAdmin: (isAdmin: string) => void;
  }