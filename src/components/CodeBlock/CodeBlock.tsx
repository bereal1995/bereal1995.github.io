import React, { useEffect, useState } from 'react';
import * as styles from './CodeBlock.module.scss';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

type CodeBlockProps = {
  children: string;
  className: string;
};

// https://levelup.gitconnected.com/code-review-avoid-declaring-react-component-inside-parent-component-1768a645f523
// 참고자료
const CopyButton: React.FC<{ content: string }> = ({ content }) => {
  const [text, setText] = useState('Copy');

  return (
    <button
      className={styles.code_button}
      disabled={text === 'Copied!'}
      onClick={() => {
        navigator.clipboard.writeText(content);
        setText('Copied!');
        setTimeout(() => {
          setText('Copy');
        }, 1000);
      }}
    >
      {text}
    </button>
  );
};

const ResetButton: React.FC<{ onClickReset: (msg: string[]) => void }> = ({ onClickReset: _onClickReset }) => {
  const onClickReset = () => {
    _onClickReset([]);
  };
  return (
    <button onClick={onClickReset} className={`${styles.code_button} ${styles.reset_button}`}>
      reset
    </button>
  );
};

const PlayButton: React.FC<{ content: string; onClickPlay: (content: string) => void }> = ({
  content,
  onClickPlay: _onClickPlay,
}) => {
  const onClickPlay = () => {
    _onClickPlay(content);
  };

  return (
    <button onClick={onClickPlay} className={`${styles.code_button} ${styles.play_button}`}>
      play
    </button>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language = className.replace(/language-/, '') as Language;
  const [logs, setLogs] = useState<string[]>([]);
  const ableLanguageList = ['js', 'javascript'];
  const isAblePlay = ableLanguageList.some((item) => item === language);

  const onClickReset = (mgs: string[]) => {
    setLogs(mgs);
  };
  const onClickPlay = (content: string) => {
    onClickReset([]);
    const old = window.console.log;
    console.log = (...args) => {
      old(...args);
      setLogs((prev) => [...prev, args.toString()]);
    };
    eval(content);
    console.log = old;
  };

  return (
    <div className={styles.container}>
      <Highlight {...defaultProps} theme={theme} code={children} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style }}>
            <div className={styles.code_header}>
              <span className={styles.language_name}>{language}</span>
              <CopyButton content={children} />
            </div>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className={styles.line_no}>{i + 1}</span>
                <span className={styles.line_content}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {isAblePlay && (
        <Highlight {...defaultProps} theme={theme} code={children} language={language}>
          {({ className, style }) => (
            <pre className={className} style={{ ...style }}>
              <div className={styles.play_container}>
                <ResetButton onClickReset={onClickReset} />
                <PlayButton content={children} onClickPlay={onClickPlay} />
                <span className={styles.line_content}>
                  {logs.map((item) => (
                    <span key={item} className={styles.line_item}>
                      {item}
                    </span>
                  ))}
                </span>
              </div>
            </pre>
          )}
        </Highlight>
      )}
    </div>
  );
};

export default CodeBlock;
