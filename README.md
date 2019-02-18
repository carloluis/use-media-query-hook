# use-media-query-hook
> React hook to check when a media query result changes

## Install

```bash
yarn add use-media-query-hook
```

## Usage

```jsx
import React from 'react';
import useMediaQuery from 'use-media-query';

const App = () => {
  const isMobile = useMediaQuery('(max-width: 425px)')
  return (
    <h1>
      { isMobile ? '📱' : '💻' }
    </h1>
  );
}
```
