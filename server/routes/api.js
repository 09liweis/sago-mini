const express = require('express');
const router = express.Router();

const Build = require('../models/build');

/* GET api listing. */
router.get('/', (req, res) => {
    Build.find({}).exec((err, builds) => {
        res.send(builds);
    });
});

router.get('/read', (req, res) => {
    const bundle_id = req.query.bundle_id;
    Build.findOne({bundle_id: bundle_id}, (err, build) => {
        if (!err && build) {
            console.log('exist');
            res.send({build_number: build.build_number});
        } else {
            console.log('not exist');
            res.sendStatus(400);
        }
    });
});

router.post('/set', (req, res) => {
    const bundle_id = req.body.bundle_id;
    let new_build_number = parseInt(req.body.new_build_number);
    let newBuild;
    console.log(new_build_number);
    Build.findOne({bundle_id: bundle_id}, (err, build) => {
        if (build) {
            if (new_build_number > build.build_number) {
                build.build_number = new_build_number;
            }
            Build.findOneAndUpdate({_id: build._id}, build, {upsert: true}, function(err, build) {
                res.send(build);
            });
        } else {
            newBuild = new Build({
                bundle_id: bundle_id,
                build_number: 0
            });
            newBuild.save(function(err, build) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(build);
                }
            });
        }
    });
});

router.post('/bump', (req, res) => {
    const bundle_id = req.body.bundle_id;
    Build.findOne({bundle_id: bundle_id}, (err, build) => {
        if (build) {
            build.build_number++;
            Build.findOneAndUpdate({_id: build._id}, build, {upsert: true}, function(err, updatedBuild) {
                res.send({build_number: build.build_number});
            });
        } else {
            const newBuild = new Build({
                bundle_id: bundle_id,
                build_number: 0
            });
            newBuild.save((err, build) => {
                if (!err && build) {
                    res.send({build_number: build.build_number});
                }
            });
        }
    });
});

module.exports = router;