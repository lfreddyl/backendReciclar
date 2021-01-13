import { interfacePostulacion } from '../interfaces/interfaces';
import { PostulacionSchema } from '../models/Postulacion';
import mongoose from "mongoose";

const postulacion= mongoose.model('postulaciones',PostulacionSchema);
export default class postulacionService {
    
    public createPostulacion(postulacionParams: interfacePostulacion, callback: any) {
        const _session = new postulacion(postulacionParams);
        _session.save(callback);
        
    }

    public getPostulacion(callback: any) {
        postulacion.find({}, callback);
    }
    public filterPostulacion(query: any, callback: any) {
        postulacion.findOne(query, callback);
    }
    public filterPostulacionAll(query: any, callback: any) {
        postulacion.aggregate(query).exec(callback);

    }

    public updatePostulacion(postulacionParams: interfacePostulacion, callback: any) {
        const query = { _id: postulacionParams._id };
        postulacion.findOneAndUpdate(query, postulacionParams, callback);
    }
    
    public deletePostulacion(_id: String, callback: any) {
        const query = { _id: _id };
        postulacion.deleteOne(query, callback);
    }

}