import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, SchemaTypes, Types } from "mongoose";  // Ensure Document is imported
import { IsEnum } from "class-validator";
import { Gender } from '../enums/gender.enum';

// Define the type of UserDocument, which is a Mongoose Document of the User class
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User   {  // Extend Document to inherit Mongoose methods

  @Prop({ required: true})
  resourceType: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  
  @IsEnum(Gender)
  gender: string;

  @Prop()
  birthDate: string;

  @Prop({ default: "empty" })
  address: string;

  @Prop()
  telecom: string;  

  @Prop()
  photo : string;

  @Prop({ default: false })
  active: boolean; 

  @Prop({ required: false, type: SchemaTypes.ObjectId ,ref : 'Role'})
  roleId: Types.ObjectId;
  
  @Prop()
  specialization: string;

  @Prop()
  licenseNumber: string; // Maps to FHIR `identifier`

  @Prop({ default: "empty" })
  doctorbio:string;
  @Prop({ default: "empty"})
  doctorhoraire:string;


  @Prop({  type: [SchemaTypes.ObjectId], ref: 'MedicalRecords' })
  MedicalRecords: Types.ObjectId[];  // Reference to Encounter


}

export const UserSchema = SchemaFactory.createForClass(User);


