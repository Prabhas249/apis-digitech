export const metadata = {
  title: 'Apis Digitech Admin',
  description: 'Content Management System',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
