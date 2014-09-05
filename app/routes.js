// app/routes.js


var Nerd = require('../app/models/nerd');
var ghost = require('ghost');
var httpProxy = require('http-proxy');

module.exports = function(app) {

    // server routes =======================================
    // handle things like api calls
    // authentication routes

    // proxy to ghost blog
    /*
app.get('/blog/{p*}', function() {
    handler: {
        proxy: {
            host: '0.0.0.0',
            port: '2368'
        }
    }
}); 

ghost({
    config: path.join(__dirname, 'config.js')
})

ghost().then(function (app) {
    app.start();
}); 
*/
/*
    var proxy = new httpProxy.RoutingProxy();
    app.get('/blog*', function(req, res, next) {
        proxy.proxyRequest(req, res, {
            host: 'http://localhost',
            port: 2368
        });
    });
    */
    var proxy = new httpProxy.createProxyServer();
    app.get('/blog*', function(req, res, next) {
        proxy.web(req, res, {
            target: 'http://localhost:2368'
        });
    });
    app.post('/blog*', function(req, res, next) {
        proxy.web(req, res, {
            target: 'http://localhost:2368'
        });
    });
    app.delete('/blog*', function(req, res, next) {
        proxy.web(req, res, {
            target: 'http://localhost:2368'
        });
    });
    app.put('/blog*', function(req, res, next) {
        proxy.web(req, res, {
            target: 'http://localhost:2368'
        });
    });

    // sample api route
    app.get('/api/nerds', function(req, res) {
        // use mongoose to get all ners in the database
        Nerd.find(function(err, nerds) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });

    app.post('/api/nerd', function(req, res) {
        /*
            console.log('posting ... ');
            console.log('==========================================================');
        */

        var nerd = new Nerd(); // create a new instance of nerd model

        /*
            for( prop in req ) {
                if (req.hasOwnProperty(prop)) {
                    console.log(typeof req[prop], ": ", prop);
                }
            }
            console.log('------------------------------------');
            //console.log(req);
            console.log(req.body);
            console.log(req.body.name);
        */

        nerd.name = req.body.name; // get the nerd name from the request body

        nerd.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Nerd created!'
            });
        });
    });

    app.get('/api/hello', function(req, res) {
        res.json({
            message: 'hello we are working here'
        });
    });


    // route to handle creating (app.post)
    // route to handle delete (app.delete)

    // frontend routes =====================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};
