export interface UserType {
    userId : string,
    password : string
}
export interface TokenType {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}