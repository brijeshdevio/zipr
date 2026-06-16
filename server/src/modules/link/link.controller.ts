import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { successResponse } from '../../common/helpers/response.helper';
import { UpdateLinkDto, UpdateLinkSchema } from './dto/update-link.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { CreateLinkDto, CreateLinkSchema } from './dto/create-link.dto';
import { type Response } from 'express';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getLinks(@CurrentUser('id') userId: string) {
    const data = await this.linkService.getLinks(userId);

    return successResponse({
      message: 'Links fetched successfully',
      data,
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createLink(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe(CreateLinkSchema))
    body: CreateLinkDto,
  ) {
    const data = await this.linkService.createLink(userId, body);

    return successResponse({
      message: 'Link created successfully',
      data,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateLink(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateLinkSchema))
    body: UpdateLinkDto,
  ) {
    const data = await this.linkService.updateLink(userId, id, body);

    return successResponse({
      message: 'Link updated successfully',
      data,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteLink(@CurrentUser('id') userId: string, @Param('id') id: string) {
    const data = await this.linkService.deleteLink(userId, id);

    return successResponse({
      message: 'Link deleted successfully',
      data,
    });
  }

  @Get(':id/analytics')
  @UseGuards(JwtAuthGuard)
  async getLinkAnalytics(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    const data = await this.linkService.getLinkAnalytics(userId, id);

    return successResponse({
      message: 'Analytics fetched successfully',
      data,
    });
  }

  @Get('redirect/:code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const longUrl = await this.linkService.redirect(code);

    return res.redirect(302, longUrl);
  }
}
