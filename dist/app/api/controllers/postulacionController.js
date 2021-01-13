"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postulacionController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const responseServices_1 = require("../responses/responseServices");
const postulacionService_1 = __importDefault(require("../services/postulacionService"));
class postulacionController {
    constructor() {
        this.postulacion_service = new postulacionService_1.default();
    }
    create_postulacion(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.id_usuario && req.body.id_publicacion && req.body.estado && req.body.fecha) {
            const store_params = {
                id_usuario: req.body.id_usuario,
                id_publicacion: req.body.id_publicacion,
                estado: req.body.estado,
                fecha: req.body.fecha
            };
            this.postulacion_service.createPostulacion(store_params, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_create, store_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            responseServices_1.insufficientParameters(res);
        }
    }
    get_postulacion(req, res) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.postulacion_service.filterPostulacion(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    postulacionByUserByPost(req, res) {
        if (req.params.idUsuario) {
            const store_filter = { id_usuario: mongoose_1.default.Types.ObjectId(req.params.idUsuario), id_publicacion: mongoose_1.default.Types.ObjectId(req.params.idPost) };
            this.postulacion_service.filterPostulacion(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    get_postulacionByUser(req, res) {
        if (req.params.idUsuario) {
            const query = { id_usuario: mongoose_1.default.Types.ObjectId(req.params.idUsuario) };
            const queryagregate = [{ $lookup: { from: "usuarios", localField: "id_usuario", foreignField: "_id", as: "user" } }, { $unwind: "$user" }, { $match: query }, { $project: { "id_publicacion": 1, "estado": 1, "fecha": 1, "nombres": "$user.nombres", "apellidos": "$user.apellidos", "imguser": "$user.img", "_iduser": "$user._id" } }, { $lookup: { from: "publicaciones", localField: "id_publicacion", foreignField: "_id", as: "publicacion" } }, { $unwind: "$publicacion" }];
            this.postulacion_service.filterPostulacionAll(queryagregate, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    get_postulacionByUserAsignado(req, res) {
        if (req.params.idUsuario) {
            const query = { id_usuario: mongoose_1.default.Types.ObjectId(req.params.idUsuario), estado: 'asignado' };
            const queryagregate = [{ $lookup: { from: "usuarios", localField: "id_usuario", foreignField: "_id", as: "user" } }, { $unwind: "$user" }, { $match: query }, { $project: { "id_publicacion": 1, "estado": 1, "fecha": 1, "nombres": "$user.nombres", "apellidos": "$user.apellidos", "imguser": "$user.img", "_iduser": "$user._id" } }, { $lookup: { from: "publicaciones", localField: "id_publicacion", foreignField: "_id", as: "publicacion" } }, { $unwind: "$publicacion" }];
            this.postulacion_service.filterPostulacionAll(queryagregate, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    get_postulacionByPublicacion(req, res) {
        if (req.params.idPublicacion) {
            const query = { id_publicacion: mongoose_1.default.Types.ObjectId(req.params.idPublicacion) };
            const queryagregate = [{ $lookup: { from: "usuarios", localField: "id_usuario", foreignField: "_id", as: "user" } }, { $unwind: "$user" }, { $match: query }, { $project: { "id_publicacion": 1, "estado": 1, "fecha": 1, "nombres": "$user.nombres", "apellidos": "$user.apellidos", "imguser": "$user.img", "_iduser": "$user._id" } }];
            this.postulacion_service.filterPostulacionAll(queryagregate, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    get_all_postulacion(res) {
        this.postulacion_service.getPostulacion((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    update_postulacion(req, res) {
        if (req.params.id &&
            req.body.id_publicacion || req.body.estado || req.body.id_usuario) {
            const store_filter = { _id: req.params.id };
            this.postulacion_service.filterPostulacion(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (store_data) {
                    const store_params = {
                        _id: req.params.id,
                        id_usuario: req.body.id_usuario ? req.body.id_usuario : store_data.id_usuario,
                        id_publicacion: req.body.id_publicacion ? req.body.id_publicacion : store_data.id_publicacion,
                        estado: req.body.estado ? req.body.estado : store_data.estado,
                        fecha: req.body.fecha ? req.body.fecha : store_data.fecha
                    };
                    this.postulacion_service.updatePostulacion(store_params, (err) => {
                        if (err) {
                            responseServices_1.mongoError(err, res);
                        }
                        else {
                            responseServices_1.successResponse(responseServices_1.sms_update, null, res);
                        }
                    });
                }
                else {
                    responseServices_1.failureResponse(responseServices_1.sms_notfound, null, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    delete_postulacion(req, res) {
        if (req.params.id) {
            this.postulacion_service.deletePostulacion(req.params.id, (err, delete_details) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    responseServices_1.successResponse(responseServices_1.sms_delet, null, res);
                }
                else {
                    responseServices_1.failureResponse(responseServices_1.sms_notfound, null, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
}
exports.postulacionController = postulacionController;
