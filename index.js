const server = require("./server");
const port = 6000;

server.listen(port, () => {
  console.log(`server is up and running on ${port}`);
});
