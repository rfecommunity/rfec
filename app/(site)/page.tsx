import Hero from '@/components/hero'
import Join from '@/components/join'
import Mission from '@/components/mission'
import Partners from '@/components/partners'
import UpcomingEvents from '@/components/upcoming-events'
import WhoWeAre from '@/components/who-we-are'

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Mission />
      <UpcomingEvents />
      <Join />
      <Partners />
    </>
  )
}
