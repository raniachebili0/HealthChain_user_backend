
import { MedicalRecordsService } from './medical-records.service';
import { Controller, Post, UseInterceptors, UploadedFile, Delete, Param, Get, Res, UseGuards, Req, BadRequestException, Body, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/guards/authentication.guard';
import { UploadService } from 'src/services/UploadService';


@Controller('medical-records')
export class MedicalRecordsController {
    constructor(private readonly medicalRecordsService: MedicalRecordsService) {}
    
    
    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', new UploadService().getStorageConfig()))
    async uploadFile(@Body('fileType') fileType :string, @UploadedFile() file: Express.Multer.File,@Req() req ) {
     try {
          const userId =  req.userId;
          const result = await  this.medicalRecordsService.uploadFile(file,userId,fileType);
          console.log('upload successful:', result);
          return result;
        } catch (error) {
          console.error('upload error:', error);
          throw new BadRequestException(error.message);
        } 
    }

    
    @UseGuards(AuthGuard)
    @Get('getfiles')
    fileslist(@Query('fileType') fileType: string, @Req() req) {
      const userId =  req.userId;
      console.log(fileType);
      console.log(userId);
      return this.medicalRecordsService.getListFiles(userId,fileType);
    }
  
    @UseGuards(AuthGuard)
    @Get(':fileId')
    viewFile(@Param('fileId') fileId: string,@Req() req) {
      return this.medicalRecordsService.viewFile(fileId);
    }
  
    @UseGuards(AuthGuard)
    @Delete(':fileId')
    deleteFile(@Param('fileId') fileId: string,@Req() req) {
      return this.medicalRecordsService.deleteFile(fileId);
    }

    







}
