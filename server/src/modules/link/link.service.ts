import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinkService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getLinks(userId: string) {
    return this.prisma.link.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        longUrl: true,
        shortCode: true,
        clicks: true,
        userId: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createLink(userId: string, body: CreateLinkDto) {
    let shortCode = body.shortCode as string;

    if (!shortCode) {
      let isUnique = false;

      while (!isUnique) {
        shortCode = Math.random().toString(36).substring(2, 8);

        const existing = await this.prisma.link.findUnique({
          where: {
            shortCode,
          },
          select: {
            id: true,
          },
        });

        isUnique = !existing;
      }
    } else {
      const existing = await this.prisma.link.findUnique({
        where: {
          shortCode,
        },
        select: {
          id: true,
        },
      });

      if (existing) {
        throw new ConflictException('Short code already exists');
      }
    }

    return this.prisma.link.create({
      data: {
        longUrl: body.longUrl,
        shortCode,
        userId,
      },
      select: {
        id: true,
        longUrl: true,
        shortCode: true,
        clicks: true,
        userId: true,
        createdAt: true,
      },
    });
  }

  async updateLink(userId: string, linkId: string, body: UpdateLinkDto) {
    const link = await this.prisma.link.findFirst({
      where: {
        id: linkId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return this.prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        longUrl: body.longUrl,
      },
      select: {
        id: true,
        longUrl: true,
        shortCode: true,
        clicks: true,
        userId: true,
        createdAt: true,
      },
    });
  }

  async deleteLink(userId: string, linkId: string) {
    const link = await this.prisma.link.findFirst({
      where: {
        id: linkId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    await this.prisma.link.delete({
      where: {
        id: linkId,
      },
    });

    return {
      ok: true,
    };
  }

  async getLinkAnalytics(userId: string, linkId: string) {
    const link = await this.prisma.link.findFirst({
      where: {
        id: linkId,
        userId,
      },
      select: {
        id: true,
        clicks: true,
        shortCode: true,
        longUrl: true,
        createdAt: true,
        clicksLog: {
          select: {
            id: true,
            linkId: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 20,
        },
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return {
      clicks: link.clicks,
      totalClicks: link.clicks,
      recentClicks: link.clicksLog,
      shortCode: link.shortCode,
      longUrl: link.longUrl,
      createdAt: link.createdAt,
      id: link.id,
    };
  }

  async redirect(code: string) {
    const link = await this.prisma.link.findUnique({
      where: {
        shortCode: code,
      },
      select: {
        id: true,
        longUrl: true,
      },
    });

    if (!link) {
      throw new NotFoundException('Short link not found');
    }

    await this.prisma.$transaction([
      this.prisma.click.create({
        data: {
          linkId: link.id,
        },
      }),

      this.prisma.link.update({
        where: {
          id: link.id,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      }),
    ]);

    return link.longUrl;
  }
}
