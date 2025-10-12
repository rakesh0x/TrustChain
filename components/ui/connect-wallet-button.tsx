'use client';

import { Button } from "@/components/ui/button";
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function ConnectWalletButton() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
        <Button onClick={() => disconnect()} className="rounded-none text-sm ring-2 ring-black/20 hover:ring-black/30">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => connect({ connector: injected() })} className="rounded-none text-sm ring-2 ring-black/20 hover:ring-black/30">
      Connect Wallet
    </Button>
  );
}