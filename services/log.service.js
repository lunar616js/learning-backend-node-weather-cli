import chalk from 'chalk'
import dedent from 'dedent-js'
import nodeEmoji from 'node-emoji'

const printError = error => {
  console.log(`${chalk.bgRed(' ОШИБКА: ')} ${error}`);
};

const printSuccess = message => {
  console.log(`${chalk.bgGreen(' УСПЕШНО: ')} ${message}`);
};

const printHelp = () => {
  console.log(dedent(`

  ${chalk.bgBlueBright(' ПОМОЩЬ: ')}
  Без параметров - вывод погоды 
  -s [CITY] - для установки города
  -h - для вывода помощи
  -t - [API_KEY] для сохранения токена

  `));
};

const printWeather = weather => {
  console.log(dedent(`
  
  ${chalk.bgBlueBright(' ПОГОДА: ')}
  ${nodeEmoji.get(':house:')} Город - ${weather.name}
  ${nodeEmoji.get(':earth_asia:')} Координаты - ${weather.coord.lon} ${weather.coord.lat}
  ${nodeEmoji.get(':partly_sunny:')} Погода - ${weather.main.temp}, ${weather.weather[0].description}, ощущается как ${weather.main.feels_like}
  
  `));
};

export { 
  printError,
  printSuccess,
  printHelp,
  printWeather,
}
