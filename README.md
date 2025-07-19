# ♟️ Real-Time Chess Game

**A classic chess game built with Node.js and EJS, allowing two players to play in real-time over the web.**

This project features a fully functional chess board with piece movement validation, a clean user interface, and a real-time backend powered by Socket.io to synchronize the game state between two connected players instantly.


## 🌟 Key Features

* **Real-Time Multiplayer:** Play with a friend from anywhere. Moves are reflected instantly for both players using WebSockets.
* **Complete Chess Logic:** Implements all standard chess rules, including piece movements, captures, and turn management.
* **Server-Side Rendering:** Uses EJS for dynamic HTML templating directly on the server.
* **Responsive Design:** The layout is designed to be playable on various screen sizes.
* **Monolithic & Simple:** A straightforward project structure with a combined frontend and backend, making it easy to understand and maintain.

---

## 🛠️ Tech Stack

This project leverages a powerful combination of technologies for real-time applications.

![EJS](https://img.shields.io/badge/EJS-A91E50?style=for-the-badge&logo=javascript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

---

## 🚀 Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.
* [Node.js](https://nodejs.org/) (which includes npm)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/riteshh-thakur/Chess-Game.git](https://github.com/riteshh-thakur/Chess-Game.git)
    cd Chess-Game
    ```

2.  **Install Dependencies:**
    Install all the necessary npm packages for the server.
    ```sh
    npm install
    ```

3.  **Start the Server:**
    Run the main server file. This will start the application.
    ```sh
    npm start
    ```

4.  **How to Play:**
    * Open two browser tabs or windows and navigate to the server's address (e.g., `http://localhost:3000`).
    * The first player to connect will be assigned "White," and the second will be "Black."
    * Start playing! Moves will be synchronized between the two tabs.



## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/riteshh-thakur/Chess-Game/issues).

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request



<p align="center">
  Built with ❤️ by Ritesh Thakur
</p>
