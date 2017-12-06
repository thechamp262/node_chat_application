let generateMessage = (from,text) =>{
  return{
    from,
    text,
    createAt: new Date().getTime()
  };
};

let generateLocationMessage = (from,lat,log) =>{
  return{
    from,
    url: `https://www.google.com/maps?q=${lat},${log}`,
    createdAt: new Date().getTime()
  }
};

module.exports = {generateMessage,generateLocationMessage};
