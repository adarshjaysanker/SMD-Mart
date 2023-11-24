var express = require('express');
var router = express.Router();
const Category = require('../Model/categories');
const Subcategory = require('../Model/subCategories');

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
            const categories = await Category.find();
            const subcategories = await Subcategory.find().populate('category')
            
            
            res.render('admin/categories',{categories, subcategories})
        }catch(error){
            console.log(error);
        }
    },

    createCategories : async(req,res)=>{
        try{
            const {categoryName, description} = req.body;
            const newCategory = new Category({
                categoryName,
                description,
            });

            const savedCategory = await newCategory.save();
            res.json(savedCategory);
        }catch(error){
            console.error(error);
            res.status(500).json({error : 'Internal Server Error'});
        }
    },

    categoryTable : async(req,res)=>{
        try{
            const categories = await Category.find();
            res.json(categories);
        }catch(error){
            console.log(error);
            res.status(500).json({error : 'Internal Server Error'})
        }
    },

    createSubcategory : async(req,res)=>{
        try{
            const {subcategoryName, description, selectedCategory} = req.body;
            console.log('recieved request');
            const newSubcategory = await Subcategory.create({
                name : subcategoryName,
                description : description,
                category : selectedCategory,
            });

            const category = await Category.findById(selectedCategory);

           const updatedCategory = await Category.findByIdAndUpdate(
            selectedCategory,
            {$push : {subcategories : newSubcategory._id}},
            {new : true},
           )
           if(!updatedCategory){
            return res.status(404).json({error : 'Category not found'});
           }
            res.json({...newSubcategory.toObject(), categoryName : category.categoryName});
        }catch(error){
            console.error(error);
            res.status(500).send('Internal server Error');
        }
    },

    addNewBrandPage : async(req,res)=>{
        try{
            res.render('admin/addBrand');
        }catch(error){
            console.log(error);
        }
    }
}