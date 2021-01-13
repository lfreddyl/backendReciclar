"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const publicacionController_1 = require("../app/api/controllers/publicacionController");
const userController_1 = require("../app/api/controllers/userController");
const postulacionController_1 = require("../app/api/controllers/postulacionController");
const chatController_1 = require("../app/api/controllers/chatController");
const residuoController_1 = require("../app/api/controllers/residuoController");
const mensajeController_1 = require("../app/api/controllers/mensajeController");
class router {
    constructor() {
        this.userController = new userController_1.userController();
        this.postulacionController = new postulacionController_1.postulacionController();
        this.chatController = new chatController_1.chatController();
        this.residuoController = new residuoController_1.residuoController();
        this.mensajeController = new mensajeController_1.mensajeController();
        this.publicacionController = new publicacionController_1.publicacionController();
    }
    route(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        //
        //Rutas de Usuarios
        app.route('/login')
            .post((req, res) => {
            this.userController.login(req, res);
        });
        app.route('/usersByMovil/:movil')
            .get((req, res) => {
            this.userController.findUserMovil(req, res);
        });
        app.route('/usersByCorreo/:correo')
            .get((req, res) => {
            this.userController.findUserCorreo(req, res);
        });
        app.route('/usersByNombres/:nombres')
            .get((req, res) => {
            this.userController.findUserNombres(req, res);
        });
        app.route('/notificaciones/:id')
            .get((req, res) => {
            this.userController.getNotificaciones(req, res);
        });
        app.route('/userSendCorreo/:correo')
            .get((req, res) => {
            this.userController.enviarContrasenaCorreo(req, res);
        });
        app.route('/users')
            .get((req, res) => {
            this.userController.get_users(res);
        })
            .post((req, res) => {
            this.userController.create_user(req, res);
        });
        app.route('/users/:id')
            .get((req, res) => {
            this.userController.get_user(req, res);
        })
            .put((req, res) => {
            this.userController.update_user(req, res);
        })
            .delete((req, res) => {
            this.userController.delete_user(req, res);
        });
        //Rutas de Residuos
        app.route('/residuos')
            .get((req, res) => {
            this.residuoController.get_all_Residuo(res);
        });
        app.route('/residuos/:id')
            .get((req, res) => {
            this.residuoController.get_Residuo(req, res);
        });
        app.route('/residuosByTipo/:tipo')
            .get((req, res) => {
            this.residuoController.get_ResiduoByTipo(req, res);
        });
        //Rutas de Mensajes'
        app.route('/mensajesByChat/:idChat')
            .get((req, res) => {
            this.mensajeController.get_MensajeByChat(req, res);
        });
        app.route('/mensajes')
            .get((req, res) => {
            this.mensajeController.get_all_Mensaje(res);
        })
            .post((req, res) => {
            this.mensajeController.create_Mensaje(req, res);
        });
        app.route('/mensajes/:id')
            .delete((req, res) => {
            this.mensajeController.delete_Mensaje(req, res);
        });
        //Rutas de Chats
        app.route('/chatsByUser/:idUsuario')
            .get((req, res) => {
            this.chatController.getChatByUser(req, res);
        });
        app.route('/chatsByUsers/:idEmisor/:idReceptor')
            .get((req, res) => {
            this.chatController.getChatByUsers(req, res);
        });
        app.route('/chats')
            .get((req, res) => {
            this.chatController.get_all_Chat(res);
        })
            .post((req, res) => {
            this.chatController.create_Chat(req, res);
        });
        app.route('/chats/:id')
            .get((req, res) => {
            this.chatController.get_Chat(req, res);
        })
            .put((req, res) => {
            this.chatController.update_Chat(req, res);
        })
            .delete((req, res) => {
            this.chatController.delete_Chat(req, res);
        });
        //Rutas de publicacion
        app.route('/publicacionesByEstado/:estado')
            .get((req, res) => {
            this.publicacionController.find_publicacionByEstado(req, res);
        });
        app.route('/publicacionesByUser/:idUser')
            .get((req, res) => {
            this.publicacionController.get_PublicacionByUser(req, res);
        });
        app.route('/publicacionesByDescripcion/:cadenaBusqueda')
            .get((req, res) => {
            this.publicacionController.get_PublicacionByDescripcion(req, res);
        });
        app.route('/publicacioness/:page')
            .get((req, res) => {
            this.publicacionController.get_AllPublicacion(req, res);
        });
        app.route('/publicaciones')
            .post((req, res) => {
            this.publicacionController.create_publicacion(req, res);
        });
        app.route('/publicaciones/:id')
            .get((req, res) => {
            this.publicacionController.get_publicacion(req, res);
        })
            .put((req, res) => {
            this.publicacionController.update_publicacion(req, res);
        })
            .delete((req, res) => {
            this.publicacionController.delete_publicacion(req, res);
        });
        //Rutas de postulacion
        app.route('/postulacionesByUser/:idUsuario')
            .get((req, res) => {
            this.postulacionController.get_postulacionByUser(req, res);
        });
        app.route('/postulacionesByUserAsignado/:idUsuario')
            .get((req, res) => {
            this.postulacionController.get_postulacionByUserAsignado(req, res);
        });
        app.route('/postulacionesByUserByPost/:idUsuario/:idPost')
            .get((req, res) => {
            this.postulacionController.postulacionByUserByPost(req, res);
        });
        app.route('/postulacionesByPublicacion/:idPublicacion')
            .get((req, res) => {
            this.postulacionController.get_postulacionByPublicacion(req, res);
        });
        app.route('/postulaciones')
            .post((req, res) => {
            this.postulacionController.create_postulacion(req, res);
        })
            .get((req, res) => {
            this.postulacionController.get_all_postulacion(res);
        });
        app.route('/postulaciones/:id')
            .get((req, res) => {
            this.postulacionController.get_postulacion(req, res);
        })
            .put((req, res) => {
            this.postulacionController.update_postulacion(req, res);
        })
            .delete((req, res) => {
            this.postulacionController.delete_postulacion(req, res);
        });
    }
}
exports.router = router;
/*
export const router=Router();
var base= new BaseController;
var result='ffsd'
public userController:UserController=new UserController();
//Users


router.get('/users',(req: Request, res:Response)=>{


        base.SendResponse('Recurso Encontrado',res,result);
 });

 router.post()=>{
    res.status(200).send({
        message:'Recurso Registrado'
    })
 });

 router.put('/users/:id',(req: Request, res:Response)=>{
    res.status(200).send({
        message:'Recurso Modificado'
    })
 });

 router.delete('/users/:id',(req: Request, res:Response)=>{
    res.status(200).send({
        message:'Recurso Modificado'
    })
 });





//






export default router*/ 
