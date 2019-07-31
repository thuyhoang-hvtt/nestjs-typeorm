import { Injectable } from '@nestjs/common';
import 'automapper-ts/dist/automapper';

@Injectable()
export class MapperService {  
  mapper: AutoMapperJs.AutoMapper;

  constructor() {
    this.mapper = automapper;
    this.mapper.initialize(MapperService.configure)
  }

  private static configure(config: AutoMapperJs.IConfiguration): void {
    config.createMap('CreateUserDTO', 'User')
          
  }

  async map<K>(
    object: any,
    isArray: boolean = false,
    sourceKey: string,
    destinationKey: string,
  ): Promise<K> {
    const _sourceKey = isArray ? `${sourceKey}[]` : sourceKey;
    const _destinationKey = isArray ? `${destinationKey}[]` : destinationKey;
    
    return this.mapper.map(_sourceKey, _destinationKey, object);
  }
}
