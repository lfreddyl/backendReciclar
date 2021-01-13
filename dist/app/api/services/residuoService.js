"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Residuo_1 = require("../models/Residuo");
const mongoose_1 = __importDefault(require("mongoose"));
const residuo = mongoose_1.default.model('residuos', Residuo_1.ResiduoSchema);
class residuoService {
    createResiduo(residuoParams, callback) {
        const _session = new residuo(residuoParams);
        _session.save(callback);
    }
    getResiduo(queryOrder, callback) {
        residuo.find({}, callback).sort(queryOrder);
    }
    filterResiduo(query, callback) {
        residuo.findOne(query, callback);
    }
    filterResiduoAll(query, callback) {
        residuo.find(query, callback);
    }
    updateResiduo(residuoParams, callback) {
        const query = { _id: residuoParams._id };
        residuo.findOneAndUpdate(query, residuoParams, callback);
    }
    deleteResiduo(_id, callback) {
        const query = { _id: _id };
        residuo.deleteOne(query, callback);
    }
}
exports.default = residuoService;
