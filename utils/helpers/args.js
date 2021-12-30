const convertArrayOfArgsToObject = args => {
  return args
    .slice(2)
    .reduce((result, arg, index, array) => {
      if (arg.charAt(0) === '-') {
        if (index === array.length - 1) {
          result[arg.substring(1)] = true;
        } else if (array[index + 1].charAt(0) !== '-') {
          result[arg.substring(1)] = array[index + 1];
        } else {
          result[arg.substring(1)] = true;
        }
      }

      return result;
    }, {});
};

export { 
  convertArrayOfArgsToObject,
}
