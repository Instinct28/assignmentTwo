import { useState, useEffect } from 'react';

const useWeatherData = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [dailySummary, setDailySummary] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/api/weather');
                const data = await response.json();
                setWeatherData(data);
                const result = await fetch('http://localhost:8000/api/summary');
                const summary = await result.json();
                setDailySummary(summary);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { weatherData, dailySummary, loading };
};

export default useWeatherData;
