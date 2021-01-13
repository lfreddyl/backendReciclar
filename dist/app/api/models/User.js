"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.UserSchema = new Schema({
    nombres: {
        type: String,
        required: 'El  nombre es requerido',
    },
    apellidos: {
        type: String,
    },
    correo: {
        type: String,
        required: 'El  correo es requerido',
        unique: true,
    },
    telefono: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: 'El  password es requerido'
    },
    direccion: {
        type: String,
        default: null
    },
    delete: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
    },
    notificaciones: {
        type: Array
    },
    notificacion_leido: {
        type: Boolean,
    },
    mensaje_leido: {
        type: Boolean
    }
}, { versionKey: false });
