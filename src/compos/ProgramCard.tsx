import { Alert, Description, ListBox, Modal, Select, Typography } from "@heroui/react";
import { Carousel } from "antd";
import { useEffect, useRef, useState } from "react";
import { getProgram } from "../libs/SupabaseEdgeFunctions";
import { ProgramWorkoutSection } from "./ProgramsWorkoutSection";
import type { ProgramWorkoutData } from "./ProgramsWorkoutSection";
import { Spinner } from '@heroui/react';

export function SpinnerBasic() {
    return (
        <div className="flex items-center gap-4">
            <Spinner />
        </div>
    );
}

export function ProgramCard(
    {
        program,
        isOpen,
        onClose,
    }: {
        program?: any;
        isOpen: boolean;
        onClose: () => void;
    }
) {
    const [week, setWeek] = useState("1");
    const [day, setDay] = useState(1); // Day 1 selected by default
    const carouselRef = useRef<any>(null);
    const [programWeekData, setProgramWeekData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        let cancelled = false; // ignore stale responses if week changes quickly

        const loadWorkouts = async () => {
            setLoading(true);
            setError(null);
            setProgramWeekData(null);
            try {
                const data = await getProgram(program?.pid, Number(week));
                if (!cancelled) setProgramWeekData(data);
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? "Something went wrong while loading the program.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        if (program?.pid) loadWorkouts();
        setDay(1);

        return () => { cancelled = true; };
    }, [week, program?.pid]);

    useEffect(() => {

    }, [day]);

    // Map the loaded week JSON to the shape ProgramWorkoutSection expects
    const days: ProgramWorkoutData[] = (programWeekData?.data ?? []).map((d: any) => ({
        workout_date: `Day ${d.dn}`,
        workout: {
            wod_id: d.wid,
            wod_name: d.ird ? `Day ${d.dn} - Rest` : `Day ${d.dn}`,
            dn: d.dn,
            tags: [],
            content: [...d.s]
                .sort((a: any, b: any) => a.sp - b.sp)
                .map((s: any) => ({
                    section_name: s.st,
                    section_content: s.sdc,
                    section_notes: s.sn ?? [],
                })),
        },
    }));

    return (

        <>


            {/* One modal for all cards */}
            < Modal.Backdrop
                isOpen={isOpen}
                onOpenChange={(open) => { if (!open) onClose(); }}
                isKeyboardDismissDisabled
                isDismissable={false}
            >
                <Modal.Container size="cover">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>
                                {/* Top row: name left (80%), week right (20%) */}
                                <div className="flex items-start gap-2 pr-10">
                                    <span className="w-[80%] flex flex-col">
                                        <Typography type="h3" className="line-clamp-2 break-words">
                                            {program?.p ?? "Program Name"}
                                        </Typography>

                                        <Description>
                                            Week # {week} | Day # {day}
                                        </Description>
                                    </span>


                                    {/* Week dropdown: closed state shows WEEK #, opened list shows Week 1 ... Week N */}
                                    <div className="w-[20%] min-w-[110px] flex justify-end">
                                        <Select
                                            className="w-full"
                                            placeholder="Select Week"
                                            value={week}
                                            onChange={(key) => setWeek(String(key))}
                                        >
                                            <Select.Trigger>
                                                <span className="font-semibold">WEEK {week}</span>
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover>
                                                <ListBox>
                                                    {Array.from({ length: program?.w ?? 0 }, (_, i) => i + 1).map((n) => (
                                                        <ListBox.Item key={n} id={String(n)} textValue={`Week ${n}`}>
                                                            Week {n}
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                    ))}
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>
                                </div>

                                {/* Day 1 to Day 7 boxes: clicking one moves the carousel */}
                                <div className="grid grid-cols-7 gap-1 mt-2">
                                    {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                                        // Day is disabled when it has no sections (s is empty or missing)
                                        // const isEmpty = (days[d - 1]?.workout.content.length ?? 0) === 0;
                                        const isEmpty = (days[d - 1]?.workout.content.length ?? 0) === 0;
                                        

                                        return (
                                            <button
                                                key={d}
                                                disabled={isEmpty}
                                                onClick={() => {
                                                    setDay(d);
                                                    carouselRef.current?.goTo(d - 1);
                                                }}
                                                className={
                                                    "rounded-lg border px-2 py-2 text-sm font-medium " +
                                                    (isEmpty
                                                        ? "border-gray-300 text-gray-400 bg-gray-100 opacity-50 cursor-not-allowed"
                                                        : day === d
                                                            ? "border-orange-500 bg-orange-500 text-white"
                                                            : "border-orange-500 bg-transparent text-orange-500")
                                                }
                                            >
                                                Day {d}
                                            </button>
                                        );
                                    })}
                                </div>

                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            {loading ? (
                                <div className="flex items-center justify-center py-10">
                                    <Spinner />
                                </div>
                            ) : error ? (
                                <Alert status="danger">
                                    <Alert.Indicator />
                                    <Alert.Content>
                                        <Alert.Title>Failed to load program</Alert.Title>
                                        <Alert.Description>{error}</Alert.Description>
                                    </Alert.Content>
                                </Alert>
                            ) : (
                                <div className="w-full overflow-hidden">
                                    <Carousel
                                        ref={carouselRef}
                                        dots={false}
                                        infinite={false}
                                        draggable
                                        adaptiveHeight
                                        speed={400}
                                        cssEase="cubic-bezier(0.22, 1, 0.36, 1)"
                                        waitForAnimate={false}
                                        beforeChange={(_from, to) => setDay(to + 1)}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                                            <div key={d} className="w-full">
                                                {days[d - 1] && (
                                                    <ProgramWorkoutSection data={days[d - 1]} />
                                                )}
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            )}
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop >




        </>
    );
}