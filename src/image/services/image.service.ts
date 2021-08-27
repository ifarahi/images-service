import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class ImageService {
  static getStorage(dest: string) {
    return diskStorage({
      destination: this._destination(dest),
      filename: this._filename,
    });
  }

  private static _destination(dest: string) {
    return (req: Express.Request, file: Express.Multer.File, cb: any) => {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      cb(null, dest);
    };
  }

  private static _filename(
    req: Express.Request,
    file: Express.Multer.File,
    cb: any,
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split('/')[1]}`,
    );
  }
}
