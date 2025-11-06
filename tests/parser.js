import { NextFunction, Request, Response } from 'express';
import { validate, errors } from 'joi';
import { Container, ResponseResult } from './container';

const validateRequest = (schema, req) => {
  const { error } = validate(req.body, schema);
  return error? { status: 400, message: error.details[0].message, result: null } : { status: 200, message: '', result: req.body };
};

const handleErrors = (err, req, res, next) => {
  const error = err;
  const { status, message, result } = err || {};
  res.status(status).json({ message, result });
};

const parseRequest = async (schema, handler, next) => {
  try {
    const validation = validateRequest(schema, handler.req);
    if (validation.status === 400) {
      handleErrors(validation, handler.req, handler.res, next);
    } else {
      handler.req.body = validation.result;
      next();
    }
  } catch (err) {
    handleErrors(err, handler.req, handler.res, next);
  }
};

export { parseRequest };