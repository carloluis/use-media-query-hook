import React from 'react';
import ReactDOM from 'react-dom';
import useMediaQuery from 'use-media-query-hook';

import styles from './index.css';

const Demo = () => {
  const isMobile = useMediaQuery('(max-width: 425px)');

  console.info(`%c${isMobile ? '📱' : '💻'}`, 'font-size: 32px');

  return <h1 className={styles.emoji}>{isMobile ? '📱' : '💻'}</h1>;
};

ReactDOM.render(<Demo />, document.querySelector('#app'));
