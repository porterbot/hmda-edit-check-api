'use strict';

var Panel = require('../models/panel');

module.exports = {
    isChildFI: function(activityYear, respondentId, callback) {
        Panel.count({ 'activity_year': activityYear, 'respondent_id': respondentId, 'parent_name': { '$ne': '' }, 'other_lender_code': '0' }, function(err, count) {
            if (err) {
                return callback(err, null);
            }
            var result = { result: false };
            if (count) {
                result.result = true;
            }
            return callback(null, result);
        });
    },

    isRespondentMBS: function(activityYear, respondentId, callback) {
        Panel.count({ 'activity_year': activityYear, 'respondent_id': respondentId, 'parent_name': { '$ne': '' }, 'other_lender_code': { '$in': ['1', '2', '3'] } }, function(err, count) {
            if (err) {
                return callback(err, null);
            }
            var result = { result: false };
            if (count) {
                result.result = true;
            }
            return callback(null, result);
        });
    }
};
