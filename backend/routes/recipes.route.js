const router = require('express').Router();
let Recipe = require('../models/recipe.model');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uploader = multer({ dest: "uploads/" });

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_BUCKET_REGION
});

const upload = () =>
    multer({
        storage:multerS3({
            s3,
            bucket: "recipe-pictures-bucket",
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, `image-${Date.now()}.jpeg`)
            }
        })
    });

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const ingredients = req.body.ingredients;
    const picture = req.body.picture

    const newRecipe = new Recipe({
        title,
        description,
        ingredients,
        picture
    });

    newRecipe.save()
        .then(() => res.json('Recipe added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/upload').post((req, res) => {
    const uploadSingle = upload().single("picture");
    uploadSingle(req, res, (err) => {
        if (err) return res.status(400).json({success: false, message: err.message});

        res.status(200).json({ data: req.file.location });
    })
})

router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.json('Recipe deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.title = req.body.title;
            recipe.description = req.body.description;
            recipe.ingredients = req.body.ingredients;
            recipe.picture = req.body.picture;

            recipe.save()
                .then(() => res.json('Recipe updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;