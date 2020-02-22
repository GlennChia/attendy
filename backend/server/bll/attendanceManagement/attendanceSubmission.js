const Lesson = require('../../database/models/lessonModel');
const Attendance = require('../../database/models/attendanceModel');


var arraysMatch = function (arr1, arr2) {
	if (arr1.length !== arr2.length) return false;

	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;

};
    
exports.attendanceSubmission = function (req, res) {
    const {lessonId, seatingPlan, userId} = req.body;

    try {
        Lesson.find( {'_id': lessonId}, function (err, docs) {
            if (docs.length){
                if (arraysMatch(docs[0].seatingPlan, seatingPlan)){
                    // update the attendance
                    Attendance.find({$and: [{'lessonId': lessonId}, {'userId': userId}, {'subjectId': docs[0].subjectId}]}, function(errAtt, docAtt) {
                        if(errAtt){
                            return res.status(500).send('Database error');
                        } else if(docs.length){
                            // punctual
                            if (Date.now() <= docs[0].lateTime){
                                docAtt[0].status = 'punctual';
                                docAtt[0].timeIn = new Date();
                                docAtt[0].save();
                                return res.status(200).send('attendance punctual');
                            }
                            // Late
                            else if (Date.now() > docs[0].lateTime && Date.now() <= docs[0].endTime){
                                docAtt[0].status = 'late';
                                docAtt[0].timeIn = new Date();
                                docAtt[0].save();
                                return res.status(200).send('attendance late');
                            } else {
                                console.log('too bad')
                                return res.status(200).send('attendance closed');
                            }
                        } else {
                            return res.status(409).send('Either invalid IDs or the ID combination does not exist'); 
                        }
                    });
                } else {
                    return res.status(409).send( 'Seating plans do not match' );
                }     
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