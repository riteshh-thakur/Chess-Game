const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = "w"; // Set to "w" or "b" based on server later

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";

    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
        for (let colIndex = 0; colIndex < 8; colIndex++) {
            const square = board[rowIndex][colIndex];
            const squareElement = document.createElement("div");
            squareElement.classList.add("square", (rowIndex + colIndex) % 2 === 0 ? "light" : "dark");
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = colIndex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === "w" ? "white" : "black");
                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: colIndex };
                        e.dataTransfer.effectAllowed = "move";
                        e.dataTransfer.setData("text/plain", ""); // Required
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault(); // Needed to allow drop
            });

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece && sourceSquare) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        }
    }

    // Flip board for black player
    boardElement.classList.toggle("flipped", playerRole === "b");
};

const handleMove = (source, target) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const from = files[source.col] + (8 - source.row);
    const to = files[target.col] + (8 - target.row);

    const move = chess.move({ from, to, promotion: "q" }); // default promote to queen
    if (move) {
        renderBoard();
        socket.emit("move", move);
    }
};

const getPieceUnicode = (piece) => {
    const map = {
        p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚"
    };
    return piece.color === "w" ? map[piece.type].toUpperCase() : map[piece.type];
};

// Socket event bindings
socket.on("playRole", (role) => {
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", () => {
    playerRole = null;
    renderBoard();
});

socket.on("boardState", (fen) => {
    chess.load(fen);
    renderBoard();
});

socket.on("move", (move) => {
    chess.move(move);
    renderBoard();
});

renderBoard();
