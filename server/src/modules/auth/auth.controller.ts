import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { type Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, LoginSchema } from './dto/login.dto';
import { SignupDto, SignupSchema } from './dto/signup.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { successResponse } from '../../common/helpers/response.helper';
import { clearCookie, setCookie } from '../../common/helpers/cookie.helper';
import { COOKIE_MAX_AGE, COOKIE_NAMES } from '../../common/constants';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body(new ValidationPipe(SignupSchema))
    body: SignupDto,
  ) {
    const data = await this.authService.signup(body);

    return successResponse({
      message: 'Account created successfully',
      data,
    });
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe(LoginSchema))
    body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.login(body);

    setCookie(res, COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      maxAge: COOKIE_MAX_AGE.ACCESS_TOKEN,
    });

    return successResponse({
      message: 'User logged in successfully',
      data: user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser('id') userId: string) {
    const data = await this.authService.getProfile(userId);

    return successResponse({
      data,
    });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    clearCookie(res, COOKIE_NAMES.ACCESS_TOKEN);

    return successResponse({
      message: 'Logout successfully',
    });
  }
}
