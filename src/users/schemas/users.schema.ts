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

  @Prop()
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


  @Prop({  type: [SchemaTypes.ObjectId], ref: 'Encounter' })
  encounterId: Types.ObjectId[];  // Reference to Encounter

  @Prop({  type: [SchemaTypes.ObjectId], ref: 'Condition' })
  conditions: Types.ObjectId[];  // Reference to multiple Condition resources

  @Prop({  type: [SchemaTypes.ObjectId], ref: 'Observation' })
  observations: Types.ObjectId[];  // Reference to multiple Observation resources

  @Prop({  type: [SchemaTypes.ObjectId], ref: 'DiagnosticReport' })
  diagnosticReports: Types.ObjectId[];  // Reference to multiple DiagnosticReport resources

  @Prop({  type: [SchemaTypes.ObjectId], ref: 'MedicationRequest' })
  medicationRequests: Types.ObjectId[];  // Reference to multiple MedicationRequest resources

  @Prop({  type: [SchemaTypes.ObjectId], ref: 'Procedure' })
  procedures: Types.ObjectId[];  // Reference to multiple Procedure jj

  @Prop({  type: [SchemaTypes.ObjectId], ref: 'ImagingStudy' })
  imagingStudies: Types.ObjectId[];  // Reference to multiple ImagingStudy resources

  @Prop({  type: [SchemaTypes.ObjectId], ref: 'Immunization' })
  immunizations: Types.ObjectId[];  // Reference to multiple Immunization resources

  @Prop({  type: [SchemaTypes.ObjectId], ref: 'AllergyIntolerance' })
  allergyIntolerances: Types.ObjectId[];

}

export const UserSchema = SchemaFactory.createForClass(User);


