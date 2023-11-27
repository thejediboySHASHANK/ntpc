
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../context/UserContext.jsx";
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable the aspect ratio constraint
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const ViewPage = () => {
    const [scores, setScores] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        axios.get('/5sScores').then(({ data }) => {
            setScores(data.department.zones);
        });
    }, []);

    const { user } = useContext(UserContext);

    const getAverageByMonth = (monthIndex) => {
        let sum = 0;
        let count = 0;

        scores.forEach((zone) => {
            zone.subzones.forEach((subzone) => {
                const monthValues = subzone.yearlyMonthValues.find((item) => item.year === year)?.monthValues;
                if (monthValues) {
                    sum += monthValues[labels[monthIndex].toLowerCase()];
                    count++;
                }
            });
        });

        return count > 0 ? sum / count : 0;
    };

    const data = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: labels.map((_, index) => getAverageByMonth(index)),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <div>
            {!!user ? (
                <div className="text-center mt-6">
          <span className="text-3xl font-semibold hover:text-primary border-b-2 text-gray-500">
            {user.department} 5S SCORES
          </span>
                </div>
            ) : (
                <span className="text-lg font-semibold hover:text-primary">Login / Register</span>
            )}

            <div className="border-2 mt-8 rounded-2xl p-3" style={{ height: "400px" }}>
                <Line className="" data={data} options={options} />
            </div>

            <div className="mt-10" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="border-2 border-gray-400 p-4 rounded-2xl">
                    <div className="flex gap-4">
                        <div className="items-center p-5 font-bold w-40 border-b-2">SubZone Name</div>
                        {labels.map((label, index) => (
                            <div className="border p-5 font-bold w-20" key={index}>{label}</div>
                        ))}
                    </div>

                    {scores.length > 0 &&
                        scores.map((zone) => (
                            <div key={zone._id}>
                                {zone.subzones.map((subzone) => (
                                    <div className="flex gap-4 mb-2" key={subzone._id}>
                                        <div className="items-center p-5 w-40 border-b-2">{subzone.name}</div>
                                        {labels.map((label, index) => (
                                            <div className="border p-5 w-20" key={index}>
                                                {subzone.yearlyMonthValues.find((item) => item.year === year)?.monthValues[label.toLowerCase()] || 'N/A'}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}

                    {scores.length > 0 && (
                        <div className="flex gap-4 mt-3">
                            <div className="items-center p-5 w-40">Average</div>
                            {labels.map((_, index) => (
                                <div className="border p-5 w-20" key={index}>
                                    {getAverageByMonth(index).toFixed(2)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewPage;

