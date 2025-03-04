import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';
import { ResetToken, ResetTokenSchema } from './schemas/reset-token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { CacheModule } from '@nestjs/cache-manager';
import { UploadService } from 'src/services/UploadService';


@Module({
  imports: [ 
    UsersModule ,
    CacheModule.register(), 
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
      {
        name: ResetToken.name,
        schema: ResetTokenSchema,
      },
    ]),
    RolesModule,
    JwtModule.register({  
      global: true,
      secret: "process.env.JWT_SECRET_KEY",
      signOptions: { expiresIn: '60s' }
    }) ,   
    ],
  controllers: [AuthController],
  providers: [AuthService,UploadService,],
})
export class AuthModule {}
