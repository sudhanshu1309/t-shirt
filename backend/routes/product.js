const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all params here
router.param("productId", getProductById);
router.param("userId", getUserById);

//all actual routes
//create routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete routes
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAdmin,
  isAuthenticated,
  deleteProduct
);

//update routes
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAdmin,
  isAuthenticated,
  updateProduct
);

//listing routes
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
