import { useState, useEffect } from "react";
import axios from 'axios'
import Main from './MainCard'; // Main bileşenini içe aktar
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

function Header() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const api_key = 'e892f586242246409e793702233010'
    const [day, setDay] = useState(3);

    const [visible, setVisible] = useState(false);


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=${day}&aqi=yes `)
                setWeatherData(response.data)
                weatherData = response.data
            } catch (error) {
                console.log(error)
            }
        }

        if (location) {
            fetchData()
        }

    }, [location, day])


    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }

    // Tarih aralığı değiştiğinde bu işlevi çağırın
    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    // Tarih aralığına odaklandığınızda bu işlevi çağırın
    const handleFocusChange = (focusedInput) => {
        setFocusedInput(focusedInput);
    };

    // Tarih aralığının kaç gün içerdiğini hesapla
    const calculateDateDifference = () => {
        if (startDate && endDate) {
            const diffInMilliseconds = endDate.diff(startDate);
            const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
            return diffInDays;
        }
        return 3; // Eğer herhangi bir tarih seçilmediyse veya eksikse
    };

    // Tarih aralığının uzunluğunu konsola yazdır
    const logDateDifference = () => {
        const dateDifference = calculateDateDifference();
        setDay(dateDifference)
    };

    return (
        <div className="mt-3">
            <h1>
                Weather Application
            </h1>

            <input type="text" placeholder="Enter the City" value={location} className="inputType mt-3" onChange={handleLocationChange} />
            {!visible && (
                <div className="btn btn-success btn-sm" onClick={() => setVisible(true)} style={{ marginLeft: '10px' }}>
                    <i className="bi bi-calendar2-plus"></i>
                </div>
            )}
            {visible && (
                <button className="btn btn-sm btn-danger" style={{ marginLeft: '10px' }} onClick={() => setVisible(false)}>
                    <i class="bi bi-calendar-x"></i>
                </button>
            )}
            {visible && (
                <div className="dateCss">
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={handleDatesChange}
                        focusedInput={focusedInput}
                        onFocusChange={handleFocusChange}
                    />
                    <button className="btn btn-primary" onClick={logDateDifference} style={{marginLeft:'10px', marginRight:'10px'}}>Search</button>
                </div>
            )}

            {weatherData !== null && <Main weatherData={weatherData} />}
        </div>


    )
}



export default Header; 
