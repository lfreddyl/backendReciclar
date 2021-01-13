"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MensajeSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.MensajeSchema = new Schema({
    id_usuario: { type: Schema.Types.ObjectId, ref: "usuario", required: 'El  userid es requerido' },
    descripcion: { type: String, required: 'la descripcion es requerido' },
    fecha: { type: Date, required: 'la fecha es requerido' },
    id_chat: { type: Schema.Types.ObjectId, ref: "chat", required: 'El  chatid es requerido' },
    leido: { type: Boolean },
}, { versionKey: false });
