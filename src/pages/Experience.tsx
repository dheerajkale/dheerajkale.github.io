import { ExpListItem } from '../components/ExpListItem';
import SectionLabel from '../components/SectionLabel';
import { buildExperienceConfig } from '../utils/experienceConfig';

const experiences = buildExperienceConfig();

const clients = experiences
    .flatMap((experience) => experience.clients ?? [])
    .filter(
        (client, index, all) =>
            all.findIndex((entry) => entry.toLowerCase() === client.toLowerCase()) === index,
    );

export default function Experience() {
    return (
        <section
            id="experience"
            className="w-full scroll-mt-16 px-5 py-24 sm:px-8 md:py-32 lg:px-12"
        >
            <div className="mx-auto w-full max-w-6xl">
                <SectionLabel>Experience</SectionLabel>

                <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="min-w-0 lg:col-span-5">
                        <h1 className="max-w-md text-balance text-5xl leading-[0.95] sm:text-6xl">
                            Three decades, many hats.
                        </h1>
                        <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                            From agency copy desks to corporate brand teams and public-sector
                            campaigns - writing, planning, and building communication that has to
                            work in the real world.
                        </p>

                        {clients.length > 0 && (
                            <div className="mt-10 border-t border-line pt-6">
                                <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                                    Selected clients &amp; brands
                                </p>
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {clients.map((client) => (
                                        <li
                                            key={client}
                                            className="border border-line px-3 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-ink/40 hover:text-ink"
                                        >
                                            {client}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="min-w-0 lg:col-span-7">
                        {experiences.length === 0 ? (
                            <p className="text-muted">No experience items yet.</p>
                        ) : (
                            <ol className="border-l border-line">
                                {experiences.map((exp, index) => (
                                    <ExpListItem
                                        key={exp.title}
                                        item={exp}
                                        isCurrent={index === 0}
                                    />
                                ))}
                            </ol>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
