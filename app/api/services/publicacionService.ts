import { interfacePublicacion} from '../interfaces/interfaces';
import { PublicacionSchema } from '../models/Publicacion';
import mongoose from "mongoose";

const publicacion= mongoose.model('publicaciones',PublicacionSchema);
export default class publicacionService {
    
    public createPublicacion(publicacionParams: interfacePublicacion, callback: any) {
        const _session = new publicacion(publicacionParams);
        _session.save(callback);
        
    }

    public getPublicacion(callback: any) {
        publicacion.find({}, callback);
    }
    public filterPublicacion(query: any, callback: any) {
        publicacion.findOne(query, callback);
    }
    public filterPublicacionAll(query: any,queryOrder: any, callback: any) {
        publicacion.find(query, callback).sort(queryOrder);
    }
    public filterByUser(query: any,queryOrder: any,callback:any) {
        //  order.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{query}}])
          publicacion.aggregate(query).sort(queryOrder).exec(callback);
    }
    

    public updatePublicacion(publicacionParams: interfacePublicacion, callback: any) {
        const query = { _id: publicacionParams._id };
        publicacion.findOneAndUpdate(query, publicacionParams, callback);
    }
    
    public deletePublicacion(_id: String, callback: any) {
        const query = { _id: _id };
        publicacion.deleteOne(query, callback);
    }

}