const facultyEmails = ['b.reyes@berkeley.edu', 's.t@berkeley.edu', 'glenn_chia@mymail.sutd.edu.sg'];

const subjectName = 'Entrepreneurial Leadership'
const subjectsDefault = [subjectName];

const lessonsDefault = {
    'lessons': ['class 1', 'class 2', 'class 3', 'class 4', 'class 5'],
    'class 1': {
        'name': 'class 1',
        'subjectName': subjectName,
        'classDate': '28 February 2020',
        'status': 'closed',  // closed, opened, late, finished
    },
    'class 2': {
        'name': 'class 2',
        'subjectName': subjectName,
        'classDate': '6 March 2020',
        'status': 'closed',
    },
    'class 3': {
        'name': 'class 3',
        'subjectName': subjectName,
        'classDate': '13 March 2020',
        'status': 'closed',
    },
    'class 4': {
        'name': 'class 4',
        'subjectName': subjectName,
        'classDate': '3 April 2020',
        'status': 'closed',
    },
    'class 5': {
        'name': 'class 5',
        'subjectName': subjectName,
        'classDate': '10 April 2020',
        'status': 'closed',
    },

}

module.exports = {
    facultyEmails,
    subjectsDefault,
    lessonsDefault
}