import React, { useEffect, useRef, useState } from 'react';
import * as styles from './BreakOut.module.scss';
import GameDisplay from './GameDisplay';

export type BreakOutProps = {
  fillColor: string;
};

type BricksTypes = {
  x: number;
  y: number;
  status: number;
};

export type gameStateTypes = 'ready' | 'gameIn' | 'gameOver' | 'clear';

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const BreakOut: React.FC<BreakOutProps> = (props) => {
  const { fillColor } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<gameStateTypes>('ready');
  const x = useRef<number>(0);
  const dx = useRef<number>(2);
  const y = useRef<number>(0);
  const dy = useRef<number>(-2);
  const paddleX = useRef<number>(0);
  const score = useRef<number>(0);
  const rightPressed = useRef<boolean>(false);
  const leftPressed = useRef<boolean>(false);
  const bricks: BricksTypes[][] = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  /**
   * @name 다시시작
   */
  const retryGame = () => {
    x.current = 0;
    dx.current = 2;
    y.current = 0;
    dy.current = -2;
    paddleX.current = 0;
    score.current = 0;
    rightPressed.current = false;
    leftPressed.current = false;
    setGameState('gameIn');
    rootRef.current?.focus();
  };

  /**
   * @name 점수생성
   */
  const drawScore = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '16px Arial';
    ctx.fillStyle = fillColor;
    ctx.fillText(`Score: ${+score.current}`, 8, 20);
  };

  /**
   * @name 벽돌충돌감지
   */
  const collisionDetection = () => {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const b = bricks[c][r];
        if (b.status === 1) {
          if (x.current > b.x && x.current < b.x + brickWidth && y.current > b.y && y.current < b.y + brickHeight) {
            dy.current = -dy.current;
            b.status = 0;
            score.current++;
            if (score.current === brickRowCount * brickColumnCount) {
              setGameState('clear');
            }
          }
        }
      }
    }
  };

  /**
   * @name 벽돌생성
   */
  const drawBricks = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < brickColumnCount; i++) {
      for (let j = 0; j < brickRowCount; j++) {
        if (bricks[i][j].status === 1) {
          const brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = j * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[i][j].x = brickX;
          bricks[i][j].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  };

  /**
   * @name 키감지
   */
  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      rightPressed.current = true;
    } else if (e.key === 'ArrowLeft') {
      leftPressed.current = true;
    }
  };
  /**
   * @name 키감지
   */
  const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      rightPressed.current = false;
    } else if (e.key === 'ArrowLeft') {
      leftPressed.current = false;
    }
  };

  /**
   * @name 패들생성함수
   */
  const drawPaddle = (ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;

    ctx.beginPath();
    ctx.rect(paddleX.current, canvasRef.current.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.closePath();
  };

  /**
   *
   * @name 공 생성
   */
  const drawBall = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(x.current, y.current, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.closePath();
  };

  /**
   * @name 렌더
   */
  const draw = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ctx);
    drawPaddle(ctx);
    drawScore(ctx);
    drawBricks(ctx);
    collisionDetection();
    // 벽에 팅기는 부분
    if (x.current + dx.current > canvas.width - ballRadius || x.current + dx.current < ballRadius) {
      dx.current = -dx.current;
    }
    if (y.current + dy.current < ballRadius) {
      dy.current = -dy.current;
    } else if (y.current + dy.current > canvas.height - ballRadius) {
      if (x.current > paddleX.current && x.current < paddleX.current + paddleWidth) {
        dy.current = -dy.current;
      } else {
        setGameState('gameOver');
      }
    }
    // 패들 움직이는 부분
    if (rightPressed.current && paddleX.current < canvas.width - paddleWidth) {
      paddleX.current += 7;
    } else if (leftPressed.current && paddleX.current > 0) {
      paddleX.current -= 7;
    }

    // 공 이동
    x.current += dx.current;
    y.current += dy.current;
  };

  useEffect(() => {
    if (canvasRef.current && gameState === 'gameIn') {
      // 초기값 설정
      x.current = canvasRef.current.width / 2;
      y.current = canvasRef.current.height - 30;
      paddleX.current = (canvasRef.current.width - paddleWidth) / 10;
    }
  }, [gameState]);

  // 게임 시작 및 종료
  useEffect(() => {
    const drawInterval = setInterval(draw, 10);
    return () => clearInterval(drawInterval);
  }, [gameState]);

  return (
    <div className={styles.root} onKeyUp={keyUp} onKeyDown={keyDown} tabIndex={0} ref={rootRef}>
      {gameState === 'ready' && <GameDisplay gameState={gameState} retryGame={retryGame} />}
      {gameState === 'gameIn' && <canvas ref={canvasRef} width="480" height="320"></canvas>}
      {gameState === 'gameOver' && <GameDisplay gameState={gameState} retryGame={retryGame} />}
      {gameState === 'clear' && <GameDisplay gameState={gameState} retryGame={retryGame} />}
    </div>
  );
};

export default BreakOut;
