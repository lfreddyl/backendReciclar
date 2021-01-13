"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.ChatSchema = new Schema({
    id_emisor: { type: Schema.Types.ObjectId, ref: "usuarios", required: 'El  userid es requerido' },
    id_receptor: { type: Schema.Types.ObjectId, ref: "usuarios", required: 'El  userid es requerido' },
    fecha: { type: Date, required: 'La fecha es requerida' },
    delete: { type: Boolean, default: false },
    leido: { type: Boolean }
}, { versionKey: false });
