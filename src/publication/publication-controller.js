'use strict';

import Publication from "./publication-model.js";


// GET publicaciones con paginación
export const getPublications = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const publications = await Publication.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Publication.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: publications,
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
      message: 'Error al obtener las publicaciones',
      error: error.message,
    });
  }
};


// GET publicación por ID
export const getPublicationById = async (req, res) => {
  try {

    const { id } = req.params;

    const publication = await Publication.findById(id);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: publication,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la publicación',
      error: error.message,
    });
  }
};


// POST crear publicación
export const createPublication = async (req, res) => {
  try {

    const publicationData = req.body;

    if (req.file) {
      publicationData.image = req.file.path;
    }

    const publication = new Publication(publicationData);
    await publication.save();

    res.status(201).json({
      success: true,
      message: 'Publicación creada exitosamente',
      data: publication,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la publicación',
      error: error.message,
    });
  }
};


// PUT actualizar publicación
export const updatePublication = async (req, res) => {
  try {

    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const publication = await Publication.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Publicación actualizada exitosamente',
      data: publication,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la publicación',
      error: error.message,
    });
  }
};


// PATCH activar / desactivar publicación
export const changePublicationStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activada' : 'desactivada';

    const publication = await Publication.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: `Publicación ${action} exitosamente`,
      data: publication,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado de la publicación',
      error: error.message,
    });
  }
};