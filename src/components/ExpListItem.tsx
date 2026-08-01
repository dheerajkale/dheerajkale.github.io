import type { ExpItem } from '../types/exp-item';

export function ExpListItem({ item }: { item: ExpItem }) {
    return (
        <div className="flex flex-col gap-2 border-l-2 pl-6 py-4 w-full">
            <h2 className="text-4xl lg:text-2xl font-semibold">{item.title}</h2>
            <div className="flex items-center justify-between text-2xl lg:text-base">
                <span>{item.company}</span>
                <span className="text-right">{item.period}</span>
            </div>
            {item.description && (
                <p className="text-2xl lg:text-lg">{item.description}</p>
            )}
        </div>
    );
}
