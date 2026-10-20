import Landing from './pages/Landing';
import About from './pages/About';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

export default function App() {
    return (
        <div id="top" className="page-grain min-h-svh w-full overflow-x-hidden bg-paper">
            <SiteHeader />
            <main>
                <Landing />
                <About />
                <Gallery />
                <Experience />
                <Contact />
            </main>
            <SiteFooter />
        </div>
    );
}
