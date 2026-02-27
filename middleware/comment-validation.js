'use strict';

import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

// Validación para crear comentario
export const validateCreateComment = [
    body('commentContent')
        .trim()
        .notEmpty()
        .withMessage('El comentario es requerido')
        .bail()
        .isLength({ min: 2, max: 500 })
        .withMessage('El comentario debe tener entre 2 y 500 caracteres'),

    body('commentOwner')
        .trim()
        .notEmpty()
        .withMessage('El propietario es requerido')
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage('El propietario debe tener entre 2 y 100 caracteres'),

    checkValidators,
];


// Validación para actualizar comentario
export const validateUpdateComment = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID válido de MongoDB'),

    body('commentContent')
        .optional()
        .trim()
        .isLength({ min: 2, max: 500 })
        .withMessage('El comentario debe tener entre 2 y 500 caracteres'),

    body('commentOwner')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El propietario debe tener entre 2 y 100 caracteres'),

    checkValidators,
];


// Activar / Desactivar comentario
export const validateCommentStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID válido de MongoDB'),
    checkValidators,
];


// Obtener comentario por ID
export const validateGetCommentById = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID válido de MongoDB'),
    checkValidators,
];