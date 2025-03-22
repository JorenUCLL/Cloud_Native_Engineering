/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Authentication response.
 *            token:
 *              type: string
 *              description: JWT access token.
 *            email:
 *             type: string
 *             description: email.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              description: email.
 *            password:
 *              type: string
 *              description: User password.
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: User name.
 *            email:
 *              type: string
 *              description: User email.
 *            password:
 *              type: string
 *              description: User Password.
 *            numPosts:
 *              type: number
 *              format: int64
 */
import express, { NextFunction, Request, Response } from 'express';
import { create } from 'domain';
import { User } from '../model/user';
import { UserInput } from '../types/index';

const userRouter = express.Router();

export { userRouter };
