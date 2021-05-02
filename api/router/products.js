const express = require('express');
const router = express.Router();
const Product = require('../module/products');
const mongoose = require('mongoose');

router.get('/',(req, res, next) => {
    Product.find()
    .exec()
    .then((result) => {
        res.status(200).json({
            methode : "GET All records",
            result : result,
        });
    }).catch((err) => {
        res.status(500).json({
            err : err,
        });
    });
});

router.get('/:productId', (req, res, next) =>{
    const productId = req.params.productId;
    Product.findById(productId)
    .exec()
    .then((result) => {
        res.status(200).json({
            methode: "GET by ID",
            result : result,
        });
    }).catch((err) => {
        res.status(500).json({
            err : err,
        });
    });
});

router.post('/', (req, res, next) =>{
    const product = new Product({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    product.save()
    .then((result) => {
        res.status(200).json({
            methode: "POST create",
            result : result,
        });
    }).catch((err) => {
        res.status(500).json({
            err : err,
        });
    });
});

router.patch('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    const propOptions = {};
    for (const key in req.body) {
        propOptions[key] = req.body[key];
    }
    Product.updateOne({_id : id}, { $set : propOptions })
    .exec()
    .then((result) => {
        res.status(200).json({
            methode: "PATCH By Id",
            succuse : true,
            propOptions : propOptions
        });
    }).catch((err) => {
        res.status(500).json({
            err : err,
        });
    });
});

router.delete('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.remove({_id : id})
    .exec()
    .then((result) => {
        res.status(200).json({
            methode: "DELETE By Id",
            succuse : true,
        });
    }).catch((err) => {
        res.status(500).json({
            err : err,
        });
    });
});

module.exports = router;