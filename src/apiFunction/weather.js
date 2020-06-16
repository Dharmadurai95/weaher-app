const axios = require('axios').default;


function weather(lan,lag,callback){
axios.get(` http://api.weatherstack.com/current?access_key=2d4aa34a87695a4b93dcfaaebae70c24&query=${lan},${lag}`)
.then((res)=> {
    callback(res.data.current)
})
.catch((err)=>callback('Unavailable find location'))
}

module.exports = weather;