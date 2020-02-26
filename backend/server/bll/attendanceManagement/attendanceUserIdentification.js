const User = require('../../database/models/userModel');
    
exports.attendanceUserIdentification = function (req, res) {
    const berkeleyId  = req.query.berkeleyId;
    let userName = req.query.userName;
    userName = userName.toUpperCase();

    try {
        User.find({$or:[{name: userName}, {berkeleyId: berkeleyId}]}, function(errUser, docUser){
            if(docUser.length){
                return res.status(200).send(docUser[0]);
            } else if (errUser){
                return res.status(500).send(errUser);
            } else {
                User.fuzzySearch(userName, function(errUser2, docUser2){
                    if(docUser2.length){
                        console.log(docUser2)
                        return res.status(200).send({
                            userId: docUser2[0].userId,
                            userName: docUser2[0].name
                        });
                    } else if (errUser2){
                        return res.status(500).send(err)
                    } else {
                        return res.status(409).send('user not found')
                    }
                });
            }
        });
    }
    catch (err) {
        return res.status(500).send(err); 
    }
}