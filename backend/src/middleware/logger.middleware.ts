import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import Logging from 'library/Logging';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //Get request log
    Logging.info(
      `Incoming -> Method [${req.method}] - URL: [${req.body}] - Host: [${req.hostname}] - IP: [${req.socket.remoteAddress}]`,
    );
    if (next) next();
  }
}
