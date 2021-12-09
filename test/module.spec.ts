import { Test } from '@nestjs/testing';
import { NSQService } from '../src/nsq.service';
import { Writer } from 'nsqjs';

describe('NSQModule', () => {
  let service: NSQService;
  let writer: Writer;

  beforeEach(async () => {
    const createWriter = (host: string, port: number): Promise<Writer> => {
      const result = new Writer(host, port);
      return new Promise((resolve) => {
        result.connect();
        result.on('ready', () => resolve(result));
      });
    };

    writer = await createWriter('10.0.5.58', 4150);
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: NSQService,
          useValue: new NSQService(writer),
        },
      ],
    }).compile();
    service = moduleRef.get(NSQService);
  });

  it('x', async () => {
    await service.emit('nestjs-nsq-test', 'this ok');
  });

  afterAll(async () => {
    await writer.close();
  });
});
