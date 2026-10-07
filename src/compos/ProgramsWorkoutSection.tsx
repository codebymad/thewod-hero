import { Accordion, Card } from '@heroui/react';
import MarkdownComponent from './MarkdownComponent';
import type { ReactNode } from 'react';
import { ChevronDown } from "@gravity-ui/icons";
import { useState } from 'react';
import { IconBarbell, IconDumbbell, IconTreadmill, IconStretching, IconJumpRope, IconExerciseBall, IconAcrobatic } from '@tabler/icons-react';

interface ProgramWorkoutSectionContent {
    section_name: string;
    section_notes: string[] | null;
    section_content: string | null;
}

interface ProgramWorkout {
    tags: string[];
    wod_id: string;
    content: ProgramWorkoutSectionContent[];
    wod_name: string;
    icon?: ReactNode;
}

export interface ProgramWorkoutData {
    workout_date: string;
    workout: ProgramWorkout;
}

interface ProgramWorkoutSectionProps {
    data: ProgramWorkoutData;
}


const ProgramWorkoutsectionIconMap = {
    strength: <IconBarbell className="text-orange-500" />,
    lift: <IconBarbell className="text-orange-500" />,
    metcon: <IconDumbbell className="text-orange-500" />,
    accessory: <IconExerciseBall className="text-orange-500" />,
    accessories: <IconExerciseBall className="text-orange-500" />,
    successories: <IconExerciseBall className="text-orange-500" />,
    skill: <IconAcrobatic className="text-orange-500" />,
    "optional technique day": <IconAcrobatic className="text-orange-500" />,
    warmup: <IconTreadmill className="text-orange-500" />,
    conditioning: <IconJumpRope className="text-orange-500" />,
    cooldown: <IconStretching className="text-orange-500" />,
    "rest day": <IconStretching className="text-orange-500" />,
};

function ProgramWorkoutSectionDetails({
    title,
    content,
    notes,
    icon,
    id
}: {
    title: string;
    content: string;
    notes: string[] | null;
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
                            <MarkdownComponent
                                markdown={(content ?? "")
                                    .replace(/\n?----\n?/g, "\n\n---\n\n")
                                    .replace(/([^\n])\n(?!\n)/g, "$1  \n")
                                }
                            />

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

export function ProgramWorkoutSection({ data }: ProgramWorkoutSectionProps) {
    const { workout } = data;

    return (
        <Card className="w-full">
            <Card.Header>
                <div className="flex gap-3 items-center">
                    {workout.icon && <span className="size-6">{workout.icon}</span>}
                    {/* <Card.Title>
                        {workout.wod_name}
                    </Card.Title> */}
                </div>
                <Card.Description>
                </Card.Description>
            </Card.Header>

            <Card.Content>
                <div className="flex flex-col gap-0">
                    {workout.content.map((section, index) => (
                        <ProgramWorkoutSectionDetails
                            key={`${workout.wod_id}-${index}`}
                            id={`section-${index}`}
                            title={section.section_name}
                            content={section.section_content ?? ""}
                            notes={section.section_notes}
                            icon={
                                ProgramWorkoutsectionIconMap[
                                section.section_name.trim().toLowerCase() as keyof typeof ProgramWorkoutsectionIconMap
                                ] ?? <IconBarbell className="text-orange-500" />
                            }
                        />
                    ))}
                </div>
            </Card.Content>
        </Card>
    );
}