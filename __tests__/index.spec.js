import React from 'react';
import { render, cleanup } from 'react-testing-library';

import useMediaQueryHook from '../index';

function getMatchMediaMock(matches = false) {
  const mediaQueryList = {
    matches,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };

  const matchMedia = jest.fn(() => {
    return mediaQueryList;
  });

  return { matchMedia, mediaQueryList };
}

function Demo({ query }) {
  const isNarrow = useMediaQueryHook(query);
  return isNarrow ? 'narrow screen' : 'widescreen';
}

describe('useMediaQueryHook', () => {
  beforeEach(cleanup);

  it('should create mediaQueryList for corresponding query', () => {
    const { matchMedia } = getMatchMediaMock();
    window.matchMedia = matchMedia;

    render(<Demo query="(min-width: 320) and (max-width: 425px)" />);

    expect(matchMedia).toBeCalledWith('(min-width: 320) and (max-width: 425px)');
    expect(matchMedia).toBeCalledTimes(1);
  });

  describe('media-query-list', () => {
    const { matchMedia, mediaQueryList } = getMatchMediaMock();
    
    beforeEach(() => {
      window.matchMedia = matchMedia;
      matchMedia.mockClear();
      mediaQueryList.addListener.mockClear();
      mediaQueryList.removeListener.mockClear();
    });

    afterEach(() => {
      expect(matchMedia).toBeCalledTimes(1);
    });

    it('should attach event listener on mounting', () => {
      render(<Demo query="(min-width: 425px)" />);

      expect(mediaQueryList.addListener).toBeCalledWith(expect.any(Function));
      expect(mediaQueryList.addListener).toBeCalledTimes(1);
      expect(mediaQueryList.removeListener).not.toBeCalled();
    });

    it('should remove event listener when unmount', () => {
      const { unmount } = render(<Demo query="(min-width: 425px)" />);
      unmount();
      expect(mediaQueryList.removeListener).toBeCalledWith(
        expect.any(Function)
      );
    });
  });

  describe('media-query matches', () => {
    it('should render /narrow screen/', () => {
      const { matchMedia } = getMatchMediaMock(true);
      window.matchMedia = matchMedia;

      const { container, getByText } = render(<Demo query="(max-width: 425px)" />);

      expect(container.innerHTML).not.toMatch(/widescreen/gi);
      expect(getByText(/narrow screen/i)).toBeTruthy();
    })
  });

  describe("media-query doesn't match", () => {
    it('should render /widescreen/', () => {
      const { matchMedia } = getMatchMediaMock(false);
      window.matchMedia = matchMedia;

      const { container, getByText } = render(<Demo query="(min-width: 1024px)" />);

      expect(container.innerHTML).not.toMatch(/narrow screen/gi);
      expect(getByText(/widescreen/i)).toBeTruthy();
    })
  });
});
