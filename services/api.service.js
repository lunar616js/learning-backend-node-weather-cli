import axios from 'axios'

const GET_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async ({ city, token }) => {
  if (!city || !token) {
    throw new Error('Не задан токен API, необходимо задать его с помощью команды -t [API_KEY]');
  }

  const { data } = await axios.get(GET_WEATHER_URL, {
    params: {
      q: city,
      appid: token,
      lang: 'ru',
      units: 'metric',
    },
  });

  return data;
};

export {
  getWeather,
}
