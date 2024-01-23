import { IAuthenticationController } from "./interfaces/IAuthenticationController";

export class AuthenticationController implements IAuthenticationController {
    generateNonce(): Promise<string> {
    const randomNonce = new Date().getTime().toString();
    return Promise.resolve(randomNonce);
  }

  login(nonce: string, signature: string): Promise<string> {
    const jwt = "test_jwt";
    return Promise.resolve(jwt);
  }
}
