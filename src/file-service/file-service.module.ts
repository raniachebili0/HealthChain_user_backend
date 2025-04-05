import { Module } from '@nestjs/common';
import { FileServiceService } from './file-service.service';
import { FileServiceController } from './file-service.controller';
import { Web3Service } from 'src/services/web3.service';

@Module({
  controllers: [FileServiceController],
  providers: [FileServiceService,Web3Service],
})
export class FileServiceModule {}
