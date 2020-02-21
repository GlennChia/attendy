const jwt = require('jsonwebtoken');

const User = require('../../database/models/userModel');
const UserSession = require('../../database/models/userSessionModel');
const constants = require('../../../common/constants');

const facultyEmails = constants.facultyEmails;

exports.userSignup = function (req, res) {
    const{body} = req;
    const{ name, password } = body;
    let{ email, userId } = body;

    if(!name || !password || !email || !userId){
        return res.status(400).send('Missing Entry');
    }

    email = email.toLowerCase();
    userId = userId.toUpperCase();

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegexp.test(email)){
        return res.status(400).send("Email incorrect");
    }

    // Check authority: faculty or student 
    var authority = (facultyEmails.includes(email)) ? "faculty" : "student";

    let user = new User({ 
        userId: userId,
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
                        return res.status(200).send({
                            _id: user._id,
                            authority: user.authority, // In case we want multiple screens
                            token: jwttoken
                        });
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