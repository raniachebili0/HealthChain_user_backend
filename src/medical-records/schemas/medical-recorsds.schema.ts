import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';


@Schema()
export class MedicalRecords extends Document {
  @Prop({ required: true })
  fileName: string;  
 
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  patient: Types.ObjectId; 
 
  @Prop()
  description: string; 
 
  @Prop()
  uplodeDate: Date; 
  
  @Prop()
  fileUrl : string;

  @Prop({ required: true,/* enum: FileType*/ })
  fileType: string;
}

export const MedicalRecordsSchema = SchemaFactory.createForClass(MedicalRecords);
