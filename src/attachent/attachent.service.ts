import { Injectable } from '@nestjs/common';
import { CreateAttachentDto } from './dto/create-attachent.dto';
import { UpdateAttachentDto } from './dto/update-attachent.dto';

@Injectable()
export class AttachentService {
  create(createAttachentDto: CreateAttachentDto) {
    return 'This action adds a new attachent';
  }

  findAll() {
    return `This action returns all attachent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attachent`;
  }

  update(id: number, updateAttachentDto: UpdateAttachentDto) {
    return `This action updates a #${id} attachent`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachent`;
  }
}
