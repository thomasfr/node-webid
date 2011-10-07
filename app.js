var https = require("https");
var fs = require("fs");
var util = require("util");

var options  = {
  key: fs.readFileSync('keys/agent-key.pem'), // create them as described in the node.js docs
  cert: fs.readFileSync('keys/agent-cert.pem'), // create them as described in the node.js docs
  requestCert:true // thats actually the important property for webid. So the client gets asked for his client certificate.
};

https.createServer(options, function(req, res) {
  var peerCert = req.connection.getPeerCertificate(); // this is the client certificate
  res.writeHead(200);
  console.log(util.inspect(peerCert,5));
  res.end(peerCert.subject.subjectaltname);
}).listen(8000);
