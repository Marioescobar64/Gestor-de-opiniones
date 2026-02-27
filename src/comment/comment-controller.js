import Comment from "./comment-model.js";

// GET comentarios con paginación
export const getComment = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const comment = await Comment.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Comment.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: comment,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los comentarios',
      error: error.message,
    });
  }
};

// GET comentario por ID
export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comentario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el comentario',
      error: error.message,
    });
  }
};

// POST crear comentario
export const createComment = async (req, res) => {
  try {
    const commentData = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.substring(
        filename.indexOf('comment/')
      );
      commentData.photo = `${relativePath}.${extension}`;
    } else {
      commentData.photo = 'comment/file';
    }

    const comment = new Comment(commentData);
    await comment.save();

    res.status(201).json({
      success: true,
      message: 'Comentario creado exitosamente',
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el comentario',
      error: error.message,
    });
  }
};

// PUT actualizar comentario
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.includes('comment/')
        ? filename.substring(filename.indexOf('comment/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const comment = await Comment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comentario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Comentario actualizado exitosamente',
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el comentario',
      error: error.message,
    });
  }
};

// PATCH activar / desactivar comentario
export const changeCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const comment = await Comment.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comentario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Comentario ${action} exitosamente`,
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado del comentario',
      error: error.message,
    });
  }
};