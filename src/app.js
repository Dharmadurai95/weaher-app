const express = require('express');
const hbs = require('hbs');
const path = require('path');
const weather = require('./apiFunction/weather');
const locationFind = require('./apiFunction/mapbox')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../static')));
app.set('view engine', 'hbs');
app.set('views ', path.join(__dirname, '../views'));
let path = path.join(__dirname, '../views/template')
hbs.registerPartials(path);


app.get('', (req, res) => {
    res.render('home', {
        head: 'Do you want to  know current weather..!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        res.send({
            error: 'please provide location'
        })
    } else if (req.query.location) {
        locationFind(req.query.location, (location,lan,lag) => {
            if(location) {
                weather(lan,lag,({weather_descriptions,temperature,feelslike,wind_dir,precip})=> {
                     if(weather_descriptions !== undefined) {
                        res.send({
                            Current_Location:location,
                            Weather_Description:weather_descriptions[0],
                            Temperature:temperature,
                            Feels_Like:feelslike,
                            chances_rain : precip,
                            Wind_Direction:wind_dir
                          })
                     }else {
                      res.send({error:'Enter the valid location'})
                     }
                })
            } else if(!location){
                res.send({error})
            }
        
            
        })
    }

})
app.get('/about', (req, res) => {
    res.render('about', {
        head: 'something know about weather'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        head: 'Do you need any help?'
    })
})

app.listen(PORT, () => console.log('hello world port mount on' + PORT))



