import { useRef, useState, useEffect } from 'react';
import Landing from './pages/Landing';
import About from './pages/About';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

export default function App() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return <>
        <div ref={scrollRef} className="">
            <Landing />
            <About />
            <Experience />
            <Gallery />
            <Contact />
        </div>
    </>
}
