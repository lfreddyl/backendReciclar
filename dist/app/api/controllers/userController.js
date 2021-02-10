"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const responseServices_1 = require("../responses/responseServices");
const userService_1 = __importDefault(require("../services/userService"));
const nodemailer = __importStar(require("nodemailer"));
class userController {
    constructor() {
        this.user_service = new userService_1.default();
    }
    create_user(req, res) {
        // this check whether all the filds were send through the erquest or not
        if ((req.body.nombres &&
            req.body.apellidos &&
            req.body.correo &&
            req.body.password && req.body.img) ||
            req.body.telefono) {
            //Comprobar si el numero ya esta registrado
            const user_filter = { correo: req.body.correo };
            this.user_service.filterUser(user_filter, (err, user_exits) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    if (user_exits === null) {
                        const user_params = {
                            nombres: req.body.nombres,
                            apellidos: req.body.apellidos,
                            correo: req.body.correo,
                            password: req.body.password,
                            telefono: req.body.telefono,
                            img: req.body.img,
                            notificacion_leido: false,
                            mensaje_leido: false,
                        };
                        this.user_service.createUser(user_params, (err, user_data) => {
                            if (err) {
                                responseServices_1.mongoError(err, res);
                            }
                            else {
                                responseServices_1.successResponse("create user successfull", user_data, res);
                            }
                        });
                    }
                    else {
                        responseServices_1.failureResponse("El correo ingresado ya se encuentra registrado", null, res);
                    }
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            responseServices_1.insufficientParameters(res);
        }
    }
    get_user(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse("get user successfull", user_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    enviarContrasenaCorreo(req, res) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: 'orlanjack95@gmail.com',
                pass: '4545645456'
            }
        });
        if (req.params.correo) {
            const user_filter = { correo: req.params.correo };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    if (user_data === null) {
                        responseServices_1.failureResponse("Usuario no encontrado, correo no enviado", null, res);
                    }
                    else {
                        var mailOptions = {
                            from: 'orlanjack95@gmail.com',
                            to: req.params.correo,
                            subject: 'Contrasena',
                            text: 'Hola desde la plataforma de reciclamos, tu contrasena de acceso es: ' + user_data.password
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(`error: ${error}`);
                            }
                            else {
                                responseServices_1.successResponse("correo enviado", info.response, res);
                            }
                        });
                    }
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    findUserMovil(req, res) {
        if (req.params.movil) {
            const user_filter = { telefono: req.params.movil };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse("get user successfull", user_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    findUserCorreo(req, res) {
        if (req.params.correo) {
            const user_filter = { correo: req.params.correo };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse("get user successfull", user_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    findUserNombres(req, res) {
        var busquedaEncontrada = false;
        if (req.params.nombres.search(" ") != -1) {
            const cadenaBusqueda = req.params.nombres;
            var cadenaArray = cadenaBusqueda.split(" ");
            const longitudArray = cadenaArray.length;
            if (longitudArray <= 4) {
                for (let index = 0; index < longitudArray; index++) {
                    const user_filter = {
                        nombres: { $regex: cadenaArray[index], $options: "i" },
                    };
                    this.user_service.filterUserAll(user_filter, (err, user_data) => {
                        if (err) {
                            responseServices_1.mongoError(err, res);
                        }
                        else {
                            if (user_data.length > 0) {
                                console.log(user_data.length);
                                busquedaEncontrada = true;
                                responseServices_1.successResponse("get user successfull", user_data, res);
                                return;
                            }
                            else {
                                if (!busquedaEncontrada && (index === longitudArray - 1)) {
                                    responseServices_1.successResponse("get user successfull", [], res);
                                    return;
                                }
                            }
                        }
                    });
                }
            }
            else {
                responseServices_1.successResponse("get user successfull", [], res);
            }
        }
        else {
            if (req.params.nombres) {
                const user_filter = {
                    nombres: { $regex: req.params.nombres, $options: "i" },
                };
                this.user_service.filterUserAll(user_filter, (err, user_data) => {
                    if (err) {
                        responseServices_1.mongoError(err, res);
                    }
                    else {
                        if (user_data.length < 1) {
                            const user_filter = {
                                apellidos: { $regex: req.params.nombres, $options: "i" },
                            };
                            this.user_service.filterUserAll(user_filter, (err, user_data) => {
                                if (err) {
                                    responseServices_1.mongoError(err, res);
                                }
                                else {
                                    responseServices_1.successResponse("get user successfull", user_data, res);
                                }
                            });
                        }
                        else {
                            responseServices_1.successResponse("get user successfull", user_data, res);
                        }
                    }
                });
            }
            else {
                responseServices_1.insufficientParameters(res);
            }
        }
    }
    get_users(res) {
        this.user_service.getUser((err, user_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse("get user successfull", user_data, res);
            }
        });
    }
    getNotificaciones(req, res) {
        if (req.params.id) {
            const query = { _id: mongoose_1.default.Types.ObjectId(req.params.id) };
            const queryagregate = [
                { $match: query },
                {
                    $sort: { 'notificaciones.fecha': 1 }
                },
            ];
            this.user_service.filterUserAgregate(queryagregate, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse("get user successfull", user_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    update_user(req, res) {
        if ((req.params.id) ||
            req.body.nombres ||
            req.body.apellidos ||
            req.body.correo ||
            req.body.password ||
            req.body.direccion ||
            req.body.telefono ||
            req.body.delete ||
            req.body.img ||
            req.body.notificaciones ||
            req.body.notificacion_leido ||
            req.body.mensaje_leido) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (user_data) {
                    const user_params = {
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
                    this.user_service.updateUser(user_params, (err) => {
                        if (err) {
                            responseServices_1.mongoError(err, res);
                        }
                        else {
                            responseServices_1.successResponse("update user successfull", null, res);
                        }
                    });
                }
                else {
                    responseServices_1.failureResponse("invalid user", null, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    delete_user(req, res) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err, delete_details) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    responseServices_1.successResponse("delete user successfull", null, res);
                }
                else {
                    responseServices_1.failureResponse("invalid user", null, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    login(req, res) {
        if (req.body.correo && req.body.password) {
            const user_filter = {
                correo: req.body.correo,
                password: req.body.password,
            };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    if (user_data !== null) {
                        responseServices_1.successResponse("login successfull", user_data, res);
                    }
                    else {
                        responseServices_1.failureResponse("invalid user", null, res);
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
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
}
exports.userController = userController;
