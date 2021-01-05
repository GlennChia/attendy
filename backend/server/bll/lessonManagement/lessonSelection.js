const Attendance = require('../../database/models/attendanceModel');

exports.lessonSelect = function (req, res) {
    const{body} = req;
    const{ userId, subjectName, lessonName } = body;

    let attendance = new Attendance({
        userId: userId,
        subjectName: subjectName,
        lessonName: lessonName,
    });

    console.log(attendance)
    try{
        Attendance.find( { $and: [{'userId' : userId }, {'subjectName': subjectName}, {'lessonName': lessonName}]}, function (err, docs) {
            if (!docs.length){
                attendance.save(function (err) {
                    if (err) {
                        return res.status(500).send('Database error'); 
                    }    
                    return res.status(200).send('successfully added lesson');
                });
            } else {                
                return res.status(409).send("Already signed up for this subject's class"); 
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send(err); 
    }
}