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
                this.io.emit('current-list',this.bandList.getBands());

            });
            /* Delete a band */
            socket.on('delete-band',(id)=>{
                this.bandList.removeBand(id);
                // Re-emit the new changes for all instances using 'IO'
                this.io.emit('current-list',this.bandList.getBands());

            });
            /* Name band modifiacation */
            socket.on('change-name-band',(data)=>{
                this.bandList.updateBandName(data.id,data.name);
                this.io.emit('current-list',this.bandList.getBands());
            });

            /* Add new band */
            socket.on('add-new-band',(data)=>{
                this.bandList.addBand(data.name);
                this.io.emit('current-list',this.bandList.getBands());
            });
         });
    }
}

module.exports = Sockets;
