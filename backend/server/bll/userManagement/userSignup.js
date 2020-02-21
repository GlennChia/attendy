const User = require('../../database/models/userModel');
const constants = require('../../../common/constants');

const facultyEmails = constants.facultyEmails;

exports.userSignup = function (req, res) {
    const{body} = req;
    const{ name, password } = body;
    let{ email, studentId } = body;

    if(!name || !password || !email || !studentId){
        return res.status(400).send('Missing Entry');
    }

    email = email.toLowerCase();
    studentId = studentId.toUpperCase();

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegexp.test(email)){
        return res.status(400).send("Email incorrect");
    }

    // Check authority: faculty or student 
    var authority = (facultyEmails.includes(email)) ? "faculty" : "student";

    let user = new User({ 
        studentId: studentId,
        name:name,
        password: password,
        email: email,
        authority: authority,
        subjects: constants.subjectsDefault
    });

    try {
        User.find( { $or: [{'studentId' : studentId }, {'email': email}]}, function (err, docs) {
            if (!docs.length){
                user.save(function (err) {
                    if (err) {
                        return res.status(500).send('Database error'); 
                    } 
                    return res.status(200).send(user);   
                });
            } else {                
                return res.status(409).send('User Exists'); 
            }
        });
        
    }
    catch (err) {
        return res.status(500).send( err ); 
    }
}