// trello-backend/src/modules/role/role.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Role } from './entities/role.entity';
import { Permission } from './entities/role.entity';
import { AccessControl } from './entities/role.entity';
import { CreateRoleDto, CreatePermissionDto, CreateAccessControlDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role();
    Object.assign(role, createRoleDto);
    return this.roleRepository.saveRole(role);
  }

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.findAllRoles();
  }

  async findRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findRoleById(id);
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    return role;
  }

  async createPermission(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = new Permission();
    Object.assign(permission, createPermissionDto);
    return this.roleRepository.savePermission(permission);
  }

  async findAllPermissions(): Promise<Permission[]> {
    return this.roleRepository.findAllPermissions();
  }

  async findPermissionById(id: number): Promise<Permission> {
    const permission = await this.roleRepository.findPermissionById(id);
    if (!permission) {
      throw new BadRequestException('Permission not found');
    }
    return permission;
  }

  async createAccessControl(createAccessControlDto: CreateAccessControlDto): Promise<AccessControl> {
    const { role_id, permission_id } = createAccessControlDto;
    await this.findRoleById(role_id);
    await this.findPermissionById(permission_id);

    const accessControl = new AccessControl();
    accessControl.role_id = role_id;
    accessControl.permission_id = permission_id;
    return this.roleRepository.saveAccessControl(accessControl);
  }

  async findPermissionsByRoleId(role_id: number): Promise<AccessControl[]> {
    return this.roleRepository.findPermissionsByRoleId(role_id);
  }
}