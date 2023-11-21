var express = require('express');
var router = express.Router();

const {

  getAdminHomePage, 
  getAllProductsPage, 
  getOrderListPage, 
  getOrderDetailsPage,
  getAddNewProductPage,
  getCustomerList,
  getCustomerDetails

} = require('../Controllers/adminControllers');


router.get('/',getAdminHomePage);
router.get('/getallproducts',getAllProductsPage);
router.get('/getorderlist',getOrderListPage);
router.get('/getorderdetails',getOrderDetailsPage);
router.get('/getaddnewproduct',getAddNewProductPage);
router.get('/getcustomerlist',getCustomerList);
router.get('/getcustomerdetails',getCustomerDetails)

module.exports = router;
