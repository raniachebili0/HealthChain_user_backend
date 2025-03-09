import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class Web3Service {
  private provider;
  private contract;
  private wallet;

  constructor() {
    const RPC_URL = 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID';
    const PRIVATE_KEY = 'YOUR_PRIVATE_KEY';
    const CONTRACT_ADDRESS = 'YOUR_SMART_CONTRACT_ADDRESS';
    const CONTRACT_ABI = [ /* Smart contract ABI */ ];

    this.provider = new ethers.JsonRpcProvider(RPC_URL);
    this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.wallet);
  }

  hashFile(buffer: Buffer): string {
    return ethers.keccak256(buffer);
  }

  async storeFileHash(filename: string, hash: string) {
    const tx = await this.contract.storeFileHash(filename, hash);
    await tx.wait();
    return tx.hash;
  }

  async deleteFileHash(filename: string) {
    const tx = await this.contract.removeFileHash(filename);
    await tx.wait();
    return tx.hash;
  }
}
