import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useMediaQuery from 'use-media-query-hook';

import styles from './index.css';

const DEFAULT_MEDIA_QUERY_STR = '(max-width: 425px)';

const Demo = ({ mediaQueryString }) => {
  const match = useMediaQuery(mediaQueryString);

  console.info(`${mediaQueryString} -> ${match}`);
  console.info(`%c${match ? '📱' : '💻'}`, 'font-size: 32px');

  return <h1 className={styles.emoji}>{match ? '📱' : '💻'}</h1>;
};

const App = () => {
  const [mediaStr, setMediaStr] = useState(DEFAULT_MEDIA_QUERY_STR);
  const [value, setValue] = useState(DEFAULT_MEDIA_QUERY_STR);

  const inputClassname = mediaStr !== value ? styles.dirty : undefined;

  return (
    <React.Fragment>
      <Demo mediaQueryString={mediaStr} />
      <div className={styles.option}>
        <input
          className={inputClassname}
          type="text"
          title="Media query string to check when mobile emoji is shown"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={() => setMediaStr(value)}>Update media query</button>
      </div>
      <a
        className={styles.github}
        title="GitHub project: use-media-query-hook"
        href="https://github.com/carloluis/use-media-query-hook"
        target="_blank"
      >
        use-media-query-hook
      </a>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
