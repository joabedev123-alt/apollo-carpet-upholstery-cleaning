import './globals.css';

export const viewport = {
  themeColor: '#0b2545',
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
};

export const metadata = {
  title: 'Apollo Carpet & Upholstery Cleaning | Orlando & Central Florida',
  description: 'Professional carpet, sofa, upholstery, mattress, area rug, and house cleaning services in Orlando, Kissimmee, Davenport, Windermere, and Ocoee. Get a free custom quote today!',
  keywords: 'carpet cleaning orlando, upholstery cleaning kissimmee, sofa cleaning davenport, deep steam extraction windermere, rug cleaning ocoee',
  authors: [{ name: 'Apollo Carpet & Upholstery Cleaning' }],
  icons: {
    icon: '/assets/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
