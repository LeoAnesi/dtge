import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { Credentials } from './interfaces/credentials.dto';

const REFRESH_TOKEN = 'refresh_token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('jwt/create')
  @Public()
  async createJwt(@Body() credentials: Credentials, @Res() res: Response): Promise<Response> {
    const { access, refresh } = await this.authService.checkCredentials(credentials);

    res.cookie(REFRESH_TOKEN, refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.send({ access });
  }

  @Post('jwt/refresh')
  @Public()
  async refreshJwt(@Req() req: Request): Promise<{ access: string }> {
    const access = await this.authService.checkRefreshToken(
      (req.cookies as { [REFRESH_TOKEN]: string })[REFRESH_TOKEN],
    );

    return { access };
  }

  @Post('jwt/logout')
  @Public()
  logout(@Res() res: Response): Response {
    res.clearCookie(REFRESH_TOKEN);

    return res.sendStatus(200);
  }
}
