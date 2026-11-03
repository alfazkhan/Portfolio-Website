import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CVDownloadButton from '../ui/CVDownloadButton';

vi.mock('@chakra-ui/react', async () => {
  const React = await import('react');
  const Primitive = React.forwardRef(function Primitive(
    { as: Element = 'div', children, ...props },
    ref,
  ) {
    return <Element ref={ref} {...props}>{children}</Element>;
  });

  return {
    Box: Primitive,
    Flex: Primitive,
    Image: ({ alt = '' }) => <span role="img" aria-label={alt} />,
    Icon: () => <span aria-hidden="true" />,
    Text: ({ children }) => <span>{children}</span>,
  };
});

vi.mock('framer-motion', async () => {
  const React = await import('react');
  return {
    AnimatePresence: ({ children }) => children,
    motion: {
      create: (Component) => {
        const MotionComponent = React.forwardRef(function MotionComponent(props, ref) {
          return <Component {...props} ref={ref} />;
        });
        MotionComponent.displayName = `Motion(${Component.displayName || Component.name || 'Component'})`;
        return MotionComponent;
      },
      span: ({ children, ...props }) => <span {...props}>{children}</span>,
    },
  };
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('CVDownloadButton', () => {
  it('reveals language choices and opens the selected CV link', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<CVDownloadButton />);

    await user.click(screen.getByText('Download CV'));
    expect(screen.getByText('Choose Language')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /English Version/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /German Version/ })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /English Version/ }));

    expect(window.open).toHaveBeenCalledWith(
      'https://drive.google.com/file/d/1s-BDT456nDBJiTS-4LZb-p1_oCfCiM9P/view?usp=sharing',
    );
  });
});
