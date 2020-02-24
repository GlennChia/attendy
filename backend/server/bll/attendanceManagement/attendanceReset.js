const Attendance = require('../../database/models/attendanceModel');

exports.attendanceReset = function (req, res) {
    console.log(req.query.status)
    try {
        Attendance.updateMany( {}, {status: req.query.status}, function (err, docs) {
            if (docs){
                return res.status(200).send( docs );
            } else if (err) {
                return res.status(500).send(err);
            } else {                
                return res.status(409).send('No documents to update'); 
            }
        });
    }
    catch (err) {
        return res.status(500).send(err); 
    }
}