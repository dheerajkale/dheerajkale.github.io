import { Mail, Phone } from 'lucide-react';
import { ContactItem } from '../components/ContactItem';
import React from 'react';

function LinkedInIcon(): React.JSX.Element {
    return (
        <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
            />
            <rect x="2" y="9" width="4" height="12" rx="1" strokeWidth={1.5} />
            <rect x="10" y="9" width="4" height="12" rx="1" strokeWidth={1.5} />
            <rect x="18" y="9" width="4" height="12" rx="1" strokeWidth={1.5} />
        </svg>
    );
}

const CONTACTS = [
    {
        label: 'Email',
        value: 'dheerajkale@gmail.com',
        href: 'mailto:dheerajkale@gmail.com',
        icon: <Mail className="h-5 w-5" strokeWidth={1.5} />,
    },
    {
        label: 'Phone',
        value: '+91 99589 44399',
        href: 'tel:+919958944399',
        icon: <Phone className="h-5 w-5" strokeWidth={1.5} />,
    },
    {
        label: 'LinkedIn',
        value: 'linkedin.com/in/dheeraj-kale-99880227',
        href: 'https://www.linkedin.com/in/dheeraj-kale-99880227/',
        icon: <LinkedInIcon />,
    },
];

export default function Contact() {
    return (
        <div className="h-auto w-screen bg-linear-to-b from-white to-[#e0e0e0] text-black flex flex-col items-center justify-center px-5 py-16 lg:py-24">
            <h1 className="text-4xl lg:text-5xl mb-12 lg:mb-14">Get In Touch</h1>
            <div className="w-full max-w-2xl border-t border-black/10">
                {CONTACTS.map((contact) => (
                    <ContactItem key={contact.label} {...contact} />
                ))}
            </div>
        </div>
    );
}
