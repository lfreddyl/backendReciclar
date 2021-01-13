"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Postulacion_1 = require("../models/Postulacion");
const mongoose_1 = __importDefault(require("mongoose"));
const postulacion = mongoose_1.default.model('postulaciones', Postulacion_1.PostulacionSchema);
class postulacionService {
    createPostulacion(postulacionParams, callback) {
        const _session = new postulacion(postulacionParams);
        _session.save(callback);
    }
    getPostulacion(callback) {
        postulacion.find({}, callback);
    }
    filterPostulacion(query, callback) {
        postulacion.findOne(query, callback);
    }
    filterPostulacionAll(query, callback) {
        postulacion.aggregate(query).exec(callback);
    }
    updatePostulacion(postulacionParams, callback) {
        const query = { _id: postulacionParams._id };
        postulacion.findOneAndUpdate(query, postulacionParams, callback);
    }
    deletePostulacion(_id, callback) {
        const query = { _id: _id };
        postulacion.deleteOne(query, callback);
    }
}
exports.default = postulacionService;
