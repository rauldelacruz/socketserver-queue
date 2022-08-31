const TicketList = require('./ticket-list')

class Sockets {

    constructor( io ) {
        this.io = io;
        //Create Ticketlist
        this.ticketList = new TicketList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('connected');
            // Listen event
            socket.on('request-ticket', (_, callback) => {
                const newTicket = this.ticketList.createTicket();
                callback( newTicket );
            });

            socket.on('next-ticket', ({ seller, desk }, callback) => {
                const ticket = this.ticketList.assignTicket(seller, desk);
                callback(ticket);
                this.io.emit('assigned-ticket', this.ticketList.lastThirteen );
            });
        });
    }

}

module.exports = Sockets;
