const Lesson = require('../../database/models/lessonModel');
const Attendance = require('../../database/models/attendanceModel');
const User = require('../../database/models/userModel');
    
exports.attendanceSubmission = function (req, res) {
    // At this stage we assume that the user entry is already there and we matched the ID
    const {subjectName, lessonName, berkeleyId } = req.body;
    let { userName } = req.body;
    userName = userName.toLowerCase();

    try {
        Lesson.find( {name: lessonName}, function (err, docs) {
            if (docs.length){
                if (docs[0].status == 'closed' || docs[0].status == 'finished'){
                    return res.status(200).send('class had not started or has already ended')
                } else{
                    // Find the userId from the users table to search the attendance table
                    User.find({$or:[{name: userName}, {berkeleyId: berkeleyId}]}, function(errUser, docUser){
                        if(docUser){
                            Attendance.findOneAndUpdate( {$and: [{'subjectName': subjectName}, {'userId': docUser[0].userId}, {'lessonName': lessonName}]}, {$set: {status: docs[0].status, timeIn: new Date()}}, function(errAtt, docsAtt){
                                if (errAtt){
                                    return res.status(500).send(err)
                                } else {
                                    return res.status(201).send('successfully updated attendance'); 
                                }
                            } )
                        } else if (errUser){
                            return res.status(500).send(errUser);
                        }
                    })
                    
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