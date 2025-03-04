import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly uploadPath = './uploads';

  generateFilename(originalName: string): string {
    return `${uuidv4()}-${originalName}`;
  }

  getStorageConfig() {
    return {
      storage: diskStorage({
        destination: this.uploadPath,
        filename: (req, file, callback) => {
          const filename = this.generateFilename(file.originalname);
          callback(null, filename);
        },
      }),
    };
  }

  getUploadedFileUrl(filename: string): string {
    return `http://127.0.0.1:3000/uploads/${filename}`;
  }
}
