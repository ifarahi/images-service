import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { map } from 'rxjs';
import { AuthGuard } from '../../user/guards/auth.guard';
import { ImageValidatorPipe } from '../pipes/image-validator.pipe';
import { ImageService } from '../services/image.service';

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ImageValidatorPipe)
  upload(
    @UploadedFile('file') file: Express.Multer.File,
    @Req() request: Express.Request,
  ) {
    const imageUrl = this.imageService.save(request.user.sub, file.filename);
    return {
      statusCode: 201,
      message: 'succussfully uploaded',
      imageUrl,
    };
  }
}
