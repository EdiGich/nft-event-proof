'use client';

import { useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { Button } from './DemoComponents';
import { Card } from './DemoComponents';
import MyNFT from '../../artifacts/contracts/MyNFT.sol/MyNFT.json';
import { useAccount, useWalletClient } from 'wagmi';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export function NFTMint() {
  const [isMinting, setIsMinting] = useState(false);
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const handleMint = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet!');
      return;
    }

    if (!contractAddress) {
        alert('Contract address is not defined. Please set NEXT_PUBLIC_CONTRACT_ADDRESS environment variable.');
        return;
    }

    if (!walletClient) {
        alert('Wallet client is not available.');
        return;
    }

    setIsMinting(true);
    try {
      const provider = new BrowserProvider(walletClient.transport, walletClient.chain);
      const signer = await provider.getSigner(address);
      const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);
      const transaction = await contract.safeMint(address);
      await transaction.wait();
      alert('NFT Minted!');
    } catch (error) {
      console.error(error);
      alert('Error minting NFT');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Card title="Mint your NFT">
      <div className="space-y-4">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          Click the button below to mint your exclusive NFT and gain access to special events.
        </p>
        <Button onClick={handleMint} disabled={isMinting || !isConnected}>
          {isMinting ? 'Minting...' : 'Mint NFT'}
        </Button>
      </div>
    </Card>
  );
}
