import { Accordion } from '@heroui/react';
import MarkdownComponent from './MarkdownComponent';
import type { ReactNode } from 'react';
import { ChevronDown } from "@gravity-ui/icons";
import { useState } from 'react';

interface WorkoutSectionProps {
    title: string;
    content: string;
    notes?: string[];
    icon?: ReactNode;
    id: string;
}

export function WorkoutSection({ title, content, notes, icon, id }: WorkoutSectionProps) {
    const [expandedKeys, setExpandedKeys] = useState<Set<string | number>>(new Set([id]));

    return (
        <Accordion
            variant='surface'
            className="w-full"
            expandedKeys={expandedKeys}
            onExpandedChange={(keys) => setExpandedKeys(keys as Set<string | number>)}
        >
            <Accordion.Item key={id} id={id}>
                <Accordion.Heading>
                    <Accordion.Trigger className="text-black dark:text-white">
                        {icon ? (
                            <span className="me-3 size-5 shrink-0">{icon}</span>
                        ) : null}
                        <span className="font-semibold capitalize">{title}</span>
                        <Accordion.Indicator>
                            <ChevronDown />
                        </Accordion.Indicator>
                    </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                    <Accordion.Body className="text-black dark:text-white">
                        <div className="space-y-4">
                            <MarkdownComponent markdown={content} />

                            {notes && notes.length > 0 && (
                                <div className="border-t pt-4">
                                    <p className="text-sm font-semibold mb-2 text-black dark:text-white">Notes:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        {notes.map((note, index) => (
                                            <li key={index} className="text-sm text-black dark:text-gray-200">
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Accordion.Body>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}