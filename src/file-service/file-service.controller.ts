import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file-service.service';


@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }

  @Get('list')
  async listFiles() {
    return this.fileService.listFiles();
  }

  @Delete('delete/:filename')
  async deleteFile(@Param('filename') filename: string) {
    return this.fileService.deleteFile(filename);
  }
}
