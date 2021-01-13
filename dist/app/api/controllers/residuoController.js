"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.residuoController = void 0;
const responseServices_1 = require("../responses/responseServices");
const residuoService_1 = __importDefault(require("../services/residuoService"));
class residuoController {
    constructor() {
        this.residuo_service = new residuoService_1.default();
    }
    create_Residuo(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.descripcion && req.body.tipo) {
            const store_params = {
                descripcion: req.body.descripcion,
                tipo: req.body.tipo,
            };
            this.residuo_service.createResiduo(store_params, (err, store_data) => {
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
    get_Residuo(req, res) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.residuo_service.filterResiduo(store_filter, (err, store_data) => {
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
    get_ResiduoByTipo(req, res) {
        if (req.params.tipo) {
            const store_filter = {
                tipo: req.params.tipo,
            };
            this.residuo_service.filterResiduoAll(store_filter, (err, store_data) => {
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
    get_all_Residuo(res) {
        const queryOrder = { descripcion: 1 };
        this.residuo_service.getResiduo(queryOrder, (err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    update_Residuo(req, res) {
        if (req.params.id || req.body.tipo ||
            req.body.descripcion) {
            const store_filter = { _id: req.params.id };
            this.residuo_service.filterResiduo(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (store_data) {
                    const store_params = {
                        _id: req.params.id,
                        descripcion: req.body.descripcion
                            ? req.body.descripcion
                            : store_data.descripcion,
                        tipo: req.body.tipo ? req.body.tipo : store_data.tipo,
                    };
                    this.residuo_service.updateResiduo(store_params, (err) => {
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
    delete_Residuo(req, res) {
        if (req.params.id) {
            this.residuo_service.deleteResiduo(req.params.id, (err, delete_details) => {
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
exports.residuoController = residuoController;
