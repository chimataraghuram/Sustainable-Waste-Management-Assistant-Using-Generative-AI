import Navbar from './Navbar'

function Layout({ children }) {
  return (
    <div className="gradient-bg min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">{children}</main>
    </div>
  )
}

export default Layout
