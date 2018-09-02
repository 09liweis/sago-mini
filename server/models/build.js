var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BuildSchema = new Schema({
    bundle_id: {
        type: String,
    },
    bundle_number: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
});

BuildSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.update_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

module.exports = mongoose.model('Build', BuildSchema);