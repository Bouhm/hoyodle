import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ position: 'fixed', zIndex: 99, width: '100%' }}>
        <Navbar />
      </div>
      <main> {children} </main>
      <Footer />
    </>
  )
}