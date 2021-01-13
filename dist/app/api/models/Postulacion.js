"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostulacionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.PostulacionSchema = new Schema({
    id_usuario: { type: Schema.Types.ObjectId, ref: "usuario", required: 'El  userid es requerido' },
    id_publicacion: { type: Schema.Types.ObjectId, ref: "postulacion", required: 'El postulacionid es requerido' },
    estado: { type: String, default: null },
    fecha: { type: String }
}, { versionKey: false });
