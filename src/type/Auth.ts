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
  name: string | null;
  email: string | null;
  uid: string | null;
  token: string | null;
  photoURL: string | null;
}
