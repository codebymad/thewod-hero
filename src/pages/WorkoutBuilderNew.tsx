import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Grid } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import {
    Button,
    ButtonGroup,
    Dropdown,
    Label,
    Modal,
    Surface,
    ToggleButton,
    ToggleButtonGroup,
} from "@heroui/react";
import {
    IconCalendarDue,
    IconCalendarMinus,
    IconCalendarWeek,
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
    IconPlus,
    IconRestore,
} from "@tabler/icons-react";
import WeekPicker from "../compos/WeekPicker";
import { AddNewWorkout } from "./AddNewWorkout";

/* ----------------------------- date helpers ----------------------------- */

export function getWeekDates(selected: string | Date): Dayjs[] {
    const start = dayjs(selected).startOf("week");
    return Array.from({ length: 7 }, (_, i) => start.add(i, "day"));
}

export function getWeekDatesSTR(selected: string | Date): string[] {
    return getWeekDates(selected).map((d) => d.format("DD-MM-YYYY"));
}

const isWeekday = (d: Dayjs) => d.day() !== 0 && d.day() !== 6;

/* -------------------------------- config -------------------------------- */

type ViewMode = "day" | "weekday" | "week";

const VIEW_OPTIONS: { id: ViewMode; label: string; Icon: typeof IconCalendarDue }[] = [
    { id: "day", label: "Day", Icon: IconCalendarDue },
    { id: "weekday", label: "Weekday", Icon: IconCalendarMinus },
    { id: "week", label: "Week", Icon: IconCalendarWeek },
];

const MENU_ITEMS = [
    { id: "new-file", label: "New file" },
    { id: "copy-link", label: "Copy link" },
    { id: "edit-file", label: "Edit file" },
    { id: "delete-file", label: "Delete file", danger: true },
];

/* -------------------------------- page ---------------------------------- */

function WorkoutBuilderNew() {
    const isMobile = !Grid.useBreakpoint().md; // md = 768px and up
    const [view, setView] = useState<ViewMode>("week"); // desktop only
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    // Mobile: always 1 slide. Desktop: day → 1, weekday → Mon–Fri (5), week → 7.
    const days = useMemo(() => {
        const week = getWeekDates(new Date());
        return !isMobile && view === "weekday" ? week.filter(isWeekday) : week;
    }, [isMobile, view]);

    const slidesToShow = isMobile || view === "day" ? 1 : days.length;

    // Start on today, clamped so we never start past the last full page
    const todayIndex = Math.max(0, days.findIndex((d) => d.isSame(dayjs(), "day")));
    const initialSlide = Math.min(todayIndex, days.length - slidesToShow);

    // Jump to the initial slide whenever the layout changes
    useLayoutEffect(() => {
        const el = scrollerRef.current;
        if (el) el.scrollLeft = (el.clientWidth / slidesToShow) * initialSlide;
    }, [initialSlide, slidesToShow, days.length]);

    const scrollByOne = (dir: 1 | -1) => {
        const el = scrollerRef.current;
        if (el) el.scrollBy({ left: dir * (el.clientWidth / slidesToShow), behavior: "smooth" });
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="px-4">
            <div className="flex flex-col md:flex-row">

                <div className="flex flex-col gap-2 md:w-1/2 md:flex-row">
                    {/* Dropdown 1 */}
                    <Dropdown>
                        <Button aria-label="Menu" variant="tertiary" className="block w-full truncate md:w-1/2">
                            Center Mass Training Compound
                        </Button>
                        <Dropdown.Popover>
                            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                                {MENU_ITEMS.map((item) => (
                                    <Dropdown.Item
                                        key={item.id}
                                        id={item.id}
                                        textValue={item.label}
                                        variant={item.danger ? "danger" : undefined}
                                    >
                                        <Label>{item.label}</Label>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>

                    {/* Dropdown 2 */}
                    <Dropdown>
                        <Button aria-label="Menu" variant="tertiary" className="w-full md:w-1/2">
                            Group Class
                        </Button>
                        <Dropdown.Popover>
                            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                                {MENU_ITEMS.map((item) => (
                                    <Dropdown.Item
                                        key={item.id}
                                        id={item.id}
                                        textValue={item.label}
                                        variant={item.danger ? "danger" : undefined}
                                    >
                                        <Label>{item.label}</Label>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>

                <div className="flex flex-row gap-2 py-2 md:w-1/2 md:justify-end">
                    <div className="flex w-full flex-row justify-between gap-2 md:justify-end">
                        <WeekPicker />
                        <ButtonGroup>
                            <Button variant="tertiary">
                                <IconCheck stroke={2} />
                            </Button>
                            <Button variant="tertiary">
                                <ButtonGroup.Separator />
                                <IconRestore stroke={2} />
                            </Button>
                        </ButtonGroup>
                    </div>

                    {/* View toggle (desktop only) */}
                    <ToggleButtonGroup
                        selectionMode="single"
                        disallowEmptySelection
                        selectedKeys={[view]}
                        onSelectionChange={(keys) => {
                            const [key] = keys;
                            if (key) setView(key as ViewMode);
                        }}
                        className="hidden md:flex"
                    >
                        {VIEW_OPTIONS.map(({ id, label, Icon }, i) => (
                            <ToggleButton key={id} id={id}>
                                {i > 0 && <ToggleButtonGroup.Separator />}
                                <Icon /> {label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>

                    {/* //--------------------------------------------------------------- */}

                    <Button variant="tertiary" onPress={() => setIsOpen(true)}>
                        <IconPlus stroke={2} />
                        <span className="hidden md:inline">Add Workout</span>
                    </Button>

                    <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
                        <Modal.Container size="cover">
                            <Modal.Dialog>
                                <Modal.CloseTrigger />
                                <Modal.Header>
                                    {/* <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                        <CircleCheck className="size-5" />
                                    </Modal.Icon> */}
                                    <Modal.Heading>Add New Workout</Modal.Heading>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* <p>
                                        This modal is controlled by React's <code>useState</code> hook. Pass{" "}
                                        <code>isOpen</code> and <code>onOpenChange</code> props to manage the modal state
                                        externally.
                                    </p> */}

                                    <AddNewWorkout onClose={() => setIsOpen(false)} />
                                </Modal.Body>
                                {/* <Modal.Footer>
                                    <Button slot="close" variant="secondary">
                                        Cancel
                                    </Button>
                                    <Button slot="close">Confirm</Button>
                                </Modal.Footer> */}
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>

                    {/* //--------------------------------------------------------------- */}
                    {slidesToShow < days.length && (

                        <ToggleButton className="hidden gap-2 md:flex">
                            <ToggleButton aria-label="Previous day" onPress={() => scrollByOne(-1)}>
                                <IconChevronLeft stroke={2} />
                            </ToggleButton>
                            <ToggleButton aria-label="Next day" onPress={() => scrollByOne(1)}>
                                <ToggleButtonGroup.Separator />
                                <IconChevronRight stroke={2} />
                            </ToggleButton>
                        </ToggleButton>
                        // <div className="mb-2 hidden justify-end gap-2 md:flex">

                        // </div>
                    )}
                </div>
            </div>

            <div className="py-2">
                {/* Prev / next, only when not all days are visible */}


                <div
                    ref={scrollerRef}
                    className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {days.map((date) => {
                        const dateStr = date.format("YYYY-MM-DD");
                        const isToday = date.isSame(dayjs(), "day");
                        const isSelected = selectedDate === dateStr;

                        return (
                            <div
                                key={dateStr}
                                className="shrink-0 snap-start"
                                style={{ width: `${100 / slidesToShow}%` }}
                            >
                                {/* Day card */}
                                <div className="flex flex-col gap-2 p-0.5">
                                    <Surface
                                        onClick={() => setSelectedDate(dateStr)}
                                        variant={isToday ? "secondary" : "default"}
                                        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl p-3 text-center ${isSelected ? "border border-orange-500" : ""}`}
                                    >
                                        <span className="text-sm font-semibold text-foreground">{date.format("ddd")}</span>
                                        <Label className="flex items-center">
                                            {date.format("MMM DD")}

                                            {isToday && (
                                                <span className="relative flex size-1.5 ml-2">
                                                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                                                    <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
                                                </span>
                                            )}
                                        </Label>
                                    </Surface>

                                    {/* Placeholder for the day's workout content */}
                                    <div className="mt-1 flex h-40 items-center justify-center rounded-lg bg-[#364d79] text-white">
                                        {date.format("DD-MMM-YYYY")}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default WorkoutBuilderNew;