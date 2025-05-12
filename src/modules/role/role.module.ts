// trello-backend/src/modules/role/role.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/role.entity'
import { AccessControl } from './entities/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, AccessControl])],
  providers: [RoleService, RoleRepository],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}