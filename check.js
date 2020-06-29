const elasticsearch = require('elasticsearch');
const dotenv        = require('dotenv')

dotenv.config();

const client = new elasticsearch.Client({
   hosts: [process.env.ELASTIC_URL]
});

client.ping({
     requestTimeout: 30000,
 }, function(error) {
     if (error) {
         console.error('Can not find Elastic DB');
     } else {
         console.log('Everything is ok');
     }
 });
