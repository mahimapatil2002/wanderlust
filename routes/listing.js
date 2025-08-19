const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync =require("../utils/wrapAsync.js");
const {isLoggedIn , isOwner,validateListing ,} = require("../middleware.js"); 
const listingController = require("../controller/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


//index route 
router.get("/", wrapAsync (listingController.index));

//new route 
router.get("/new", isLoggedIn,(listingController.renderNewForm));

//show route (read)
router.get("/:id", wrapAsync (listingController.showListing));

//create route
router.post("/",isLoggedIn, upload.single("listing[image]"),validateListing, wrapAsync (listingController.createListing));
// Using multer for file upload and stor the image in the uploads folder

//edit rout
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync (listingController.renderEditForm));

//update route
router.put("/:id",isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync (listingController.updateListing));

//delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync (listingController.deleteListing));

module.exports =router;