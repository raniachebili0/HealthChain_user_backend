import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { Web3Service } from '../services/web3.service';

@Injectable()
export class FileServiceService {
  private readonly uploadPath = './uploads';

  constructor(private readonly web3Service: Web3Service) {}

  // Upload a file
  async uploadFile(file: Express.Multer.File) {
    console.log('Upload path:', this.uploadPath);
    const filePath = join(this.uploadPath, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    // Store the hash on the blockchain
    const fileHash = this.web3Service.hashFile(file.buffer);
    await this.web3Service.storeFileHash(file.originalname, fileHash);

    return { filename: file.originalname, hash: fileHash };
  }

  // List all files
  async listFiles() {
    return fs.readdirSync(this.uploadPath);
  }

  // Delete a file
  async deleteFile(filename: string) {
    const filePath = join(this.uploadPath, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);

      // Remove the file hash from the blockchain
      await this.web3Service.deleteFileHash(filename);

      return { message: 'File deleted successfully' };
    }
    return { message: 'File not found' };
  }
}
