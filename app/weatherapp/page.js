'use client';

import { useState } from 'react';
import { fetchWeatherData } from '../../lib/weather';

const weatherImages = {
    clear: 'https://media3.giphy.com/media/0Styincf6K2tvfjb5Q/200w.gif?cid=6c09b952pco852lzc2u1qwqf3m9su8twcmclfaju16ve4b39&ep=v1_gifs_search&rid=200w.gif&ct=g',
    clouds: 'https://media.tenor.com/YhQV3T7bjXwAAAAM/heaven-cloud.gif',
    rain: 'https://steamuserimages-a.akamaihd.net/ugc/502525219771484502/EF1064390409CCB6004C821540DE28B51A1D3B91/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    snow: 'https://i.pinimg.com/originals/13/36/0f/13360fb8f656e2b02429d3828da7441d.gif',
    thunderstorm: 'https://media.tenor.com/uToSLPDUN44AAAAM/lightning-nature.gif',
    mist: 'https://i.pinimg.com/originals/77/42/24/77422432ef2ee5f1ffbd8828b1bca3b9.gif',
    drizzle: 'https://i.pinimg.com/originals/87/eb/d9/87ebd96d079b1737b97f2b3847da9d47.gif',
    smoke: 'https://i.pinimg.com/originals/67/e7/80/67e7804a3864631c7291558a76be1ffb.gif', // Adicionado
};

const weatherIcons = {
    clear: 'https://www.freeiconspng.com/thumbs/sun-icon/sun-icon-33.png',
    clouds: 'https://cdn-icons-png.flaticon.com/512/4834/4834559.png',
    rain: 'https://cdn-icons-png.flaticon.com/512/6408/6408892.png',
    snow: 'https://www.freeiconspng.com/thumbs/snow-icon/blue-snow-icon-8.png',
    thunderstorm: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT62YH4f_RqhzJm0_1YT7LVOk0QOaWTVauGuw&s',
    mist: 'https://cdn4.iconfinder.com/data/icons/heavy-weather/100/Weather_Icons_39_moon_fog-512.png',
    drizzle: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeWao5P99YB8sIWWnUqGS5LDaTTqYe9qBcSQ&s',
    smoke: 'https://cdn-icons-png.flaticon.com/512/4414/4414055.png' // Adicionado
};

const weatherBorders = {
    clear: '5px solid gold',
    clouds: '5px solid lightgray',
    rain: '5px solid blue',
    snow: '5px solid white',
    thunderstorm: '5px solid purple',
    mist: '5px solid silver',
    drizzle: '5px solid lightblue',
    smoke: '5px solid darkgray', // Adicionado
};

const weatherColors = {
    clear: '#FFD700',
    clouds: '#D3D3D3',
    rain: '#1E90FF',
    snow: '#FFFFFF',
    thunderstorm: '#800080',
    mist: '#C0C0C0',
    drizzle: '#87CEEB',
    smoke: '#A9A9A9', // Adicionado
};

const weatherGlowEffects = {
    clear: '0 0 30px gold, 0 0 60px gold',
    clouds: '0 0 20px lightgray, 0 0 40px lightgray',
    rain: '0 0 30px blue, 0 0 60px blue',
    snow: '0 0 20px white, 0 0 40px white',
    thunderstorm: '0 0 30px purple, 0 0 60px purple',
    mist: '0 0 20px silver, 0 0 40px silver',
    drizzle: '0 0 30px lightblue, 0 0 60px lightblue',
    smoke: '0 0 30px darkgray, 0 0 60px darkgray', // Adicionado
};

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(city);
        if (data) {
            setWeatherData(data);
        } else {
            setError('Erro ao buscar dados do clima. Verifique a cidade e tente novamente.');
        }
        setLoading(false);
    };

    const getWeatherImage = (weather) => {
        if (!weather || !weather[0]) return null;
        const condition = weather[0].main.toLowerCase();
        return weatherImages[condition] || '/images/default.png';
    };

    const getWeatherIcon = (weather) => {
        if (!weather || !weather[0]) return null;
        const condition = weather[0].main.toLowerCase();
        return weatherIcons[condition] || '/images/default-icon.png';
    };

    const getWeatherBorder = (weather) => {
        if (!weather || !weather[0]) return '5px solid transparent';
        const condition = weather[0].main.toLowerCase();
        return weatherBorders[condition] || '5px solid transparent';
    };

    const getWeatherColor = (weather) => {
        if (!weather || !weather[0]) return '#FFFFFF';
        const condition = weather[0].main.toLowerCase();
        return weatherColors[condition] || '#FFFFFF';
    };

    const getWeatherGlow = (weather) => {
        if (!weather || !weather[0]) return '0 0 0 rgba(0, 0, 0, 0)';
        const condition = weather[0].main.toLowerCase();
        return weatherGlowEffects[condition] || '0 0 0 rgba(0, 0, 0, 0)';
    };

    return (
        <div style={{ 
            background: 'url(https://i.pinimg.com/originals/ee/1f/f9/ee1ff96d8c115cec47cee9b63d247fa1.gif) no-repeat center center fixed', 
            backgroundSize: 'cover',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Bradley Hand, cursive', // Aplicando a fonte
        }}>
            <h1 style={{ textAlign: 'center' }}>Busque a previsão do tempo</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Digite o nome da cidade"
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginRight: '10px',
                        width: '300px',
                    }}
                />
                <button 
                    onClick={handleSearch} 
                    style={{
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    Buscar
                </button>
            </div>

            {loading && <p style={{ textAlign: 'center' }}>Carregando...</p>}
            {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

            {weatherData && (
                <div style={{
                    position: 'relative',
                    width: '600px',
                    height: '800px',
                    margin: '0 auto',
                    backgroundImage: `url(${getWeatherImage(weatherData.weather)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'black',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '20px',
                    textAlign: 'center',
                    borderRadius: '30px',
                    border: getWeatherBorder(weatherData.weather),
                    boxShadow: `${getWeatherGlow(weatherData.weather)}`,
                    overflow: 'hidden',
                    backgroundColor: getWeatherColor(weatherData.weather),
                    animation: 'pulse 2s infinite',
                }}>
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src={getWeatherIcon(weatherData.weather)} 
                            alt={weatherData.weather[0].description}
                            style={{ width: '80px', height: '80px', marginBottom: '10px' }}
                        />
                        <p style={{ margin: '0', fontSize: '6em', fontWeight: 'bold' }}>
                            {weatherData.main.temp.toFixed(1)}°C
                        </p>
                    </div>
                    <h2 style={{ marginTop: '20px', marginBottom: '0', fontSize: '2.5em' }}>{weatherData.name}</h2>
                </div>
            )}
            <style jsx>{`
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
