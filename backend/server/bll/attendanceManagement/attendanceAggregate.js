const Attendance = require('../../database/models/attendanceModel');

exports.attendanceAggregate = function (req, res) {
    const searchParameters = req.query;
    let punctualStudents= [];
    let lateStudents = [];
    let absentStudents = [];
    let csvFormat = [];

    try {
        Attendance.find( searchParameters, null, {sort: 'userName'}, function (err, docs) {
            if (docs.length){
                for (i = 0; i < docs.length; i++) {
                    if(docs[i].status == 'punctual'){
                        punctualStudents.push({
                            name: docs[i].userName,
                            userId: docs[i].userId,
                        });
                    } else if (docs[i].status == 'late'){
                        lateStudents.push({
                            name: docs[i].userName,
                            userId: docs[i].userId,
                        });
                    } else {
                        absentStudents.push({
                            name: docs[i].userName,
                            userId: docs[i].userId,
                        });
                    }
                    // Format for CSV
                    csvFormat.push({
                        name: docs[i].userName,
                        userId: docs[i].userId,
                        status: docs[i].status
                    })
                }
                return res.status(200).send({
                    'punctualStudents': punctualStudents,
                    'lateStudents': lateStudents,
                    'absentStudents': absentStudents,
                    'csvFormat': csvFormat
                });
            } else if (err) {
                return res.status(500).send(err);
            } else {                
                return res.status(409).send('Invalid lessonId or userId'); 
            }
        });
    }
    catch (err) {
        return res.status(500).send(err); 
    }
}