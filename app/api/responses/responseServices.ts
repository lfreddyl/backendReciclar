import { Response } from 'express';
export enum response_status_codes {
    success = 200,
    bad_request = 400,
    internal_server_error = 500
}
export const sms_create='Registro creado exitosamente'
export const sms_update='Registro actualizado exitosamente'
export const sms_delet='Registro eliminado exitosamente'
export const sms_get='Registro encontrado exitosamente'
export const sms_notfound='Registro no fue encontrado'

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA
    });
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        STATUS: 'FAILURE',
        MESSAGE: 'MongoDB error',
        DATA: err
    });
}
