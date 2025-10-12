import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

if (!WALLETCONNECT_PROJECT_ID) {
  console.warn("WalletConnect Project ID is not configured. Please set NEXT_PUBLIC_WC_PROJECT_ID in your .env.local file. Get one from cloud.walletconnect.com.");
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'Trust Chain',
    }),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID || '',
    }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});