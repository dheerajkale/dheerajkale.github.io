import type { ExpItem } from '../types/experience.ts';

export function ExpListItem({ item }: { item: ExpItem }) {
    return (
        <div className="flex flex-col gap-2 py-4 w-full">
            <h2 className="text-4xl lg:text-2xl">{item.title}</h2>
            <div className="flex items-center justify-between text-2xl lg:text-base">
                <span>{item.company}</span>
                <span className="text-right">{item.period}</span>
            </div>
            {item.description && (
                <p className="text-xl lg:text-lg">{item.description}</p>
            )}
        </div>
    );
}
