import ProfileImage from '../components/ProfileImage';
import SectionLabel from '../components/SectionLabel';
import profilePhoto from '../assets/about/profile.jpeg';

const FACTS = [
    { value: '30', label: 'Years of experience' },
    { value: '06', label: 'Agencies & brands' },
    { value: '04', label: 'Media disciplines' },
];

export default function About() {
    return (
        <section
            id="about"
            className="w-full scroll-mt-16 px-5 py-24 sm:px-8 md:py-32 lg:px-12"
        >
            <div className="mx-auto w-full max-w-6xl">
                <SectionLabel>About</SectionLabel>

                <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="min-w-0 lg:col-span-5">
                        <ProfileImage src={profilePhoto} alt="Portrait of Dheeraj Kale" />
                    </div>

                    <div className="min-w-0 lg:col-span-7">
                        <h1 className="max-w-2xl text-balance text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                            Hi, I am Dheeraj.
                        </h1>

                        <p className="mt-7 max-w-xl font-display text-2xl italic leading-snug text-muted sm:text-3xl">
                            Creativity from advertising. Discipline from the corporate world.
                        </p>

                        <div className="mt-9 max-w-2xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                            <p className="dropcap text-ink/80">
                                With nearly three decades of experience in Advertising and Corporate
                                Communications, I bring a rare blend of creativity and professionalism to
                                everything I do. My creativity stems from my advertising background, while
                                years of navigating the corporate landscape have instilled in me a strong
                                sense of professionalism, discipline, and strategic thinking.
                            </p>

                            <p>
                                Over the course of my career, I have mastered the finer nuances of
                                communication across Print, Digital, Outdoor, and Electronic Media. My journey
                                has given me the opportunity to wear many hats - from Copywriting and Client
                                Servicing to Media Planning, Vendor Liaison, Marketing Strategy, and Brand
                                Building. Each role has enriched my perspective and strengthened my ability to
                                deliver impactful communication solutions.
                            </p>

                            <p>
                                Today, as a seasoned and versatile leader, I continue to embrace learning with
                                the same enthusiasm that has driven me throughout my career. I believe that
                                every new challenge presents an opportunity to grow, innovate, and create
                                meaningful value.
                            </p>
                        </div>

                        <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-6">
                            {FACTS.map(({ value, label }) => (
                                <div key={label}>
                                    <dt className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted">
                                        {label}
                                    </dt>
                                    <dd className="mt-2 font-display text-4xl leading-none">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
