import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { UploadService } from 'src/services/UploadService';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalRecords, MedicalRecordsSchema } from './schemas/medical-recorsds.schema';
import { AccessFile, AccessFileSchema } from './schemas/access_file.schema';


@Module({
  imports:[
  MongooseModule.forFeature([{
    name: MedicalRecords.name,
    schema: MedicalRecordsSchema
  }]),
  MongooseModule.forFeature([{
    name: AccessFile.name,
    schema: AccessFileSchema
  }])],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService,UploadService,],
  exports:[MongooseModule]
})
export class MedicalRecordsModule {}
