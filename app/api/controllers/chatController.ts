
import mongoose from "mongoose";
import { interfaceChat } from '../interfaces/interfaces';
import { insufficientParameters, mongoError, successResponse, failureResponse, sms_update, sms_create, sms_get, sms_notfound, sms_delet } from '../responses/responseServices';
import { Request, Response } from 'express';
import chatService from '../services/chatService';
import { usuariosConectados } from '../../../sockets/sockets';




export class chatController{

    private chat_service: chatService = new chatService();
    public create_Chat(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.id_emisor && req.body.fecha &&req.body.id_receptor) {
            const store_params: interfaceChat = {
                id_emisor:req.body.id_emisor,
                id_receptor:req.body.id_receptor,
                fecha:req.body.fecha,
                leido_emisor:false,
                leido_receptor:false
            };
            this.chat_service.createChat(store_params, (err: any, store_data: interfaceChat) => {
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

    public get_Chat(req: Request, res: Response) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.chat_service.filterChat(store_filter, (err: any, store_data: any) => {
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

    
    public getChatByUser(req: Request, res: Response) {
        if (req.params.idUsuario) {
            const query = {$or:[{id_emisor: mongoose.Types.ObjectId(req.params.idUsuario)},{id_receptor: mongoose.Types.ObjectId(req.params.idUsuario)}] };
            const queryOrder={fecha:-1}
            const queryagregate=[{$match:query},{$lookup:{  from: "usuarios",localField: "id_receptor",foreignField: "_id",as: "usuarioReceptor"}},{$unwind: "$usuarioReceptor"},{$lookup:{  from: "usuarios",localField: "id_emisor",foreignField: "_id",as: "usuarioEmisor"}},{$unwind: "$usuarioEmisor"}]

            this.chat_service.filterByUserByOrder(queryagregate,queryOrder, (err: any, store_data: any) => {
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

    public getChatByUsers(req: Request, res: Response) {
        if (req.params.idReceptor) {
            const query = {id_receptor: req.params.idReceptor,id_emisor: req.params.idEmisor};
            this.chat_service.filterChat(query, (err: any, store_data: any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if(store_data===null){
                        const query = {id_receptor: req.params.idEmisor,id_emisor: req.params.idReceptor};
                        this.chat_service.filterChat(query, (err: any, store_data: any) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                    successResponse(sms_get, store_data, res);
                            }
                        });
                    }
                    else{
                        successResponse(sms_get, store_data, res);
                    }
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    

    public get_all_Chat( res: Response) {
        
            
            this.chat_service.getChat((err: any, store_data: any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        
    }

    public update_Chat(req: Request, res: Response) {
        if (req.params.id ||
            req.body.leido) {
            const store_filter = { _id: req.params.id };
            this.chat_service.filterChat(store_filter, (err: any, store_data: interfaceChat) => {
                if (err) {
                    mongoError(err, res);
                } else if (store_data) {
                    const store_params: interfaceChat = {
                        _id: req.params.id,
                        id_emisor: store_data.id_emisor,
                        id_receptor: store_data.id_receptor,
                        delete: store_data.delete,
                        fecha: store_data.fecha,
                        leido_emisor: req.body.leido_emisor,
                        leido_receptor: req.body.leido_receptor


                    };
                    this.chat_service.updateChat(store_params, (err: any) => {
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


    public delete_Chat(req: Request, res: Response) {
        if (req.params.id) {
            this.chat_service.deleteChat(req.params.id, (err: any, delete_details:any) => {
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