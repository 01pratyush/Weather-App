const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {

    res.sendFile(__dirname+ "/index.html")

    
    
})

app.post("/", function(req,res) {


    const query = req.body.cityName;
    const apiKey = "86a8f1ea65f7769f4241bd4ad3d68be7";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {

        console.log(response.statusCode)

        response.on("data", function(data) {

            


            const weatherData = JSON.parse(data)

            const Temperature = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            
            const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            

            res.setHeader("Content-Type", "text/html");
            res.write("<img src=" + imageURL + ">");

            res.write("<h1>Temperature in " + query + " is " + Temperature + " degrees celsius</h1>" );
            res.write("<p>It is currently " + description + " in " + query + "<p>" );
            
            res.send();
        })
    })
})


app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})