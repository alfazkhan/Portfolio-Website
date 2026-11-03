import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock React imports to provide expect and other utilities
vi.mock('#imports', () => ({
  storage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    watch: vi.fn(),
  },
}));

// Mock window object for testing
Object.defineProperty(window, 'ytInitialPlayerResponse', {
  value: {
    captions: {
      playerCaptionsTracklistRenderer: {
        captionTracks: [],
      },
    },
  },
  configurable: true,
});

global.fetch = vi.fn();

const mockOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockOpen,
  configurable: true,
});

// Mock Chakra UI components for testing using plain JavaScript functions
vi.mock('@chakra-ui/react', async () => {
  const actualChakra = await vi.importActual('@chakra-ui/react');
  return {
    ...actualChakra,
    Button: ({ children, onClick }) => {
      const button = document.createElement('button');
      button.textContent = children;
      if (onClick) {
        button.addEventListener('click', onClick);
      }
      return button;
    },
    CloseButton: () => {
      const button = document.createElement('button');
      button.className = 'close-btn';
      button.textContent = '✕';
      return button;
    },
    Dialog: ({ children }) => {
      const div = document.createElement('div');
      div.className = 'dialog';
      div.appendChild(document.createTextNode(children));
      return div;
    },
    Portal: ({ children }) => {
      const div = document.createElement('div');
      div.className = 'portal';
      div.appendChild(document.createTextNode(children));
      return div;
    },
    Image: ({ src, alt }) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      return img;
    },
    Box: ({ children, className }) => {
      const div = document.createElement('div');
      div.className = `box ${className}`;
      div.appendChild(document.createTextNode(children));
      return div;
    },
    Group: ({ children, className }) => {
      const div = document.createElement('div');
      div.className = `group ${className}`;
      div.appendChild(document.createTextNode(children));
      return div;
    },
    Text: ({ children, className }) => {
      const span = document.createElement('span');
      span.className = `text ${className}`;
      span.textContent = children;
      return span;
    },
    Separator: ({ display, className }) => {
      const hr = document.createElement('hr');
      hr.className = `separator ${display} ${className}`;
      return hr;
    },
  };
});
