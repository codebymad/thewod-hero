
import { Briefcase, Check, ChevronDown, ListTimeline } from "@gravity-ui/icons";
import { Button, Description, Label, Chip, AlertDialog, ListBox } from "@heroui/react";
import { useState } from "react";
import WeekPicker from "../compos/WeekPicker";
import { Carousel } from "antd";

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


    return (
        <>

            <div className="flex w-full flex-col md:flex-row items-center gap-2 px-4 py-4">

                {/* GYM */}
                <div className="w-full md:flex-1 order-1 md:order-1 md:justify-start flex">
                    <Chip
                        size="lg"
                        className="cursor-pointer w-full md:w-auto flex items-center justify-between gap-2"
                        onClick={() => openDialog("gym")}
                    >
                        {/* LEFT ICON */}
                        <div className="flex items-center gap-2">
                            <Briefcase />
                        </div>

                        {/* MIDDLE CONTENT */}
                        <div className="flex-1 text-center truncate">
                            {gym}
                        </div>

                        {/* RIGHT ICON */}
                        <div className="flex items-center gap-2">
                            <ChevronDown />
                        </div>
                    </Chip>
                </div>

                {/* PROGRAM */}
                <div className="w-full md:flex-1 order-2 md:order-3 md:justify-end flex">

                    <Chip
                        size="lg"
                        className="cursor-pointer w-full md:w-auto flex items-center justify-between gap-2"
                        onClick={() => openDialog("program")}
                    >
                        {/* LEFT ICON */}
                        <div className="flex items-center gap-2">
                            <ListTimeline />
                        </div>

                        {/* MIDDLE CONTENT */}
                        <div className="flex-1 text-center truncate">
                            {program}
                        </div>

                        {/* RIGHT ICON */}
                        <div className="flex items-center gap-2">
                            <ChevronDown />
                        </div>
                    </Chip>
                </div>

                {/* DATE (WeekPicker) */}
                <div className="w-full md:flex-1 order-3 md:order-2 md:justify-center items-center justify-center flex">
                    <WeekPicker />
                </div>

            </div>

            {/* Mobile */}
            <div className="block md:hidden px-4 py-1">
                <Carousel dotPlacement="top">
                    {itemsC.map((item) => (
                        <div key={item}>
                            <h3 style={contentStyle}>{item}</h3>
                        </div>
                    ))}
                </Carousel>
            </div>


            {/* Desktop */}
            <div className="hidden md:flex flex-row gap-4">
                {itemsC.map((item) => (
                    <div key={item} className="flex-1">
                        <h3 style={contentStyle}>{item}</h3>
                    </div>
                ))}
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
