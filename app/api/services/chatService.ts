import { interfaceChat } from '../interfaces/interfaces';
import { ChatSchema } from '../models/Chat';
import mongoose from "mongoose";

const chat= mongoose.model('chats',ChatSchema);
export default class TproductService {
    
    public createChat(chatParams: interfaceChat, callback: any) {
        const _session = new chat(chatParams);
        _session.save(callback);
        
    }

    public getChat(callback: any) {
        chat.find({}, callback);
    }
    public filterChat(query: any, callback: any) {
        chat.findOne(query, callback);
    }
    public filterChatAll(query: any,query2:any, callback: any) {
        chat.find(query, callback).sort(query2);
    }
    public filterByUserByOrder(query: any,queryOrder:any,callback:any) {
        //  order.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{query}}])
          chat.aggregate(query).sort(queryOrder).exec(callback);
    }
    public updateChat(chatParams: interfaceChat, callback: any) {
        const query = { _id: chatParams._id };
        chat.findOneAndUpdate(query, chatParams, callback);
    }
    
    public deleteChat(_id: String, callback: any) {
        const query = { _id: _id };
        chat.deleteOne(query, callback);
    }

}