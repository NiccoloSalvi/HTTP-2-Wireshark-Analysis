const http2 = require("http2")
const fs = require("fs")

const server = http2.createSecureServer({
    "key": fs.readFileSync("private.pem"), // chiave privata
    "cert": fs.readFileSync("cert.pem") // certificato
    // allowHTTP1: true
});

server.on("error", (err) => console.error(err)); // in caso di errore del server

server.on("stream", (stream, headers) => {
    console.log(stream.id); // stampa dell'identificativo dello stream
    stream.respond({
        "content-type": "application/json", // json in risposta al client
        // "content-type": "text/html",
        "status": 200 // status code OK
    });

    stream.end(JSON.stringify({ // json che viene inviato al client
        "user": "Niccolo Salvi",
        "id": 100
    }));
})

server.listen(8443); // porta sulla quale il servizio è attivo
console.log("Listenning on port 8443"); // stampa di debug