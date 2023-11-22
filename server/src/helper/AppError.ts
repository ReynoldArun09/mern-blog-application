import { HttpStatusCode } from './enum';

class AppError extends Error {
  statusCode: HttpStatusCode;
  constructor(message: string, statusCode: HttpStatusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default AppError;
