const BandList = require("./BandList");
class Sockets{
    constructor(io){
        this.io=io;
        this.bandList =  new BandList();
        this.socketEvents();
    }

    socketEvents(){
        // On Connection Where 'socket' is the client connected
        this.io.on('connection', (socket) => {                 
            console.log('Client is connected!');
            // Emit to client all current bands
            socket.emit('current-list',this.bandList.getBands());
            /* Vote by band */
            socket.on('new-vote',(id)=>{
                this.bandList.increaseVotes(id);
                // Re-emit the new changes for all instances using 'IO'
                io.emit('current-list',this.bandList.getBands());

            });
         });
    }
}

module.exports = Sockets;