import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Subs2LearnLanding from '../Subdomains/Subs2LearnLanding';

vi.mock('@chakra-ui/react', async () => {
  const React = await import('react');
  const stripChakraProps = ({
    alignItems,
    align,
    bg,
    borderBottomWidth,
    borderColor,
    borderRadius,
    borderTopWidth,
    borderWidth,
    boxShadow,
    boxSize,
    color,
    colorPalette,
    direction,
    display,
    flex,
    flexDirection,
    flexShrink,
    fontSize,
    fontWeight,
    gap,
    gridColumn,
    h,
    justify,
    justifyContent,
    letterSpacing,
    lineHeight,
    listStyleType,
    maxW,
    minH,
    mt,
    overflow,
    position,
    px,
    py,
    p,
    size,
    top,
    variant,
    w,
    wrap,
    zIndex,
    _hover,
    ...rest
  }) => rest;

  const Primitive = React.forwardRef(function Primitive(
    { as: Element = 'div', children, ...props },
    ref,
  ) {
    return (
      <Element ref={ref} {...stripChakraProps(props)}>
        {children}
      </Element>
    );
  });

  return {
    Badge: ({ children }) => <span>{children}</span>,
    Box: Primitive,
    Button: ({ asChild, children, ...props }) => {
      const cleanProps = stripChakraProps(props);
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, cleanProps);
      }
      return <button {...cleanProps}>{children}</button>;
    },
    Container: Primitive,
    Flex: Primitive,
    Heading: ({ as: Element = 'h2', children, ...props }) => (
      <Element {...stripChakraProps(props)}>{children}</Element>
    ),
    Highlight: ({ children }) => <>{children}</>,
    HStack: Primitive,
    Icon: ({ 'aria-hidden': ariaHidden }) => <span aria-hidden={ariaHidden} />,
    Link: ({ children, ...props }) => <a {...stripChakraProps(props)}>{children}</a>,
    SimpleGrid: Primitive,
    Stack: Primitive,
    Text: ({ children }) => <span>{children}</span>,
  };
});

vi.mock('next/image', () => ({
  default: ({ alt, src, width, height }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={typeof src === 'string' ? src : src?.src || ''} width={width} height={height} />
  ),
}));

vi.mock('@/components/ui/color-mode', () => ({
  ColorModeButton: () => <button type="button" aria-label="Toggle color mode" />,
}));

vi.mock('react-icons/fa6', () => ({
  FaChrome: () => <span data-icon="chrome" />,
  FaFirefox: () => <span data-icon="firefox" />,
  FaGithub: () => <span data-icon="github" />,
}));

vi.mock('react-icons/fi', () => ({
  FiArrowUpRight: () => <span data-icon="arrow" />,
  FiCheckCircle: () => <span data-icon="check" />,
  FiCpu: () => <span data-icon="cpu" />,
  FiGlobe: () => <span data-icon="globe" />,
  FiLayers: () => <span data-icon="layers" />,
  FiSliders: () => <span data-icon="sliders" />,
}));

const sampleProject = {
  title: '2Subs2Learn',
  year: '2026',
  category: 'Browser Extension & Product Development',
  summary: 'Simultaneous original and translated subtitles for YouTube and ZDF Mediathek.',
  img: { src: '/2s2l.png', width: 1280, height: 720 },
  link: 'https://2subs2learn.theonlyalfaz.com',
  repoLink: 'https://github.com/alfazkhan/2Subs2Learn',
  downloadLinks: {
    chrome: 'https://chromewebstore.google.com/detail/egkapkomakndamdhmlgknamdhmfnmkbf',
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/2subs2learn/',
  },
  techStack: ['WXT (Manifest V3)', 'TypeScript', 'Transformers.js'],
  features: ['Multi-platform subtitle synchronization (YouTube, ZDF Mediathek)'],
  challengesSolved: ['Handled complex subtitle formats (JSON3, EBU-TT-D XML) seamlessly'],
};

afterEach(() => cleanup());

describe('Subs2LearnLanding', () => {
  it('renders product hero, action links, platform integrations, and technical sections', () => {
    render(<Subs2LearnLanding project={sampleProject} />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Learn languages faster with dual subtitles/i,
    );
    expect(
      screen.getByRole('img', { name: /2Subs2Learn dual-subtitle overlay preview on YouTube/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toggle color mode' })).toBeInTheDocument();

    const chromeLinks = screen.getAllByRole('link', { name: /Install for Chrome/i });
    expect(chromeLinks[0]).toHaveAttribute('href', sampleProject.downloadLinks.chrome);
    expect(chromeLinks[0]).toHaveAttribute('target', '_blank');

    const firefoxLinks = screen.getAllByRole('link', { name: /Install for Firefox/i });
    expect(firefoxLinks[0]).toHaveAttribute('href', sampleProject.downloadLinks.firefox);

    const githubLinks = screen.getAllByRole('link', { name: /GitHub Repo/i });
    expect(githubLinks[0]).toHaveAttribute('href', sampleProject.repoLink);

    const portfolioLink = screen.getByRole('link', { name: /Portfolio by Alfaz Khan/i });
    expect(portfolioLink).toHaveAttribute('href', 'https://www.theonlyalfaz.com');

    expect(screen.getByRole('heading', { name: 'YouTube' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ZDF Mediathek' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Browser-Side AI Translation' })).toBeInTheDocument();
    expect(screen.getByText('WXT (Manifest V3)')).toBeInTheDocument();
    expect(
      screen.getByText('Multi-platform subtitle synchronization (YouTube, ZDF Mediathek)'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Handled complex subtitle formats (JSON3, EBU-TT-D XML) seamlessly'),
    ).toBeInTheDocument();
  });

  it('omits unavailable download actions gracefully', () => {
    render(
      <Subs2LearnLanding
        project={{
          ...sampleProject,
          downloadLinks: undefined,
          repoLink: undefined,
        }}
      />,
    );

    expect(screen.queryByRole('link', { name: /Install for Chrome/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Install for Firefox/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /GitHub Repo/i })).not.toBeInTheDocument();
  });
});
