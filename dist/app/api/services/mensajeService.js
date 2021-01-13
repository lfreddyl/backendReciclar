"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mensaje_1 = require("../models/Mensaje");
const mongoose_1 = __importDefault(require("mongoose"));
const mensaje = mongoose_1.default.model('mensajes', Mensaje_1.MensajeSchema);
class mensajeService {
    createMensaje(mensajeParams, callback) {
        const _session = new mensaje(mensajeParams);
        _session.save(callback);
    }
    getMensaje(callback) {
        mensaje.find({}, callback);
    }
    filterMensaje(query, callback) {
        mensaje.findOne(query, callback);
    }
    filterAllByOrder(query, query2, callback) {
        mensaje.find(query, callback).sort(query2);
    }
    updateMensaje(mensajeParams, callback) {
        const query = { _id: mensajeParams._id };
        mensaje.findOneAndUpdate(query, mensajeParams, callback);
    }
    deleteMensaje(_id, callback) {
        const query = { _id: _id };
        mensaje.deleteOne(query, callback);
    }
}
exports.default = mensajeService;
