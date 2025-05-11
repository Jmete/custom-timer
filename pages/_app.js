import '../styles/globals.css'
import { TimerProvider } from '../contexts/TimerContext'

function MyApp({ Component, pageProps }) {
  return (
    <TimerProvider>
      <Component {...pageProps} />
    </TimerProvider>
  )
}

export default MyApp