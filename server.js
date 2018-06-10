const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const random = require("randomcolor");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on("connection", socket => {
  const color = random();
  const { room } = socket.handshake.query;

  socket.join(room).broadcast.emit("join", {
    id: socket.id,
    color
  });

  socket.emit("color", { color });

  socket.on("disconnect", reason => {
    socket.leave(room).broadcast.emit("leave", { id: socket.id });
  });

  socket.on("shake", data => {
    socket.broadcast.emit("shake", { ...data });
  });

  socket.on("motion", data => {
    socket.broadcast.emit("motion", { ...data });
  });
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
