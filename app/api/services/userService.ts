
import { interfaceUsuario} from '../interfaces/interfaces';
import { UserSchema } from '../models/User';
import mongoose from "mongoose";

const users= mongoose.model('usuarios',UserSchema);
export default class userService {

   
    
    public createUser(user_params: interfaceUsuario, callback: any) {
        const _session = new users(user_params);
        _session.save(callback);
    }

    public getUser(callback: any) {
        users.find({}, callback);
    }
    public filterUser(query: any, callback: any) {
        users.findOne(query, callback);
    }
    public filterUserAll(query: any, callback: any) {
        users.find(query, callback);
    }
    public filterUserAgregate(query: any, callback: any) {
        users.aggregate(query).exec(callback);
    }

    public updateUser(user_params: interfaceUsuario, callback: any) {
        const query = { _id: user_params._id };
        users.findOneAndUpdate(query, user_params, callback);
    }
    
    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }

}