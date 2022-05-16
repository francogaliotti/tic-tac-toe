import { useState, useEffect } from 'react';
import './App.css';
import Square from './components/Square'
import { Patterns } from "./Patterns";

function App() {
  const [board, setBoard] = useState<Array<string>>(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState<string>("O");
  const [result, setResult] = useState<{ winner: string, state: string }>({ winner: "none", state: "none" });

  useEffect((): void => {
    checkWin()
    checkIfTie()
    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect((): void => {
    if (result.state != "none") {
      alert(`Game Finished! Winning Player: ${result.winner}`);

    }
  }, [result]);

  const chooseSquare = (square: number): void => {
    setBoard(
      board.map((val, idx) => {
        if (idx == square && val == "") {
          return player;
        }
        return val;
      })
    );
  };

  const checkIfTie = (): void => {
    let filled: boolean = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  const checkWin = (): void => {
    Patterns.forEach((pattern) => {
      const firstPlayer: string = board[pattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern: boolean = true;
      pattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
        restartGame()
      }
    });
  };


  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
  };

  return (
    <div className="App">
      <div className='board'>
        <div className='row'>
          <Square val={board[0]} chooseSquare={() => { chooseSquare(0) }} />
          <Square val={board[1]} chooseSquare={() => { chooseSquare(1) }} />
          <Square val={board[2]} chooseSquare={() => { chooseSquare(2) }} />
        </div>
        <div className='row'>
          <Square val={board[3]} chooseSquare={() => { chooseSquare(3) }} />
          <Square val={board[4]} chooseSquare={() => { chooseSquare(4) }} />
          <Square val={board[5]} chooseSquare={() => { chooseSquare(5) }} />
        </div>
        <div className='row'>
          <Square val={board[6]} chooseSquare={() => { chooseSquare(6) }} />
          <Square val={board[7]} chooseSquare={() => { chooseSquare(7) }} />
          <Square val={board[8]} chooseSquare={() => { chooseSquare(8) }} />
        </div>
      </div>
    </div>
  );
}

export default App;
