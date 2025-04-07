import { Type } from 'class-transformer';
import { IsNotEmpty, IsMongoId, IsString, IsDate, IsOptional } from 'class-validator';

export class AccessFileDto {
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsOptional()
  @IsMongoId()
  patient: string;

  @IsOptional()
  @IsMongoId()
  doctor: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  DebuitAccessDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  FinAccessDate: Date;

  @IsOptional()
  @IsString()
  fileUrl: string;

}
