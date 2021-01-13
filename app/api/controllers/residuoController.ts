import mongoose from "mongoose";
import { interfaceResiduo } from "../interfaces/interfaces";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
  sms_update,
  sms_create,
  sms_get,
  sms_notfound,
  sms_delet,
} from "../responses/responseServices";
import { Request, Response } from "express";
import residuoService from "../services/residuoService";
import { usuariosConectados } from "../../../sockets/sockets";

export class residuoController {
  private residuo_service: residuoService = new residuoService();
  public create_Residuo(req: Request, res: Response) {
    // this check whether all the filds were send through the erquest or not
    if (req.body.descripcion && req.body.tipo) {
      const store_params: interfaceResiduo = {
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
      };
      this.residuo_service.createResiduo(
        store_params,
        (err: any, store_data: interfaceResiduo) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_create, store_data, res);
          }
        }
      );
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  public get_Residuo(req: Request, res: Response) {
    if (req.params.id) {
      const store_filter = { _id: req.params.id };
      this.residuo_service.filterResiduo(
        store_filter,
        (err: any, store_data: interfaceResiduo) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, store_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
  public get_ResiduoByTipo(req: Request, res: Response) {
    if (req.params.tipo) {
      const store_filter = {
        tipo: req.params.tipo,
      };
      this.residuo_service.filterResiduoAll(
        store_filter,
        (err: any, store_data: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, store_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public get_all_Residuo(res: Response) {
    const queryOrder={descripcion:1}
    this.residuo_service.getResiduo(queryOrder,(err: any, store_data: any) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse(sms_get, store_data, res);
      }
    });
  }

  public update_Residuo(req: Request, res: Response) {
    if (
      req.params.id || req.body.tipo||
      req.body.descripcion
    ) {
      const store_filter = { _id: req.params.id };
      this.residuo_service.filterResiduo(
        store_filter,
        (err: any, store_data: any) => {
          if (err) {
            mongoError(err, res);
          } else if (store_data) {
            const store_params: interfaceResiduo = {
              _id: req.params.id,
              descripcion: req.body.descripcion
                ? req.body.descripcion
                : store_data.descripcion,
              tipo: req.body.tipo ? req.body.tipo : store_data.tipo,
            };
            this.residuo_service.updateResiduo(store_params, (err: any) => {
              if (err) {
                mongoError(err, res);
              } else {
                successResponse(sms_update, null, res);
              }
            });
          } else {
            failureResponse(sms_notfound, null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public delete_Residuo(req: Request, res: Response) {
    if (req.params.id) {
      this.residuo_service.deleteResiduo(
        req.params.id,
        (err: any, delete_details: any) => {
          if (err) {
            mongoError(err, res);
          } else if (delete_details.deletedCount !== 0) {
            successResponse(sms_delet, null, res);
          } else {
            failureResponse(sms_notfound, null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
}
