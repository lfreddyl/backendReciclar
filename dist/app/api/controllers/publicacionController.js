"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicacionController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const responseServices_1 = require("../responses/responseServices");
const publicacionService_1 = __importDefault(require("../services/publicacionService"));
class publicacionController {
    constructor() {
        this.publicacion_service = new publicacionService_1.default();
    }
    create_publicacion(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.id_usuario &&
            req.body.descripcion &&
            req.body.img &&
            req.body.cantidad &&
            req.body.direccion &&
            req.body.fecha &&
            req.body.estado &&
            req.body.residuos) {
            const publicacion_params = {
                descripcion: req.body.descripcion,
                img: req.body.img,
                cantidad: req.body.cantidad,
                id_usuario: req.body.id_usuario,
                direccion: req.body.direccion,
                fecha: req.body.fecha,
                estado: req.body.estado,
                residuos: req.body.residuos,
            };
            this.publicacion_service.createPublicacion(publicacion_params, (err, publicacion_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_create, publicacion_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            responseServices_1.insufficientParameters(res);
        }
    }
    get_publicacion(req, res) {
        if (req.params.id) {
            const query = { _id: mongoose_1.default.Types.ObjectId(req.params.id) };
            const order_filter = { fecha: -1 };
            const queryagregate = [
                {
                    $lookup: {
                        from: "usuarios",
                        localField: "id_usuario",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                { $match: query },
                {
                    $project: {
                        _id: 1,
                        descripcion: 1,
                        img: 1,
                        cantidad: 1,
                        direccion: 1,
                        fecha: 1,
                        estado: 1,
                        residuos: 1,
                        nombres: "$user.nombres",
                        apellidos: "$user.apellidos",
                        imguser: "$user.img",
                        _iduser: "$user._id",
                    },
                },
            ];
            this.publicacion_service.filterByUser(queryagregate, order_filter, (err, publicacion_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, publicacion_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    //servicio para obtener los tipos de publicacions con imagenes
    get_PublicacionByUser(req, res) {
        if (req.params.idUser) {
            const query = { id_usuario: mongoose_1.default.Types.ObjectId(req.params.idUser) };
            const queryagregate = [
                {
                    $lookup: {
                        from: "usuarios",
                        localField: "id_usuario",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                { $match: query },
                {
                    $project: {
                        _id: 1,
                        descripcion: 1,
                        img: 1,
                        cantidad: 1,
                        direccion: 1,
                        fecha: 1,
                        estado: 1,
                        residuos: 1,
                        nombres: "$user.nombres",
                        apellidos: "$user.apellidos",
                        imguser: "$user.img",
                        _iduser: "$user._id",
                    },
                },
            ];
            const queryOrder = { fecha: -1 };
            this.publicacion_service.filterByUser(queryagregate, queryOrder, (err, store_data) => {
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
    get_PublicacionByDescripcion(req, res) {
        if (req.params.cadenaBusqueda) {
            const query = {
                descripcion: { $regex: req.params.cadenaBusqueda, $options: "i" },
            };
            const queryagregate = [
                {
                    $lookup: {
                        from: "usuarios",
                        localField: "id_usuario",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                { $match: query },
                {
                    $project: {
                        _id: 1,
                        descripcion: 1,
                        img: 1,
                        cantidad: 1,
                        direccion: 1,
                        fecha: 1,
                        estado: 1,
                        residuos: 1,
                        nombres: "$user.nombres",
                        apellidos: "$user.apellidos",
                        imguser: "$user.img",
                        _iduser: "$user._id",
                    },
                },
            ];
            const queryOrder = { fecha: -1 };
            this.publicacion_service.filterByUser(queryagregate, queryOrder, (err, store_data) => {
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
    get_PublicacionByCategoria(req, res) {
        if (req.params.cadenaBusqueda) {
            const query = {
                'residuos.descripcion': { $regex: req.params.cadenaBusqueda, $options: "i" },
            };
            const queryagregate = [
                {
                    $lookup: {
                        from: "usuarios",
                        localField: "id_usuario",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                { $match: query },
                {
                    $project: {
                        _id: 1,
                        descripcion: 1,
                        img: 1,
                        cantidad: 1,
                        direccion: 1,
                        fecha: 1,
                        estado: 1,
                        residuos: 1,
                        nombres: "$user.nombres",
                        apellidos: "$user.apellidos",
                        imguser: "$user.img",
                        _iduser: "$user._id",
                    },
                },
            ];
            const queryOrder = { fecha: -1 };
            this.publicacion_service.filterByUser(queryagregate, queryOrder, (err, store_data) => {
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
    find_publicacionByEstado(req, res) {
        if (req.params.estado) {
            const query = { estado: req.params.estado };
            const queryagregate = [
                {
                    $lookup: {
                        from: "usuarios",
                        localField: "id_usuario",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                { $match: query },
                {
                    $project: {
                        _id: 1,
                        descripcion: 1,
                        img: 1,
                        cantidad: 1,
                        direccion: 1,
                        fecha: 1,
                        estado: 1,
                        residuos: 1,
                        nombres: "$user.nombres",
                        apellidos: "$user.apellidos",
                        imguser: "$user.img",
                        _iduser: "$user._id",
                    },
                },
            ];
            const queryOrder = { fecha: -1 };
            this.publicacion_service.filterByUser(queryagregate, queryOrder, (err, publicacion_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, publicacion_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    get_AllPublicacion(req, res) {
        const query = { estado: "pendiente" };
        const PAGE_SIZE = 5;
        const page = parseInt(req.params.page);
        const skip = (page - 1) * PAGE_SIZE;
        const order_filter = { fecha: -1 };
        const queryagregate = [
            {
                $lookup: {
                    from: "usuarios",
                    localField: "id_usuario",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            { $match: query },
            {
                $project: {
                    _id: 1,
                    descripcion: 1,
                    img: 1,
                    cantidad: 1,
                    direccion: 1,
                    fecha: 1,
                    estado: 1,
                    residuos: 1,
                    nombres: "$user.nombres",
                    apellidos: "$user.apellidos",
                    imguser: "$user.img",
                    _iduser: "$user._id",
                },
            },
            { $skip: (page - 1) * PAGE_SIZE },
            { $limit: PAGE_SIZE },
        ];
        this.publicacion_service.filterByUser(queryagregate, order_filter, (err, publicacion_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, publicacion_data, res);
            }
        });
    }
    countPublicacion(req, res) {
        const query = { estado: "pendiente" };
        const order_filter = { _id: 1 };
        const queryagregate = [
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ];
        this.publicacion_service.count(queryagregate, (err, publicacion_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, publicacion_data, res);
            }
        });
    }
    update_publicacion(req, res) {
        if (req.params.id ||
            req.body.descripcion ||
            req.body.img ||
            req.body.cantidad ||
            req.body.direccion ||
            req.body.fecha ||
            req.body.estado ||
            req.body.residuos) {
            const publicacion_filter = { _id: req.params.id };
            this.publicacion_service.filterPublicacion(publicacion_filter, (err, publicacion_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (publicacion_data) {
                    const publicacion_params = {
                        _id: req.params.id,
                        id_usuario: req.body.id_usuario
                            ? req.body.id_usuario
                            : publicacion_data.id_usuario,
                        descripcion: req.body.descripcion
                            ? req.body.descripcion
                            : publicacion_data.descripcion,
                        img: req.body.img ? req.body.img : publicacion_data.img,
                        tipo: req.body.tipo ? req.body.tipo : publicacion_data.tipo,
                        cantidad: req.body.cantidad
                            ? req.body.cantidad
                            : publicacion_data.cantidad,
                        delete: req.body.delete
                            ? req.body.delete
                            : publicacion_data.delete,
                        direccion: req.body.direccion
                            ? req.body.direccion
                            : publicacion_data.direccion,
                        fecha: req.body.fecha ? req.body.fecha : publicacion_data.fecha,
                        estado: req.body.estado
                            ? req.body.estado
                            : publicacion_data.estado,
                        residuos: req.body.residuos
                            ? req.body.residuos
                            : publicacion_data.residuos,
                    };
                    this.publicacion_service.updatePublicacion(publicacion_params, (err) => {
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
    delete_publicacion(req, res) {
        if (req.params.id) {
            this.publicacion_service.deletePublicacion(req.params.id, (err, delete_details) => {
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
exports.publicacionController = publicacionController;
