var express = require('express');
var router = express.Router();

module.exports = {

    getAdminHomePage : async(req,res)=>{
        try{
            res.render('admin/index');
        }catch(error){
            console.log(error);
        }
    },
}