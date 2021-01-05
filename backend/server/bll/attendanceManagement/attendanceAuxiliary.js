const Attendance = require('../../database/models/attendanceModel');


exports.attendanceDeleteAuxiliary = function (req, res) {
    const searchParameters = req.query;

    try {
        Attendance.deleteMany( searchParameters, function (err, docs) {
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