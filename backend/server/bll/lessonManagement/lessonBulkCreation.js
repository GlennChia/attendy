// This is just to make my life easier, the single create is the legit one
// Assume the subject is already populated with the clases
const Lesson = require('../../database/models/lessonModel');


exports.lessonBulkCreation = function (req, res) {
    // Array of lesson objects
    const lessons = req.body.lessons;
    let formatLessons = [];

    for (i = 0; i < lessons.length; i++) {
        formatLessons.push(new Lesson(lessons[i]));
    }

    // Check for subject name and lesson name. If not, add and update subjects list.
    try {
        Lesson.insertMany(formatLessons, function (err, docs) {
            if (err){
                return res.status(500).send( err ); 
            } else {                
                return res.status(201).send(docs); 
            }
        });
    }
    catch (err) {
        return res.status(500).send( err ); 
    }
}