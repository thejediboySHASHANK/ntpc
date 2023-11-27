const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// IMPORTING THE DATABASE MODELS
const User = require('./models/User')
const Score = require('./models/Score')

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'sjhdgsiu293789dbehjwsjkd238e790eyewuwf389r67'


// MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     credentials: true,
//     origin: ' http://192.168.211.1:5173',
// }))

app.use(cors({
    credentials: true,
    origin: ['http://192.168.211.1:5173', 'https://ntpc-eight.vercel.app/',
        'https://ntpc-git-main-thejediboyshashank.vercel.app/', 'https://ntpc-fapu2ld87-thejediboyshashank.vercel.app/', '*'],

}));

mongoose.connect(process.env.MONGO_URL)

app.get('/api/test', (req, res) => {
    res.json('test ok')
})
// j2b7s2InQ4oC8EEG

app.post('/api/register', async (req, res) => {
    const {
        name,
        email,
        empId,
        zoneName,
        zoneLeader,
        department,
        designation,
        password,
    } = req.body
    try {
        const userDoc = await User.create({
            name,
            email,
            empId,
            zoneName,
            zoneLeader,
            department,
            designation,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }
})

app.post('/api/login', async (req, res) => {
    const {empId, password} = req.body;

    const userDoc = await User.findOne({empId})
    console.log(userDoc)
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({
                empId: userDoc.empId,
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err
                res.cookie('token', token).json(userDoc)
            })
        } else {
            // res.json()
            res.status(422).json('password incorrect')
        }
    } else {
        res.status(422).json('EMP ID Not Found, Please Register')
    }
})

app.get('/api/profile', (req, res) => {
    const {token} = req.cookies
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const {name, email, department} = await User.findById(userData.id)
            res.json({name, email, department})
        })
    } else {
        res.json(null)
    }
})

app.post('/api/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

// app.post('/score', async (req, res) => {
//     const { token } = req.cookies;
//     const {
//         department,
//         zone,
//         subzone,
//         jan,
//         feb,
//         mar,
//         apr,
//         may,
//         june,
//         july,
//         aug,
//         sept,
//         oct,
//         nov,
//         dec,
//         remarks
//     } = req.body;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) {
//             throw err;
//         }
//
//         try {
//             const departmentExists = await Score.exists({
//                 'department.name': { $regex: new RegExp('^' + department + '$', 'i') }
//             });
//
//             if (!departmentExists) {
//                 const newDepartment = new Score({
//                     department: {
//                         name: department,
//                         zones: []
//                     }
//                 });
//
//                 await newDepartment.save();
//             }
//
//             const departmentData = await Score.findOne({
//                 'department.name': { $regex: new RegExp('^' + department + '$', 'i') }
//             });
//
//             const zoneExists = departmentData.department.zones.some((z) =>
//                 z.name.replace(/\s/g, '').toLowerCase() === zone.replace(/\s/g, '').toLowerCase()
//             );
//
//             if (!zoneExists) {
//                 departmentData.department.zones.push({
//                     name: zone,
//                     subzones: []
//                 });
//
//                 await departmentData.save();
//             }
//
//             const zoneData = departmentData.department.zones.find((z) =>
//                 z.name.replace(/\s/g, '').toLowerCase() === zone.replace(/\s/g, '').toLowerCase()
//             );
//
//             const subzoneExists = zoneData.subzones.some((s) =>
//                 s.name.replace(/\s/g, '').toLowerCase() === subzone.replace(/\s/g, '').toLowerCase()
//             );
//
//             if (!subzoneExists) {
//                 zoneData.subzones.push({
//                     name: subzone,
//                     modified_by: userData.id,
//                     jan,
//                     feb,
//                     mar,
//                     apr,
//                     may,
//                     june,
//                     july,
//                     aug,
//                     sept,
//                     oct,
//                     nov,
//                     dec,
//                     remarks
//                 });
//
//                 await departmentData.save();
//             }
//
//             res.status(200).json({ message: 'Score data saved successfully.' });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal server error.' });
//         }
//     });
// });

// app.post('/score', async (req, res) => {
//     const { token } = req.cookies;
//     const {
//         department,
//         zone,
//         subzone,
//         year,
//         jan,
//         feb,
//         mar,
//         apr,
//         may,
//         june,
//         july,
//         aug,
//         sept,
//         oct,
//         nov,
//         dec,
//         remarks
//     } = req.body;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) {
//             throw err;
//         }
//
//         try {
//             const departmentExists = await Score.exists({
//                 'department.name': { $regex: new RegExp('^' + department + '$', 'i') }
//             });
//
//             if (!departmentExists) {
//                 const newDepartment = new Score({
//                     department: {
//                         name: department,
//                         zones: []
//                     }
//                 });
//
//                 await newDepartment.save();
//             }
//
//             const departmentData = await Score.findOne({
//                 'department.name': { $regex: new RegExp('^' + department + '$', 'i') }
//             });
//
//             const zoneExists = departmentData.department.zones.some((z) =>
//                 z.name.replace(/\s/g, '').toLowerCase() === zone.replace(/\s/g, '').toLowerCase()
//             );
//
//             if (!zoneExists) {
//                 departmentData.department.zones.push({
//                     name: zone,
//                     subzones: []
//                 });
//
//                 await departmentData.save();
//             }
//
//             const zoneData = departmentData.department.zones.find((z) =>
//                 z.name.replace(/\s/g, '').toLowerCase() === zone.replace(/\s/g, '').toLowerCase()
//             );
//
//             const subzoneExists = zoneData.subzones.some((s) =>
//                 s.name.replace(/\s/g, '').toLowerCase() === subzone.replace(/\s/g, '').toLowerCase()
//             );
//
//             if (!subzoneExists) {
//                 zoneData.subzones.push({
//                     name: subzone,
//                     modified_by: userData.id,
//                     yearlyMonthValues: [
//                         {
//                             year,
//                             monthValues: {
//                                 jan,
//                                 feb,
//                                 mar,
//                                 apr,
//                                 may,
//                                 june,
//                                 july,
//                                 aug,
//                                 sept,
//                                 oct,
//                                 nov,
//                                 dec
//                             }
//                         }
//                     ],
//                     remarks
//                 });
//
//                 await departmentData.save();
//             }
//
//             res.status(200).json({ message: 'Score data saved successfully.' });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal server error.' });
//         }
//     });
// });

app.post('/api/score', async (req, res) => {
    const { token } = req.cookies;
    const {
        department,
        zone,
        subzone,
        year,
        jan,
        feb,
        mar,
        apr,
        may,
        june,
        july,
        aug,
        sept,
        oct,
        nov,
        dec,
        remarks
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }

        try {
            const departmentExists = await Score.exists({
                'department.name': { $regex: new RegExp('^' + department + '$', 'i') }
            });

            if (!departmentExists) {
                const newDepartment = new Score({
                    department: {
                        name: department,
                        zones: []
                    }
                });

                await newDepartment.save();
            }

            const departmentData = await Score.findOne({
                'department.name': { $regex: new RegExp('^' + department + '$', 'i') }
            });

            const zoneExists = departmentData.department.zones.some((z) =>
                z.name.replace(/\s/g, '').toLowerCase() === zone.replace(/\s/g, '').toLowerCase()
            );

            if (!zoneExists) {
                departmentData.department.zones.push({
                    name: zone,
                    subzones: []
                });

                await departmentData.save();
            }

            const zoneData = departmentData.department.zones.find((z) =>
                z.name.replace(/\s/g, '').toLowerCase() === zone.replace(/\s/g, '').toLowerCase()
            );

            const subzoneData = zoneData.subzones.find((s) =>
                s.name.replace(/\s/g, '').toLowerCase() === subzone.replace(/\s/g, '').toLowerCase()
            );

            if (!subzoneData) {
                zoneData.subzones.push({
                    name: subzone,
                    modified_by: userData.id,
                    yearlyMonthValues: [
                        {
                            year,
                            monthValues: {
                                jan,
                                feb,
                                mar,
                                apr,
                                may,
                                june,
                                july,
                                aug,
                                sept,
                                oct,
                                nov,
                                dec
                            }
                        }
                    ],
                    remarks
                });

                await departmentData.save();

                res.status(200).json({ message: 'Score data saved successfully.' });
            } else {
                const yearExists = subzoneData.yearlyMonthValues.some((yearData) => yearData.year === year);

                if (yearExists) {
                    res.status(409).json({ error: 'Year already exists.' });
                    return;
                }

                subzoneData.yearlyMonthValues.push({
                    year,
                    monthValues: {
                        jan,
                        feb,
                        mar,
                        apr,
                        may,
                        june,
                        july,
                        aug,
                        sept,
                        oct,
                        nov,
                        dec
                    }
                });

                await departmentData.save();

                res.status(200).json({ message: 'Score data saved successfully.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    });
});






app.get('/api/5sScores', (req, res) => {
    const {token} = req.cookies
    jwt.verify (token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }


        try {
            const {department} = await User.findById(userData.id)
            const score = await Score.findOne({ 'department.name': department }).exec();
            if (!score) {
                res.status(404).json({ error: 'Department not found' });
                return;
            }

            res.json(score);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    })
})

app.get('/api/5sScores/:year', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        try {
            const { department } = await User.findById(userData.id);
            const score = await Score.findOne({ 'department.name': department }).exec();
            if (!score) {
                res.status(404).json({ error: 'Department not found' });
                return;
            }

            const { year } = req.params;

            const subzoneData = score.department.zones.flatMap((zone) => zone.subzones);
            const yearlyMonthValues = subzoneData.flatMap((subzone) =>
                subzone.yearlyMonthValues.filter((yearData) => yearData.year === Number(year))
            );

            res.json(yearlyMonthValues);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});



app.get('/api/5sScores/:department/:zoneName/:id', async (req, res) => {
    const { department, zoneName, id } = req.params;

    try {
        const score = await Score.findOne({
            'department.name': { $regex: new RegExp('^' + department + '$', 'i') },
            'department.zones': {
                $elemMatch: {
                    name: { $regex: new RegExp('^' + zoneName + '$', 'i') },
                    subzones: {
                        $elemMatch: {
                            _id: id
                        }
                    }
                }
            }
        });

        if (!score) {
            res.status(404).json({ error: 'Score not found' });
            return;
        }

        let subzone;
        score.department.zones.forEach((zone) => {
            const foundSubzone = zone.subzones.find((s) => s._id.toString() === id);
            if (foundSubzone) {
                subzone = foundSubzone;
            }
        });

        if (!subzone) {
            res.status(404).json({ error: 'Subzone not found' });
            return;
        }

        res.json(subzone);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// app.put('/score', async (req, res) => {
//     const {
//         department,
//         zone,
//         subzone,
//         jan,
//         feb,
//         mar,
//         apr,
//         may,
//         june,
//         july,
//         aug,
//         sept,
//         oct,
//         nov,
//         dec,
//         remarks
//     } = req.body;
//
//     try {
//         const departmentData = await Score.findOne({
//             'department.name': { $regex: new RegExp('^' + department + '$', 'i') }
//         });
//
//         if (!departmentData) {
//             res.status(404).json({ error: 'Department not found' });
//             return;
//         }
//
//         const zoneData = departmentData.department.zones.find(
//             (z) => z.name.toLowerCase() === zone.toLowerCase()
//         );
//
//         if (!zoneData) {
//             res.status(404).json({ error: 'Zone not found' });
//             return;
//         }
//
//         const subzoneData = zoneData.subzones.find(
//             (s) => s.name.toLowerCase() === subzone.toLowerCase()
//         );
//
//         if (!subzoneData) {
//             res.status(404).json({ error: 'Subzone not found' });
//             return;
//         }
//
//         subzoneData.jan = jan;
//         subzoneData.feb = feb;
//         subzoneData.mar = mar;
//         subzoneData.apr = apr;
//         subzoneData.may = may;
//         subzoneData.june = june;
//         subzoneData.july = july;
//         subzoneData.aug = aug;
//         subzoneData.sept = sept;
//         subzoneData.oct = oct;
//         subzoneData.nov = nov;
//         subzoneData.dec = dec;
//         subzoneData.remarks = remarks;
//
//         await departmentData.save();
//
//         res.status(200).json({ message: 'Score data updated successfully.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });

// app.put('/score', async (req, res) => {
//     const {
//         department,
//         zone,
//         subzone,
//         jan,
//         feb,
//         mar,
//         apr,
//         may,
//         june,
//         july,
//         aug,
//         sept,
//         oct,
//         nov,
//         dec,
//         remarks
//     } = req.body;
//
//     try {
//         const departmentData = await Score.findOne({
//             'department.name': { $regex: new RegExp('^' + department + '$', 'i') }
//         });
//
//         if (!departmentData) {
//             res.status(404).json({ error: 'Department not found' });
//             return;
//         }
//
//         const zoneData = departmentData.department.zones.find(
//             (z) => z.name.replace(/\s/g, '').toLowerCase() === zone.replace(/\s/g, '').toLowerCase()
//         );
//
//         if (!zoneData) {
//             res.status(404).json({ error: 'Zone not found' });
//             return;
//         }
//
//         const subzoneData = zoneData.subzones.find(
//             (s) => s.name.replace(/\s/g, '').toLowerCase() === subzone.replace(/\s/g, '').toLowerCase()
//         );
//
//         if (!subzoneData) {
//             res.status(404).json({ error: 'Subzone not found' });
//             return;
//         }
//
//         subzoneData.jan = jan;
//         subzoneData.feb = feb;
//         subzoneData.mar = mar;
//         subzoneData.apr = apr;
//         subzoneData.may = may;
//         subzoneData.june = june;
//         subzoneData.july = july;
//         subzoneData.aug = aug;
//         subzoneData.sept = sept;
//         subzoneData.oct = oct;
//         subzoneData.nov = nov;
//         subzoneData.dec = dec;
//         subzoneData.remarks = remarks;
//
//         await departmentData.save();
//
//         res.status(200).json({ message: 'Score data updated successfully.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });

app.put('/api/score', async (req, res) => {
    const {
        department,
        zone,
        subzone,
        year,
        jan,
        feb,
        mar,
        apr,
        may,
        june,
        july,
        aug,
        sept,
        oct,
        nov,
        dec,
        remarks
    } = req.body;

    try {
        const departmentData = await Score.findOne({
            'department.name': { $regex: new RegExp('^' + department + '$', 'i') }
        });

        if (!departmentData) {
            res.status(404).json({ error: 'Department not found' });
            return;
        }

        const zoneData = departmentData.department.zones.find(
            (z) => z.name.replace(/\s/g, '').toLowerCase() === zone.replace(/\s/g, '').toLowerCase()
        );

        if (!zoneData) {
            res.status(404).json({ error: 'Zone not found' });
            return;
        }

        const subzoneData = zoneData.subzones.find(
            (s) => s.name.replace(/\s/g, '').toLowerCase() === subzone.replace(/\s/g, '').toLowerCase()
        );

        if (!subzoneData) {
            res.status(404).json({ error: 'Subzone not found' });
            return;
        }

        const yearIndex = subzoneData.yearlyMonthValues.findIndex((yearData) => yearData.year === year);

        if (yearIndex !== -1) {
            // Year data exists, update the month values and remarks
            const yearData = subzoneData.yearlyMonthValues[yearIndex];
            yearData.monthValues = {
                jan,
                feb,
                mar,
                apr,
                may,
                june,
                july,
                aug,
                sept,
                oct,
                nov,
                dec
            };
            subzoneData.remarks = remarks;
        }

        await departmentData.save();

        res.status(200).json({ message: 'Score data updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});




// app.delete('/5sScores/:department/:zoneName/:id', async (req, res) => {
//     const { department, zoneName, id } = req.params;
//
//     try {
//         const score = await Score.findOne({
//             'department.name': { $regex: new RegExp('^' + department + '$', 'i') },
//             'department.zones': {
//                 $elemMatch: {
//                     name: { $regex: new RegExp('^' + zoneName + '$', 'i') },
//                     subzones: {
//                         $elemMatch: {
//                             _id: id
//                         }
//                     }
//                 }
//             }
//         });
//
//         if (!score) {
//             res.status(404).json({ error: 'Score not found' });
//             return;
//         }
//
//         let subzone;
//         let zoneIndex;
//         let subzoneIndex;
//
//         score.department.zones.forEach((zone, index) => {
//             const foundSubzoneIndex = zone.subzones.findIndex((s) => s._id.toString() === id);
//             if (foundSubzoneIndex !== -1) {
//                 subzone = zone.subzones[foundSubzoneIndex];
//                 zoneIndex = index;
//                 subzoneIndex = foundSubzoneIndex;
//             }
//         });
//
//         if (!subzone) {
//             res.status(404).json({ error: 'Subzone not found' });
//             return;
//         }
//
//         // Remove the subzone from the zone's subzones array
//         score.department.zones[zoneIndex].subzones.splice(subzoneIndex, 1);
//
//         // Save the updated score
//         await score.save();
//
//         res.json({ message: 'Subzone deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

app.delete('/api/5sScores/:department/:zoneName/:id', async (req, res) => {
    const { department, zoneName, id } = req.params;

    try {
        const score = await Score.findOne({
            'department.name': { $regex: new RegExp('^' + department + '$', 'i') },
            'department.zones': {
                $elemMatch: {
                    name: { $regex: new RegExp('^' + zoneName + '$', 'i') },
                    subzones: {
                        $elemMatch: {
                            _id: id
                        }
                    }
                }
            }
        });

        if (!score) {
            res.status(404).json({ error: 'Score not found' });
            return;
        }

        let subzone;
        let zoneIndex;
        let subzoneIndex;

        score.department.zones.forEach((zone, index) => {
            const foundSubzoneIndex = zone.subzones.findIndex((s) => s._id.toString() === id);
            if (foundSubzoneIndex !== -1) {
                subzone = zone.subzones[foundSubzoneIndex];
                zoneIndex = index;
                subzoneIndex = foundSubzoneIndex;
            }
        });

        if (!subzone) {
            res.status(404).json({ error: 'Subzone not found' });
            return;
        }

        // Remove the subzone from the zone's subzones array
        score.department.zones[zoneIndex].subzones.splice(subzoneIndex, 1);

        // Check if the zone's subzones array is empty
        if (score.department.zones[zoneIndex].subzones.length === 0) {
            // Remove the zone from the department's zones array
            score.department.zones.splice(zoneIndex, 1);
        }

        // Save the updated score
        await score.save();

        res.json({ message: 'Subzone deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





app.listen(4000)
