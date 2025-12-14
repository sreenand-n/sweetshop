import api from "./axios";

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    is_admin: boolean;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const register = async (email: string, password: string) => {
  const res = await api.post("/auth/register", {
    email,
    password,
  });
  return res.data;
};
