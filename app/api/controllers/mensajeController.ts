
import mongoose from "mongoose";
import { interfaceMensaje } from '../interfaces/interfaces';
import { insufficientParameters, mongoError, successResponse, failureResponse, sms_update, sms_create, sms_get, sms_notfound, sms_delet } from '../responses/responseServices';
import { Request, Response } from 'express';
import mensajeService from '../services/mensajeService';
import { usuariosConectados } from '../../../sockets/sockets';




export class mensajeController{

    private Mensaje_service: mensajeService = new mensajeService();
    public create_Mensaje(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.fecha && req.body.id_usuario&& req.body.id_chat&&req.body.descripcion) {
            const store_params: interfaceMensaje = {
                id_usuario:req.body.id_usuario,
                id_chat:req.body.id_chat,
                fecha:req.body.fecha,
                descripcion:req.body.descripcion,
                leido:false
            };
            this.Mensaje_service.createMensaje(store_params, (err: any, store_data: interfaceMensaje) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_create, store_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_Mensaje(req: Request, res: Response) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.Mensaje_service.filterMensaje(store_filter, (err: any, store_data: any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_Mensaje(req: Request, res: Response) {
        if (req.params.id &&
            req.body.leido) {
            const store_filter = { _id: req.params.id };
            this.Mensaje_service.filterMensaje(store_filter, (err: any, store_data: any) => {
                if (err) {
                    mongoError(err, res);
                } else if (store_data) {
                    const store_params: interfaceMensaje = {
                        _id: req.params.id,
                        id_usuario:store_data.id_usuario,
                        id_chat:store_data.id_chat,
                        descripcion: store_data.descripcion,
                        fecha: store_data.fecha,
                        leido: req.body.leido ? req.body.leido : store_data.leido,
                    };
                    this.Mensaje_service.updateMensaje(store_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse(sms_update, null, res);
                        }
                    });
                } else {
                    failureResponse(sms_notfound, null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_MensajeByChat(req: Request, res: Response) {
        if (req.params.idChat) {
            const store_filter = { id_chat:mongoose.Types.ObjectId(req.params.idChat)};
            const query={fecha:1}
            this.Mensaje_service.filterAllByOrder(store_filter,query, (err: any, store_data: any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    

    public get_all_Mensaje( res: Response) {
        
            
            this.Mensaje_service.getMensaje((err: any, store_data: any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        
    }

    

    public delete_Mensaje(req: Request, res: Response) {
        if (req.params.id) {
            this.Mensaje_service.deleteMensaje(req.params.id, (err: any, delete_details:any) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse(sms_delet, null, res);
                } else {
                    failureResponse(sms_notfound, null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
} 