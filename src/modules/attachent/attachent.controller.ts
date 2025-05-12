import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttachentService } from './attachent.service';
import { CreateAttachentDto } from './dto/create-attachent.dto';
import { UpdateAttachentDto } from './dto/update-attachent.dto';

@Controller('attachent')
export class AttachentController {
  constructor(private readonly attachentService: AttachentService) {}

  @Post()
  create(@Body() createAttachentDto: CreateAttachentDto) {
    return this.attachentService.create(createAttachentDto);
  }

  @Get()
  findAll() {
    return this.attachentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttachentDto: UpdateAttachentDto) {
    return this.attachentService.update(+id, updateAttachentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachentService.remove(+id);
  }
}
