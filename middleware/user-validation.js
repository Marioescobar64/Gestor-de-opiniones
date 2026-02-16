'use strict';

import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

// Validación para crear usuario
export const validateCreateUser = [
    body('userName')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('userEmail')
        .trim()
        .notEmpty()
        .withMessage('El correo es requerido')
        .bail()
        .isEmail()
        .withMessage('Debe ingresar un correo válido')
        .normalizeEmail(),

    body('userPassword')
        .trim()
        .notEmpty()
        .withMessage('La contraseña es requerida')
        .bail()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener mínimo 6 caracteres'),

    checkValidators,
];


// Validación para actualizar usuario
export const validateUpdateUser = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID válido de MongoDB'),

    body('userName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('userEmail')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Debe ingresar un correo válido')
        .normalizeEmail(),

    body('userPassword')
        .optional()
        .trim()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener mínimo 6 caracteres'),

    checkValidators,
];


// Activar / Desactivar usuario
export const validateUserStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID válido de MongoDB'),
    checkValidators,
];


// Obtener usuario por ID
export const validateGetUserById = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID válido de MongoDB'),
    checkValidators,
];
