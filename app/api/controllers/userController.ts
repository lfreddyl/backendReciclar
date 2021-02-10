import mongoose from "mongoose";
import { interfaceUsuario } from "../interfaces/interfaces";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../responses/responseServices";
import { Request, Response } from "express";
import userService from "../services/userService";
import { usuariosConectados } from "../../../sockets/sockets";
import * as nodemailer from 'nodemailer'; 
export class userController {
  private user_service: userService = new userService();
  public create_user(req: Request, res: Response) {
    // this check whether all the filds were send through the erquest or not
    if (
      (req.body.nombres &&
        req.body.apellidos &&
        req.body.correo &&
        req.body.password&&req.body.img) ||
      req.body.telefono
    ) {
      //Comprobar si el numero ya esta registrado
      const user_filter = { correo: req.body.correo };
      this.user_service.filterUser(user_filter, (err: any, user_exits: any) => {
        if (err) {
          mongoError(err, res);
        } else {
          if (user_exits === null) {
            const user_params: interfaceUsuario = {
              nombres: req.body.nombres,
              apellidos: req.body.apellidos,
              correo: req.body.correo,
              password: req.body.password,
              telefono: req.body.telefono,
              img:req.body.img,
              notificacion_leido:false,
              mensaje_leido:false,
            };
            this.user_service.createUser(
              user_params,
              (err: any, user_data: interfaceUsuario) => {
                if (err) {
                  mongoError(err, res);
                } else {
                  successResponse("create user successfull", user_data, res);
                }
              }
            );
          } else {
            failureResponse(
              "El correo ingresado ya se encuentra registrado",
              null,
              res
            );
          }
        }
      });
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  public get_user(req: Request, res: Response) {
    if (req.params.id) {
      const user_filter = { _id: req.params.id };
      this.user_service.filterUser(
        user_filter,
        (err: any, user_data: interfaceUsuario) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("get user successfull", user_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public enviarContrasenaCorreo(req: Request, res: Response){
    var transporter = nodemailer.createTransport( 
      {
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'orlanjack95@gmail.com',
            pass: '4545645456'
        }
      }
    ); 
    if (req.params.correo) {
      
      const user_filter = { correo: req.params.correo };
      this.user_service.filterUser(
        user_filter,
        (err: any, user_data: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            if(user_data===null){
              failureResponse("Usuario no encontrado, correo no enviado", null, res);

            }
            else{
              var mailOptions = { 
                from : 'orlanjack95@gmail.com', 
                to : req.params.correo, 
                subject : 'Contrasena', 
                text: 'Hola desde la plataforma de reciclamos, tu contrasena de acceso es: '+user_data.password 
              }; 
              transporter.sendMail( mailOptions, (error, info) => { 
                if (error) { 
                  return console.log(`error: ${error}`); 
                } 
                else{
                  successResponse("correo enviado", info.response, res);

                }
              }); 
            }
            
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
    
 
    
    
  }
  public findUserMovil(req: Request, res: Response) {
    if (req.params.movil) {
      const user_filter = { telefono: req.params.movil };
      this.user_service.filterUser(
        user_filter,
        (err: any, user_data: interfaceUsuario) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("get user successfull", user_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public findUserCorreo(req: Request, res: Response) {
    if (req.params.correo) {
      const user_filter = { correo: req.params.correo };
      this.user_service.filterUser(
        user_filter,
        (err: any, user_data: interfaceUsuario) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("get user successfull", user_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
  public findUserNombres(req: Request, res: Response) {
      var busquedaEncontrada=false
    if (req.params.nombres.search(" ") != -1) {
      const cadenaBusqueda = req.params.nombres;
      var cadenaArray = cadenaBusqueda.split(" ");
      const longitudArray=cadenaArray.length
      if(longitudArray<=4){
        for (let index = 0; index < longitudArray; index++) {

          const user_filter = {
            nombres: { $regex: cadenaArray[index], $options: "i" },
          };
          this.user_service.filterUserAll(
            user_filter,
            (err: any, user_data: []) => {
              
              if (err) {
                mongoError(err, res);
              } else {
                if (user_data.length > 0) {
                  console.log(user_data.length)
                  busquedaEncontrada=true;
                  successResponse("get user successfull", user_data, res);
                  return;
                  
                } else {
                  if(!busquedaEncontrada&&(index===longitudArray-1)){
                    successResponse("get user successfull", [], res);
                    return;
                  }  
                }
              }
            }
          );
        }
      }
      else{
        successResponse("get user successfull", [], res);

      }
      
    } else {
      if (req.params.nombres) {
        const user_filter = {
          nombres: { $regex: req.params.nombres, $options: "i" },
        };
        this.user_service.filterUserAll(
          user_filter,
          (err: any, user_data: any) => {
            if (err) {
              mongoError(err, res);
            } else {
              if (user_data.length < 1) {
                const user_filter = {
                  apellidos: { $regex: req.params.nombres, $options: "i" },
                };
                this.user_service.filterUserAll(
                  user_filter,
                  (err: any, user_data: any) => {
                    if (err) {
                      mongoError(err, res);
                    } else {
                      successResponse("get user successfull", user_data, res);
                    }
                  }
                );
              } else {
                successResponse("get user successfull", user_data, res);
              }
            }
          }
        );
      } else {
        insufficientParameters(res);
      }
    }
  }
  public get_users(res: Response) {
    this.user_service.getUser((err: any, user_data: interfaceUsuario) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse("get user successfull", user_data, res);
      }
    });
  }

  public getNotificaciones(req: Request, res: Response){
    if (req.params.id) {

     const query = { _id: mongoose.Types.ObjectId(req.params.id) };
      const queryagregate = [
        
        { $match: query },
        {
          $sort : {'notificaciones.fecha': 1 } 
       },
  
      ];
      this.user_service.filterUserAgregate(
        queryagregate,
        (err: any, user_data: interfaceUsuario) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("get user successfull", user_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public update_user(req: Request, res: Response) {
    if (
      (req.params.id ) ||
      req.body.nombres||
      req.body.apellidos ||
      req.body.correo ||
      req.body.password ||
      req.body.direccion ||
      req.body.telefono ||
      req.body.delete ||
      req.body.img||
      req.body.notificaciones||
      req.body.notificacion_leido||
      req.body.mensaje_leido
    ) {
      const user_filter = { _id: req.params.id };
      this.user_service.filterUser(
        user_filter,
        (err: any, user_data: interfaceUsuario) => {
          if (err) {
            mongoError(err, res);
          } else if (user_data) {
            const user_params: interfaceUsuario = {
              _id: req.params.id,
              nombres: req.body.nombres ? req.body.nombres : user_data.nombres,
              correo: req.body.correo ? req.body.correo : user_data.correo,
              telefono: req.body.telefono
                ? req.body.telefono
                : user_data.telefono,
              apellidos: req.body.apellidos
                ? req.body.apellidos
                : user_data.apellidos,
              delete: req.body.delete ? req.body.delete : user_data.delete,
              img: req.body.img ? req.body.img : user_data.img,
              password: req.body.password
                ? req.body.password
                : user_data.password,
              direccion: req.body.direccion
                ? req.body.direccion
                : user_data.direccion,
              notificaciones: req.body.notificaciones
                ? req.body.notificaciones
                : user_data.notificaciones,
              notificacion_leido: req.body.notificacion_leido,
              mensaje_leido: req.body.mensaje_leido
                

            };
            this.user_service.updateUser(user_params, (err: any) => {
              if (err) {
                mongoError(err, res);
              } else {
                successResponse("update user successfull", null, res);
              }
            });
          } else {
            failureResponse("invalid user", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public delete_user(req: Request, res: Response) {
    if (req.params.id) {
      this.user_service.deleteUser(
        req.params.id,
        (err: any, delete_details: any) => {
          if (err) {
            mongoError(err, res);
          } else if (delete_details.deletedCount !== 0) {
            successResponse("delete user successfull", null, res);
          } else {
            failureResponse("invalid user", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public login(req: Request, res: Response) {
    if (req.body.correo && req.body.password) {
      const user_filter = {
        correo: req.body.correo,
        password: req.body.password,
      };

      this.user_service.filterUser(user_filter, (err: any, user_data: any) => {
        if (err) {
          mongoError(err, res);
        } else {
          if (user_data !== null) {
            successResponse("login successfull", user_data, res);
          } else {
            failureResponse("invalid user", null, res);
            //LOGIN POR CORREO Y PASWORD
            /* this.user_service.filterUser(user_filter2, (err: any, user_data:any) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                if(user_data!==null){
                                    successResponse('login successfull', user_data, res);
                                }
                                else{
                                    failureResponse('credenciales invalidas', null, res);
                                }                    
                            }
                        });*/
          }
        }
      });
    } else {
      insufficientParameters(res);
    }
  }
}
