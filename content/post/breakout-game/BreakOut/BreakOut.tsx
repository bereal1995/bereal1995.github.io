import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './BreakOut.module.scss';

export type BreakOutProps = {};

const BreakOut: React.FC<BreakOutProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState<Boolean>(false);
  const x = useRef<number>(0);
  const dx = useRef<number>(2);
  const y = useRef<number>(0);
  const dy = useRef<number>(-2);
  const paddleX = useRef<number>(0);
  const rightPressed = useRef<boolean>(false);
  const leftPressed = useRef<boolean>(false);
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
  // eslint-disable-next-line prefer-const
  let bricks = Array.from(Array(brickColumnCount), () => new Array(brickRowCount).fill({ x: 0, y: 0 }));

  /**
   * @name 벽돌생성 함수
   */
  const drawBricks = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
          const brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = j * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[i][j].x = brickX;
          bricks[i][j].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
      }
    },
    [bricks],
  );

  /**
   * @name 키감지 함수
   */
  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      rightPressed.current = true;
    } else if (e.key === 'ArrowLeft') {
      leftPressed.current = true;
    }
  };
  /**
   * @name 키감지 함수
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
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  };

  /**
   *
   * @name 공 생성 함수
   */
  const drawBall = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(x.current, y.current, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  };

  /**
   * @name 렌더 함수
   */
  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ctx);
    drawPaddle(ctx);
    drawBricks(ctx);
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
        setGameOver(true);
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
  }, [drawBricks]);

  useEffect(() => {
    if (canvasRef.current) {
      // 초기값 설정
      x.current = canvasRef.current.width / 2;
      y.current = canvasRef.current.height - 30;
      paddleX.current = (canvasRef.current.width - paddleWidth) / 10;
    }
  }, []);

  useEffect(() => {
    // 게임 시작 및 종료
    const drawInterval = setInterval(draw, 10);
    if (gameOver) {
      clearInterval(drawInterval);
    }
    return () => clearInterval(drawInterval);
  }, [gameOver, draw]);

  return (
    <div className={styles.root} onKeyUp={keyUp} onKeyDown={keyDown} tabIndex={0}>
      <canvas ref={canvasRef} width="480" height="320"></canvas>
    </div>
  );
};

export default BreakOut;
