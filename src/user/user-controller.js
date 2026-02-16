import User from "./user-model.js";

// GET contactos con paginación
export const getUser = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const user = await User.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: user,
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
      message: 'Error al obtener los contactos',
      error: error.message,
    });
  }
};

// GET contacto por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el contacto',
      error: error.message,
    });
  }
};

// POST crear contacto
export const createUser = async (req, res) => {
  try {
    const userData = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.substring(
        filename.indexOf('user/')
      );
      userData.photo = `${relativePath}.${extension}`;
    } else {
      // Si no se envía archivo, usar imagen por defecto
      userData.photo = 'opiniones/persona_icwvut';
    }

    const user = new User(userData);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Contacto creado exitosamente',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el contacto',
      error: user.message,
    });
  }
};

// PUT actualizar contacto
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;
      const relativePath = filename.includes('user/')
        ? filename.substring(filename.indexOf('user/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el contacto',
      error: error.message,
    });
  }
};

// PATCH activar / desactivar contacto
export const changeUsuarioStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const contacto = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!contacto) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Usuario ${action} exitosamente`,
      data: usuario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado del contacto',
      error: error.message,
    });
  }
};
getUserById