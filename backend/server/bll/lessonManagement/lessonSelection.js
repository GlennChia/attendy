const Attendance = require('../../database/models/attendanceModel');

exports.lessonSelect = function (req, res) {
    const{body} = req;
    const{ userId, subjectId, lessonId } = body;

    let attendance = new Attendance({
        userId: userId,
        subjectId: subjectId,
        lessonId: lessonId,
    });

    console.log(attendance)
    try{
        Attendance.find( { $and: [{'userId' : userId }, {'subjectId': subjectId}, {'lessonId': lessonId}]}, function (err, docs) {
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