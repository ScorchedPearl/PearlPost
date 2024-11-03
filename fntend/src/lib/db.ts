import mongoose from "mongoose";
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;
const User= new Schema({
    username: String,
    email: {type:String , unique:true},
    password: String,
})
const Post=new Schema({
    id:ObjectId,
    title:String,
    content:String,
    hashtag:String,
}) 
// const Search=new Schema({

// })
// const UserModel=mongoose.model('users',User);
const UserModel = mongoose.models.User || mongoose.model('User', User);
const PostModel = mongoose.models.User || mongoose.model('Post', Post);


module.exports={
   UserModel:UserModel,
   PostModel:PostModel,
}   