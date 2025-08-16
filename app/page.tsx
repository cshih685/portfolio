import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Resume from '@/components/Resume';
import PhotoAlbum from '@/components/PhotoAlbum';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <Hero />
      <About />
      <Resume />
      <PhotoAlbum />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}