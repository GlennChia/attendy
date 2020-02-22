const Lesson = require('../../database/models/lessonModel');
const Subject = require('../../database/models/subjectModel');


exports.lessonCreation = async function (req, res) {
    const lessonParams = req.body;
    // const{body} = req;
    // const{ name, classDate, startTime, lateTime, endTime, seatingPlan, location, subjectId } = body;

    // const lessonParams = {
    //     name: name,
    //     classDate: classDate,
    //     startTime: startTime,
    //     lateTime: lateTime,
    //     endTime: endTime,
    //     seatingPlan: seatingPlan,
    //     location: location
    // }

    let lesson = new Lesson(lessonParams);
    console.log(Subject)

    // Check for subjectId and lesson name. If not, add and update subjects list.
    try {
        Lesson.find( {$and:[{name: lessonParams.name},{subjectId: lessonParams.subjectId}]}, function (err, docs) {
            if (!docs.length){
                lesson.save(function (err) {
                    if (err) {
                        return res.status(500).send('Database error'); 
                    }    
                    Subject.findOneAndUpdate( {'_id': lessonParams.subjectId}, {$push: {classes: lesson._id}}, {maxTimeMS: 3000}, function(errSub, docsSub) {
                        if (errSub){
                            return res.status(500).send('Database error');
                        } 
                        return res.status(201).send('lesson saved');
                    });
                    // let docSub = await Subject.findOneAndUpdate( {'_id': lessonParams.subjectId}, {$push: {classes: docs[0]._id}}).maxTimeMS(3000);
                    // console.log(doc)
                    // if (doc) {
                    //     return res.status(201).send('successfully updated subjects'); 
                    // } else {
                    //     return res.status(200).send('Cannot find doc');
                    // }
                });
            } else {                
                return res.status(409).send('Lesson Exists'); 
            }
        });
    }
    catch (err) {
        return res.status(500).send( err ); 
    }
}