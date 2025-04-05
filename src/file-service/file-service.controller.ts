import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileServiceService } from './file-service.service';

@Controller('files')
export class FileServiceController {
  constructor(private readonly fileService: FileServiceService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
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
