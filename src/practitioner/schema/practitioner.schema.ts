import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

export type PractitionerDocument = HydratedDocument<Practitioner>;

@Schema({ timestamps: true })
export class Practitioner {
    @Prop({ required: true })
    name: string;
   @Prop({ type: SchemaTypes.ObjectId, required: false, ref: 'User' })
    practitioner: Types.ObjectId;
      
    @Prop({ required: true, unique: true })
    email: string;
  
    @Prop({ required: true })
    specialty: string;
  
    @Prop({ default: true })
    isActive: boolean;

}
export const PractitionerSchema = SchemaFactory.createForClass(Practitioner);