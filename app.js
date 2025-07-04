const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {}; // { white: socketId, black: socketId }

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Chess Game" });
});

io.on("connection", function (uniquesocket) {
    console.log("Player connected:", uniquesocket.id);

    // Assign white/black or spectator
    if (!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playRole", "w");
    } else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playRole", "b");
    } else {
        uniquesocket.emit("spectatorRole");
    }

    // Send current board to newly connected user
    uniquesocket.emit("boardState", chess.fen());

    // Cleanup on disconnect
    uniquesocket.on("disconnect", function () {
        if (uniquesocket.id === players.white) {
            delete players.white;
        } else if (uniquesocket.id === players.black) {
            delete players.black;
        }
        console.log("Player disconnected:", uniquesocket.id);
    });

    // Handle moves
    uniquesocket.on("move", (move) => {
        try {
            // Ensure move from correct player
            if (chess.turn() === "w" && uniquesocket.id !== players.white) return;
            if (chess.turn() === "b" && uniquesocket.id !== players.black) return;

            const result = chess.move(move);
            if (result) {
                io.emit("move", move);                // Broadcast move to others
                io.emit("boardState", chess.fen());   // Sync full board
            } else {
                console.log("Invalid move:", move);
                uniquesocket.emit("invalidMove", move);
            }
        } catch (err) {
            console.error("Move error:", err);
            uniquesocket.emit("invalidMove", move);
        }
    });
});

server.listen(3000, function () {
    console.log("Server listening on http://localhost:3000");
});
