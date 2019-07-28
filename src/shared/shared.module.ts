import { Module } from '@nestjs/common';
import { MapperService } from './mapper/mapper.service';
import { BaseService } from './base/base.service';

@Module({
  providers: [MapperService, BaseService]
})
export class SharedModule {}
