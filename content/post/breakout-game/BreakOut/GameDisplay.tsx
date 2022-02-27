import React from 'react';
import { gameStateTypes } from './BreakOut';
import * as styles from './GameDisplay.module.scss';

export type GameDisplayProps = {
  gameState: gameStateTypes;
  retryGame: () => void;
};

const GameDisplay: React.FC<GameDisplayProps> = (props) => {
  const { gameState, retryGame } = props;
  return (
    <div className={styles.root}>
      <h3 className={gameState === 'ready' || gameState === 'clear' ? ` ${styles.ready}` : ''}>{gameState}</h3>
      <button onClick={retryGame}>{gameState === 'ready' ? 'start' : 'again?'}</button>
    </div>
  );
};

export default GameDisplay;
