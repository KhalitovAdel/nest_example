import { HttpModule, Module } from '@nestjs/common';
import { ScriveService } from './scrive.service';

@Module({
  imports: [HttpModule],
  providers: [ScriveService],
  exports: [ScriveService],
})
export class ScriveModule {}
