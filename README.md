# HTTP/2 NodeJS
Per creare la chiave privata and il certificato self signed, tramite cmd:
```cmd
openssl req -x509 -newkey rsa:4096 -nodes -sha256 -subj '/CN=localhost' -keyout private.pem -out cert.pem
```
HTTP/2 NodeJS Server
Creazione del progetto NodeJS
```cmd
npm init -y
```
Nel file ```index.js```:
```js
const http2 = require("http2")
const fs = require("fs")

const server = http2.createSecureServer({
    "key": fs.readFileSync("private.pem"), // chiave privata
    "cert": fs.readFileSync("cert.pem") // certificato
    // allowHTTP1: true // togliere commenti in caso di errore
});

server.on("error", (err) => console.error(err)); // in caso di errore del server

server.on("stream", (stream, headers) => {
    console.log(stream.id); // stampa dell'identificativo dello stream
    stream.respond({
        "content-type": "application/json", // json in risposta al client
        "status": 200 // status code OK
    });

    stream.end(JSON.stringify({ // json che viene inviato al client
        "user": "Test User",
        "id": 100
    }));
})

server.listen(8443); // porta sulla quale il servizio è attivo
console.log("Listenning on port 8443"); // stampa di debug
```
Per runnare il progetto:
```cmd
node index.js
```
Installare la seguente versione di CURL: ```https://winampplugins.co.uk/curl/curl_7_53_1_openssl_nghttp2_x64.7z```

Effettuare richieste CURL al server:
```cmd
cd curl_7_53_1_openssl_nghttp2_x64
curl.exe --insecure --http2 https://localhost:8443
```

Effettuare richieste dal browser al server:
```chrome
https://localhost:8443
```

Per decriptare i pacchetti in Wireshark è necessario eseguire il file ```decryptWireshark.cmd```. Il file creato deve essere poi aggiunto alle variabili d'ambiente del sistema.
```cmd
@echo off

set SSLKEYLOGFILE=%USERPROFILE%\Desktop\keylogfile.txt
start chrome
```

Il file ```testPackets.pcapng``` è il file che è stato mostrato nella realizzazione del video, che si trova al seguente link ```https://youtu.be/kRP_YQTwjN0```.
Nella cartella ```Server``` sono presenti i file che compongono il server HTTP/2 NodeJS, spiegato in precedenza.