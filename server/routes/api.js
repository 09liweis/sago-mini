const express = require('express');
const router = express.Router();

const Build = require('../models/build');

/* GET api listing. */
router.get('/', (req, res) => {
    Build.find({}).exec((builds) => {
        res.send(builds);
    });
});

router.post('/set', (req, res) => {
    const bundle_id = req.body.bundle_id;
    let new_build_number = req.body.new_build_number;
    let newBuild;
    Build.find({bundle_id: bundle_id}, (build) => {
        if (build) {
            build.build_number += 1;
            res.send(build);
        } else {
            newBuild = new Build({
                bundle_id: bundle_id,
                build_number: new_build_number
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

module.exports = router;