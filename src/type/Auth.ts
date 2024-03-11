export interface UserType {
  userId: string;
  password: string;
}
export interface TokenType {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface AuthState {
  photoURL: any;
  email: string | null;
  uid: string | null;
  token: string | null;
}
