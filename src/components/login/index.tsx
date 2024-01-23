import React, { useEffect, useState } from "react";
import { sessionKit } from "../../configs/whafkitConfig";
import { authenticationController } from "../../controllers";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [signature, setSignature] = useState("");
  const [jwt, setJwt] = useState<string>();

  useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = () => {
    sessionKit.restore().then((session) => {
      if (session) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  };

  const login = async () => {
    // Step 1: Generate nonce from BE side
    const nonce = await authenticationController.generateNonce();

    // Step 2: Login to wallet via wharfkit
    const result = await sessionKit.login(); // TODO: We need to pass the parameter: {nonce} when do the login.
    const identityProof = result.response.identityProof;
    if (!identityProof) throw Error("No signature returned after login");

    // Step 3: Login to dApp Backend using nonce and signature
    const signature = identityProof.signature.toString();
    const jwt = await authenticationController.login(nonce, signature);
    setSignature(signature?.toString() || "");
    setJwt(jwt);
    setIsLogin(true);
  };

  const logout = async () => {
    await sessionKit.logout();
    setIsLogin(false);
    setJwt('');
  };

  return (
    <div>
      <p>Login status: {!isLogin ? "Not login" : "Logged in"}</p>
      <p>Signature: {signature}</p>
      <p>JWT: {jwt}</p>
      {!isLogin && <button onClick={login}>Login</button>}
      {isLogin && <button onClick={logout}>Logout</button>}
    </div>
  );
}
