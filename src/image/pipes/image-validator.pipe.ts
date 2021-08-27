import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as canvas from 'canvas';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImageValidatorPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'custom') {
      const filePath: string = path.resolve(value.path);
      try {
        await canvas.loadImage(filePath);
        return value;
      } catch (error) {
        fs.unlinkSync(filePath);
        throw new BadRequestException('invalid image');
      }
    }
  }
}
