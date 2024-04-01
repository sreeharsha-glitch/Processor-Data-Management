import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Button, Slider, Typography } from '@mui/material';

export default function PieActiveArc() {
    const [chart, setChart] = useState(null);
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: 'My First Dataset',
            data: [],
            backgroundColor: [],
            hoverOffset: 4
        }]
    });
    const [numDataPoints, setNumDataPoints] = useState(10);

    const fetchData = () => {
        fetch('http://localhost:8000/api')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                const labels = [];
                const datasetData = [];
                const backgroundColors = [];

                Object.values(data).slice(0, numDataPoints).forEach(item => {
                    labels.push(item.name);
                    datasetData.push(item.Performance ? parseInt(item.Performance["# of Cores"]) : 0);
                    backgroundColors.push(getRandomColor());
                });

                setData({
                    labels,
                    datasets: [{
                        data: datasetData,
                        backgroundColor: backgroundColors,
                        hoverOffset: 4
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [numDataPoints]);

    useEffect(() => {
        if (data.labels.length > 0) {
            if (chart) {
                chart.destroy();
            }

            const ctx = document.getElementById('pie-chart');
            const newChart = new Chart(ctx, {
                type: 'pie',
                data: data,
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const label = data.labels[context.dataIndex];
                                    const value = data.datasets[0].data[context.dataIndex];
                                    return `${label}: ${value} cores`;
                                }
                            }
                        }
                    },
                    legend: {
                        display: false // Hide the legend
                    }
                }
            });
            setChart(newChart);
        }
    }, [data]);

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const handleSliderChange = (event, newValue) => {
        setNumDataPoints(newValue);
    };

    return (
        <div>
            <div className='mt-5 ml-10'>
                <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
                    Intel Visualizaton Tools
                </h1>
                <p class="mb-6 ml-[-188px] text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Intel provides a variety of tools and methods to complete similar actions but with different user experiences depending on the needs of the administrator.
                </p>
            </div>
            <div className='w-[47%] h-[45%] ml-[25%] mt-4 flex items-center'>
                <canvas id="pie-chart" width="400" height="400"></canvas>
            </div>
            <div style={{ marginLeft: '20px' }}>
                <Typography id="data-points-slider" gutterBottom>
                    Data Points
                </Typography>
                <Slider
                    value={numDataPoints}
                    min={1}
                    max={50}
                    onChange={handleSliderChange}
                    aria-labelledby="data-points-slider"
                    valueLabelDisplay="auto"
                />
                <Button variant="contained" onClick={fetchData}>Next</Button>
            </div>
        </div>
    );
}
