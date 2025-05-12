// trello-backend/src/modules/role/role.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, CreatePermissionDto, CreateAccessControlDto } from './dto/create-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  async findAllRoles() {
    return this.roleService.findAllRoles();
  }

  @Get(':id')
  async findRoleById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findRoleById(id);
  }

  @Post('permissions')
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.roleService.createPermission(createPermissionDto);
  }

  @Get('permissions')
  async findAllPermissions() {
    return this.roleService.findAllPermissions();
  }

  @Post('accesscontrol')
  async createAccessControl(@Body() createAccessControlDto: CreateAccessControlDto) {
    return this.roleService.createAccessControl(createAccessControlDto);
  }

  @Get(':id/permissions')
  async findPermissionsByRoleId(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findPermissionsByRoleId(id);
  }
}