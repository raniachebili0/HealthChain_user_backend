import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class Web3Service {
  private provider;
  private contract;
  private wallet;

  constructor() {
    const RPC_URL = 'http://127.0.0.1:7545'; // Ganache local network URL
    const PRIVATE_KEY = '0x034909f8acba868137fd99d391cf8e21bfa81b6619f51443934cec3deba13b4b'; // Your private key
    const CONTRACT_ADDRESS = '0x10022624027b12f89FeebBC4D437db90cdFBcc89'; // Your contract address
    const CONTRACT_ABI = [ /* Your contract ABI here */ ]; // Your contract ABI

    this.provider = new ethers.JsonRpcProvider(RPC_URL);
    this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.wallet);
  }

  hashFile(buffer: Buffer): string {
    return ethers.keccak256(buffer);
  }

  async storeFileHash(filename: string, hash: string) {
    try {
      // Send the transaction and get the transaction hash
      const tx = await this.contract.storeFileHash(filename, hash);

      // Wait for transaction confirmation
      await tx.wait();

      console.log('Transaction receipt:', tx);
      return tx.hash; // Return the transaction hash
    } catch (error) {
      console.error('Error storing file hash:', error);
      return null;
    }
  }

  async deleteFileHash(filename: string) {
    try {
      // Remove file hash (only accessible to the owner)
      const tx = await this.contract.removeFileHash(filename);
      await tx.wait();

      console.log('File hash removed:', tx);
      return tx.hash;
    } catch (error) {
      console.error('Error deleting file hash:', error);
      return null;
    }
  }
}
