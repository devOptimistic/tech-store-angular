import { Address, User } from '../models/user';

/**
 * Demo credentials. There is no backend, so accounts live in the browser's localStorage.
 * This account always exists and is advertised on the sign-in dialog for anyone trying the demo.
 */
export const DEMO_ACCOUNT = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@techstore.com',
  password: 'demo1234',
} as const;

/** An account as kept in localStorage: the profile plus its (demo-only, plain-text) password. */
export type UserAccount = User & { password: string };

export const DEMO_ADDRESSES: Address[] = [
  {
    id: 0,
    fullName: 'Michael Brown',
    phone: '(312) 555-9876',
    streetAddress: '789 Michigan Avenue',
    city: 'Chicago',
    postalCode: '60601',
    isMain: false,
  },
  {
    id: 1,
    fullName: 'Sarah Wilson',
    phone: '(415) 555-4321',
    streetAddress: '101 Market Street, Suite 200',
    city: 'San Francisco',
    postalCode: '94105',
    isMain: true,
  },
];

/** Generates a local initials avatar so no external image is needed. */
export function avatarFor(name: string): string {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>` +
    `<rect width="64" height="64" fill="url(#g)"/>` +
    `<text x="32" y="40" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="#fff" text-anchor="middle">${initials}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export function createDemoAccount(): UserAccount {
  return {
    id: DEMO_ACCOUNT.id,
    name: DEMO_ACCOUNT.name,
    email: DEMO_ACCOUNT.email,
    password: DEMO_ACCOUNT.password,
    imageUrl: avatarFor(DEMO_ACCOUNT.name),
    addresses: DEMO_ADDRESSES.map(a => ({ ...a })),
  };
}
