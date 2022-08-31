// Express server
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');
const { json } = require('express');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 8080;
        this.server = http.createServer( this.app );
        this.io = socketio( this.server, { /* settings */ } );
        this.sockets = new Sockets( this.io );
    }

    middlewares() {
        // Deploy public directory
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        //GET Last tickets
        this.app.get('/last', (req, res)=> {
            res:json({
                ok: true,
                last: this.sockets.ticketList.lastThirteen
            })
        });
        // CORS
        this.app.use( cors() );
    }

    execute() {
        // Start Middlewares
        this.middlewares();
        // Start Server
        this.server.listen( this.port, () => {
            console.log('Server running in port:', this.port );
        });
    }
}

module.exports = Server;
