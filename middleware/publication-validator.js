'use strict';

import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";


// Crear publicación
export const validateCreatePublication = [

    body('title')
        .trim()
        .notEmpty()
        .withMessage('El título es requerido')
        .bail()
        .isLength({ min: 3, max: 150 })
        .withMessage('El título debe tener entre 3 y 150 caracteres'),

    body('category')
        .trim()
        .notEmpty()
        .withMessage('La categoría es requerida')
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage('La categoría debe tener entre 3 y 100 caracteres'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('El contenido es requerido')
        .bail()
        .isLength({ min: 10, max: 5000 })
        .withMessage('El contenido debe tener entre 10 y 5000 caracteres'),

    checkValidators,
];


// Actualizar publicación
export const validateUpdatePublication = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID válido de MongoDB'),

    checkValidators,
];


// Activar / Desactivar publicación
export const validatePublicationStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID válido de MongoDB'),

    checkValidators,
];


// Obtener publicación por ID
export const validateGetPublicationById = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID válido de MongoDB'),

    checkValidators,
];