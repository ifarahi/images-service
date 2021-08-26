import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../user/guards/auth.guard';
import { ImageValidatorPipe } from '../pipes/image.pipe';

@Controller('images')
export class ImageController {
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ImageValidatorPipe)
  upload(@UploadedFile('file') file: Express.Multer.File) {
    return 'done';
  }

  // @Get(':id')
  // getImage() {}
}
