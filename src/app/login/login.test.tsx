import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import RouteComponent from './page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/lib/auth', () => ({
  authClient: { signIn: { email: vi.fn() } },
}));

vi.mock(
  'next/link',
  () =>
    ({ children }: any) =>
      children
);

describe('Login Page', () => {
  it('has email placeholder', () => {
    render(<RouteComponent />);
    expect(document.querySelector('[placeholder="Email"]')).toBeTruthy();
  });

  it('has password placeholder', () => {
    render(<RouteComponent />);
    expect(document.querySelector('[placeholder="Password"]')).toBeTruthy();
  });
});
