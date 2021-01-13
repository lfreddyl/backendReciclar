"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = require("../models/Chat");
const mongoose_1 = __importDefault(require("mongoose"));
const chat = mongoose_1.default.model('chats', Chat_1.ChatSchema);
class TproductService {
    createChat(chatParams, callback) {
        const _session = new chat(chatParams);
        _session.save(callback);
    }
    getChat(callback) {
        chat.find({}, callback);
    }
    filterChat(query, callback) {
        chat.findOne(query, callback);
    }
    filterChatAll(query, query2, callback) {
        chat.find(query, callback).sort(query2);
    }
    filterByUserByOrder(query, queryOrder, callback) {
        //  order.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{query}}])
        chat.aggregate(query).sort(queryOrder).exec(callback);
    }
    updateChat(chatParams, callback) {
        const query = { _id: chatParams._id };
        chat.findOneAndUpdate(query, chatParams, callback);
    }
    deleteChat(_id, callback) {
        const query = { _id: _id };
        chat.deleteOne(query, callback);
    }
}
exports.default = TproductService;
