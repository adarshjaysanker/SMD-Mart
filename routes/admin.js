var express = require('express');
var router = express.Router();
const upload = require('../Middlewares/mullter-config')

const {

  getAdminHomePage, 
  getAllProductsPage, 
  getOrderListPage, 
  getOrderDetailsPage,
  getAddNewProductPage,
  getCustomerList,
  getCustomerDetails,
  getSignUpPage,
  getReviews,
  getBrands,
  getProductCategories,
  createCategories,
  categoryTable,
  createSubcategory,
  addNewBrandPage,
  addBrand,
  getBrandsByCategory,
  addProduct

} = require('../Controllers/adminControllers');


router.get('/',getAdminHomePage);
router.get('/getallproducts',getAllProductsPage);
router.get('/getorderlist',getOrderListPage);
router.get('/getorderdetails',getOrderDetailsPage);
router.get('/getaddnewproduct',getAddNewProductPage);
router.get('/getcustomerlist',getCustomerList);
router.get('/getcustomerdetails',getCustomerDetails);
router.get('/getsignuppage',getSignUpPage);
router.get('/getreviews',getReviews);
router.get('/getbrands',getBrands);
router.get('/getproductcategories',getProductCategories);
router.get('/getcategorytable',categoryTable);
router.get('/addnewbrandpage',addNewBrandPage);
router.get('/getbrandsbycategory',getBrandsByCategory)


router.post('/createcategories',createCategories);
router.post('/postsubcategory',createSubcategory);
router.post('/addbrand',upload.single('image'),addBrand);
router.post('/addproduct',upload.single('image'), addProduct)

module.exports = router;
