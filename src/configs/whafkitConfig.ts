import { SessionKit, WalletPlugin } from "@wharfkit/session";
import { WalletPluginCloudWallet } from "@wharfkit/wallet-plugin-cloudwallet";
import WebRenderer from "@wharfkit/web-renderer";

const webRenderer = new WebRenderer({
  logging: true,
  translations: {},
});

// const chain = {
//   id: "e0b5f2532f0f4fcc4da2fc440943131b2f041f5c522c09e9f2fd0b8ba74ef5b6",
//   url: "https://stg2-chain.thh.io",
// };

// const wallet = {
//   url: "https://stg2-new-wallet.thh.io",
//   autoUrl: "https://stg2-api-idm.thh.io/v1/accounts/auto-accept",
// };

const chain = {
  id: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  url: "https://wax.greymass.com",
};

const wallet = {
  url: "https://www.mycloudwallet.com",
  autoUrl: "https://idm-api.mycloudwallet.com/v1/accounts/auto-accept/login",
};

export const sessionKit = new SessionKit({
  appName: "vstrike.com",
  ui: webRenderer,
  chains: [chain],
  walletPlugins: [
    new WalletPluginCloudWallet({
      supportedChains: [chain.id],
      url: wallet.url,
      autoUrl: wallet.autoUrl,
      loginTimeout: 300000,
    }) as any as WalletPlugin,
  ],
});
