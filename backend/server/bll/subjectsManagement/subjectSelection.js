// const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);

const User = require('../../database/models/userModel');

exports.subjectSelection = async function (req, res) {
    const searchParameters = req.query;
    try{
        let doc = await User.findOneAndUpdate( {$and:[{'userId': searchParameters.userId}, {'subjects':{$nin: [searchParameters.subjectId]}}]}, {$push: {subjects: searchParameters.subjectId}}).maxTimeMS(3000);
        console.log(doc)
        if (doc) {
            return res.status(201).send('successfully updated subjects'); 
        } else {
            return res.status(200).send('Cannot find doc');
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send(err); 
    }
}