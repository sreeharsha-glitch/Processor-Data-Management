import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarAnimation() {
    const [seriesData, setSeriesData] = useState([]);
    const [count, setCount] = useState(10);
    const [skipAnimation, setSkipAnimation] = React.useState(false);

    const handleCountChange = (event, newValue) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setCount(newValue);
    };


    useEffect(() => {
        fetch('http://localhost:8000/api')
            .then(response => response.json())
            .then(data => {
                const series = Object.values(data).map(i => ({
                    name: i.name,
                    data: i['Performance'] ? parseFloat(i['Performance']['Processor Base Frequency']) : 0
                }));
                setSeriesData(series);
            })
            .catch(error => console.error('Error fetching data from API:', error));
    }, []);

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
            <div className='ml-10'>
                <Box sx={{ width: '100%' }}>
                    {seriesData.length > 0 && (
                        <React.Fragment>
                            <BarChart
                                height={500}
                                layout='horizontal'
                                yAxis={[{ scaleType: 'band', data: seriesData.slice(0, count).map(i => i.name) }]}
                                series={[{ data: seriesData.slice(0, count).map(i => i.data), label: 'GHz' }]}
                                skipAnimation={skipAnimation}
                            />
                            <FormControlLabel
                                checked={skipAnimation}
                                control={<Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />}
                                label="skipAnimation"
                                labelPlacement="end"
                            />
                        </React.Fragment>
                    )}
                    <Typography id="input-item-number" gutterBottom>
                        Number of items
                    </Typography>
                    <Slider
                        value={count}
                        onChange={handleCountChange}
                        valueLabelDisplay="auto"
                        min={5}
                        max={25}
                        aria-labelledby="input-series-number"
                    />
                </Box>
            </div>
        </div>
    );
}

const highlightScope = {
    highlighted: 'series',
    faded: 'global',
};
