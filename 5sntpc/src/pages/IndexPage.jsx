import React, {useContext, useState} from 'react'
import Image1 from "../assets/ntpc_vin.jpg"
import Video from "../assets/Home NTPC Limited (1).mp4"
import {Link, Navigate} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import Swal from "sweetalert2";

const IndexPage = () => {
    const [view, setView] = useState(false)
    const [score, setScore] = useState(false)
    const {user} = useContext(UserContext)

    if (view) {
        return <Navigate to="/view" />
    }
    if (score) {
        if (user) {
            return <Navigate to={`/score/`+user.department}/>
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Login is required to modify 5S Scores'
            })
            return <Navigate to="/login"/>
        }
    }

    return (
        <div>
            <div className="p-0">
                {/*<img src={Image1} className="h-[400px] w-full object-cover object-center rounded-2xl mt-4" />*/}
                <video
                    className="w-full object-cover object-center overflow-hidden"
                    style={{height: '100vh', position: "absolute", top: '0', left: '0', zIndex: "-1", filter: 'brightness(80%)'}}
                    autoPlay
                    loop
                    muted
                >
                    <source src={Video} type="video/mp4"/>
                    {/* Fallback content if video is not supported */}
                    <div className="h-screen w-full bg-gray-300">
                    </div>
                </video>
            </div>
            <div className="" style={{marginTop: "20vh"}}>
                <div className="">

                    <div className="grow flex items-center justify-around p-4">
                        <div className="block">
                            <h1 className="text-white font-extrabold text-6xl">VIEW 5S SCORE <br/> AND <span className="underline">GRAPH</span></h1>

                                <p className="text-white text-lg w-2/3 p-4 rounded-2xl mt-16  hover:bg-[#007DC6]">
                                    Gain valuable insights into your organization's 5S implementation by exploring the 5S Score and Graph.
                                    Monitor your progress, identify areas for improvement, and track the success of your
                                    continuous improvement efforts.
                                </p>
                            <div className="w-1/2 mt-12 flex gap-8">
                                <button onClick={() => setView(true)} className="bg-primary p-2 w-1/2 text-white rounded-2xl hover:font-semibold">View</button>
                                <button onClick={() => setScore(true)} className="bg-primary p-2 w-1/2 text-white rounded-2xl hover:font-semibold">Fill 5S Score</button>
                            </div>
                        </div>
                    </div>

                    {/*<div className="grow flex items-center justify-around">*/}
                    {/*    <div className="block">*/}
                    {/*        <h1 className="text-white font-extrabold text-5xl">FILL 5S SCORE</h1>*/}

                    {/*        <p className="text-white text-lg w-3/4 mt-4 border border-white rounded-2xl p-4 hover:bg-[#007DC6]">*/}
                    {/*            Evaluating your workspace against the 5S principles helps create an organized, efficient,*/}
                    {/*            and safe environment. Fill out the 5S Score assessment form and gain a comprehensive*/}
                    {/*            understanding of your workplace's current state.*/}
                    {/*        </p>*/}
                    {/*        <div className="w-1/2 mt-8">*/}
                    {/*            <button className="primary hover:font-semibold">Fill 5S Score</button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>
        </div>
    )
}
export default IndexPage
