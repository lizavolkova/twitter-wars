var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var https = require('https');

// var redis = require('redis');
// var redisClient = redis.createClient();
// redisClient.on('connect', function() {
//    console.log('redis connected!');
// });

var NodeCache = require( "node-cache" );
var myCache = new NodeCache( { stdTTL: 0, checkPeriod: 86400});

//Configure Twitter
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: '9q8ett1UedVlMgfsENLO3CPDz',
    consumer_secret: 'TOgAsBnIuoguLDqR5nCfdGdpRuneGeMebCrAKzIT40UBqlNJ0E',
    access_token_key: '213927263-Gyn5KWScLvqVaMsY5WWG38khALX7OdcobjBDn6RJ',
    access_token_secret: 'ejoBErtgCSsmEhiPKO83ROi6MMkp0rBdyeCRElxzcVQlr'
});

var indexPath = path.join(__dirname, '/src/index.html');
app.get('/', function (_, res) { res.sendFile(indexPath) });

app.use(express.static(path.join(__dirname, '/src')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'https://localhost:8080');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/**
 * Return 404 if Twitter API return error
 * @param {Object} res
 * @param {Object} err
 */
var return404 = function(res, err) {
    res.status(404);
    res.send(err);
}

/**
 * Perform Twitter search query and extract random tweet from results
 * @param {element} html
 * @param {string} userName
 * @param {string} sinceDate
 * @returns {string} tweet_id
 */
var findRandomTweet = function(html, userName, sinceDate) {
    var $ = cheerio.load(html);
    var tweet_id;

    $('.AppContainer').filter(function() {
        var data = $(this);
        var numberOfTweets = data.find('#stream-items-id').children().length - 1;
        var randomTweet;
        var $tweet;
        var $tweetParagraph;
        var tweetDateUnix;
        var queryDate = moment(sinceDate);
        var tweetDate = moment();
        var text = '';

        for (var i = 0; i < numberOfTweets; i++) {
            console.log('looking for random tweet..');
            console.log(numberOfTweets);
            randomTweet = Math.floor(Math.random() * numberOfTweets);
            console.log('randomTweet', randomTweet);
            $tweet = data.find('#stream-items-id').children().eq(randomTweet)


            $tweetParagraph = $tweet.find('.js-tweet-text-container').find('p');
            text = $tweet.find('.js-tweet-text-container').find('p').html();
            tweetDateUnix = $tweet.find('.stream-item-header').find('.js-short-timestamp').attr('data-time');
            tweetDate = moment.unix(tweetDateUnix);

            tweet_id = $tweet.attr('data-item-id') || 'error';
            console.log('tweet_id is', tweet_id);

            if ( (text && text.length > 0) && (queryDate.isSame(tweetDate, 'day'))) {
                console.log('tweet found, break out of loop!')
                return false;
            }
        }


        if ($tweet) {
            console.log('tweet found!', i, numberOfTweets);
            console.log('tweet id is', tweet_id);
        } else {
            console.log('error fetching tweet');
            tweet_id = 'error';
        }

    });


    return tweet_id;
}


/**
 * Get list of tweets, find random tweet, and fetch oath embed code for tweet
 */
app.get('/getTweet', function(req, res) {
    var userName = req.query.userName;
    var sinceDate = req.query.sinceDate;
    var untilDate = req.query.untilDate;
    var url = 'https://twitter.com/search?q=from%3A' + userName + '+since%3A' + sinceDate + '+until%3A' + untilDate;
    console.log('SEARCH URL', url);

    request(url, function(error, response, html) {
        if (error) {
            return404(res, error);
        } else {
            var tweet_id = findRandomTweet(html, userName, sinceDate);
            if (tweet_id === 'error') {
                error = {
                    error: 'true'
                }
                return404(res, error);
            } else {
                fetchTweetById(tweet_id, res);
            }

        }
    })
});

app.get('/getTweetById/:id', function(req, res) {
   var tweet_id =  req.params.id;
    console.log(req.params)
    fetchTweetById(tweet_id, res);
});

/**
 * Fetch Tweet by ID CACHE THIS!!!
 * @param tweet_id
 * @param res
 */
var fetchTweetById = function(tweet_id, res) {
    console.log('now fetching tweet data by id');
    var cachedTweet = myCache.get(tweet_id);
    if (cachedTweet) {
        console.log('sending cached tweet');
        res.send(cachedTweet);
    } else {
        var url = 'https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2FInterior%2Fstatus%2F' + tweet_id;
        console.log(url)
        request(url, function(error, response, html) {
            if (!error) {
                res.send(response.body);
                myCache.set(tweet_id, response.body);
            } else {
                return404(response, error);
            }
        })
    }
};

/**
 * Get users's profile data
 */
app.get('/getProfileData/:user', function(req, res) {
    var getProfileRequest = {
        screen_name: req.params.user
    }

    var homePageUrlDisplay = undefined;
    var cachedProfileData = myCache.get(req.params.user);

    if (cachedProfileData) {
        console.log('SENDING CACHED PROFILE!');
        res.send(cachedProfileData);
    } else {
        //while (!homePageUrlDisplay || homePageUrlDisplay === undefined) {
            //homePageUrlDisplay = 'url';
            client.get('users/show', getProfileRequest, function(error, tweets) {
                if (error) {
                    return404(res, error);
                } else {
                    console.log('DATA FETCHED SENDING RESPONSE!!');
                    //homePageUrlDisplay = tweets.entities.url.urls[0].display_url;
                    res.send(tweets);
                    myCache.set(req.params.user, tweets);
                }
            });
       // }
    }
});

/**
 * Start HTTPS server
 */

// https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// }, app).listen(3000, function() {
//     console.log('Example app listening on port 3000');
// });

/**
 * Start regular server
 */
app.listen(process.env.PORT || 3000, function(){
    console.log(__dirname);
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});