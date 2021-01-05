const Lesson = require('../../database/models/lessonModel');

exports.lessonStatus = async function (req, res) {
    const searchParameters = req.query;
    try{
        let doc = await Lesson.findOneAndUpdate( {$and:[{'name': searchParameters.lessonName}, {'subjectName': searchParameters.subjectName}]}, {'status': searchParameters.status}).maxTimeMS(3000);
        if (doc) {
            return res.status(201).send('successfully updated lesson status'); 
        } else {
            return res.status(200).send('Cannot find doc');
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send(err); 
    }
}