import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';


@Schema()
export class AccessFile extends Document {
  @Prop({ required: true })
  fileName: string;  
 
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  patient: Types.ObjectId; 

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  doctor: Types.ObjectId; 
 
  @Prop()
  description: string; 
 
  @Prop()
  DebuitAccessDate: Date; 

  @Prop()
  FinAccessDate: Date; 
  
  @Prop()
  fileUrl : string;

}

export const AccessFileSchema = SchemaFactory.createForClass(AccessFile);