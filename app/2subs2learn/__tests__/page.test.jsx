import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Subs2LearnLayout, { metadata } from '../layout';
import Subs2LearnPage from '../page';

vi.mock('@/components/Subdomains/Subs2LearnLanding', () => ({
  default: ({ project }) => (
    <div data-testid="subs2learn-landing">
      <h1>{project.title}</h1>
      <p data-testid="summary">{project.summary}</p>
      <ul data-testid="tech-stack">
        {project.techStack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a href={project.downloadLinks?.chrome}>Chrome</a>
      <a href={project.downloadLinks?.firefox}>Firefox</a>
    </div>
  ),
}));

afterEach(() => cleanup());

describe('/2subs2learn route', () => {
  it('exports subdomain-specific SEO and OpenGraph metadata from layout', () => {
    expect(metadata.title.absolute).toBe('2Subs2Learn | Bilingual Subtitle Browser Extension');
    expect(metadata.alternates.canonical).toBe('https://2subs2learn.theonlyalfaz.com');
    expect(metadata.openGraph.url).toBe('https://2subs2learn.theonlyalfaz.com');
    expect(metadata.openGraph.siteName).toBe('2Subs2Learn');

    render(
      <Subs2LearnLayout>
        <Subs2LearnPage />
      </Subs2LearnLayout>,
    );

    expect(screen.getByRole('heading', { name: '2Subs2Learn' })).toBeInTheDocument();
  });

  it('passes sanitized 2Subs2Learn project data from data.js', () => {
    render(<Subs2LearnPage />);

    expect(screen.getByRole('heading', { name: '2Subs2Learn' })).toBeInTheDocument();
    expect(screen.getByTestId('summary').textContent).not.toMatch(/<\/?em>/);
    expect(screen.getByTestId('tech-stack')).not.toHaveTextContent('or equivalent');
    expect(screen.getByText('End-to-End Testing')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Chrome' })).toHaveAttribute(
      'href',
      'https://chromewebstore.google.com/detail/egkapkomakndamdhmlgknamdhmfnmkbf',
    );
  });
});
