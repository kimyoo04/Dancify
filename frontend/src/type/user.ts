export type userPayload = {
  id?: string;
  username?: string;
  email?: string;
};

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: userPayload;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface IUserForm {
  email: string;
  phone: string;
  username: string;
}
