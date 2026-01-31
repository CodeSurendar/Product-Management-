const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/products", controller.getProducts);
router.post("/products", controller.addProduct);
router.put("/products/:id", controller.updateProduct);
router.delete("/products/:id", controller.deleteProduct);
router.put("/products/restore/:id", controller.restoreProduct);
router.get("/products/deleted", controller.getDeletedProducts);

module.exports = router;
