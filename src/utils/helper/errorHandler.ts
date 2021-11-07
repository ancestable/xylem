import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../models/apiError';
import { Logger } from '../initialize/logger';

export const errorTypes = {
  auth: { statusCode: 401, name: 'Unauthorized', message: 'auth error' },
  db: { statusCode: 500, name: 'Internal Server Error', message: 'database error' },
  entity: { statusCode: 422, name: 'Unprocessable Entity', message: 'entity error' },
  forbidden: { statusCode: 403, name: 'Forbidden', message: 'forbidden content' },
  notFound: { statusCode: 404, name: 'Not Found', message: 'content not found' },
  validation: { statusCode: 400, name: 'Bad Request', message: 'validation error' },
  conflict: { statusCode: 409, name: 'Conflict', message: 'conflict error' },
};

export function errorMap() {
  return {
    ValidateError: this.errorTypes.validation,
    ValidationError: this.errorTypes.validation,
    CastError: this.errorTypes.db,
  };
}

export class ErrorHandler {
  static handleError(error: ApiError, req: Request, res: Response, next: NextFunction): void {
    const normalizedError: ApiError = ErrorHandler.normalizeError(error);
    const { name, message, fields, statusCode } = normalizedError;
    Logger.error(error);
    res.status(statusCode).json({ name, message, fields });
    next();
  }

  private static normalizeError(error: ApiError): ApiError {
    const normalizedError: ApiError = new ApiError(error);
    Object.keys(errorMap).forEach(errorKey => {
      if (errorKey === normalizedError.name) Object.assign(normalizedError, errorMap[errorKey]);
    });
    Object.keys(errorTypes).forEach(errorTypeKey => {
      const errorType = errorTypes[errorTypeKey];
      if (errorType.statusCode === normalizedError.statusCode) normalizedError.name = errorType.name;
    });
    return normalizedError;
  }
}