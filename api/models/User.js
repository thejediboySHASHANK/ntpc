const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new mongoose.Schema({
    name: String,
    email : {type: String, unique: true},
    // username: {type: String, unique: true},
    empId: {type: Number, unique: true},
    zoneName: String,
    zoneLeader: String,
    department: {
        type: String,
        enum: ['Ash Handling', 'Ash Dyke Management', 'Boiler Maintenance', 'Civil Maintenance', 'Electrical Maintenance', 'C&I', 'FGD', 'FQA',
            'IT', 'EDC', 'RLI', 'CHP', 'MGR', 'Chemistry', 'Operation', 'Offsite Maintenance', 'TMD', 'EEMG', 'EMG', 'MTP', 'FM', 'C&M',
            'Finance', 'Store', 'Workshop', 'TS', 'HR', 'Erection', 'TAD', 'Medical']
    },
    designation: {
        type: String,
        enum: ['Assistant Engineer','Engr (Engineer)', 'Sr. Engineer', 'Dy.Manager', 'Manager', 'Sr. Manager', 'DGM', 'AGM', 'GM',
            'Medical Officer', 'Sr. Medical Officer']
    },
    password: String,
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel