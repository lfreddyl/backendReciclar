"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoError = exports.insufficientParameters = exports.failureResponse = exports.successResponse = exports.sms_notfound = exports.sms_get = exports.sms_delet = exports.sms_update = exports.sms_create = exports.response_status_codes = void 0;
var response_status_codes;
(function (response_status_codes) {
    response_status_codes[response_status_codes["success"] = 200] = "success";
    response_status_codes[response_status_codes["bad_request"] = 400] = "bad_request";
    response_status_codes[response_status_codes["internal_server_error"] = 500] = "internal_server_error";
})(response_status_codes = exports.response_status_codes || (exports.response_status_codes = {}));
exports.sms_create = 'Registro creado exitosamente';
exports.sms_update = 'Registro actualizado exitosamente';
exports.sms_delet = 'Registro eliminado exitosamente';
exports.sms_get = 'Registro encontrado exitosamente';
exports.sms_notfound = 'Registro no fue encontrado';
function successResponse(message, DATA, res) {
    res.status(response_status_codes.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA
    });
}
exports.successResponse = successResponse;
function failureResponse(message, DATA, res) {
    res.status(response_status_codes.success).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA
    });
}
exports.failureResponse = failureResponse;
function insufficientParameters(res) {
    res.status(response_status_codes.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}
exports.insufficientParameters = insufficientParameters;
function mongoError(err, res) {
    res.status(response_status_codes.internal_server_error).json({
        STATUS: 'FAILURE',
        MESSAGE: 'MongoDB error',
        DATA: err
    });
}
exports.mongoError = mongoError;
