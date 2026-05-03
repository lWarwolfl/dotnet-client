import Footer from '@/features/landing/components/layout/footer'
import Header from '@/features/landing/components/layout/header'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex flex-1 flex-col px-4 py-6">
      <Header />

      {children}

      <Footer />
    </main>
  )
}
