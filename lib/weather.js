export async function fetchWeatherData(city) {
    const apiKey = '281d3dfb7549082bd80324d9d76d7cb4'
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Falha ao buscar dados do clima');
        }
        const weatherData = await res.json();
        return weatherData;
    } catch (error) {
        console.error('Erro ao buscar dados do clima', error);
        return null;
    }
}

export async function fetchCityCordinates(city) {
    const apiKey = '281d3dfb7549082bd80324d9d76d7cb4';
    const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(geocodeUrl);
        if (!res.ok) {
            throw new Error ('Cidade não encontrada');
        }
        const [cityData] = await res.json();
            if (!cityData) {
            throw new Error('Dados da cidade não encontrados');
        }
        return { lat: cityData.lat, lon: cityData.lon};
    }catch (error) {
        console.error('Erro ao buscar coordenadas da cidade:', error);
        return null;
    }
}

export async function fetchCurrentWeather(lat, lon) {
    const apiKey = '281d3dfb7549082bd80324d9d76d7cb4'
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(currentWeatherUrl);
        if (!res.ok) {
            throw new Error( 'Erro ao buscar temperatura atual');
        }
        const currentWeatherData =  await res.json();
        return currentWeatherData;
    } catch (error) {
        console.error('Erro ao buscar a temperatura atual:', error);
        return null;
    }
}

export async function fetchWeatherForecast(lat, lon) {
    const apiKey = '281d3dfb7549082bd80324d9d76d7cb4'
    const forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(forecastUrl);
        if (!res.ok) {
            throw new Error ('Erro ao buscar dados de previsão do tempo');
        }
        const forecastData = await res.json();
        return forecastData;
    } catch (error) {
        console.error('Erro ao buscar dados de previsão do tempo:' ,error);
    }
    return null;
}



