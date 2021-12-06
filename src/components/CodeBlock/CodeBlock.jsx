import React, { useState } from 'react';
import * as styles from './CodeBlock.module.scss';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

// https://levelup.gitconnected.com/code-review-avoid-declaring-react-component-inside-parent-component-1768a645f523
// 참고자료
const CopyButton = (props) => {
  const [text, setText] = useState('Copy');
  return (
    <button
      className={styles.code_button}
      onClick={() => {
        navigator.clipboard.writeText(props.content);
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

const PlayButton = (props) => {
  const ableLanguageList = ['js', 'javascript'];
  const getIsAbleButton = (language) => {
    return ableLanguageList.some((item) => item === language);
  };
  const onClickPlay = () => {
    eval(props.content);
  };

  if (!getIsAbleButton(props.language)) return null;
  return (
    <button onClick={onClickPlay} className={styles.code_button}>
      play
    </button>
  );
};

const CodeBlock = ({ children, className }) => {
  const language = className.replace(/language-/, '');

  return (
    <Highlight {...defaultProps} theme={theme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} ${styles.container}`} style={{ ...style }}>
          <div className={styles.code_header}>
            <span className={styles.language_name}>{language}</span>
            <CopyButton content={children} />
            <PlayButton content={children} language={language} />
          </div>
          {tokens.map((line, i) => (
            <div className={styles.line} key={i} {...getLineProps({ line, key: i })}>
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
  );
};

export default CodeBlock;
