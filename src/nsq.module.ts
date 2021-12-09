import { DynamicModule, Module, Provider } from '@nestjs/common';
import { NSQ_MODULE_OPTIONS } from './nsq.constants';
import { NSQService } from './nsq.service';
import { Writer } from 'nsqjs';
import {
  NSQModuleAsyncOptions,
  NSQModuleOptions,
} from './interfaces/nsq-options.interfaces';

@Module({})
export class NSQModule {
  static forRootAsync(options: NSQModuleAsyncOptions): DynamicModule {
    return {
      module: NSQModule,
      global: options.global,
      imports: options.imports,
      providers: [
        this.createAsyncOptionsProvider(options),
        this.createAsyncNSQProvider(),
      ],
    };
  }

  private static createAsyncNSQProvider(): Provider {
    return {
      provide: NSQService,
      useFactory: (config: NSQModuleOptions) => {
        const [host, port] = config.nsqdTCPAddresses.split(':');
        const writer = new Writer(host, parseInt(port));

        // await connect ...
        return new Promise((resolve) => {
          writer.connect();
          writer.on('ready', () => resolve(new NSQService(writer)));
        });
      },
      inject: [NSQ_MODULE_OPTIONS],
    };
  }

  private static createAsyncOptionsProvider(
    options: NSQModuleAsyncOptions,
  ): Provider {
    return {
      provide: NSQ_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
