
import { ArrowRotateLeft, Briefcase, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsCollapseFromLines, CircleFill, CircleNumber1, CircleNumber2, CircleNumber3, CircleNumber4, CircleNumber5, CircleNumber6, CircleNumber7, Layers3Diagonal, ListTimeline, Pencil, SquareBracketsBarsVertical, Stop } from "@gravity-ui/icons";
import { Button, Description, Label, Chip, AlertDialog, ListBox, Surface, ChipLabel, Separator, ButtonGroup, Card, CardContent } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import WeekPicker from "../compos/WeekPicker";
import { Carousel, Grid, type CarouselRef } from "antd";
import MarkdownComponent from "../compos/MarkdownComponent";
import { IconRestore, IconColumns1, IconColumns2, IconColumns3, IconTallymark4, IconCircleCheck } from '@tabler/icons-react';
import DemoCarousel from "../compos/DemoCarousel";

function WorkoutBuilder() {
    //  const [value, setValue] = useState<DateValue | null>(today(getLocalTimeZone()));
    const [gym, setGym] = useState(gyms[0].name);
    const [program, setProgram] = useState(programs[0].name);

    const [dialog, setDialog] = useState<"gym" | "program" | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const items = dialog === "gym" ? gyms : programs;
    const title = dialog === "gym" ? "Select Gym" : "Select Program";

    const openDialog = (type: "gym" | "program") => {
        const currentValue = type === "gym" ? gym : program;
        const currentItems = type === "gym" ? gyms : programs;

        const currentItem = currentItems.find(
            (item) => item.name === currentValue
        );

        setSelectedId(currentItem?.id ?? null);
        setDialog(type);
    };

    const handleSelect = () => {
        if (!selectedId || !dialog) return;

        const selected = items.find(
            (item) => item.id === selectedId
        );

        if (!selected) return;

        if (dialog === "gym") {
            setGym(selected.name);
        } else {
            setProgram(selected.name);
        }

        setDialog(null);
        setSelectedId(null);
    };

    const handleCancel = () => {
        setDialog(null);
        setSelectedId(null);
    };

    const contentStyle: React.CSSProperties = {

        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        borderRadius: '8px',
    };

    const itemsC = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    type SectionType = "Warm Up" | "Strength" | "Metcon" | "Conditioning" | "Accessory" | "Cooldown";

    type WorkoutSection = {
        name: SectionType;
        content: string;  // markdown
        notes?: string[]; // coach notes, stimulus, tips
    };

    const workout = {
        id: "1",
        name: "Push Day",
        date: "Sep 30, 2026",
        durationMin: 75,
        bodyParts: ["Chest", "Shoulders", "Triceps", "Abs"],
        sections: [
            {
                name: "Warm Up",
                content: `**2 rounds:**
- 10 band pull-aparts
- 10 scap push-ups
- 10 arm circles each direction`,
                notes: [
                    "Keep it easy.",
                    "Focus on shoulder mobility before pressing.",
                ],
            },
            {
                name: "Strength",
                content: `**Bench Press**

5 x 5 @ 75 kg

Rest 2 min between sets`,
                notes: [
                    "Controlled tempo down, explosive up.",
                    "Leave 1-2 reps in reserve.",
                ],
            },
            {
                name: "Metcon",
                content: `**12 min AMRAP:**
- 8 dumbbell push press (22.5 kg)
- 10 push-ups
- 12 air squats`,
                notes: [
                    "Stimulus: steady pace, unbroken push press.",
                    "Aim for 5+ rounds.",
                ],
            },
            {
                name: "Conditioning",
                content: `**3 rounds:**
- 250 m row
- 15 sit-ups

Rest 1 min between rounds`,
                notes: ["Moderate effort.", "Keep the rower pace consistent."],
            },
            {
                name: "Accessory",
                content: `- Tricep Dips: 3 x 12
- Lateral Raise: 3 x 15
- Plank: 3 x 45 sec`,
            },
            {
                name: "Cooldown",
                content: `- 2 min chest doorway stretch
- 2 min child's pose
- Easy breathing`,
                notes: ["Slow nasal breathing to bring your heart rate down."],
            },
        ] as WorkoutSection[],
    };

    const onEdit = (id: string) => {
        console.log(id)
    };


    const { useBreakpoint } = Grid;

    const [mode, setMode] = useState<'all' | 'weekdays'>('all');
    const screens = useBreakpoint();
    const isMobile = !screens.md;          // md = 768px and up
    const [slideCount, setSlideCount] = useState(3);
    const startIndex = mode === 'weekdays' ? 1 : 0;

    useEffect(() => {
        setSlideCount(isMobile ? 1 : 3);
    }, [isMobile]);


    const TopPrevArrow = (props: any) => (
        <div onClick={props.onClick} className="absolute top-0 right-12 z-10 cursor-pointer">
            <ChevronLeft />
        </div>
    );

    const TopNextArrow = (props: any) => (
        <div onClick={props.onClick} className="absolute top-0 right-4 z-10 cursor-pointer">
            <ChevronRight />
        </div>
    );

    const carouselRef = useRef<CarouselRef>(null);
    const [currentSlide, setCurrentSlide] = useState(startIndex);
    const maxSlideIndex = Math.max(0, itemsC.length - slideCount);

    // Number of valid carousel positions
    const dotCount = maxSlideIndex + 1;

    useEffect(() => {
        setCurrentSlide(startIndex);
    }, [startIndex, slideCount]);


    return (
        <>


            <DemoCarousel />

            <div className="flex w-full flex-col items-center gap-2 px-4 py-4 md:flex-row">

                {/* GYM */}
                <div className="order-1 flex w-full md:order-1 md:flex-1 md:justify-start">
                    <Chip
                        size="lg"
                        className="flex w-full cursor-pointer items-center justify-between gap-2 md:w-auto"
                        onClick={() => openDialog("gym")}
                    >
                        <div className="flex items-center gap-2">
                            <Briefcase />
                        </div>

                        <div className="min-w-0 flex-1 truncate text-center">
                            {gym}
                        </div>

                        <div className="flex items-center gap-2">
                            <ChevronDown />
                        </div>
                    </Chip>
                </div>

                {/* DATE */}
                <div className="order-3 flex w-full items-center justify-center gap-2 md:order-2 md:flex-1">
                    <div className="min-w-0">
                        <WeekPicker />
                    </div>

                    <Button variant="tertiary" isIconOnly>
                        <IconRestore stroke={2} />
                    </Button>

                    <Button variant="secondary" isIconOnly>
                        <IconCircleCheck stroke={2} />
                    </Button>
                </div>

                {/* PROGRAM */}
                <div className="order-2 flex w-full md:order-3 md:flex-1 md:justify-end">
                    <Chip
                        size="lg"
                        className="flex w-full cursor-pointer items-center justify-between gap-2 md:w-auto"
                        onClick={() => openDialog("program")}
                    >
                        <div className="flex items-center gap-2">
                            <ListTimeline />
                        </div>

                        <div className="min-w-0 flex-1 truncate text-center">
                            {program}
                        </div>

                        <div className="flex items-center gap-2">
                            <ChevronDown />
                        </div>
                    </Chip>
                </div>

            </div>


            <div className="w-full flex flex-col md:flex-row md:justify-end md:items-center gap-4">

                {/* CHIPS */}
                <div className="hidden md:flex px-4">
                    <Chip size="lg" onClick={() => { setMode('all'); setSlideCount(1) }}>
                        <IconColumns1 /> <Separator orientation='vertical' />
                    </Chip>
                    <Chip size="lg" onClick={() => { setMode('all'); setSlideCount(2) }}>
                        <IconColumns2 /> <Separator orientation='vertical' />
                    </Chip>
                    <Chip size="lg" onClick={() => { setMode('all'); setSlideCount(3) }}>
                        <IconColumns3 /> <Separator orientation='vertical' />
                    </Chip>
                    <Chip size="lg" onClick={() => { setMode('all'); setSlideCount(4) }}>
                        <IconTallymark4 /> <Separator orientation='vertical' />
                    </Chip>
                    <Chip size="lg" onClick={() => { setMode('weekdays'); setSlideCount(5) }}>
                        <ChevronsCollapseFromLines /> <Separator orientation='vertical' /> Weekdays
                    </Chip>
                    <Chip size="lg" onClick={() => { setMode('all'); setSlideCount(7) }}>
                        <CircleNumber7 /> <Separator orientation='vertical' /> All
                    </Chip>
                </div>

                {/* CAROUSEL CONTROLS */}
                <div className="px-4 w-full md:py-4 md:w-auto">
                    {/* <Card>
                        <CardContent className="flex justify-center"> */}
                    <ButtonGroup size="lg" variant="primary" className="flex items-center">

                        {/* LEFT ARROW */}
                        <Button
                            isIconOnly
                            variant="outline"
                            onClick={() => carouselRef.current?.prev()}
                            isDisabled={currentSlide === 0}
                        >
                            <ChevronLeft className="size-5" />
                        </Button>

                        <ButtonGroup.Separator />

                        {/* DOTS (must be wrapped, not direct children) */}
                        <div className="flex items-center gap-1.5 px-2">
                            {Array.from({ length: dotCount }).map((_, index) => {
                                const isActive = currentSlide === index;

                                return (
                                    <Button
                                        key={index}
                                        isIconOnly
                                        variant="outline"
                                        size="md"
                                        onClick={() => carouselRef.current?.goTo(index)}
                                        className={`h-1.5 min-w-0 p-0 flex items-center transition-all duration-200 ${isActive ? "w-5" : "w-1.5"
                                            }`}
                                    >
                                        <span
                                            className={`block h-1.5 w-full rounded-full bg-foreground ${isActive ? "opacity-100" : "opacity-30"
                                                }`}
                                        />
                                    </Button>
                                );
                            })}
                        </div>

                        <ButtonGroup.Separator />

                        {/* RIGHT ARROW */}
                        <Button
                            isIconOnly
                            variant="outline"
                            onClick={() => carouselRef.current?.next()}
                            isDisabled={currentSlide >= itemsC.length - slideCount}
                        >
                            <ChevronRight className="size-5" />
                        </Button>

                    </ButtonGroup>

                    {/* </CardContent>
                    </Card> */}

                </div>
            </div>


            {/* Mobile */}
            <div className="px-4 py-1">
                <Carousel
                    // prevArrow={<TopPrevArrow />}
                    // nextArrow={<TopNextArrow />}
                    // arrows={true} slidesToShow={slideCount} slidesToScroll={1} initialSlide={startIndex} infinite={false}
                    ref={carouselRef}
                    dots={false}
                    arrows={false}
                    slidesToShow={slideCount}
                    slidesToScroll={1}
                    initialSlide={startIndex}
                    infinite={false}
                    afterChange={(current) => setCurrentSlide(current)}
                >
                    {itemsC.map((item) => (
                        // <Surface key={item} className="flex min-w-full flex-col gap-3 rounded-3xl p-6" variant="default">
                        //     <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
                        //     <p className="text-sm text-muted">
                        //         This is a default surface variant. It uses bg-surface styling.
                        //     </p>
                        // </Surface>
                        <div key={item}>
                            <div className="md:px-2" >
                                <Surface className="flex min-w-full flex-col rounded-3xl p-3" variant="default">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-base font-semibold text-foreground"> {workout.date}</h3>
                                            <p className="text-xs text-muted">
                                                {workout.date}. {item}
                                                {/* · {workout.durationMin} min */}
                                            </p>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            aria-label={`Edit ${workout.name}`}
                                            onClick={() => onEdit(workout.id)}
                                            isIconOnly
                                        >
                                            <Pencil />
                                        </Button>
                                    </div>

                                    {/* Body part tags */}
                                    <div className="flex flex-wrap gap-2 py-2">
                                        {workout.bodyParts.map((part) => (
                                            <span
                                                key={part}
                                                className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground"
                                            >
                                                {part}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Sections */}
                                    <div className="flex flex-col gap-4">
                                        {workout.sections.map((section) => (
                                            <div
                                                key={section.name}
                                                className="flex flex-col gap-3 rounded-2xl border border-foreground/10 p-2.5"
                                            >

                                                <Chip className="font-semibold uppercase tracking-wide text-muted">
                                                    <CircleFill width={6} />
                                                    <ChipLabel> {section.name}</ChipLabel>
                                                </Chip>


                                                {/* Markdown content */}
                                                <div className="text-sm text-foreground">
                                                    <MarkdownComponent markdown={section.content} />
                                                </div>

                                                {/* Notes */}
                                                {section.notes && section.notes.length > 0 && (
                                                    <div className="rounded-xl bg-foreground/5 px-2 py-2">
                                                        <p className="mb-1 text-xs font-semibold text-foreground">Notes</p>
                                                        <ul className="list-disc space-y-1 pl-4 text-xs text-muted">
                                                            {section.notes.map((note, i) => (
                                                                <li key={i}>{note}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Surface>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            <AlertDialog
                isOpen={dialog !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        handleCancel();
                    }
                }}
            >
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Heading>
                                    {title}
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <ListBox
                                    aria-label={title}
                                    selectionMode="single"
                                    selectedKeys={
                                        selectedId
                                            ? new Set([selectedId])
                                            : new Set()
                                    }
                                    onSelectionChange={(keys) => {
                                        const key = Array.from(keys)[0];

                                        if (key) {
                                            setSelectedId(String(key));
                                        }
                                    }}
                                >
                                    {items.map((item) => (
                                        <ListBox.Item
                                            key={item.id}
                                            id={item.id}
                                            textValue={item.name}
                                        >
                                            <div className="flex flex-col">
                                                <Label>
                                                    {item.name}
                                                </Label>

                                                <Description>
                                                    {item.description}
                                                </Description>
                                            </div>

                                            <ListBox.ItemIndicator>
                                                {({ isSelected }) =>
                                                    isSelected ? (
                                                        <Check className="size-4 text-accent-soft-foreground" />
                                                    ) : null
                                                }
                                            </ListBox.ItemIndicator>
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="tertiary"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="primary"
                                    onClick={handleSelect}
                                    isDisabled={!selectedId}
                                >
                                    Confirm
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </>
    )


}

export default WorkoutBuilder;


const gyms = [
    {
        id: "1",
        name: "Center Mass Training Compound",
        description: "CrossFit & Hyrox",
    },
    {
        id: "2",
        name: "CrossFit Boston",
        description: "CrossFit",
    },
    {
        id: "3",
        name: "Hyrox Training Club",
        description: "Hyrox & Functional Fitness",
    },
];

const programs = [
    {
        id: "1",
        name: "Group Class",
        description: "Daily group workout",
    },
    {
        id: "2",
        name: "Hyrox",
        description: "Hyrox training program",
    },
    {
        id: "3",
        name: "CrossFit",
        description: "CrossFit programming",
    },
];
