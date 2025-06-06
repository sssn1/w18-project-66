import { Metadata } from 'next';
import Header_66 from '@/components/shared/header_66';
import Footer_66 from '@/components/shared/footer_66';
export const metadata: Metadata = {
  title: 'TKU_66'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header_66 />
      <main className="flex-1 wrapper">
        {children}
      </main>
      <Footer_66 />
    </div>
  );
}
