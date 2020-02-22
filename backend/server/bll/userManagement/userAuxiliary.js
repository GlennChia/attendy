const User = require('../../database/models/userModel');

exports.userSearchAuxiliary = function (req, res) {
    const searchParameters = req.query;

    try {
        User.find( searchParameters, function (err, docs) {
            if (docs.length){
                return res.status(200).send({
                    docs
                });
            } else if (err) {
                return res.status(500).send(err);
            } else {                
                return res.status(409).send('Either invalid userId or the user does not exist'); 
            }
        });
        
    }
    catch (err) {
        return res.status(500).send(err); 
    }
}

exports.userDeleteAuxiliary = function (req, res) {
    const searchParameters = req.query;

    try {
        User.findOneAndDelete( searchParameters, function (err, docs) {
            if (docs){
                return res.status(200).send('Successfully deleted');
            } else if (err) {
                return res.status(500).send(err);
            } else {                
                return res.status(409).send('Either invalid userId or the user does not exist'); 
            }
        });
        
    }
    catch (err) {
        return res.status(500).send(err); 
    }
}