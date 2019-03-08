# use-media-query-hook
> React hook to check when a media query result changes

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![npm](https://img.shields.io/npm/v/use-media-query-hook.svg)](https://www.npmjs.com/package/use-media-query-hook)
[![Build Status](https://travis-ci.org/carloluis/use-media-query-hook.svg?branch=master)](https://travis-ci.org/carloluis/use-media-query-hook)
[![PeerDependencies](https://img.shields.io/david/peer/carloluis/use-media-query-hook.svg)](https://david-dm.org/carloluis/use-media-query-hook?type=peer)

[Demo page](https://carloluis.github.io/use-media-query-hook/)

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

Check MDN docs on [using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries "Using media queries")
