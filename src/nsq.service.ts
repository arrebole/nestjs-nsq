import { Writer } from 'nsqjs';

export class NSQService {
  constructor(private readonly writer: Writer) {}

  emit(topic: string, data: any) {
    return new Promise<void>((resolve, reject) => {
      return this.writer.publish(topic, data, (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }
}
