const express = require("express");
// Doing database stuff, so need some kind of async handler
const asyncHandler = require("express-async-handler"); 
const router = express.Router();

// Put the database stuff needed here
// Import any other needed middleware here
const { BagelShop } = require("../../db/models");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// Create the API routes here
// GET all route
// TODO limit search results to a specified amount
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bagelShops = await BagelShop.findAll();
    res.json(bagelShops);
  })
);

// POST route
router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { name, address, city, state, zipcode, phone, information } = req.body;

    const bagelShop = await BagelShop.create({ name, address, city, state, zipcode, phone, information });
    return res.json(bagelShop);
  }) 
);

// PUT
router.put(
  "/update/:id",
  asyncHandler(async (req, res) => {
    const { id, name, address, city, state, zipcode, phone, information } = req.body;
    const numId = +id;
    const bagelShop = await BagelShop.findByPk(numId);
    console.log('Big old FLAAAAAAAAAAAAAG', bagelShop);

    const updatedBagelShop = await bagelShop.update({ numId, name, address, city, state, zipcode, phone, information});
    console.log('*************************', updatedBagelShop);
    return res.json(updatedBagelShop);
  })
);

// Delete route
router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const bagelShopId = parseInt(req.params.id, 10);
    console.log('*** bagelShopId at the backend is:', bagelShopId);

    const bagelShop = await BagelShop.findByPk(bagelShopId);

    await bagelShop.destroy();
    return res.json('Successfully deleted');
  })
);

// Export the router
module.exports = router;
