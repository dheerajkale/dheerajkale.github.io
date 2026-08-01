import { ExpListItem } from '../components/ExpListItem';
import { buildExperienceConfig } from '../utils/experienceConfig';

const experiences = buildExperienceConfig();

export default function Experience() {
    return (
        <div className="min-h-screen w-screen flex flex-col lg:flex-row items-center justify-center px-5">
            <div className="flex flex-col gap-6 w-full max-w-9/12">
                <div className="flex flex-col gap-6 w-full">
                    {experiences.length === 0 ? (
                        <p className="text-black/40">No experience items yet.</p>
                    ) : (
                        experiences.map((exp) => (
                            <ExpListItem key={exp.title} item={exp} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
