import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as canvas from 'canvas';
import { from } from 'rxjs';

@Injectable()
export class ImageValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'custom') {
      const isImageValid = from(canvas.loadImage(value.path));

      isImageValid.subscribe(function filterFile(result) {
        if (!result) {
          throw new BadRequestException('invalid image');
        }
      });

      return value;
    }
  }
}
