"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Publicacion_1 = require("../models/Publicacion");
const mongoose_1 = __importDefault(require("mongoose"));
const publicacion = mongoose_1.default.model('publicaciones', Publicacion_1.PublicacionSchema);
class publicacionService {
    createPublicacion(publicacionParams, callback) {
        const _session = new publicacion(publicacionParams);
        _session.save(callback);
    }
    getPublicacion(callback) {
        publicacion.find({}, callback);
    }
    filterPublicacion(query, callback) {
        publicacion.findOne(query, callback);
    }
    filterPublicacionAll(query, queryOrder, callback) {
        publicacion.find(query, callback).sort(queryOrder);
    }
    filterByUser(query, queryOrder, callback) {
        //  order.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{query}}])
        publicacion.aggregate(query).sort(queryOrder).exec(callback);
    }
    updatePublicacion(publicacionParams, callback) {
        const query = { _id: publicacionParams._id };
        publicacion.findOneAndUpdate(query, publicacionParams, callback);
    }
    deletePublicacion(_id, callback) {
        const query = { _id: _id };
        publicacion.deleteOne(query, callback);
    }
}
exports.default = publicacionService;
