import { Router } from "express";
import {
  getPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  changePublicationStatus
} from "./publication-controller.js";

import {
  validateCreatePublication,
  validateUpdatePublication,
  validatePublicationStatusChange,
  validateGetPublicationById
} from "../../middleware/publication-validator.js";

import { uploadPublicationImage } from "../../middleware/file-uploader.js";

const router = Router();

// GET
router.get('/', getPublications);
router.get('/:id', validateGetPublicationById, getPublicationById);

// POST
router.post(
  '/',
  uploadPublicationImage.single('image'),
  validateCreatePublication,
  createPublication
);

// PUT
router.put(
  '/:id',
  uploadPublicationImage.single('image'),
  validateUpdatePublication,
  updatePublication
);

// PATCH activar/desactivar
router.patch('/:id/activate', validatePublicationStatusChange, changePublicationStatus);
router.patch('/:id/deactivate', validatePublicationStatusChange, changePublicationStatus);

export default router;