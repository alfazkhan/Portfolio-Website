import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectInfoModal from '../ProjectInfoModal';

vi.mock('@chakra-ui/react', async (importOriginal) => {
  const actual = await importOriginal();
  const Wrapper = ({ children, ...props }) => <div {...props}>{children}</div>;
  const Trigger = ({ children }) => children;

  return {
    ...actual,
    Button: ({ children, onClick }) => (
      <button onClick={onClick}>{children}</button>
    ),
    CloseButton: () => <button aria-label="Close">Close</button>,
    Dialog: {
      Root: ({ ref, ...props }) => <div ref={ref} {...props}></div>,
      Trigger,
      Backdrop: () => null,
      Positioner: Wrapper,
      Content: Wrapper,
      Header: Wrapper,
      CloseTrigger: Trigger,
      Body: Wrapper,
      Footer: Wrapper,
    },
    Portal: Wrapper,
    Image: ({ children }) => <div>{children}</div>,
    Box: Wrapper,
    Group: Wrapper,
    Text: ({ children }) => <span>{children}</span>,
    Separator: () => <hr />,
    Flex: ({ children, ...props }) => (
      <div {...props}>{children}</div>
    ),
    Heading: ({ children, ...props }) => (
      <h1 {...props}>{children}</h1>
    ),
  };
});

vi.mock('next/image', () => ({
  default: () => <span aria-hidden="true" />,
}));

vi.mock('@/components/ui/color-mode', () => ({
  useColorMode: () => ({ colorMode: 'light' }),
}));

vi.mock('react-icons/fa6', () => ({
  FaChrome: (props) => <span {...props} data-icon="fa-chrome" />,
  FaFirefox: (props) => <span {...props} data-icon="fa-firefox" />,
}));

const project = {
  title: 'Sample project',
  img: '/sample.png',
  markdownPath: '/sample.md',
  repoLink: 'https://github.com/example/sample',
  link: 'https://example.com',
  skills: [{ id: 1, name: 'React', class: 'react-icon' }],
};

const renderModal = (projectOverrides = {}) =>
  render(<ProjectInfoModal project={{ ...project, ...projectOverrides }} />);

describe('ProjectInfoModal', () => {
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
    global.fetch = vi.fn().mockResolvedValue({
      text: () => Promise.resolve('# Project details'),
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('shows repository and live-preview actions without download links', () => {
    renderModal();

    expect(screen.getByRole('button', { name: 'Github Repo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Live Preview' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /install for/i })).not.toBeInTheDocument();
  });

  it('opens the repository and live-preview URLs', async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByRole('button', { name: 'Github Repo' }));
    await user.click(screen.getByRole('button', { name: 'Live Preview' }));

    expect(window.open).toHaveBeenNthCalledWith(1, project.repoLink);
    expect(window.open).toHaveBeenNthCalledWith(2, project.link);
  });

  it('shows and opens each available install link', async () => {
    const user = userEvent.setup();
    const downloadLinks = {
      chrome: 'https://example.com/chrome',
      firefox: 'https://example.com/firefox',
    };
    renderModal({ downloadLinks });

    await user.click(screen.getByRole('button', { name: 'Install for Chrome' }));
    await user.click(screen.getByRole('button', { name: 'Install for Firefox' }));

    expect(screen.queryByRole('button', { name: 'Github Repo' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Live Preview' })).not.toBeInTheDocument();
    expect(window.open).toHaveBeenNthCalledWith(1, downloadLinks.chrome);
    expect(window.open).toHaveBeenNthCalledWith(2, downloadLinks.firefox);
  });

  it('fetches and renders the project Markdown', async () => {
    renderModal();

    expect(await screen.findByRole('heading', { name: 'Project details' })).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(project.markdownPath);
  });
});
