"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const responseServices_1 = require("../responses/responseServices");
const chatService_1 = __importDefault(require("../services/chatService"));
class chatController {
    constructor() {
        this.chat_service = new chatService_1.default();
    }
    create_Chat(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.id_emisor && req.body.fecha && req.body.id_receptor) {
            const store_params = {
                id_emisor: req.body.id_emisor,
                id_receptor: req.body.id_receptor,
                fecha: req.body.fecha,
                leido: false
            };
            this.chat_service.createChat(store_params, (err, store_data) => {
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
    get_Chat(req, res) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.chat_service.filterChat(store_filter, (err, store_data) => {
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
    getChatByUser(req, res) {
        if (req.params.idUsuario) {
            const query = { $or: [{ id_emisor: mongoose_1.default.Types.ObjectId(req.params.idUsuario) }, { id_receptor: mongoose_1.default.Types.ObjectId(req.params.idUsuario) }] };
            const queryOrder = { fecha: -1 };
            const queryagregate = [{ $match: query }, { $lookup: { from: "usuarios", localField: "id_receptor", foreignField: "_id", as: "usuarioReceptor" } }, { $unwind: "$usuarioReceptor" }, { $lookup: { from: "usuarios", localField: "id_emisor", foreignField: "_id", as: "usuarioEmisor" } }, { $unwind: "$usuarioEmisor" }];
            this.chat_service.filterByUserByOrder(queryagregate, queryOrder, (err, store_data) => {
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
    getChatByUsers(req, res) {
        if (req.params.idReceptor) {
            const query = { id_receptor: req.params.idReceptor, id_emisor: req.params.idEmisor };
            this.chat_service.filterChat(query, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    if (store_data === null) {
                        const query = { id_receptor: req.params.idEmisor, id_emisor: req.params.idReceptor };
                        this.chat_service.filterChat(query, (err, store_data) => {
                            if (err) {
                                responseServices_1.mongoError(err, res);
                            }
                            else {
                                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                            }
                        });
                    }
                    else {
                        responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                    }
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    get_all_Chat(res) {
        this.chat_service.getChat((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    update_Chat(req, res) {
        if (req.params.id ||
            req.body.leido) {
            const store_filter = { _id: req.params.id };
            this.chat_service.filterChat(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (store_data) {
                    const store_params = {
                        _id: req.params.id,
                        id_emisor: store_data.id_emisor,
                        id_receptor: store_data.id_receptor,
                        delete: store_data.delete,
                        fecha: store_data.fecha,
                        leido: req.body.leido
                    };
                    this.chat_service.updateChat(store_params, (err) => {
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
    delete_Chat(req, res) {
        if (req.params.id) {
            this.chat_service.deleteChat(req.params.id, (err, delete_details) => {
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
exports.chatController = chatController;
