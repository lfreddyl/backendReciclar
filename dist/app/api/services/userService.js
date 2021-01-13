"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
const users = mongoose_1.default.model('usuarios', User_1.UserSchema);
class userService {
    createUser(user_params, callback) {
        const _session = new users(user_params);
        _session.save(callback);
    }
    getUser(callback) {
        users.find({}, callback);
    }
    filterUser(query, callback) {
        users.findOne(query, callback);
    }
    filterUserAll(query, callback) {
        users.find(query, callback);
    }
    filterUserAgregate(query, callback) {
        users.aggregate(query).exec(callback);
    }
    updateUser(user_params, callback) {
        const query = { _id: user_params._id };
        users.findOneAndUpdate(query, user_params, callback);
    }
    deleteUser(_id, callback) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }
}
exports.default = userService;
