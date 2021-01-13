"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensajeController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const responseServices_1 = require("../responses/responseServices");
const mensajeService_1 = __importDefault(require("../services/mensajeService"));
class mensajeController {
    constructor() {
        this.Mensaje_service = new mensajeService_1.default();
    }
    create_Mensaje(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.fecha && req.body.id_usuario && req.body.id_chat && req.body.descripcion) {
            const store_params = {
                id_usuario: req.body.id_usuario,
                id_chat: req.body.id_chat,
                fecha: req.body.fecha,
                descripcion: req.body.descripcion,
                leido: false
            };
            this.Mensaje_service.createMensaje(store_params, (err, store_data) => {
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
    get_Mensaje(req, res) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.Mensaje_service.filterMensaje(store_filter, (err, store_data) => {
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
    update_Mensaje(req, res) {
        if (req.params.id &&
            req.body.leido) {
            const store_filter = { _id: req.params.id };
            this.Mensaje_service.filterMensaje(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (store_data) {
                    const store_params = {
                        _id: req.params.id,
                        id_usuario: store_data.id_usuario,
                        id_chat: store_data.id_chat,
                        descripcion: store_data.descripcion,
                        fecha: store_data.fecha,
                        leido: req.body.leido ? req.body.leido : store_data.leido,
                    };
                    this.Mensaje_service.updateMensaje(store_params, (err) => {
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
    get_MensajeByChat(req, res) {
        if (req.params.idChat) {
            const store_filter = { id_chat: mongoose_1.default.Types.ObjectId(req.params.idChat) };
            const query = { fecha: 1 };
            this.Mensaje_service.filterAllByOrder(store_filter, query, (err, store_data) => {
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
    get_all_Mensaje(res) {
        this.Mensaje_service.getMensaje((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    delete_Mensaje(req, res) {
        if (req.params.id) {
            this.Mensaje_service.deleteMensaje(req.params.id, (err, delete_details) => {
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
exports.mensajeController = mensajeController;
