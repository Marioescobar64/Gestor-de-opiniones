// importar las dependecias

import { Router } from "express";
import { getUser, createUser, getUserById, updateUser, changeUsuarioStatus, } from "./user-controller.js";
import { validateCreateUser } from "../../middleware/user-validation.js";

import { uploadUserImage } from "../../middleware/file-uploader.js";

const router = Router();

// Rutas Get
router.get('/', getUser);
router.get('/:id', getUserById);

// rutas Post
router.post('/', uploadUserImage.single('photo'), validateCreateUser, createUser);


// Rutas Put
router.put('/:id',uploadUserImage.single('photo'), updateUser);

// Rutas DELETE/PATCH esto lo que hace es Activar o desactivar al contacto sin borrarlo

router.patch('/:id/activate', changeUsuarioStatus);
router.patch('/:id/deactivate', changeUsuarioStatus);

export default router;
