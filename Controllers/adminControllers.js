var express = require('express');
var router = express.Router();

module.exports = {

    getAdminHomePage : async(req,res)=>{
        try{
            res.render('admin/home');
        }catch(error){
            console.log(error);
        }
    },

    getAllProductsPage : async(req,res)=>{
        try{
            res.render('admin/allproducts');
        }catch(error){
            console.log(error);
        }
    },

    getOrderListPage : async(req,res)=>{
        try{
            res.render('admin/orderlist');
        }catch(error){
            console.log(error);
        }
    },

    getOrderDetailsPage : async(req,res)=>{
        try{
            res.render('admin/orderdetails')
        }catch(error){
            console.log(error);
        }
    },

    getAddNewProductPage : async(req,res)=>{
        try{
            res.render('admin/addproduct')
        }catch(error){
            console.log(error);
        }
    },

    getCustomerList : async(req,res)=>{
        try{
            res.render('admin/customerlist')
        }catch(error){
            console.log(error);
        }
    },

    getCustomerDetails : async(req,res)=>{
        try{
            res.render('admin/customerdetails')
        }catch(error){
            console.log(error);
        }
    },

    getSignUpPage : async(req,res)=>{
        try{
            res.render('admin/signup');
        }catch(error){
            console.log(error);
        }
    },

    getReviews : async(req,res)=>{
        try{
            res.render('admin/reviews')
        }catch(error){
            console.log(error);
        }
    },

    getBrands : async(req,res)=>{
        try{
            res.render('admin/brand')
        }catch(error){
            console.log(error);
        }
    },

    getProductCategories : async(req,res)=>{
        try{
            res.render('admin/categories')
        }catch(error){
            console.log(error);
        }
    }
}