'use strict';

import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
        userName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del contacto no puede tener mas de 100 caracteres'],
    },
     userEmail: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del contacto no puede tener mas de 100 caracteres'],
    },

     userPassword: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del contacto no puede tener mas de 100 caracteres'],
    },

    photo: {
    type: String,
    // valor por defecto
    default: 'user/file',
    },


    isActive: {
    type: Boolean,
    default: true,
    }

});

 userSchema.index({ isActive: 1  });
userSchema.index({ userName: 1  });
 userSchema.index({ userName: 1, isActive: 1  });



// exportamos el modelo con el nombre Contactos
export default mongoose.model('User', userSchema)
