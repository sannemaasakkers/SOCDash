var elasticsearch = require("elasticsearch");
const dotenv      = require('dotenv')
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path        = require('path');
const ejs         = require('ejs');
const fs          = require('fs');

app.locals.geoip  = require('geoip-lite');
app.locals.moment = require('moment');

dotenv.config();

var client = new elasticsearch.Client({
  hosts: [process.env.ELASTIC_URL]
});

app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join( __dirname, 'public')));


app.get('/search', function (req, res){
  client.search(JSON.parse(fs.readFileSync('queries/' + req.query['protocol'] + '.json')), function (error, response,status) {
    if (error){
      console.log("Error: " + error)
    }
    else {
      res.render('template', {
        data: response.hits.hits,
        protocol: req.query['protocol'],
      });
    }
  })
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
