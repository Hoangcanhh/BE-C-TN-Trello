// trello-backend/src/modules/workspace/workspace.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceRepository } from './workspace.repository';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: WorkspaceRepository,
    private userService: UserService,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const { owner_id } = createWorkspaceDto;

    // Kiểm tra owner
    const owner = await this.userService.findUserById(owner_id);

    // Tạo workspace
    const workspace = new Workspace();
    Object.assign(workspace, createWorkspaceDto);
    workspace.owner = owner;

    return this.workspaceRepository.saveWorkspace(workspace);
  }

  async findAll(): Promise<Workspace[]> {
    return this.workspaceRepository.findAll();
  }

  async findOne(id: number): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace) {
      throw new BadRequestException('Workspace not found');
    }
    return workspace;
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto): Promise<Workspace> {
    const workspace = await this.findOne(id);
    Object.assign(workspace, updateWorkspaceDto);
    return this.workspaceRepository.saveWorkspace(workspace);
  }

  async delete(id: number): Promise<void> {
    const workspace = await this.findOne(id);
    await this.workspaceRepository.deleteWorkspace(workspace);
  }

  // async inviteMember(workspaceId: number, email: string) {
  //   const user = await this.userService.findUserByEmail(email);
  //   if (!user) throw new NotFoundException('User not found');
  //   // Kiểm tra đã là thành viên chưa
  //   const existed = await this.workspaceRepository.findOne({ where: { user: { id: user.id }, workspace: { id: workspaceId } } });
  //   if (existed) throw new BadRequestException('User already in workspace');
  //   // Thêm vào workspace
  //   const member = this.workspaceRepository.create({ user, workspace: { id: workspaceId }, role: 'member' });
  //   return this.workspaceRepository.save(member);
  // }
}