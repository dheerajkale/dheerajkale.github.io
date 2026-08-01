import type { ExpItem } from '../types/exp-item';
import { ExpListItem } from '../components/ExpListItem';

export default function Experience() {
    const experiences: ExpItem[] = [
        {
            title: 'INCL Media Group',
            company: 'Copy Head (Retainer)',
            period: 'Sep 2021 – Present',
            description:
                '360° advertising and digital marketing agency serving public and private sector clients including ABP Ganga & ABP Asmita (ABP Network), Delhi Public School Modinagar, Central Cottage Industries Emporium, Pawan Hans Limited, Ministry of Rural Development, Ministry of Corporate Affairs, Airport Authority of India, Delhi Development Authority, and UP Tourism.',
        },
        {
            title: 'Another Idea',
            company: 'Copywriter (Retainer)',
            period: 'Apr 2023 – Apr 2025',
            description:
                "Mumbai-based advertising agency specialising in real estate, with clients including Hiranandani Communities, Adani Realty, Paradigm Realty, Siddha Group, Auro Group, Ajmera Group, Puravankara, Brookfields, Sreenidhi, Omaxe, and Transcon.",
        },
        {
            title: 'Unitech Ltd.',
            company: 'Manager – Advertising',
            period: 'Jul 2012 – Jul 2021',
            description:
                "India's second-largest real estate group for several decades, with a diversified portfolio spanning residential, commercial, IT parks, retail, hospitality, and SEZ projects.",
        },
        {
            title: 'Vipul Ltd.',
            company: 'Sr. Manager – Advertising & PR',
            period: 'Oct 2010 – Jun 2012',
            description:
                'Leading North India real estate developer with residential and commercial projects across Gurgaon, Faridabad, Dharuhera, Bhubaneswar, and Ludhiana.',
        },
        {
            title: 'Study Overseas India Pvt. Ltd.',
            company: 'Marketing & Brand Manager',
            period: 'Dec 2007 – Sep 2010',
            description:
                'Overseas education consultancy under the Australia-based Navitas Group, representing 150+ foreign institutions across the UK and Australia through 15 offices in India and one in London.',
        },
        {
            title: 'United Advertising & Marketing Services',
            company: 'Account Manager',
            period: 'Jul 2004 – Nov 2007',
            description:
                'Delhi/Gurugram-based advertising agency with an in-house printing outfit, serving clients including Canon, Ranbaxy, Bharti Airtel, LNJ Bhilwara, Everest Industries, and Omax.',
        },
    ];

    return (
        <div className="min-h-screen w-screen flex flex-col lg:flex-row items-center justify-center px-5">
            <div className="flex flex-col gap-6 w-full max-w-9/12">
                <div className="flex flex-col gap-6 w-full">
                    {experiences.map((exp, index) => (
                        <ExpListItem key={index} item={exp} />
                    ))}
                </div>
            </div>
        </div>
    );
}
