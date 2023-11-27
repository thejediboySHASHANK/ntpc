// import React, {useEffect, useState} from 'react'
// import {Navigate, useParams} from "react-router-dom";
// import axios from "axios";
//
// const FillFormPage = () => {
//     const {id} = useParams()
//     const {department} = useParams()
//     const {zoneName} = useParams()
//     const [zone, setZone] = useState('')
//     const [subzone, setSubZone] = useState('')
//     const [jan, setJan] = useState(0)
//     const [feb, setFeb] = useState(0)
//     const [mar, setMar] = useState(0)
//     const [apr, setApr] = useState(0)
//     const [may, setMay] = useState(0)
//     const [june, setJune] = useState(0)
//     const [july, setJuly] = useState(0)
//     const [aug, setAug] = useState(0)
//     const [sept, setSept] = useState(0)
//     const [oct, setOct] = useState(0)
//     const [nov, setNov] = useState(0)
//     const [dec, setDec] = useState(0)
//     const [year, setYear] = useState(new Date().getFullYear());
//
//
//     const [redirect, setRedirect] = useState(false)
//
//     const [remarks, setRemarks] = useState('')
//
//     useEffect(() => {
//         if (!id) {
//             return;
//         }
//         axios.get('/5sScores/' + department + '/' + zoneName + '/' + id)
//             .then(res => {
//                 const { data } = res;
//                 setZone(zoneName);
//                 setSubZone(data.name);
//                 setRemarks(data.remarks);
//
//                 // Find the index of the current year
//                 const currentYear = year;
//                 const currentIndex = data.yearlyMonthValues.findIndex(
//                     yearData => Number(yearData.year) === Number(currentYear)
//                 );
//
//                 // Accessing the month values for the current year
//                 if (currentIndex !== -1) {
//                     const currentYearData = data.yearlyMonthValues[currentIndex];
//                     setJan(currentYearData.monthValues.jan);
//                     setFeb(currentYearData.monthValues.feb);
//                     setMar(currentYearData.monthValues.mar);
//                     setApr(currentYearData.monthValues.apr);
//                     setMay(currentYearData.monthValues.may);
//                     setJune(currentYearData.monthValues.june);
//                     setJuly(currentYearData.monthValues.july);
//                     setAug(currentYearData.monthValues.aug);
//                     setSept(currentYearData.monthValues.sept);
//                     setOct(currentYearData.monthValues.oct);
//                     setNov(currentYearData.monthValues.nov);
//                     setDec(currentYearData.monthValues.dec);
//                 } else {
//                     console.log(`No data found for the year ${currentYear}.`);
//                 }
//             })
//             .catch(error => {
//                 console.error(error);
//                 // Handle error if necessary
//             });
//     }, [id, year]);
//
//
//
//     function inputHeader(text) {
//         return (
//             <h2 className="text-2xl mt-4">{text}</h2>
//         )
//     }
//
//     function inputDescription(text) {
//         return (
//             <p className="text-gray-500 text-sm">{text}</p>
//         )
//     }
//
//     function preInput(header, description) {
//         return (
//             <>
//                 {inputHeader(header)}
//                 {inputDescription(description)}
//             </>
//         )
//     }
//
//     async function SavePlace(ev) {
//         ev.preventDefault()
//         const data = {
//             department, zone, subzone, jan, feb, mar, apr, may, june, july, aug, sept, oct, nov, dec, remarks, year
//         }
//         if (id) {
//             await axios.put('/score', data)
//             setRedirect(true)
//         } else {
//             await axios.post('/score', data)
//             setRedirect(true)
//         }
//     }
//
//     function renderYearInput() {
//         const currentYear = new Date().getFullYear();
//         const maxYear = currentYear + 1; // Allow selection of current year and one year ahead
//         const minYear = currentYear - 3; // Allow selection of 3 years in the past
//
//         const yearOptions = [];
//         for (let year = minYear; year <= maxYear; year++) {
//             yearOptions.push(
//                 <option key={year} value={year}>
//                     {year}
//                 </option>
//             );
//         }
//
//         return (
//             <div className="p-4">
//                 <p className="text-md mt-4 ml-1 mx-auto">Select Year</p>
//                 <select
//                     value={year}
//                     onChange={(ev) => setYear(ev.target.value)}
//                     className="w-1/2 border border-gray-300 bg-gray-50 my-2 py-2 px-2 rounded-2xl focus:bg-white"
//                 >
//                     {yearOptions}
//                 </select>
//             </div>
//         );
//     }
//
//
//
//     if (redirect) {
//         return <Navigate to={`/score/`+department} />
//     }
//
//     return (
//         <div className="mx-auto w-1/2">
//             <form onSubmit={SavePlace}>
//                 {preInput('Zone', 'Please Enter zonename of your department')}
//                 <input type="text" value={zone} onChange={ev => setZone(ev.target.value)}
//                        placeholder="eg : zone1"/>
//                 {preInput('SubZone', 'Please Enter subzone under your zone')}
//                 <input type="text" value={subzone} onChange={ev => setSubZone(ev.target.value)}
//                        placeholder="eg : Subzone1"/>
//
//                 <div className="border p-2 rounded-2xl mt-2">
//                     {preInput('5S Scores', 'Please Enter/Modify respective monthly 5S Scores out of 100%')}
//
//                     {renderYearInput()}
//
//                     <div className="flex flex-col-4 gap-4 mt-4 p-4">
//                         <div className="block">
//                             <p className="items-center text-center">Jan</p>
//                             <input type="number" value={jan} onChange={ev => setJan(ev.target.value)}/>
//                         </div>
//                         <div className="block">
//                             <p className="items-center text-center">Feb</p>
//                             <input type="number" value={feb} onChange={ev => setFeb(ev.target.value)}/>
//                         </div>
//                         <div className="block">
//                             <p className="items-center text-center">March</p>
//                             <input type="number" value={mar} onChange={ev => setMar(ev.target.value)}/>
//                         </div>
//                         <div className="block">
//                             <p className="items-center text-center">April</p>
//                             <input type="number" value={apr} onChange={ev => setApr(ev.target.value)}/>
//                         </div>
//                     </div>
//
//                     <div className="flex flex-col-4 gap-4 p-4">
//                         <div className="block">
//                             <p className="items-center text-center">May</p>
//                             <input type="number" value={may} onChange={ev => setMay(ev.target.value)}/>
//                         </div>
//                         <div className="block">
//                             <p className="items-center text-center">Jun</p>
//                             <input type="number" value={june} onChange={ev => setJune(ev.target.value)}/>
//                         </div>
//                         <div className="block">
//                             <p className="items-center text-center">July</p>
//                             <input type="number" value={july} onChange={ev => setJuly(ev.target.value)}/>
//                         </div>
//                         <div className="block">
//                             <p className="items-center text-center">Aug</p>
//                             <input type="number" value={aug} onChange={ev => setAug(ev.target.value)}/>
//                         </div>
//                     </div>
//
//                     <div className="flex flex-col-4 gap-4 p-4">
//                         <div className="block">
//                             <p className="items-center text-center">Sept</p>
//                             <input type="number" value={sept} onChange={ev => setSept(ev.target.value)}/>
//                         </div>
//                         <div className="block">
//                             <p className="items-center text-center">Oct</p>
//                             <input type="number" value={oct} onChange={ev => setOct(ev.target.value)}/>
//                         </div>
//                         <div className="block">
//                             <p className="items-center text-center">Nov</p>
//                             <input type="number" value={nov} onChange={ev => setNov(ev.target.value)}/>
//                         </div>
//                         <div className="block">
//                             <p className="items-center text-center">Dec</p>
//                             <input type="number" value={dec} onChange={ev => setDec(ev.target.value)}/>
//                         </div>
//                     </div>
//                 </div>
//
//                 {preInput('Remarks', 'Add any remarks here, if required')}
//                 <textarea className="w-full rounded-2xl border" value={remarks}
//                           onChange={ev => setRemarks(ev.target.value)}/>
//
//                 <button className="primary my-4">Save</button>
//
//
//             </form>
//         </div>
//     )
// }
// export default FillFormPage


import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FillFormPage = () => {
    const { id } = useParams();
    const { department } = useParams();
    const { zoneName } = useParams();
    const [zone, setZone] = useState('');
    const [subzone, setSubZone] = useState('');
    const [jan, setJan] = useState(0);
    const [feb, setFeb] = useState(0);
    const [mar, setMar] = useState(0);
    const [apr, setApr] = useState(0);
    const [may, setMay] = useState(0);
    const [june, setJune] = useState(0);
    const [july, setJuly] = useState(0);
    const [aug, setAug] = useState(0);
    const [sept, setSept] = useState(0);
    const [oct, setOct] = useState(0);
    const [nov, setNov] = useState(0);
    const [dec, setDec] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());

    const [redirect, setRedirect] = useState(false);

    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        if (!id) {
            return;
        }
        axios
            .get('/5sScores/' + department + '/' + zoneName + '/' + id)
            .then((res) => {
                const { data } = res;
                setZone(zoneName);
                setSubZone(data.name);
                setRemarks(data.remarks);

                // Find the index of the current year
                const currentYear = year;
                const currentIndex = data.yearlyMonthValues.findIndex(
                    (yearData) => Number(yearData.year) === Number(currentYear)
                );

                // Accessing the month values for the current year
                if (currentIndex !== -1) {
                    const currentYearData = data.yearlyMonthValues[currentIndex];
                    setJan(currentYearData.monthValues.jan);
                    setFeb(currentYearData.monthValues.feb);
                    setMar(currentYearData.monthValues.mar);
                    setApr(currentYearData.monthValues.apr);
                    setMay(currentYearData.monthValues.may);
                    setJune(currentYearData.monthValues.june);
                    setJuly(currentYearData.monthValues.july);
                    setAug(currentYearData.monthValues.aug);
                    setSept(currentYearData.monthValues.sept);
                    setOct(currentYearData.monthValues.oct);
                    setNov(currentYearData.monthValues.nov);
                    setDec(currentYearData.monthValues.dec);
                } else {
                    console.log(`No data found for the year ${currentYear}.`);
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle error if necessary
            });
    }, [id, year]);

    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    }

    function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>;
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function SavePlace(ev) {
        ev.preventDefault();
        const data = {
            department,
            zone,
            subzone,
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
            remarks,
            year,
        };
        if (id) {
            await axios.put('/score', data);
            setRedirect(true);
        } else {
            await axios.post('/score', data);
            setRedirect(true);
        }
    }

    function renderYearInput() {
        const currentYear = new Date().getFullYear();
        const maxYear = currentYear + 1; // Allow selection of current year and one year ahead
        const minYear = currentYear - 3; // Allow selection of 3 years in the past

        const yearOptions = [];
        for (let year = minYear; year <= maxYear; year++) {
            yearOptions.push(
                <option key={year} value={year}>
                    {year}
                </option>
            );
        }

        return (
            <div className="p-4">
                <p className="text-md mt-4 ml-1 mx-auto">Select Year</p>
                <select
                    value={year}
                    onChange={(ev) => setYear(ev.target.value)}
                    className="w-1/2 border border-gray-300 bg-gray-50 my-2 py-2 px-2 rounded-2xl focus:bg-white"
                >
                    {yearOptions}
                </select>
            </div>
        );
    }

    if (redirect) {
        return <Navigate to={`/score/` + department} />;
    }

    const currentYear = new Date().getFullYear();

    return (
        <div className="mx-auto w-1/2">
            <form onSubmit={SavePlace}>
                {preInput('Zone', 'Please Enter zonename of your department')}
                <input
                    type="text"
                    value={zone}
                    onChange={(ev) => setZone(ev.target.value)}
                    placeholder="eg : zone1"
                    disabled={year < currentYear || id !== undefined}
                />
                {preInput('SubZone', 'Please Enter subzone under your zone')}
                <input
                    type="text"
                    value={subzone}
                    onChange={(ev) => setSubZone(ev.target.value)}
                    placeholder="eg : Subzone1"
                    disabled={year < currentYear || id !== undefined}
                />

                <div className="border p-2 rounded-2xl mt-2">
                    {preInput('5S Scores', 'Please Enter/Modify respective monthly 5S Scores out of 100%')}

                    {renderYearInput()}

                    <div className="flex flex-col-4 gap-4 mt-4 p-4">
                        <div className="block">
                            <p className="items-center text-center">Jan</p>
                            <input
                                type="number"
                                value={jan}
                                onChange={(ev) => setJan(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                        <div className="block">
                            <p className="items-center text-center">Feb</p>
                            <input
                                type="number"
                                value={feb}
                                onChange={(ev) => setFeb(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                        <div className="block">
                            <p className="items-center text-center">March</p>
                            <input
                                type="number"
                                value={mar}
                                onChange={(ev) => setMar(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                        <div className="block">
                            <p className="items-center text-center">April</p>
                            <input
                                type="number"
                                value={apr}
                                onChange={(ev) => setApr(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-4 gap-4 p-4">
                        <div className="block">
                            <p className="items-center text-center">May</p>
                            <input
                                type="number"
                                value={may}
                                onChange={(ev) => setMay(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                        <div className="block">
                            <p className="items-center text-center">Jun</p>
                            <input
                                type="number"
                                value={june}
                                onChange={(ev) => setJune(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                        <div className="block">
                            <p className="items-center text-center">July</p>
                            <input
                                type="number"
                                value={july}
                                onChange={(ev) => setJuly(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                        <div className="block">
                            <p className="items-center text-center">Aug</p>
                            <input
                                type="number"
                                value={aug}
                                onChange={(ev) => setAug(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-4 gap-4 p-4">
                        <div className="block">
                            <p className="items-center text-center">Sept</p>
                            <input
                                type="number"
                                value={sept}
                                onChange={(ev) => setSept(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                        <div className="block">
                            <p className="items-center text-center">Oct</p>
                            <input
                                type="number"
                                value={oct}
                                onChange={(ev) => setOct(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                        <div className="block">
                            <p className="items-center text-center">Nov</p>
                            <input
                                type="number"
                                value={nov}
                                onChange={(ev) => setNov(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                        <div className="block">
                            <p className="items-center text-center">Dec</p>
                            <input
                                type="number"
                                value={dec}
                                onChange={(ev) => setDec(ev.target.value)}
                                disabled={year < currentYear}
                            />
                        </div>
                    </div>
                </div>

                {preInput('Remarks', 'Add any remarks here, if required')}
                <textarea
                    className="w-full rounded-2xl border"
                    value={remarks}
                    onChange={(ev) => setRemarks(ev.target.value)}
                />

                <button className="primary my-4">Save</button>
            </form>
        </div>
    );
};

export default FillFormPage;
