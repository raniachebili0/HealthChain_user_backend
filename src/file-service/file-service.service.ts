import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { Web3Service } from '../services/web3.service';

@Injectable()
export class FileService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads');

  constructor(private readonly web3Service: Web3Service) {}

  async uploadFile(file: Express.Multer.File) {
    const filePath = join(this.uploadPath, file.filename);
    fs.writeFileSync(filePath, file.buffer);

    // Store hash on blockchain
    const fileHash = this.web3Service.hashFile(file.buffer);
    await this.web3Service.storeFileHash(file.filename, fileHash);

    return { filename: file.filename, hash: fileHash };
  }

  async listFiles() {
    return fs.readdirSync(this.uploadPath);
  }

  async deleteFile(filename: string) {
    const filePath = join(this.uploadPath, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);

      // Remove from blockchain (if needed)
      await this.web3Service.deleteFileHash(filename);
      
      return { message: 'File deleted successfully' };
    }
    return { message: 'File not found' };
  }
}
