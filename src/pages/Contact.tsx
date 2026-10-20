import { Mail, Phone } from 'lucide-react';
import { ContactItem } from '../components/ContactItem';
import SectionLabel from '../components/SectionLabel';
import React from 'react';

function LinkedInIcon(): React.JSX.Element {
    return (
        <svg
            className="h-5 w-5"
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
        icon: <Mail className="h-4 w-4" strokeWidth={1.5} />,
    },
    {
        label: 'Phone',
        value: '+91 99589 44399',
        href: 'tel:+919958944399',
        icon: <Phone className="h-4 w-4" strokeWidth={1.5} />,
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
        <section
            id="contact"
            className="w-full scroll-mt-16 bg-ink px-5 py-24 text-paper sm:px-8 md:py-32 lg:px-12"
        >
            <div className="mx-auto w-full max-w-6xl">
                <SectionLabel tone="dark">
                    Contact
                </SectionLabel>

                <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="min-w-0 lg:col-span-7">
                        <h1 className="max-w-2xl text-balance text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                            Let’s make something impossible to ignore.
                        </h1>
                        <p className="mt-7 max-w-md text-base leading-relaxed text-paper/55 sm:text-lg">
                            For advertising, brand, and corporate communications conversations,
                            reach out directly. The shortest distance between an idea and its audience
                            is usually a good conversation.
                        </p>

                        <a
                            href="mailto:dheerajkale@gmail.com"
                            className="group mt-10 inline-flex max-w-full flex-wrap items-baseline gap-3 border-b border-paper/25 pb-2 font-display text-2xl text-paper transition-colors hover:border-accent hover:text-accent sm:text-4xl"
                        >
                            dheerajkale@gmail.com
                            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-50 transition-opacity group-hover:opacity-100">
                                Write
                            </span>
                        </a>
                    </div>

                    <div className="min-w-0 lg:col-span-5">
                        <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-paper/40">
                            Direct lines
                        </p>
                        <div className="mt-4 border-t border-paper/15">
                            {CONTACTS.map((contact) => (
                                <ContactItem key={contact.label} {...contact} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
