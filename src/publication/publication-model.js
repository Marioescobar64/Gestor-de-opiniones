'use strict';

import mongoose, { mongo } from 'mongoose';

const publicationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: [150, 'El título no puede tener más de 150 caracteres'],
    },

    category: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'La categoría no puede tener más de 100 caracteres'],
    },

    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: [5000, 'El contenido no puede tener más de 5000 caracteres'],
    },


    photo: {
        type: String,
        // valor por defecto
        default: 'publicacion/file',
    },

    isActive: {
        type: Boolean,
        default: true,
    }

});

publicationSchema.index({ isActive: 1 });
publicationSchema.index({ title: 1 });
publicationSchema.index({ title: 1, isActive: 1 });


// exportamos el modelo con el nombre Publication
export default mongoose.model('Publication', publicationSchema);