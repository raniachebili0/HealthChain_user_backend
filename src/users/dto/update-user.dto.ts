
import { IsOptional, IsString, IsEnum, IsMongoId } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  telecom?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @IsOptional()
  @IsString()
  doctorbio?: string;

  @IsOptional()
  @IsString()
  doctorhoraire?: string;

  @IsOptional()
  @IsMongoId()
  roleId?: Types.ObjectId;
}
