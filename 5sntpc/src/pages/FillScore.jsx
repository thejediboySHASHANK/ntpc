import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../context/UserContext.jsx";
import {Link} from "react-router-dom";
import axios from "axios";

const FillScore = () => {
    const {user} = useContext(UserContext)
    const [scores, SetScores] = useState([])
    useEffect(() => {
        axios.get('/5sScores').then(({data}) => {
            SetScores(data.department.zones)
        })
    }, [])

     async function handleDelete (score, subzone) {
        await axios.delete(`/5sScores/`+user.department+'/'+score+'/'+subzone)
         axios.get('/5sScores').then(({ data }) => {
             SetScores(data.department.zones);
         });
    }

    return (
        <div>
            <div className="text-center mt-10">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                      to={!!user ? `/score/` + 'new/' + user.department : '/login'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    Add 5S Score
                </Link>

                <p className="text-md text-gray-300 mt-4 border-b">Your department's subzones and their respective 5S
                    Scores will appear here : </p>

                <div className="mt-4">
                    {scores.length > 0 && scores.map(score => (
                        <div key={score._id} className="border-b mb-4 py-4">
                            <h1 className="text-3xl font-semibold capitalize">{score.name}</h1>
                            {score.subzones.map((subzone) => (
                                <div className="">
                                    <div
                                        className="w-1/2 mx-auto flex justify-between items-center gap-4 bg-gray-100 p-4 rounded-2xl mt-4"
                                        key={subzone._id}
                                    >

                                            <div className="block">
                                                <p className="capitalize text-lg">{subzone.name}</p>
                                                <p className="mt-2 capitalize text-md text-gray-500">Remarks : {subzone.remarks}</p>
                                            </div>

                                        <div className="flex gap-4">
                                            <div
                                                className="mt-2 bg-red-400 hover:bg-red-500 p-2 text-white rounded-2xl md:p-6 cursor-pointer"
                                                onClick={() => handleDelete(score.name, subzone._id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                </svg>
                                                <div className="mt-1">Delete</div>
                                            </div>
                                            <Link
                                                to={!!user ? `/score/`+'new/'+user.department+'/'+score.name+'/'+subzone._id : '/login'}
                                                className="mt-2 bg-gray-400 hover:bg-gray-500 p-2 text-white rounded-2xl md:p-6"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>

                                                <div className="mt-1">Edit Scores</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>




                    ))}

                </div>
            </div>
        </div>
    )
}
export default FillScore

//         <Link to={!!user ? `/score/`+'new/'+user.department+score._id : '/login'}>
//     {score.name}
// </Link>