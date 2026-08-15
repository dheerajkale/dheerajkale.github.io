import { ExpListItem } from '../components/ExpListItem';
import { buildExperienceConfig } from '../utils/experienceConfig';

const experiences = buildExperienceConfig();

export default function Experience() {
    return (
        <div className="w-screen min-h-screen bg-linear-to-b from-white via-[#ececec] to-white text-black flex flex-col items-center justify-center px-5 py-16 lg:py-24">
            <h1 className="text-4xl lg:text-5xl mb-10 lg:mb-14">Experience</h1>
            <div className="flex flex-col gap-6 lg:gap-8 w-full max-w-10/12">
                {experiences.length === 0 ? (
                    <p className="text-black/40">No experience items yet.</p>
                ) : (
                    experiences.map((exp) => (
                        <ExpListItem key={exp.title} item={exp} />
                    ))
                )}
            </div>
        </div>
    );
}
