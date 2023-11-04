import '../styles/globals.css'
import Provider from './Provider'


export const metadata = {
  title: 'FlixWave',
  description: 'Recommendation Engine for Movies and Music',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className='bg-primary text-white'>
        <Provider >
          <main>
            {children}
          </main>
      </Provider>
      </body>
    </html>
  )
}
