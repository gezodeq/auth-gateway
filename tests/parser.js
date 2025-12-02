// parser.js
import { NextFunction, Request, Response } from 'express';
import { validate, errors } from 'joi';
import { Container, ResponseResult } from './container';

const validateRequest = (schema, req) => {
  const result = validate(req.body, schema);
  return result.error? { status: 400, message: result.message, result: null } : { status: 200, message: '', result: result.value };
};

const handleErrors = (err, req, res, next) => {
  const error = err.details && err.details[0]? err.details[0] : err;
  const { status, message, result } = error;
  res.status(status).json({ message, result });
};

const parseRequest = (schema, handler, next) => {
  const validation = validateRequest(schema, handler.req);
  if (validation.status === 400) {
    handleErrors(validation, handler.req, handler.res, next);
  } else {
    handler.req.body = validation.result;
    next();
  }
};

export { parseRequest };