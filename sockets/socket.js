const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bandas = new Bands();
bandas.addBand(new Band('metalica'));
bandas.addBand(new Band('sonora'));
bandas.addBand(new Band('rurnurn'));
bandas.addBand(new Band('beattles'));

io.on('connection', client => {

    console.log('cliente conectado');
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

     

     client.on('connect', () => { 
        console.log('Cliente conectado');
        
     });

     client.on('mensaje', (payload) => {
         console.log('mensaje', payload);

     //    io.emit('mensaje', {admin: "sergio"});

     });

     client.emit('emision-bandas', bandas.getBands());

     client.on('nueva-emision', (payload) => {
        io.emit('nueva-emision', payload);
        console.log(payload);
     });

     client.on('votar-id', (payload) =>{
         console.clear;
         bandas.voteBand(payload.id);
         console.log(payload);
         io.emit('emision-bandas', bandas.getBands());
     });

     client.on('add-band', (payload) =>{
         console.log(payload.name);
         const newBand = new Band(payload.name);
         bandas.addBand(newBand);
         io.emit('emision-bandas', bandas.getBands());
     });

     client.on('delete-band', (payload) =>{
        bandas.deleteBand(payload.id);
        io.emit('emision-bandas', bandas.getBands());
    });
  });