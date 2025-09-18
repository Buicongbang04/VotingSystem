import {
  HeroPage,
  FeaturesPage,
  StatsPage,
  ContactPage,
  Footer,
} from "../../components/landingPart"

export default function Home() {
  return (
    <main className=''>
      <HeroPage />
      <FeaturesPage />
      <StatsPage />
      <ContactPage />
      <Footer />
    </main>
  )
}
