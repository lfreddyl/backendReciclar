"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResiduoSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.ResiduoSchema = new Schema({
    descripcion: { type: String, required: 'la descripcion es requerido' },
    tipo: { type: String, required: 'el tipo es requerido' },
}, { versionKey: false });
