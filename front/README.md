# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


- [jest react](https://jestjs.io/fr/docs/tutorial-react) jest Test on react


- [react - redux - auth](https://www.youtube.com/watch?v=EDRd5aXMDjA)
- [redix - redux - auth](https://www.bezkoder.com/react-hooks-redux-login-registration-example/)
- [react-redux (fr)](https://www.youtube.com/watch?v=1lvnT2oE0_4)



- [nav bar](https://blog.logrocket.com/create-responsive-navbar-react-css/)



- [see doc](https://reactrouter.com/en/main/start/tutorial#loading-data)

## NOTE



* Tetris events to impl back:

    /* GAME */
    - SEND/RECV -> moveDown { roomId: id, payload: playerIndex }
    - SEND/RECV -> moveLeft { roomId: id, payload: playerIndex }
    - SEND/RECV -> moveRight { roomId: id, payload: playerIndex }
    - SEND/RECV -> rotatePiece { roomId: id, payload: playerIndex }

    Tetromino {
        type,
        rotation,
        position
    }

    - SEND -> newPiece { payload: {
                            roomId: id,
                            playerIndex: number,
                            tetromino: Tetromino,
                        }}
    - SEND -> blockPiece { roomId: id, payload: playerIndex }


    //TODO event START/END:
    START -> recevoir list des joueur options de la game.
    END -> retoour 

    /* SCORE */

     - SEND -> addScore { roomId: id, payload: playerIndex }



    /* ROOM */

    - SEND/RCV -> requestRoom {}
    - SEND/RCV -> joinRoom { payload: {
                                roomId: id
                                playerList: {}
                            }}
    

