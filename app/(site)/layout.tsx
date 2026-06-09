import { draftMode } from 'next/headers'

import { DisableDraftMode } from '@/components/events/disable-draft-mode'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {isDraftMode && <DisableDraftMode />}
    </>
  )
}
