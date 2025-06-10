import React from 'react';

export default function InfoLayout({
    children,
    description,
    title,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="px-6 py-4 rounded-2xl flex flex-col glass text-foreground">
            <h2 className="font-light">{title}</h2>
            <div className="flex flex-col gap-2 justify-center h-full">
                <div className="flex flex-col">{children}</div>
            </div>
            <p className="text-xs min-h-12 font-light text-muted-foreground">
                {description}
            </p>
        </section>
    );
}
