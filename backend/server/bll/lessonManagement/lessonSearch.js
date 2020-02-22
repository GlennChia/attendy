const Lesson = require('../../database/models/lessonModel');

exports.lessonSearch = function (req, res) {
    const searchParameters = req.query;

    try {
        Lesson.find( searchParameters, function (err, docs) {
            if (docs.length){
                return res.status(200).send( docs );
            } else if (err) {
                return res.status(500).send(err);
            }
            else {                
                return res.status(409).send('Either invalid lessonId or the lesson does not exist'); 
            }
        });
        
    }
    catch (err) {
        return res.status(500).send(err); 
    }
}