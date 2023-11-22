var express = require('express');
var router = express.Router();

module.exports = {

    getUserHomePage : async(req,res)=>{
        try{
            res.render('user/index')
        }catch(error){
            console.log(error);
        }
    },

    getAllProductsPage : async(req,res)=>{
        try{
            res.render('user/allproducts')
        }catch(error){
            console.log(error);
        }
    },

    getProductDetails : async(req,res)=>{
        try{
            res.render('user/productdetails')
        }catch(error){
            console.log(error);
        }
    },

    getContactPage : async(req,res)=>{
        try{
            res.render('user/contact')
        }catch(error){
            console.log(error);
        }
    },

    getCartPage  :async(req,res)=>{
        try{
            res.render('user/cart')
        }catch(error){
            console.log(error);
        }
    },

    getCheckOut : async(req,res)=>{
        try{
            res.render('user/checkout')
        }catch(error){
            console.log(error);
        }
    }
}