const Subject = require('../../database/models/subjectModel');


exports.subjectCreation = function (req, res) {
    const{ body } = req;
    const{ name, classes } = body;  // if the field are not there in the body, it would default to ''

    if(!name){
        return res.status(400).send('Missing name');
    }

    let subject = new Subject({ 
        name:name,
        classes: classes
    });

    try {
        Subject.find( {'name' : name }, function (err, docs) {
            if (!docs.length){
                subject.save(function (err) {
                    if (err) {
                        return res.status(500).send('Database error'); 
                    }    
                    return res.status(201).send(subject);
                });
            } else {                
                return res.status(409).send('Subject Exists'); 
            }
        });
    }
    catch (err) {
        return res.status(500).send( err ); 
    }
}