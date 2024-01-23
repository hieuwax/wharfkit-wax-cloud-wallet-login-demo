export interface IAuthenticationController {
  generateNonce(): Promise<string>;
  login(nonce: string, signature: string): Promise<string>;
}
