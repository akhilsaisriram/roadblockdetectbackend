// const mongoose = require('mongoose');

// let Registeruser = new mongoose.Schema({
 
//     username :{
//         type : String,
//         required : true,
//     },
//     states :{
//         type : String,
//         required : true,
//     }
   
// },{timestamps:true,
//     versionKey: false,
//     id: true,
//     toJSON: {
//       transform(doc, ret){
//         ret.id = ret._id
//         delete ret._id
//       }}})

// module.exports = mongoose.model('Registeruser',Registeruser)

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: {
        type : String,
        required: true
    },
    author: {
        type : String,
        required: true
    }
})
const Blog  = mongoose.model('Blog',blogSchema);
module.exports=Blog;