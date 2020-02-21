const jwt = require('jsonwebtoken');

const User = require('../../database/models/userModel');
const UserSession = require('../../database/models/userSessionModel');
const constants = require('../../../common/constants');

exports.userLogin = function (req, res) {
    const{ userId, password } = req.query;

    if( !password || !userId ){
        return res.status(400).send('Missing Entry');
    }

    try {
        User.find( {'userId' : userId }, function (err, docs) {
            if (docs.length){
                if(!docs[0].validPassword(password)){
                    return res.status(403).send('Invalid password'); 
                  }
                let jwttoken = jwt.sign({userId: userId}, process.env.JWT_KEY,{ expiresIn: '24h'});
                let userSession = new UserSession({
                    userId: docs[0].userId,
                    token: jwttoken
                });
                userSession.save(function (err) {
                    if (err) {
                        return res.status(500).send('Database error'); 
                    }  
                    return res.status(200).send({
                        _id: docs[0]._id,  // This is the mongo created ID
                        token: jwttoken
                    });
                });
            } else if (err) {
                return res.status(500).send('Database error'); 
            } else {                
                return res.status(409).send('User Does not Exist'); 
            }
        });
        
    }
    catch (err) {
        return res.status(500).send( err ); 
    }
}