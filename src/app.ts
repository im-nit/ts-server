import 'reflect-metadata';
import express from 'express';
import { logger, stream } from '@utils/logger';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import cors from 'cors';
import morgan from 'morgan';

class App {
  public app: express.Application;
  public port: number;
  public env: string;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.env = NODE_ENV || 'development';

    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(morgan(LOG_FORMAT, { stream }));
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }
}

export default App;
