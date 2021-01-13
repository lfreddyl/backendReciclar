"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.PublicacionSchema = new Schema({
    id_usuario: { type: Schema.Types.ObjectId, ref: "usuario", required: 'El  user_id es requerido' },
    descripcion: { type: String, required: 'La descripcion es requerido' },
    img: { type: String, required: 'la imagen es requerido' },
    tipo: { type: String },
    cantidad: { type: Number, default: 0, required: 'la cantidad es requerida es requerido' },
    direccion: { type: String, required: 'la direccion es requerida es requerido' },
    fecha: { type: Date },
    estado: { type: String },
    delete: { type: Boolean, default: false },
    residuos: { type: Array, required: 'Los residuos son requeridos' }
}, { versionKey: false });
