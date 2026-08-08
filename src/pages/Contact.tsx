import { Mail, Phone } from 'lucide-react';
import { ContactChips } from '../components/ContactChips';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

function LinkedInIcon(): React.JSX.Element {
    return (
        <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
            />
            <rect x="2" y="9" width="4" height="12" rx="1" strokeWidth={2} />
            <rect x="10" y="9" width="4" height="12" rx="1" strokeWidth={2} />
            <rect x="18" y="9" width="4" height="12" rx="1" strokeWidth={2} />
        </svg>
    );
}

export function ContactIcon({ icon }: { icon: LucideIcon }) {
    return React.createElement(icon, { className: 'w-4 h-4' });
}

export default function Contact() {
    return (
        <div className="h-auto w-screen bg-white text-black flex flex-col items-center justify-center px-5 py-12">
            <h1 className="text-4xl mb-8 lg:mb-3">Get In Touch</h1>
            <div className="flex gap-4">
                <ContactChips
                    label="Email"
                    href="mailto:dheerajkale@gmail.com"
                    icon={<ContactIcon icon={Mail} />}
                    iconBg="bg-black/10"
                    iconColor="text-black"
                />
                <ContactChips
                    label="Phone"
                    href="tel:+919958944399"
                    icon={<ContactIcon icon={Phone} />}
                    iconBg="bg-black/10"
                    iconColor="text-black"
                />
                <ContactChips
                    label="LinkedIn"
                    href="https://www.linkedin.com/in/dheeraj-kale-99880227/"
                    icon={<ContactIcon icon={LinkedInIcon as unknown as LucideIcon} />}
                    iconBg="bg-black/10"
                    iconColor="text-black"
                />
            </div>
        </div>
    );
}
