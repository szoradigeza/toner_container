/** user's role */
export type Role = "guest" | "admin";

export interface LoginParams {
  /** username */
  username: string;
  /** user password */
  password: string;
}

export interface LoginResult {
  /** auth token */
  token: string;
  username: string;
  role: Role;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
