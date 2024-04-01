import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import InitialFilters from './table';
import BarAnimation from './barchart';
import PieActiveArc from './piechart';
import Header from './header';
import Footer from './footer';



const BarChartPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Header/>
            <BarAnimation/>
            <div className='mt-[113px]'>
                <Footer />
            </div>
        </div>
    );
}

export default BarChartPage;
