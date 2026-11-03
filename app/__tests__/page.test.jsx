import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Page from '../page';

vi.mock('@chakra-ui/react', () => {
  const Wrapper = ({ as: Element = 'div', children, ...props }) => (
    <Element {...props}>{children}</Element>
  );

  return {
    Box: Wrapper,
    Flex: Wrapper,
    Text: ({ children }) => <span>{children}</span>,
    Spinner: () => <div role="status" />,
  };
});

vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }) => children,
  easeIn: 'easeIn',
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  stagger: vi.fn(),
}));

vi.mock('@/components/PageSections/NavigationBar', () => ({
  default: () => <nav aria-label="Primary navigation" />,
}));
vi.mock('@/components/PageSections/LeftSidebar', () => ({
  default: () => <aside aria-label="Profile" />,
}));
vi.mock('@/components/PageSections/Intro', () => ({
  default: () => <section aria-label="Introduction" />,
}));
vi.mock('@/components/PageSections/WorkSection', () => ({
  default: () => <section aria-label="Projects" />,
}));
vi.mock('@/components/PageSections/EducationSection', () => ({
  default: () => <section aria-label="Education" />,
}));
vi.mock('@/components/PageSections/SkillsSection', () => ({
  default: () => <section aria-label="Skills" />,
}));
vi.mock('@/components/PageSections/ContactSection', () => ({
  default: () => <section aria-label="Contact" />,
}));

afterEach(() => cleanup());

describe('home page', () => {
  it('renders the portfolio navigation and all main sections after mounting', async () => {
    render(<Page />);

    expect(await screen.findByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Profile' })).toBeInTheDocument();

    for (const section of ['Introduction', 'Projects', 'Education', 'Skills', 'Contact']) {
      expect(screen.getByRole('region', { name: section })).toBeInTheDocument();
    }
  });
});
