import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import OpenAI from 'openai';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [OpenaiController],
  imports: [ConfigModule],
  providers: [
    OpenaiService,
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({
          apiKey: configService.getOrThrow('OPENROUTER_API_KEY'),
          baseURL: 'https://openrouter.ai/api/v1',
          defaultHeaders: {
            'HTTP-Referer': 'https://localhost:3000', // ou ton app
            'X-Title': 'auth_project',          // nom de ton projet
          },
        }),
      inject: [ConfigService],
    },
  ],
})
export class OpenaiModule {}
