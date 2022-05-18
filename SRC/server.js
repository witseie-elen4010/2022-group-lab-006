// To open server go to your browser and type in "localhost:3000"
'use strict'

const http = require('http')
const server = http.createServer((req,res)=>{
   // console.log('request made')
   console.log(req.url,req.method)
   //res.setHeader('Content-Type','test/plain');
   res.setHeader('Content-Type','text/html');
   res.write('<p>This is the server will use for testing stuff great, testing 123</p>');
   res.end(); 
});
//server is listening on port 3000
server.listen(3000,'Localhost',()=>{
    console.log('lsitening for request on port 3000')
})


