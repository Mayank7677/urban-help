const serviceController = require("../controllers/ServiceController");
const express = require("express");
const { route } = require("./UserRoutes");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/create", auth, serviceController.createService);
router.get("/get", auth, serviceController.getAllServices);
router.get("/getOne/:id", auth, serviceController.getServiceById);
router.put("/update/:id", auth, serviceController.updateService);
router.delete("/delete/:id", auth, serviceController.deleteService);
router.post("/review/:id" , auth , serviceController.addReview)

module.exports = router;