const Band = require("./Band");

class BandList{
    constructor(){
        this.bands = [
            new Band('Joy Division'),
            new Band('The Smiths'),
            new Band('Cuco'),
            new Band('Soviet'),
        ];
    }

    addBand( name ){
        this.bands.push( new Band( name ));
        return this.bands;
    }

    removeBand( id ){
        this.bands = this.bands.filter(band => band.id !== id);
    }

    getBands(){
        return this.bands;
    }

    increaseVotes( id ){
        this.bands =  this.bands.map( band => {
            if(band.id === id){
                band.votes += 1;
            }
            return band;
        })
    }

    updateBandName( id,name ){
        this.bands =  this.bands.map( band => {
            if(band.id === id){
                band.name = name;
            }
            return band;
        })
    }
}

module.exports = BandList;