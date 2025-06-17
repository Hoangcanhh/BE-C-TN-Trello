import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException } from "@nestjs/common"
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guards"
import { CurrentUser } from "../../auth/decorator/current-user.decorator"
import { UserPayload } from "../../auth/interface/user-payload.interface"
import { BoardService } from "./board.service"
import { BoardMemberService } from "./board-member.service"
import { AddBoardMemberDto, UpdateBoardMemberRoleDto } from "./dto/board-member.dto"
import { BoardMemberResponseDto, BoardMembersResponseDto } from "./dto/board-member-response.dto"

@Controller("boards/members")
@UseGuards(JwtAuthGuard)
export class BoardMembersController {
  constructor(
    private readonly boardService: BoardService,
    private readonly boardMemberService: BoardMemberService,
  ) {}

  @Post(":boardId")
  async addMember(
    @Param('boardId') boardId: string,
    @Body() addBoardMemberDto: AddBoardMemberDto,
    @CurrentUser() user: UserPayload,
  ): Promise<BoardMemberResponseDto> {
    const userId = user.id

    // Kiểm tra xem người dùng có quyền thêm thành viên không
    const hasPermission = await this.boardMemberService.checkPermission(boardId, userId, ["admin"])
    if (!hasPermission) {
      throw new ForbiddenException("Bạn không có quyền thêm thành viên vào bảng này")
    }

    const boardMember = await this.boardMemberService.addMember(boardId, addBoardMemberDto)
    return {
      status: "success",
      message: "Đã thêm thành viên vào bảng thành công",
      data: boardMember,
    }
  }

  @Get(":boardId")
  async findAll(@Param('boardId') boardId: string, @CurrentUser() user: UserPayload): Promise<BoardMembersResponseDto> {
    const userId = user.id

    // Kiểm tra xem người dùng có quyền xem danh sách thành viên không
    const hasPermission = await this.boardMemberService.checkPermission(boardId, userId, [
      "admin",
      "member",
      "observer",
    ])
    if (!hasPermission) {
      throw new ForbiddenException("Bạn không có quyền xem danh sách thành viên của bảng này")
    }

    const boardMembers = await this.boardMemberService.findAllByBoardId(boardId)
    return {
      status: "success",
      message: "Lấy danh sách thành viên thành công",
      data: boardMembers,
    }
  }

  @Patch(":boardId/:memberId")
  async updateRole(
    @Param('boardId') boardId: string,
    @Param('memberId') memberId: string,
    @Body() updateBoardMemberRoleDto: UpdateBoardMemberRoleDto,
    @CurrentUser() user: UserPayload,
  ): Promise<BoardMemberResponseDto> {
    const userId = user.id

    // Kiểm tra xem người dùng có quyền cập nhật vai trò thành viên không
    const hasPermission = await this.boardMemberService.checkPermission(boardId, userId, ["admin"])
    if (!hasPermission) {
      throw new ForbiddenException("Bạn không có quyền cập nhật vai trò thành viên trong bảng này")
    }

    const boardMember = await this.boardMemberService.updateRole(+memberId, updateBoardMemberRoleDto.role)
    return {
      status: "success",
      message: "Đã cập nhật vai trò thành viên thành công",
      data: boardMember,
    }
  }

  @Delete(":boardId/:memberId")
  async removeMember(
    @Param('boardId') boardId: string,
    @Param('memberId') memberId: string,
    @CurrentUser() user: UserPayload,
  ): Promise<BoardMemberResponseDto> {
    const userId = user.id

    // Kiểm tra xem người dùng có quyền xóa thành viên không
    const hasPermission = await this.boardMemberService.checkPermission(boardId, userId, ["admin"])
    if (!hasPermission) {
      throw new ForbiddenException("Bạn không có quyền xóa thành viên khỏi bảng này")
    }

    const boardMember = await this.boardMemberService.removeMember(+memberId)
    return {
      status: "success",
      message: "Đã xóa thành viên khỏi bảng thành công",
      data: boardMember,
    }
  }
}
