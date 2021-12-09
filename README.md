# nestjs-nsq

nestjs nsq 客户端

## Installation

```bash
$ npm install nestjs-nsq nsqjs
```

## use

```typescript
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NSQModule } from "nestjs-nsq";

@Module({
  imports: [
    NSQModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        nsqdTCPAddresses: configService.get('nsqdTCPAddresses'),
      }),
    }),
  ],
})
export class AppModule {}
```

```typescript
import { NSQService } from "nestjs-nsq";

@Injectable()
export class AppService {
  constructor(
    private nsqService: NSQService,
  ) {}

  call(topic: string, channel: string, data: any) {
    return this.nsqService.emit(topic, channel, data);
  }
}

```