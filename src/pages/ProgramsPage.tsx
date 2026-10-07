import { Accordion, Card, Chip, Description, Label, ProgressBar, Typography } from "@heroui/react";
import { useEffect, useState } from "react";
import { getAllPrograms } from "../libs/SupabaseEdgeFunctions";
import { SquareListUl, SparklesFill } from '@gravity-ui/icons';
import { IconListDetails } from '@tabler/icons-react';
import { ProgramCard } from "../compos/ProgramCard";


const colors = [
    "linear-gradient(135deg, #5f7a8a 0%, #8fa6b2 100%)", // steel blue
    "linear-gradient(135deg, #8a6f5f 0%, #b89a86 100%)", // clay
    "linear-gradient(135deg, #5f7f6f 0%, #8fae9d 100%)", // sage
    "linear-gradient(135deg, #7a6a8a 0%, #a898b8 100%)", // dusty plum
    "linear-gradient(135deg, #a1675a 0%, #c99486 100%)", // faded rust
    "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)", // slate
    "linear-gradient(135deg, #4f6f7a 0%, #7fa0aa 100%)", // teal gray
    "linear-gradient(135deg, #8a7f5a 0%, #b5aa84 100%)", // olive sand
];


function AllPrograms() {
    const [programsData, setProgramsData] = useState<any[]>([]);
    const [selectedPid, setSelectedPid] = useState<string | null>(null);

    useEffect(() => {
        const loadWorkouts = async () => {
            const data = await getAllPrograms();
            setProgramsData(data);
        };
        loadWorkouts();
    }, []);

    const selectedProgram = programsData.find((p) => p.pid === selectedPid);

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {programsData.map((program) => {
                    const color = colors[
                        [...program.pid].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % colors.length
                    ];
                    return (
                        <Card
                            key={program.pid}
                            className="relative h-full w-full cursor-pointer overflow-hidden border-none pt-2 hover:scale-101 "
                            style={{ background: color }}
                            // className={
                            //     "relative h-full w-full cursor-pointer overflow-hidden border pt-2 transition-colors hover:scale-101 " +
                            //     (selectedPid === program.pid
                            //         ? "border-orange-500 bg-orange-500 text-white"
                            //         : "border-orange-500 bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white")
                            // }
                            onClick={() => setSelectedPid(program.pid)}
                        >

                            <Typography type="h2">{program.p}</Typography>
                            <Typography type="body-xs">{program.d?.trim() || "No description available"}</Typography>
                            {/* 
                            <Separator className="" /> */}

                            <div className="mt-auto flex items-center justify-between">
                                {/* NEW banner*/}
                                {new Date(program.up).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                                    <Chip variant="primary" className="!bg-red-400 !text-white animate-pulse"><SparklesFill />NEW</Chip>
                                )}
                                <Chip variant="soft">{program.w} weeks</Chip>

                                {/* <Chip variant="soft" onClick={(e) => e.stopPropagation()}>Start Program</Chip> */}
                                {/* <Button
                                    variant="ghost"
                                    className="hover:scale-105 border-2 border-black/50"
                                    
                                >
                                    Start program
                                </Button> */}
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* One modal for all cards */}
            <ProgramCard
                program={selectedProgram}
                isOpen={selectedPid !== null}
                onClose={() => setSelectedPid(null)}
            />
        </>
    );
}


function ProgramsPage() {
    return (
        <div className="w-full pl-4 pr-4">
            <h1 className="mb-4 flex items-center gap-2 text-3xl font-bold">
                <IconListDetails stroke={2} className="text-orange-500" /> Programs
            </h1>
            <Accordion
                className="w-full"
                // allowsMultipleExpanded={true}
                defaultExpandedKeys={["2"]}
                variant="surface"
            >
                {/* <Accordion.Item id="1">
                    <Accordion.Heading>
                        <Accordion.Trigger>
                            <HourglassStart className="mr-2" />
                            <Chip color="success" size="lg">In-Progress</Chip>
                            <Accordion.Indicator />
                        </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                        <Accordion.Body>
                            <AllPrograms />
                        </Accordion.Body>
                    </Accordion.Panel>
                </Accordion.Item> */}

                <Accordion.Item id="2">
                    <Accordion.Heading>
                        <Accordion.Trigger>
                            <SquareListUl className="mr-2" />
                            <Chip color="success" size="lg">All</Chip>
                            <Accordion.Indicator />
                        </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                        <Accordion.Body>
                            <AllPrograms />
                        </Accordion.Body>
                    </Accordion.Panel>
                </Accordion.Item>

                {/* <Accordion.Item id="3">
                    <Accordion.Heading>
                        <Accordion.Trigger>
                            <SealCheck className="mr-2" />
                            <Chip color="success" size="lg">Completed</Chip>
                            <Accordion.Indicator />
                        </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                        <Accordion.Body>
                            <AllPrograms />
                        </Accordion.Body>
                    </Accordion.Panel>
                </Accordion.Item> */}
            </Accordion>

        </div>
    );
}

export function Indeterminate() {
    return (
        <ProgressBar isIndeterminate aria-label="Loading" className="w-full pl-2 pr-2">
            <Label>Loading...</Label>
            <ProgressBar.Track>
                <ProgressBar.Fill />
            </ProgressBar.Track>
        </ProgressBar>
    );
}


export default ProgramsPage;
