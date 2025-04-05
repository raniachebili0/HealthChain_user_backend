import { Module } from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { PractitionerController } from './practitioner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Practitioner, PractitionerSchema } from './schema/practitioner.schema';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports:[
    UsersModule,
    AuthModule,
    PatientModule,
    MongooseModule.forFeature([{
          name: Practitioner.name,
          schema: PractitionerSchema
        }])
  ],
  controllers: [PractitionerController],
  providers: [PractitionerService],
  
  
})
export class PractitionerModule {}
