const Lesson = require('../../database/models/lessonModel');
const Subject = require('../../database/models/subjectModel');


exports.lessonCreation = function (req, res) {
    const lessonParams = req.body;

    let lesson = new Lesson(lessonParams);

    // Check for subject name and lesson name. If not, add and update subjects list.
    try {
        Lesson.find( {$and:[{name: lessonParams.name},{subjectName: lessonParams.subjectName}]}, function (err, docs) {
            if (!docs){
                lesson.save(function (err) {
                    if (err) {
                        return res.status(500).send('Database error'); 
                    }    
                    let doc = Subject.findOneAndUpdate( {$and:[{'name': lessonParams.subjectName}, {'classes':{$nin: [lesson.name]}}]}, {$push: {classes: lesson.name}}).maxTimeMS(3000);
                    if (doc) {
                        return res.status(201).send('successfully updated subjects'); 
                    } else {
                        return res.status(200).send('lesson in subject classes but added lesson');
                    }
                });
            } else {                
                return res.status(409).send('Lesson already Exists'); 
            }
        });
    }
    catch (err) {
        return res.status(500).send( err ); 
    }
}