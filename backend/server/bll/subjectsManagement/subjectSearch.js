const Subject = require('../../database/models/subjectModel');

exports.subjectSearch = function (req, res) {
    const searchParameters = req.query;

    try {
        Subject.find( searchParameters, function (err, docs) {
            if (docs.length){
                return res.status(200).send( docs );
            } else if (err) {
                return res.status(500).send(err);
            }
            else {                
                return res.status(409).send('Either invalid subjectId or the subject does not exist'); 
            }
        });
        
    }
    catch (err) {
        return res.status(500).send(err); 
    }
}