const jwt = require('jsonwebtoken');

const User = require('../../database/models/userModel');
const UserSession = require('../../database/models/userSessionModel');
const Attendance = require('../../database/models/attendanceModel');
const constants = require('../../../common/constants');

const facultyEmails = constants.facultyEmails;

exports.userSignup = function (req, res) {
    const{body} = req;
    const{ password, berkeleyId } = body;
    let{ name, email, userId } = body;

    if(!name || !password || !email || !userId){
        return res.status(400).send('Missing Entry');
    }

    email = email.toLowerCase();
    userId = userId.toUpperCase();
    name = name.toLowerCase();

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegexp.test(email)){
        return res.status(400).send("Email incorrect");
    }

    // Check authority: faculty or student 
    var authority = (facultyEmails.includes(email)) ? "faculty" : "student";

    let user = new User({ 
        userId: userId,
        berkeleyId: berkeleyId,
        name:name,
        email: email,
        authority: authority,
        subjects: constants.subjectsDefault
    });

    user.password = user.generateHash(password);

    try {
        User.find( { $or: [{'userId' : userId }, {'email': email}]}, function (err, docs) {
            if (!docs.length){
                user.save(function (err) {
                    if (err) {
                        return res.status(500).send('Database error'); 
                    }    
                    let jwttoken = jwt.sign({userId: userId}, process.env.JWT_KEY,{ expiresIn: '24h'});
                    // Create userSession 
                    let userSession = new UserSession({
                        userId: userId,
                        token: jwttoken
                    })
                    userSession.save(function (err) {
                        if (err) {
                            return res.status(500).send('Database error'); 
                        }  
                        // if the authority is student then we can create the attendance
                        if (authority == 'student'){
                            // For convenience add the classes
                            let attendanceFormatted = [];
                            for (i = 0; i < constants.lessonsDefault.lessons.length; i++) {
                                //let className = constants.lessonsDefault.lessons[i];
                                attendanceFormatted.push(                               
                                    new Attendance({
                                        subjectName: constants.lessonsDefault[constants.lessonsDefault.lessons[i]].subjectName,
                                        lessonName: `class ${i+1}`,
                                        userName: name,
                                        berkeleyId: berkeleyId,
                                        userId: userId,
                                    })
                                );
                            }
                            Attendance.insertMany(attendanceFormatted, function (err, docs) {
                                if (err){
                                    return res.status(500).send( err ); 
                                } else {                
                                    return res.status(200).send({
                                        userId: userId,
                                        authority: user.authority, // In case we want multiple screens
                                        token: jwttoken
                                    });
                                }
                            });  
                        } else {
                            return res.status(200).send({
                                userId: userId,
                                authority: user.authority, // In case we want multiple screens
                                token: jwttoken
                            });
                        }           
                    });
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