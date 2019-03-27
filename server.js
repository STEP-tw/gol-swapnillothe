const http = require("http");
const app = require("./app.js");
const PORT = process.env.PORT || 8000;

http.createServer(app).listen(PORT,()=>{
  console.log("server is listening on "+PORT);
});