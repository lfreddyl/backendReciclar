import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ChatSchema = new Schema({
    
    id_emisor:{type: Schema.Types.ObjectId,ref:"usuarios", required:'El  userid es requerido'},
    id_receptor:{type: Schema.Types.ObjectId,ref:"usuarios", required:'El  userid es requerido'},
    fecha: {type:Date,required:'La fecha es requerida'},
    delete: {type:Boolean,default:false},
    leido:{Boolean},


},{ versionKey: false });