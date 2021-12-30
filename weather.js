#!/usr/bin/env node

import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { getKeyValue, saveKeyValue } from './services/storage.service.js'
import { getWeather } from './services/api.service.js'

import { convertArrayOfArgsToObject } from './utils/helpers/args.js'

import { CONFIG } from './utils/constants/config.js'

const saveToken = async token => {
  if (!token.length) {
    printError('Необходимо указать токен');
    return;
  }

  try {
    await saveKeyValue({
      key: CONFIG.TOKEN_KEY,
      value: token,
    });

    printSuccess('Токен успешно сохранен');
  } catch(e) {
    printError(e);
  }
};

const saveCity = async city => {
  if (!city.length) {
    printError('Необходимо указать город');
    return
  }

  try {
    await saveKeyValue({
      key: CONFIG.CITY_KEY,
      value: city,
    });

    printSuccess('Город успешно сохранен');
  } catch(e) {
    printError(e);
  }
}

const getForcast = async () => {
  try {
    const weather = await getWeather({
      city: process.env.CITY ?? await getKeyValue(CONFIG.CITY_KEY),
      token: process.env.TOKEN ?? await getKeyValue(CONFIG.TOKEN_KEY),
    });

    printWeather(weather);
  } catch(e) {
    if (e?.response?.status === 404) {
      printError('Неверно указан город');
    } else if (e?.response?.status === 401) {
      printError('Неверно указан токен');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = async () => {
  const args = convertArrayOfArgsToObject(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.t) {
    saveToken(args.t);
  }

  if (args.c) {
    saveCity(args.c);
  }

  if (Object.keys(args).length) {
    return;
  }

  getForcast();
};

initCLI();
