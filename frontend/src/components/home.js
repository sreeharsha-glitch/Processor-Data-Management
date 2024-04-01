import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import InitialFilters from './table';
import Header from './header';
import Footer from './footer';


const Home = () => {
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
            <div className='flex px-12 py-[1%]'>
                <InitialFilters data={data} />
            </div> 
            {/* <div className='mt-[170px]'>
                <Footer />
            </div> */}
        </div>
    );
}

export default Home;
