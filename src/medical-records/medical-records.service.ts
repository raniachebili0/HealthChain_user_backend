import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync, mkdirSync, readFileSync, unlinkSync } from 'fs';
import path, { join, resolve } from 'path';
import { UploadService } from 'src/services/UploadService';
import { Model } from 'mongoose';
import axios from 'axios';
import { MedicalRecords } from './schemas/medical-recorsds.schema';

@Injectable()
export class MedicalRecordsService {
    constructor(
        @InjectModel(MedicalRecords.name) private medicalRecord : Model <MedicalRecords>,
        @Inject() private uploadService: UploadService,
    ){}
  
    async uploadFile(file: Express.Multer.File, id: string,fileType :string) {
        let fileUrl = null;
        if (file) {
            fileUrl = this.uploadService.getUploadedFileUrl(file.filename);
        }
        const medicalRecord = new this.medicalRecord({
            fileName : file.filename,
            patient : id ,
            description:"",
            fileUrl: fileUrl,
            uplodeDate : new Date(),
            fileType : fileType
          });
            await medicalRecord.save();
            return { message: 'success' };
      }
    
    async viewFile(fileId: string) {

        const file = await this.medicalRecord.findById(fileId).exec();
        if (!file) {
            throw new NotFoundException('File record not found in the database');
        }
    
        const filePath = file.fileUrl;
        try {
            const response = await axios.get(filePath,/* { responseType: 'arraybuffer' }*/);
            return response.data;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get file');
        }       
      }
      
    
    async deleteFile(fileId: string) {
        const file = await this.medicalRecord.findById(fileId).exec();
        if (!file) {
            throw new NotFoundException('File record not found in the database');
        }
        const filePath = file.fileUrl;
        const filename = filePath.split('/').pop();
        const fileLocalPath = resolve(__dirname, '../../../uploads', filename);
        console.log(fileLocalPath);
        try {
            if (!existsSync(fileLocalPath)) {
                throw new NotFoundException('File not found');
            }
            unlinkSync(fileLocalPath);
            await this.medicalRecord.findByIdAndDelete(fileId).exec();
            return { message: 'File deleted successfully' };
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete file');
        }
      }
    async getListFiles(patient: string, fileType: string) {
        try {
           
            const files = await this.medicalRecord
                .find({ patient, fileType })  // Filter by userId and fileType
                .exec();
    
            if (files.length === 0) {
                throw new NotFoundException('No files found for the specified user and file type');
            }
    
            return files;  // Return the list of files
        } catch (error) {
            console.error('Error retrieving files:', error);
            throw new InternalServerErrorException('Failed to retrieve files');
        }
    }
    
}

