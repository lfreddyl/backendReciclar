import { interfaceMensaje } from '../interfaces/interfaces';
import { MensajeSchema } from '../models/Mensaje';
import mongoose from "mongoose";

const mensaje= mongoose.model('mensajes',MensajeSchema);
export default class mensajeService {
    
    public createMensaje(mensajeParams: interfaceMensaje, callback: any) {
        const _session = new mensaje(mensajeParams);
        _session.save(callback);
        
    }

    public getMensaje(callback: any) {
        mensaje.find({}, callback);
    }
    public filterMensaje(query: any, callback: any) {
        mensaje.findOne(query, callback);
    }
    public filterAllByOrder(query: any,query2:any, callback: any) {
        mensaje.find(query, callback).sort(query2); 
    }

    public updateMensaje(mensajeParams: interfaceMensaje, callback: any) {
        const query = { _id: mensajeParams._id };
        mensaje.findOneAndUpdate(query, mensajeParams, callback);
    }
    
    public deleteMensaje(_id: String, callback: any) {
        const query = { _id: _id };
        mensaje.deleteOne(query, callback);
    }

}