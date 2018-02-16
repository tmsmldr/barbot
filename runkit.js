var express = require("@runkit/runkit/express-endpoint/1.0.0");
var app = express(exports);
var _ = require("lodash");
var gifs_urls = [
"https://media.giphy.com/media/vFbhcdQmjvDLa/giphy.gif",
"https://cdn-images-1.medium.com/max/1600/1*QJjDkrYwUc6lCxEBgUcH4A.gif",
"https://media.giphy.com/media/84lQP6jQiquB2/giphy.gif",
"https://media.giphy.com/media/Q6gPyUYrCk76g/giphy.gif",
"https://media.giphy.com/media/1034EEGrn91SrS/giphy.gif",
"https://media.giphy.com/media/3o6UBhjHobLFgEmrJu/giphy.gif",
"https://media.giphy.com/media/dQNP6OnyFUePu/giphy.gif",
"https://media.giphy.com/media/3ohs82CG3HfyOHiLqo/giphy.gif",
"https://media.giphy.com/media/k39w535jFPYrK/giphy.gif",
"https://media.giphy.com/media/3o6Zt8qDiPE2d3kayI/giphy.gif",
"https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif",
"https://media.giphy.com/media/aLdiZJmmx4OVW/giphy.gif",
"https://media.giphy.com/media/JVdF14CQQH7gs/giphy.gif",
"https://media.giphy.com/media/4Z3DdOZRTcXPa/giphy.gif"
]

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
        "Name": _.capitalize(req.params.name),
        "Nb VR": Number(req.params.vinr),
        "Nb VB": Number(req.params.vinb),
        "Nb 1664": Number(req.params.p1664),
        "Nb Hein": Number(req.params.phein)};
    
  //Crea un nuevo record en AirTable.
    base('Commandes').create(Create_req_formated, 
    function(err, record) { 
        if (err) {console.error(err); return;} console.log(record.getId());
        insertAirtableTokenL3 = record.getId().toUpperCase().slice(-3);
        CFMessage = [];
        CFMessage.push({"text" :""+_.capitalize(req.params.name)+", la commande est un big success"})
        CFMessage.push({"text" : "Son indentifiant est le "+insertAirtableTokenL3})
        CFMessage.push(
                {
      "attachment": {
        "type": "image",
        "payload": {
          "url": gifs_urls[Math.floor(Math.random() * gifs_urls.length)]
        }
      }
    })
        res.send(
                {
                  "set_attributes":
                    {
                      "insertAirtableToken": record.getId()
                    },
                  "messages":CFMessage,
                });
    });  
});
