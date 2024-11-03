export interface JWTUser{
  id: string;
  email: string;
  expiresAt: Date;
}
export interface GraphqlContext{
  user?: JWTUser
}
