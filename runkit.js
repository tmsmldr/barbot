var express = require("@runkit/runkit/express-endpoint/1.0.0");
var app = express(exports);

//Se conecta con Airtable.
var Airtable = require('airtable');
Airtable.configure({
endpointUrl: 'https://api.airtable.com',
apiKey: 'keyX7yMdmO6SsZKp0'
    });
var base = Airtable.base('appuCV4ngFJTDCUVi');

//Recibe llamado en formato GET para creacion de un nuevo pedido 
app.get('/create/:name,:vinb,:vinr,:phein,:p1664', function(req, res) {
    
    
    //Formatea la informacion en la req para que sirva par Airtable
    let Create_req_formated = {
        "Name": req.params.name,
        "Nb VR": Number(req.params.vinr),
        "Nb VB": Number(req.params.vinb),
        "Nb 1664": Number(req.params.p1664),
        "Nb Hein": Number(req.params.phein)};
    
  //Crea un nuevo record en AirTable.
    base('Commandes').create(Create_req_formated, 
    function(err, record) { if (err) {console.error(err); return;} console.log(record.getId());
    CFMessage = [];
    CFMessage.push({"text" : record.getId()})
    res.send({"messages":CFMessag9});
    });  
});
    
