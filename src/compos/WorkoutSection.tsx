import { Accordion, Card } from '@heroui/react';
import MarkdownComponent from './MarkdownComponent';
import type { ReactNode } from 'react';
import { ChevronDown } from "@gravity-ui/icons";
import { useState } from 'react';
import { IconBarbell, IconDumbbell, IconTreadmill, IconStretching, IconJumpRope, IconExerciseBall, IconAcrobatic } from '@tabler/icons-react';

interface SectionContent {
    section_name: string;
    section_notes: string[];
    section_content: string;
}

interface Workout {
    tags: string[];
    wod_id: string;
    content: SectionContent[];
    wod_name: string;
    icon?: ReactNode;
}

interface WorkoutData {
    workout_date: string;
    workout: Workout;
}

interface WorkoutSectionProps {
    data: WorkoutData;
}

// const sectionIconMap = {
//     strength: <Sun className="text-orange-500" />,
//     metcon: <Bars className="text-orange-500" />,
//     accessory: <Target className="text-orange-500" />,
//     accessories: <Target className="text-orange-500" />,
//     skill: <Flame className="text-orange-500" />,
//     warmup: <Sun className="text-orange-500" />,
//     conditioning: <Bars className="text-orange-500" />,
//     cooldown: <Target className="text-orange-500" />,
// };
const sectionIconMap = {
    strength: <IconBarbell className="text-orange-500" />,
    metcon: <IconDumbbell className="text-orange-500" />,
    accessory: <IconExerciseBall className="text-orange-500" />,
    accessories: <IconExerciseBall className="text-orange-500" />,
    skill: <IconAcrobatic className="text-orange-500" />,
    warmup: <IconTreadmill className="text-orange-500" />,
    conditioning: <IconJumpRope className="text-orange-500" />,
    cooldown: <IconStretching className="text-orange-500" />,
};

function WorkoutSectionDetails({
    title,
    content,
    notes,
    icon,
    id
}: {
    title: string;
    content: string;
    notes: string[];
    icon?: ReactNode;
    id: string;
}) {
    const [expandedKeys, setExpandedKeys] = useState<Set<string | number>>(new Set([id]));

    return (
        <Accordion
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

export function WorkoutSection({ data }: WorkoutSectionProps) {
    const { workout } = data;

    return (
        <Card className="w-full">
            <Card.Header>
                <div className="flex gap-3 items-center">
                    {workout.icon && <span className="size-6">{workout.icon}</span>}
                    <Card.Title>
                        {workout.wod_name}
                    </Card.Title>
                </div>
                <Card.Description>
                </Card.Description>
            </Card.Header>

            <Card.Content>
                <div className="flex flex-col gap-0">
                    {workout.content.map((section, index) => (
                        <WorkoutSectionDetails
                            key={`${workout.wod_id}-${index}`}
                            id={`${section.section_name}-${index}`}
                            title={section.section_name}
                            content={section.section_content}
                            notes={section.section_notes}
                            icon={sectionIconMap[section.section_name as keyof typeof sectionIconMap]}
                        />
                    ))}
                </div>
            </Card.Content>
        </Card>
    );
}