// importar las dependecias

import { Router } from "express";
import { 
  getComment, 
  createComment, 
  getCommentById, 
  updateComment, 
  changeCommentStatus 
} from "./comment-controller.js";

import { validateCreateComment } from "../../middleware/comment-validation.js";
import { uploadCommentImage } from "../../middleware/file-uploader.js";

const router = Router();

// Rutas Get
router.get('/', getComment);
router.get('/:id', getCommentById);

// rutas Post
router.post('/', uploadCommentImage.single('photo'), validateCreateComment, createComment);


// Rutas Put
router.put('/:id', uploadCommentImage.single('photo'), updateComment);

// Rutas DELETE/PATCH esto lo que hace es Activar o desactivar el comentario sin borrarlo

router.patch('/:id/activate', changeCommentStatus);
router.patch('/:id/deactivate', changeCommentStatus);

export default router;