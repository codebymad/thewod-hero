import { Card, Chip, Label, ProgressBar, Tabs, Typography } from "@heroui/react";
import { useEffect, useState } from "react";
import { getAllPrograms } from "../libs/SupabaseEdgeFunctions";
import { SparklesFill } from '@gravity-ui/icons';
import { IconCalendar, IconListDetails } from '@tabler/icons-react';
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


function ProgramsPage() {
    const [programsData, setProgramsData] = useState<any[]>([]);
    const [isProgramLoading, setIsProgramLoading] = useState(true);

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const data = await getAllPrograms();
                setProgramsData(data);
            } finally {
                setIsProgramLoading(false);
            }
        };
        loadWorkouts();
    }, []);

    return (

        <Tabs className="w-full pl-4 pr-4 items-center justify-center">
            <Tabs.ListContainer className="w-full md:w-fit md:max-w-full">
                <Tabs.List aria-label="WOD Tabs">
                    <Tabs.Tab id="daily" className="whitespace-nowrap md:min-w-[240px]">
                        <Typography type="body" className="flex flex-row  items-center justify-center gap-1">
                            <IconCalendar stroke={2} className="text-orange-500" />
                            <span>Daily WODs</span>
                        </Typography>
                        <Tabs.Indicator />
                    </Tabs.Tab>

                    <Tabs.Tab id="programs" className="whitespace-nowrap md:min-w-[240px]">
                        <Typography type="body" className="flex flex-row items-center justify-center gap-1">
                            <IconListDetails stroke={2} className="text-orange-500" />
                            <span>Programs</span>
                        </Typography>
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel
                className="w-full"
                id="daily"
            >
                <p>Coming Soon. Refer Home Page for now</p>
            </Tabs.Panel>

            <Tabs.Panel
                className="w-full"
                id="programs"
            >
                {
                    isProgramLoading ?
                        <Indeterminate /> :
                        <AllPrograms programsData={programsData} />
                }

            </Tabs.Panel>
        </Tabs>


    );
}


function AllPrograms({ programsData }: { programsData: any[] }) {

    const [selectedPid, setSelectedPid] = useState<string | null>(null);


    const selectedProgram = programsData.find((p) => p.pid === selectedPid);

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {programsData.map((program: any) => {
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

            <ProgramCard
                program={selectedProgram}
                isOpen={selectedPid !== null}
                onClose={() => setSelectedPid(null)} />


        </>
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
