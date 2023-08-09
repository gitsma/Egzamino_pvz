const Ad = require('../models/AdModel');

const asyncHandler = require('express-async-handler')

// @desc Get all ads info
// @route POST /api/ad
// @access PUBLIC

const getAllAds = asyncHandler(async (req, res) => {
    const ads = await Ad.find();
    res.status(200).json(ads);
})

// @desc Set new ad
// @route POST /api/ad
// @access Private (Only siple user)

const setAd = asyncHandler(async (req, res) => {
    const { title, description, price, img, category, status } = req.body
    if (!title || !description || !img || !price || !category) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const ad = await Ad.create({
        title,
        description,
        img,
        price,
        category,
        user: req.user.id,
        status
    })
    if (ad) {
        res.status(201).send(ad)
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// @desc Get users ads
// @route GET /api/ad/my
// @access PRIVATE

const getAds = asyncHandler(async (req, res) => {
    const ads = await Ad.find({ user: req.user.id })
    res.status(200).json(ads)
})

// @desc update users ad
// @route PUT /api/ad/:id
// @access PRIVATE

const updateAd = asyncHandler(async (req, res) => {
    const { title, description, price, img, category, status } = req.body
    const result = await Ad.updateOne({
        _id: req.params.id,
    }, {
        $set: {
            title,
            description,
            img,
            price,
            category,
            status
        }
    })
    // res.send(result)
    if (result.modifiedCount > 0) {
        res.status(201).send(result)
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})


// @desc DELETE users ad
// @route DELETE /api/ad/:id
// @access PRIVATE

const deleteAd = asyncHandler(async (req, res) => {

    const ad = await Ad.findById(req.params.id);

    if (!ad) {
        res.status(400);
        throw new Error("Ad not found");
    }

    //check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    //make sure the logged in user matches the ad user
    if (ad.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await ad.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getAllAds,
    setAd,
    getAds,
    updateAd,
    deleteAd
}