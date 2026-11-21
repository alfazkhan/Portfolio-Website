import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/theme';
import Subs2LearnWelcome from '../Subdomains/Subs2LearnWelcome';
import subs2learnData, {
  getSubs2LearnProject,
  getSubs2LearnWelcomeMetadata,
} from '../Subdomains/subs2learn/data-2s2l';

// The global setup file stubs Chakra; this suite renders the real components.
vi.unmock('@chakra-ui/react');

vi.mock('@/components/ui/color-mode', () => ({
  ColorModeButton: () => <button type="button" aria-label="Toggle color mode" />,
}));

const welcome = subs2learnData.welcome;

function renderWelcome() {
  return render(
    <ChakraProvider value={system}>
      <Subs2LearnWelcome project={getSubs2LearnProject()} />
    </ChakraProvider>,
  );
}

afterEach(() => {
  cleanup();
  window.history.replaceState(null, '', '/');
});

describe('Subs2LearnWelcome', () => {
  it('renders the onboarding sections', () => {
    renderWelcome();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to 2Subs2Learn');
    for (const id of ['welcome', 'pin', 'how-to-use', 'settings', 'help']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
    expect(screen.getByRole('heading', { name: welcome.pin.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: welcome.howToUse.download.title })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Open YouTube/i })[0]).toHaveAttribute(
      'href',
      'https://www.youtube.com',
    );
    // First render loads the real Chakra system, which can be slow under a parallel run.
  }, 20000);

  it('shows Chrome instructions by default and switches to Firefox', () => {
    renderWelcome();

    expect(screen.getByText(welcome.pin.steps.chrome[2])).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Rate it/i })).toHaveAttribute(
      'href',
      welcome.help.reviewLinks.chrome,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Firefox' }));

    expect(screen.getByText(welcome.pin.steps.firefox[2])).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Rate it/i })).toHaveAttribute(
      'href',
      welcome.help.reviewLinks.firefox,
    );
  });

  it('honours the ?browser=firefox query parameter', () => {
    window.history.replaceState(null, '', '/welcome?browser=firefox');
    renderWelcome();

    expect(screen.getByRole('button', { name: 'Firefox' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('lets users try the popup settings and see the preview update', () => {
    renderWelcome();
    const settings = document.getElementById('settings');
    const source = settings.querySelector('[data-subtitle-track="source"]');
    const initialSize = source.style.fontSize;

    fireEvent.click(within(settings).getByRole('button', { name: /Increase Target language size/i }));
    expect(within(settings).getByText('23px')).toBeInTheDocument();
    expect(settings.querySelector('[data-subtitle-track="source"]').style.fontSize).not.toBe(initialSize);

    fireEvent.click(within(settings).getByRole('switch'));
    expect(within(settings).getByText(welcome.settings.pausedPreviewText)).toBeInTheDocument();
    expect(settings.querySelector('[data-subtitle-track="source"]')).toBeNull();
  });

  it('exports noindex metadata for the welcome route', () => {
    const metadata = getSubs2LearnWelcomeMetadata();
    expect(metadata.robots.index).toBe(false);
    expect(metadata.alternates.canonical).toBe('https://2subs2learn.theonlyalfaz.com/welcome');
  });
});
