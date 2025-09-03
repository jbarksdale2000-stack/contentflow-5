export const metadata = {
  title: 'ContentFlow',
  description: 'Minimal one-pager SaaS that auto-organizes, repurposes, and publishes content.',
};

import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
