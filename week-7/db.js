//Schema
const mongoose =require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const User=new Schema({
    name: String,
    email:{type : String, unique :true},
    password: String
    
});


const Todo=new Schema({
    title:String,
    done: Boolean,
    userId: ObjectId
})
//


//calling the model
const UserModel=mongoose.model('users',User);
const TodoModel=mongoose.model('todos',Todo);

//exporting this
module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel

}