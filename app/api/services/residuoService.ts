import { interfaceResiduo } from '../interfaces/interfaces';
import {ResiduoSchema } from '../models/Residuo';
import mongoose from "mongoose";

const residuo= mongoose.model('residuos',ResiduoSchema);
export default class residuoService {
    
    public createResiduo(residuoParams: interfaceResiduo, callback: any) {
        const _session = new residuo(residuoParams);
        _session.save(callback);
        
    }

    public getResiduo(queryOrder:any, callback: any) {
        residuo.find({}, callback).sort(queryOrder);
    }
    public filterResiduo(query: any, callback: any) {
        residuo.findOne(query, callback);
    }

    public filterResiduoAll(query: any, callback: any) {
        residuo.find(query, callback);
    }
    public updateResiduo(residuoParams: interfaceResiduo, callback: any) {
        const query = { _id: residuoParams._id };
        residuo.findOneAndUpdate(query, residuoParams, callback);
    }
    
    public deleteResiduo(_id: String, callback: any) {
        const query = { _id: _id };
        residuo.deleteOne(query, callback);
    }

}