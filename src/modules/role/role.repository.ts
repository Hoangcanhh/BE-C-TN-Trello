// trello-backend/src/modules/role/role.repository.ts
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/role.entity';
import { AccessControl } from './entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(AccessControl)
    private accessControlRepo: Repository<AccessControl>,
  ) {}

  // Role
  async findRoleById(id: number): Promise<Role | undefined> {
    return this.roleRepo.findOne({ where: { id } });
  }

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  async saveRole(role: Role): Promise<Role> {
    return this.roleRepo.save(role);
  }

  // Permission
  async findPermissionById(id: number): Promise<Permission | undefined> {
    return this.permissionRepo.findOne({ where: { id } });
  }

  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionRepo.find();
  }

  async savePermission(permission: Permission): Promise<Permission> {
    return this.permissionRepo.save(permission);
  }

  // AccessControl
  async findPermissionsByRoleId(role_id: number): Promise<AccessControl[]> {
    return this.accessControlRepo.find({ where: { role_id } });
  }

  async saveAccessControl(accessControl: AccessControl): Promise<AccessControl> {
    return this.accessControlRepo.save(accessControl);
  }
}