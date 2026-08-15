import { useRef } from 'react';
import Landing from './pages/Landing';
import About from './pages/About';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import SectionDivider from './components/SectionDivider';

const PINK = '#ff2d6a';
const CYAN = '#00e8ff';
const YELLOW = '#ffe600';

export default function App() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return <>
        <div ref={scrollRef} className="">
            <Landing />
            <SectionDivider
                primaryWords={[
                    'ADVERTISING',
                    'COPYWRITING',
                    'BRAND BUILDING',
                    'MEDIA PLANNING',
                    'MARKETING STRATEGY',
                    'CORPORATE COMMUNICATIONS',
                ]}
                secondaryWords={['creativity', 'professionalism', 'discipline', 'strategic thinking', 'impact']}
                accent={PINK}
            />
            <About />
            <SectionDivider
                primaryWords={['PRINT', 'DIGITAL', 'OUTDOOR', 'ELECTRONIC MEDIA', 'RADIO', 'TELEVISION']}
                secondaryWords={['copy', 'campaigns', 'communication', 'brands', 'design']}
                accent={CYAN}
                reverse
            />
            <Experience />
            <SectionDivider
                primaryWords={['CREATIVITY', 'INNOVATION', 'IMPACT', 'MEANINGFUL VALUE']}
                secondaryWords={['every challenge is an opportunity', 'grow', 'learn', 'create']}
                accent={YELLOW}
            />
            <Gallery />
            <SectionDivider
                primaryWords={['LET\u2019S CREATE TOGETHER', 'SAY HELLO', 'GET IN TOUCH']}
                secondaryWords={['collaborate', 'connect', 'create']}
                accent={PINK}
            />
            <Contact />
        </div>
    </>
}
