const UserCredentials = require('../../database/models/userCredentialsModel');

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

    let user = new UserCredentials({ 
        studentId: studentId,
        name:name,
        password: password,
        email: email,
    });

    try {
        UserCredentials.find( { $or: [{'studentId' : studentId }, {'email': email}]}, function (err, docs) {
            if (!docs.length){
                user.save(function (err) {
                    if (err) {
                        return res.status(500).send('Database error'); 
                    } 
                    return res.status(200).send('successful registration');   
                });
            } else {                
                return res.status(409).send('User Exists'); 
            }
        });
        
    }
    catch{
        return res.status(500).send('server error' ); 
    }
}