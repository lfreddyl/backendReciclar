
import mongoose from "mongoose";
import { interfacePostulacion } from '../interfaces/interfaces';
import { insufficientParameters, mongoError, successResponse, failureResponse, sms_update, sms_create, sms_get, sms_notfound, sms_delet } from '../responses/responseServices';
import { Request, Response } from 'express';
import postulacionService from '../services/postulacionService';
import { usuariosConectados } from '../../../sockets/sockets';




export class postulacionController{

    private postulacion_service: postulacionService = new postulacionService();
    public create_postulacion(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.id_usuario && req.body.id_publicacion && req.body.estado && req.body.fecha) {
            const store_params: interfacePostulacion = {
                id_usuario:req.body.id_usuario,
                id_publicacion:req.body.id_publicacion,
                estado: req.body.estado,
                fecha:req.body.fecha
                
            };
            this.postulacion_service.createPostulacion(store_params, (err: any, store_data: interfacePostulacion) => {
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

    public get_postulacion(req: Request, res: Response) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.postulacion_service.filterPostulacion(store_filter, (err: any, store_data: any) => {
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
    public postulacionByUserByPost(req: Request, res: Response) {
        if (req.params.idUsuario) {
            const store_filter = { id_usuario:mongoose.Types.ObjectId(req.params.idUsuario),id_publicacion:mongoose.Types.ObjectId(req.params.idPost) };
            this.postulacion_service.filterPostulacion(store_filter, (err: any, store_data: any) => {
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
    public get_postulacionByUser(req: Request, res: Response) {
        if (req.params.idUsuario) {
            const query = { id_usuario:mongoose.Types.ObjectId(req.params.idUsuario)};
             const queryagregate=[{$lookup:{  from: "usuarios",localField: "id_usuario",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:query},{$project:{"id_publicacion":1,"estado":1,"fecha":1,"nombres":"$user.nombres","apellidos":"$user.apellidos","imguser":"$user.img","_iduser":"$user._id"}},{$lookup:{  from: "publicaciones",localField: "id_publicacion",foreignField: "_id",as: "publicacion"}},{$unwind: "$publicacion"}]

            this.postulacion_service.filterPostulacionAll(queryagregate, (err: any, store_data: any) => {
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
    public get_postulacionByUserAsignado(req: Request, res: Response) {
        if (req.params.idUsuario) {
            const query = { id_usuario:mongoose.Types.ObjectId(req.params.idUsuario),estado:'asignado'};
             const queryagregate=[{$lookup:{  from: "usuarios",localField: "id_usuario",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:query},{$project:{"id_publicacion":1,"estado":1,"fecha":1,"nombres":"$user.nombres","apellidos":"$user.apellidos","imguser":"$user.img","_iduser":"$user._id"}},{$lookup:{  from: "publicaciones",localField: "id_publicacion",foreignField: "_id",as: "publicacion"}},{$unwind: "$publicacion"}]

            this.postulacion_service.filterPostulacionAll(queryagregate, (err: any, store_data: any) => {
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

    public get_postulacionByPublicacion(req: Request, res: Response) {
        if (req.params.idPublicacion) {
            const query = { id_publicacion:mongoose.Types.ObjectId(req.params.idPublicacion)};
            const queryagregate=[{$lookup:{  from: "usuarios",localField: "id_usuario",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:query},{$project:{"id_publicacion":1,"estado":1,"fecha":1,"nombres":"$user.nombres","apellidos":"$user.apellidos","imguser":"$user.img","_iduser":"$user._id"}}]
            this.postulacion_service.filterPostulacionAll(queryagregate, (err: any, store_data: any) => {
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
    

    public get_all_postulacion( res: Response) {
        
            
            this.postulacion_service.getPostulacion((err: any, store_data: any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        
    }

    public update_postulacion(req: Request, res: Response) {
        if (req.params.id &&
            req.body.id_publicacion || req.body.estado||req.body.id_usuario) {
            const store_filter = { _id: req.params.id };
            this.postulacion_service.filterPostulacion(store_filter, (err: any, store_data: any) => {
                if (err) {
                    mongoError(err, res);
                } else if (store_data) {
                    const store_params: interfacePostulacion = {
                        _id: req.params.id,
                        id_usuario: req.body.id_usuario ?req.body.id_usuario: store_data.id_usuario,
                        id_publicacion: req.body.id_publicacion ? req.body.id_publicacion : store_data.id_publicacion,
                        estado: req.body.estado ? req.body.estado : store_data.estado,
                        fecha:req.body.fecha ? req.body.fecha : store_data.fecha
                    };
                    this.postulacion_service.updatePostulacion(store_params, (err: any) => {
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


    public delete_postulacion(req: Request, res: Response) {
        if (req.params.id) {
            this.postulacion_service.deletePostulacion(req.params.id, (err: any, delete_details:any) => {
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