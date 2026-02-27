'use strict';

import mongoose, { mongo } from 'mongoose';

const commentSchema = new mongoose.Schema({
    
    commentContent: {
        type: String,
        required: true,
        trim: true,
        maxLength: [500, 'El comentario no puede tener mas de 500 caracteres'],
    },

    commentOwner: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del propietario no puede tener mas de 100 caracteres'],
    },

        photo: {
        type: String,
        // valor por defecto
        default: 'comment/file',
    },

    isActive: {
        type: Boolean,
        default: true,
    }

});

commentSchema.index({ isActive: 1 });
commentSchema.index({ commentOwner: 1 });
commentSchema.index({ commentOwner: 1, isActive: 1 });


// exportamos el modelo con el nombre Comment
export default mongoose.model('Comment', commentSchema);