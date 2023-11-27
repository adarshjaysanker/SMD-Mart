var express = require('express');
var router = express.Router();
const Category = require('../Model/categories');
const Subcategory = require('../Model/subCategories');
const Brand = require('../Model/brand');
const Allproducts = require('../Model/allProducts')

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
            const products = await Allproducts.find();        
            res.render('admin/allproducts', {products});
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
            const categories = await Category.find();
            const subcategories = await Subcategory.find();
            const brands = await Brand.find();
            console.log(categories);
            res.render('admin/addproduct',{categories : categories, subcategories : subcategories, brands : brands})
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
            const categories = await Category.find({},'categoryName');
            const brands = await Brand.find({});
            res.render('admin/brand',{categories, brands})
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
            const categories = await Category.find();
            res.render('admin/addBrand',{categories});
        }catch(error){
            console.log(error);
        }
    },

    addBrand : async(req,res)=>{
        console.log(req.file);
        try{
            const {brandName, selectedCategories} = req.body;
            const image = req.file ? req.file.filename : null;
            console.log(brandName, image);
            console.log(selectedCategories);
            const categoryIds = Array.isArray(selectedCategories) ? selectedCategories : [selectedCategories];
            console.log(categoryIds);
            const newBrand = new Brand({
                brandName : brandName,
                image : image,
                category : categoryIds
            });
            await newBrand.save();
            const brandId = newBrand._id;
          
            await Promise.all(categoryIds.map(async categoryId => {
                await Category.findByIdAndUpdate(categoryId, {$push: {brands : newBrand._id}});
            }))
            await Brand.findByIdAndUpdate(brandId, {$set: {category : categoryIds}});
            res.json({message: 'Brand created successfully', brand : newBrand})
        }catch(error){
            console.error(error);
            res.status(500).json({error : 'Internal Server Error'});
        }
    },

    getBrandsByCategory : async(req,res)=>{
        try{
            const categoryId = req.query.categoryId;
            const category = await Category.findById(categoryId).populate('brands');
            res.json({brands : category.brands})
        }catch(error){
            console.error(error);
            res.status(500).send('internal server error')
        }
    },

    addProduct : async(req,res)=>{
        try{
            console.log(req.body);
            const {productTitle, brandName, description, cost} = req.body;
            const category = req.body.category;
            const subCategory = req.body.subCategory;
            const image = req.file ? req.file.filename : null;
            
            const newProduct = new Allproducts({
                productTitle,
                brandName,
                description,
                category,
                subCategory,
                cost,
                image,
            });
            await newProduct.save();
            await Category.findByIdAndUpdate(category, {$push: {products : newProduct._id}});
            await Subcategory.findByIdAndUpdate(subCategory,{$push: {products: newProduct._id}});
            await Brand.findByIdAndUpdate(brandName, {$push: {products: newProduct._id}});
            res.json({message : 'prodduct added', product : newProduct})
        }catch(error){
            res.status(500).send('internal server error')
        }
    }
}