import '../styles/globals.css'
import { AppWrapper } from "../components/context"
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Navbar />
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
