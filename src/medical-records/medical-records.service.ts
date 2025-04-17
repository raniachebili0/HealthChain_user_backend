import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync, mkdirSync, readFileSync, unlinkSync } from 'fs';
import path, { join, resolve } from 'path';
import { UploadService } from 'src/services/UploadService';
import { Model, Types } from 'mongoose';
import axios from 'axios';
import { MedicalRecords } from './schemas/medical-recorsds.schema';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AccessFile } from './schemas/access_file.schema';
import { AccessFileDto } from './dtos/AccessFileDto';

@Injectable()
export class MedicalRecordsService {
    constructor(
        @InjectModel(MedicalRecords.name) private medicalRecord : Model <MedicalRecords>,
        @InjectModel(AccessFile.name) private accessFile : Model <AccessFile>,
        @Inject() private uploadService: UploadService,
        private readonly httpService: HttpService,
    ){}
    private readonly apiUrl = 'https://detect.roboflow.com/infer/workflows';
    private readonly apiKey = 'Md9r2IFC6DXqba9w71oK'; // Your API Key
    private readonly workspaceName = 'raniachebili'; // Your Workspace Name
    private readonly workflowId = 'test-re9is/2'; // Your Workflow ID

  
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
        return filePath;
        
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
            .find({ patient, fileType })
            .exec();
      
          if (files.length === 0) {
            // Instead of throwing an exception, return a message with empty list
            return {
              message: 'No files found for the specified user and file type',
              files: [],
            };
          }
      
          return {
            message: 'Files retrieved successfully',
            files,
          };
        } catch (error) {
          console.error('Error retrieving files:', error);
          throw new InternalServerErrorException('Failed to retrieve files');
        }
      }
      







    async runWorkflow(imageUrl: string) {
        const payload = {
            api_key: this.apiKey,
            inputs: {
                image: {
                    type: 'url',
                    value: imageUrl,
                },
            },
        };

        try {
            const response = await axios.post(`${this.apiUrl}/${this.workspaceName}/${this.workflowId}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data; // This will contain the predictions from your model
        } catch (error) {
            console.error('Error running workflow:', error);
            throw error; // Handle errors as needed
        }
    }
    




  async createAccessFile(accessFileDto: AccessFileDto) {
    const createUser = new this.accessFile(accessFileDto);
    return createUser.save();
  }

  async getListAccessFiles(doctor: string) {
    try {
       console.log(doctor)
        const files = await this.accessFile
            .find({doctor}) 
            .exec();

        if (files.length === 0) {
            throw new NotFoundException('No files found for the specified doctor');
        }

        return files;  // Return the list of files
    } catch (error) {
        console.error('Error retrieving files:', error);
        throw new InternalServerErrorException('Failed to retrieve files');
    }
}


async updateDescription(id: string, description: string): Promise<AccessFile> {
    const accessFile = await this.accessFile.findById(id);
    if (!accessFile) {
      throw new NotFoundException('AccessFile not found');
    }

    accessFile.description = description;
    return accessFile.save();
  }

    
}

