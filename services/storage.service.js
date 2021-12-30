import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

import { CONFIG } from '../utils/constants/config.js'

const filePath = join(homedir(), CONFIG.CONFIG_FILENAME);

const isExist = async path => {
  try {
    await promises.stat(path);
    
    return true;
  } catch(e) {
    return false;
  }
};

const getKeyValue = async key => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);

    return data[key];
  }

  return null;
};

const saveKeyValue = async ({ key, value }) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
};

export {
  getKeyValue,
  saveKeyValue,
}
