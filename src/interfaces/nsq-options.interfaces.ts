import { ModuleMetadata } from '@nestjs/common/interfaces';

export type NSQModuleOptions = {
  nsqdTCPAddresses: string;
};

export interface NSQModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  global?: boolean;
  inject?: any[];
  useFactory?: (...args: any[]) => Promise<NSQModuleOptions> | NSQModuleOptions;
}
