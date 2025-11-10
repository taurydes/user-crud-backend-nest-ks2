import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  UnauthorizedException,
  Render,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import * as jwt from 'jsonwebtoken';
import { QueuesService } from '../queues.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('admin')
export class BullBoardController {
  private serverAdapter = new ExpressAdapter();

  constructor(private readonly queuesService: QueuesService) {
    this.serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
      queues: this.queuesService.getBullAdapters(),
      serverAdapter: this.serverAdapter,
    });
  }

  // ======================================================
  // 🔹 Renderiza la página de login (HTML)
  // ======================================================
  @Public()
  @Get('login')
  @Render('queues/bull-board/views/bull-login')
  renderLogin(@Req() req: Request) {
    const baseUrl = `${req.protocol}://${req.headers.host}`;
    return { title: 'Login Bull Board', baseUrl };
  }

  // ======================================================
  // 🔹 Valida usuario y crea cookie JWT
  // ======================================================
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() body: any) {
    const { username, password } = body;
    const USER_BULL = process.env.USER_BULL || 'admin';
    const PASSWORD_BULL = process.env.PASSWORD_BULL || '123456';
    const JWT_SECRET_BULL = process.env.JWT_SECRET_BULL || 'bull_secret';

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Usuario y clave son requeridos' });
    }

    if (username !== USER_BULL || password !== PASSWORD_BULL) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign({ user: username }, JWT_SECRET_BULL, {
      expiresIn: '1h',
    });

    res.cookie('bull_token', token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    return res.json({
      message: 'Login exitoso',
      data: { access_token: token },
    });
  }

  // ======================================================
  // 🔹 Renderiza el panel principal (Bull Board)
  // ======================================================
  @Get('queues')
  async renderQueues(@Req() req: Request, @Res() res: Response) {
    return this.handleBullBoard(req, res);
  }

  // ======================================================
  // 🔹 Captura *todas* las rutas hijas de /admin/queues/*
  // ======================================================
  @Get('queues/*')
  async renderSubRoutes(@Req() req: Request, @Res() res: Response) {
    return this.handleBullBoard(req, res);
  }

  // ======================================================
  // 🧠 Lógica compartida
  // ======================================================
  private handleBullBoard(req: Request, res: Response) {
    const token =
      req.cookies?.bull_token ||
      req.headers.authorization?.replace('Bearer ', '');

    const JWT_SECRET_BULL = process.env.JWT_SECRET_BULL || 'bull_secret';

    if (!token) {
      return res.redirect('/admin/login?error=Token%20requerido');
    }

    try {
      jwt.verify(token, JWT_SECRET_BULL);
      const router = this.serverAdapter.getRouter();
      router(req, res);
    } catch {
      return res.redirect('/admin/login?error=Token%20inválido');
    }
  }
}
