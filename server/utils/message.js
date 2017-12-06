const moment = require('moment');

let generateMessage = (from,text) =>{
  return{
    from,
    text,
    createAt: moment().valueOf()
  };
};

let generateLocationMessage = (from,lat,log) =>{
  return{
    from,
    url: `https://www.google.com/maps?q=${lat},${log}`,
    createdAt: moment().valueOf()
  }
};

module.exports = {generateMessage,generateLocationMessage};
