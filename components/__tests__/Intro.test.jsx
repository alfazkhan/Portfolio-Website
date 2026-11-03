import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Intro from '../PageSections/Intro';

vi.mock('@chakra-ui/react', () => {
  const Wrapper = ({ as: Element = 'div', children, id }) => (
    <Element id={id}>{children}</Element>
  );

  return {
    Box: Wrapper,
    Flex: Wrapper,
    Heading: ({ children }) => <h1>{children}</h1>,
    Image: ({ alt }) => <span role="img" aria-label={alt} />,
    Highlight: ({ children }) => <>{children}</>,
    useBreakpointValue: () => ({ radiusX: 145, radiusY: 65 }),
  };
});

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style }) => <div style={style}>{children}</div>,
    p: ({ children }) => <p>{children}</p>,
    span: ({ children, style }) => <span style={style}>{children}</span>,
  },
}));

vi.mock('@/components/ui/CVDownloadButton', () => ({
  default: () => <button>Download CV</button>,
}));

vi.mock('../ui/AtomicOrbit', () => {
  const mockIcons = [
    'SiJavascript',
    'SiTypescript',
    'SiReact',
    'SiNodedotjs',
    'SiNextdotjs',
    'SiWxt',
    'TanstackIcon',
    'PythonIcon',
    'SiFastapi',
    'PostgreSQLIcon',
    'SiGit',
  ];

  return {
    default: ({ layer, radiusX, radiusY }) => (
      <div data-layer={layer} data-radius-x={radiusX} data-radius-y={radiusY}>
        {mockIcons.map((icon, idx) => (
          <span key={`${layer}-${idx}`} data-icon={icon} />
        ))}
      </div>
    ),
  };
});

afterEach(() => cleanup());

describe('Intro', () => {
  it('renders the profile introduction, CV action, and responsive orbit layers with core skills only', () => {
    const { container } = render(<Intro />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hi! I am Alfaz, Frontend Engineer | React & Typescript',
    );
    expect(screen.getByRole('img', { name: 'Alfaz Profile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download CV' })).toBeInTheDocument();
    expect(container.querySelector('[data-layer="back"]')).toHaveAttribute('data-radius-x', '145');
    expect(container.querySelector('[data-layer="front"]')).toHaveAttribute('data-radius-y', '65');

    const expectedIcons = [
      'SiJavascript',
      'SiTypescript',
      'SiReact',
      'SiNodedotjs',
      'SiNextdotjs',
      'SiWxt',
      'TanstackIcon',
      'PythonIcon',
      'SiFastapi',
      'PostgreSQLIcon',
      'SiGit',
    ];
    const orbitLayers = container.querySelectorAll('[data-layer]');

    expect(orbitLayers).toHaveLength(2);
    orbitLayers.forEach((layer) => {
      const orbitIcons = layer.querySelectorAll('[data-icon]');
      expect(Array.from(orbitIcons, (icon) => icon.dataset.icon)).toEqual(expectedIcons);
    });
  });
});
