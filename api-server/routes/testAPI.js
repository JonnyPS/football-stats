var express = require("express");
var router = express.Router();
var app = express();

// router.get("/", function(req, res, next) {
//     res.send("API is working properly");
// });


const axios = require('axios');


const axiosInstance = axios.create({
    baseURL: 'https://api.football-data.org/v2',
    headers: { 'X-Auth-Token' : '9d006876cd4d43f08084a828529fc968'}
});

// app.get('/', async(req, res, next) => {
//     try {
//         const response = await axiosInstance.get('/competitions/PL/teams?season=2018');
//         // process your data and send back to the user
//     } catch (error) {
//         // handle if you got an error
//     }
// })

router.get("/", async(req, res, next) => {
    const response = await axiosInstance.get('/competitions/PL/teams?season=2018');
    res.send( response );

});


// router.get('/', function(req, res){ 

//     request('https://api.football-data.org/v2/competitions/PL/teams?season=2018', function (error, response, body) {
//           console.log('error:', error); // Print the error if one occurred and handle it
//           console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//           res.send(body)
//     });

// })

// router.get('/', function(req, res, next) {
// 	var apiKey = '9d006876cd4d43f08084a828529fc968';    
// 	const baseUrl = "https://api.football-data.org/v2/competitions/PL/teams?season=2018";

// 	var options = {
// 		uri: baseUrl,
// 		method: 'GET',
// 		json: true,
// 		headers: {
// 			'X-Auth-Token': apiKey
// 		}
// 	};

// 	let data = "";
// 	rp(options)
// 	.then(function (resp) {
// 		console.log("data collected");
// 		res.send(resp);
// 	});
// })    

module.exports = router;


// const urls = ['https://api.football-data.org/v2/competitions/PL/teams?season=2018', 'https://api.football-data.org/v2/competitions/PL/matches?season=2018']
//     // map over array to use the url addresses
//     urls.map( ( addy ) => {
//       // set up headers
//       let h = new Headers()
//       h.append('Accept', 'application/json')
//       h.append('X-Auth-Token', '9d006876cd4d43f08084a828529fc968')
//       