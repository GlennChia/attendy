const Attendance = require('../../database/models/attendanceModel');
const Lesson = require('../../database/models/lessonModel');

exports.attendanceStatus = function (req, res) {
    const searchParameters = req.query;

    try {
        Attendance.find( searchParameters, function (err, docs) {
            if (docs.length){
                return res.status(200).send( docs );
            } else if (err) {
                return res.status(500).send(err);
            } else {                
                return res.status(409).send('Either invalid lessonId, subjectId or userId'); 
            }
        });
    }
    catch (err) {
        return res.status(500).send(err); 
    }
}