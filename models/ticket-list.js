const Ticket = require('./ticket');

class TicketList {
    constructor() {
        this.lastNumber = 0;
        this.pending = [];
        this.assigned = [];
    }

    get nextNumber() {
        this.lastNumber++;
        return this.lastNumber;
    }

    get lastThirteen() {
        return this.assigned.slice(0,13);
    }

    createTicket() {
        const newTicket = new Ticket(this.nextNumber);
        this.pending.push(newTicket);
        return newTicket;
    }

    assignTicket(seller, desk) {
        if (this.pending.length == 0) {
            return null;
        }
        const nextTicket = this.pending.shift();
        nextTicket.seller = seller;
        nextTicket.desk = desk;
        this.assigned.unshift(nextTicket);
        return nextTicket;
    }
}

module.exports = TicketList;
