import { Router, Request,Response, Application} from 'express';

import { publicacionController } from '../app/api/controllers/publicacionController';
import { userController } from '../app/api/controllers/userController';
import {postulacionController } from '../app/api/controllers/postulacionController';
import {chatController } from '../app/api/controllers/chatController';
import {residuoController } from '../app/api/controllers/residuoController';
import {mensajeController } from '../app/api/controllers/mensajeController';

export class router{


    public userController:userController= new userController();
    public postulacionController:postulacionController= new postulacionController();
    public chatController:chatController= new chatController();
    public residuoController:residuoController= new residuoController();
    public mensajeController:mensajeController= new mensajeController();
    public publicacionController:publicacionController= new publicacionController();
    public route(app: Application){

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
    
         
        })
        //

        //Rutas de Usuarios
        app.route('/login')

        .post((req: Request, res: Response) => {
            this.userController.login(req,res);
    
        })

        app.route('/usersByMovil/:movil')

        .get((req: Request, res: Response) => {
            this.userController.findUserMovil(req,res);
    
        })

        app.route('/usersByCorreo/:correo')

        .get((req: Request, res: Response) => {
            this.userController.findUserCorreo(req,res);
    
        })
        
        app.route('/usersByNombres/:nombres')

        .get((req: Request, res: Response) => {
            this.userController.findUserNombres(req,res);
    
        })

        app.route('/notificaciones/:id')

        .get((req: Request, res: Response) => {
            this.userController.getNotificaciones(req,res);
    
        })

        app.route('/userSendCorreo/:correo')

        .get((req: Request, res: Response) => {
            this.userController.enviarContrasenaCorreo(req,res);
    
        })


        app.route('/users')
        .get((req: Request, res: Response) => {
            this.userController.get_users(res);
        })
        .post((req: Request, res: Response) => {
            this.userController.create_user(req,res);
    
        })

        app.route('/users/:id')
        .get((req: Request, res: Response) => {
            this.userController.get_user(req,res);
    
        })
        .put((req: Request, res: Response) => {
            this.userController.update_user(req,res);
    
        })
        .delete((req: Request, res: Response) => {
            this.userController.delete_user(req,res);
    
        });

        //Rutas de Residuos

        app.route('/residuos')
        .get((req: Request, res: Response) => {
            this.residuoController.get_all_Residuo(res);
        })

        app.route('/residuos/:id')
        .get((req: Request, res: Response) => {
            this.residuoController.get_Residuo(req,res);
        })

        app.route('/residuosByTipo/:tipo')
        .get((req: Request, res: Response) => {
            this.residuoController.get_ResiduoByTipo(req,res);
        })
        //Rutas de Mensajes'
        app.route('/mensajesByChat/:idChat')
        .get((req: Request, res: Response) => {
            this.mensajeController.get_MensajeByChat(req,res);
        })

        app.route('/mensajes')
        .get((req: Request, res: Response) => {
            this.mensajeController.get_all_Mensaje(res);
        })
        .post((req: Request, res: Response) => {
            this.mensajeController.create_Mensaje(req,res);
    
        })
        app.route('/mensajes/:id')
        .delete((req: Request, res: Response) => {
            this.mensajeController.delete_Mensaje(req,res);
        });

        //Rutas de Chats
        app.route('/chatsByUser/:idUsuario')
        .get((req: Request, res: Response) => {
            this.chatController.getChatByUser(req,res);
        })
        app.route('/chatsByUsers/:idEmisor/:idReceptor')
        .get((req: Request, res: Response) => {
            this.chatController.getChatByUsers(req,res);
        })


        app.route('/chats')
        .get((req: Request, res: Response) => {
            this.chatController.get_all_Chat(res);
        })
        .post((req: Request, res: Response) => {
            this.chatController.create_Chat(req,res);
        })
        app.route('/chats/:id')
        .get((req: Request, res: Response) => {
            this.chatController.get_Chat(req,res);
        })
        .put((req: Request, res: Response) => {
            this.chatController.update_Chat(req,res);
        })
        .delete((req: Request, res: Response) => {
            this.chatController.delete_Chat(req,res);
        });

        //Rutas de publicacion
                
        app.route('/publicacionesByEstado/:estado')
        .get((req: Request, res: Response) => {
            this.publicacionController.find_publicacionByEstado(req,res);
        })
                
        app.route('/publicacionesByUser/:idUser')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_PublicacionByUser(req,res);
        })
        app.route('/publicacionesByDescripcion/:cadenaBusqueda')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_PublicacionByDescripcion(req,res);
        })
        app.route('/publicacionesByCategoria/:cadenaBusqueda')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_PublicacionByCategoria(req,res);
        })

        app.route('/publicacioness/:page')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_AllPublicacion(req,res);
        })
        app.route('/publicaciones')
        .post((req: Request, res: Response) => {
            this.publicacionController.create_publicacion(req,res);
    
        })

        app.route('/publicaciones/:id')
        .get((req: Request, res: Response) => {
            this.publicacionController.get_publicacion(req,res);
    
        })
        .put((req: Request, res: Response) => {
            this.publicacionController.update_publicacion(req,res);
    
        })
        .delete((req: Request, res: Response) => {
            this.publicacionController.delete_publicacion(req,res);
    
        });

        
        //Rutas de postulacion
                
        app.route('/postulacionesByUser/:idUsuario')
        .get((req: Request, res: Response) => {
            this.postulacionController.get_postulacionByUser(req,res);
        })
        app.route('/postulacionesByUserAsignado/:idUsuario')
        .get((req: Request, res: Response) => {
            this.postulacionController.get_postulacionByUserAsignado(req,res);
        })
        app.route('/postulacionesByUserByPost/:idUsuario/:idPost')
        .get((req: Request, res: Response) => {
            this.postulacionController.postulacionByUserByPost(req,res);
        })
        app.route('/postulacionesByPublicacion/:idPublicacion')
        .get((req: Request, res: Response) => {
            this.postulacionController.get_postulacionByPublicacion(req,res);
        })
        app.route('/postulaciones')
        .post((req: Request, res: Response) => {
            this.postulacionController.create_postulacion(req,res);
    
        })
        .get((req: Request, res: Response) => {
            this.postulacionController.get_all_postulacion(res);
    
        })

        app.route('/postulaciones/:id')
        .get((req: Request, res: Response) => {
            this.postulacionController.get_postulacion(req,res);
    
        })
        .put((req: Request, res: Response) => {
            this.postulacionController.update_postulacion(req,res);
    
        })
        .delete((req: Request, res: Response) => {
            this.postulacionController.delete_postulacion(req,res);
    
        });
       
    }
}


    



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