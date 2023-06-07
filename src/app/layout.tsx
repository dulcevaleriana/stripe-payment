import './globals.css'
import { Inter } from 'next/font/google'
import Menu from '@/components/Menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu arrayMenuOptions={[
          {
            name:'Buy Product',
            link:'/'
          },
          {
            name:'Suscription',
            link:'/Suscription'
          }
        ]}/>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
