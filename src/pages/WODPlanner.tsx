// import { CircleDollar } from "@gravity-ui/icons";
// import { Autocomplete, Button, Card, EmptyState, Link, ListBox, SearchField, useFilter, type Key } from "@heroui/react";
// import WeekPicker from "../compos/WeekPicker";
// import NewWeekPicker from "../compos/NewWeekPicker";
// import { NewWeekPickerData } from "../compos/NewWeekPicketData";
// import { useState } from "react";
// import { Drawer } from "@heroui/react";

import { Carousel } from 'antd';
import {
    AlertDialog,
    Button,
    Chip,
    Description,
    Label,
    ListBox,
} from "@heroui/react";
import { useState } from "react";
import NewWeekPicker from "../compos/NewWeekPicker";
import { Briefcase, Check, ListTimeline } from "@gravity-ui/icons";


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

function WODPlanner() {
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
            <NewWeekPicker />

            <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
                <Chip
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => openDialog("gym")}
                >
                    <Briefcase />
                    {gym}
                </Chip>

                <Chip
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => openDialog("program")}
                >
                    <ListTimeline />
                    {program}
                </Chip>
            </div>



            {/* Mobile */}
            <div className="block md:hidden">
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
    );
}



// function WODPlanner1() {
//     const [selectedKey1, setSelectedKey1] = useState<Key | null>(null);
//     const items = [
//         { id: "option1", name: "Option 1" },
//         { id: "option2", name: "Option 2" },
//         { id: "option3", name: "Option 3" },
//         { id: "option4", name: "Option 4" },
//     ];
//     const { contains } = useFilter({ sensitivity: "base" });


//     return (
//         <>

//             <Drawer>
//                 <Button variant="secondary">Open Drawer</Button>
//                 <Drawer.Backdrop >
//                     <Drawer.Content placement="bottom" className="w-full max-w-xl mx-auto">
//                         <Drawer.Dialog>
//                             <Drawer.Header>
//                                 <Drawer.Heading>Select Program & Dates</Drawer.Heading>
//                             </Drawer.Header>
//                             <Drawer.Body>
//                                 <div className="flex flex-col items-center justify-content">
//                                     <Autocomplete
//                                         className="w-[256px]"
//                                         placeholder="Select Program"
//                                         selectionMode="single"
//                                         value={selectedKey1}
//                                         variant="primary"
//                                         onChange={setSelectedKey1}
//                                     >
//                                         {/* <Label>Select Program</Label> */}
//                                         <Autocomplete.Trigger>
//                                             <Autocomplete.Value />
//                                             <Autocomplete.ClearButton />
//                                             <Autocomplete.Indicator />
//                                         </Autocomplete.Trigger>
//                                         <Autocomplete.Popover>
//                                             <Autocomplete.Filter filter={contains}>
//                                                 <SearchField
//                                                     autoFocus
//                                                     aria-label="Search options"
//                                                     name="search"
//                                                     variant="secondary"
//                                                 >
//                                                     <SearchField.Group>
//                                                         <SearchField.SearchIcon />
//                                                         <SearchField.Input placeholder="Search..." />
//                                                         <SearchField.ClearButton />
//                                                     </SearchField.Group>
//                                                 </SearchField>
//                                                 <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
//                                                     {items.map((item) => (
//                                                         <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
//                                                             {item.name}
//                                                             <ListBox.ItemIndicator />
//                                                         </ListBox.Item>
//                                                     ))}
//                                                 </ListBox>
//                                             </Autocomplete.Filter>
//                                         </Autocomplete.Popover>
//                                     </Autocomplete>

//                                     <NewWeekPicker />
//                                 </div>
//                             </Drawer.Body>
//                             {/* <Drawer.Footer>
//                                 <Button slot="close" variant="secondary">
//                                     Cancel
//                                 </Button>
//                                 <Button slot="close">Confirm</Button>
//                             </Drawer.Footer> */}
//                         </Drawer.Dialog>
//                     </Drawer.Content>
//                 </Drawer.Backdrop>
//             </Drawer>

//             {/* Temporary UI Elements - Remove These Later */}
//             <div className="px-4 py-4 space-y-4">


//                 {/*                 
//                 <NewWeekPickerData /> */}


//                 <Card className="w-full">
//                     <Card.Header>
//                         <Card.Title>Weekly WOD Planner</Card.Title>
//                         <Card.Description>
//                             Plan your workouts for the week
//                         </Card.Description>
//                     </Card.Header>
//                     <Card.Content>

//                         <Autocomplete
//                             className="w-[256px]"
//                             placeholder="Select Program"
//                             selectionMode="single"
//                             value={selectedKey1}
//                             variant="primary"
//                             onChange={setSelectedKey1}
//                         >
//                             {/* <Label>Select Program</Label> */}
//                             <Autocomplete.Trigger>
//                                 <Autocomplete.Value />
//                                 <Autocomplete.ClearButton />
//                                 <Autocomplete.Indicator />
//                             </Autocomplete.Trigger>
//                             <Autocomplete.Popover>
//                                 <Autocomplete.Filter filter={contains}>
//                                     <SearchField
//                                         autoFocus
//                                         aria-label="Search options"
//                                         name="search"
//                                         variant="secondary"
//                                     >
//                                         <SearchField.Group>
//                                             <SearchField.SearchIcon />
//                                             <SearchField.Input placeholder="Search..." />
//                                             <SearchField.ClearButton />
//                                         </SearchField.Group>
//                                     </SearchField>
//                                     <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
//                                         {items.map((item) => (
//                                             <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
//                                                 {item.name}
//                                                 <ListBox.ItemIndicator />
//                                             </ListBox.Item>
//                                         ))}
//                                     </ListBox>
//                                 </Autocomplete.Filter>
//                             </Autocomplete.Popover>
//                         </Autocomplete>

//                         <NewWeekPicker />

//                     </Card.Content>
//                     <Card.Footer>
//                         {/* <Link
//                             aria-label="Go to Acme Creator Hub (opens in new tab)"
//                             href="https://heroui.com"
//                             rel="noopener noreferrer"
//                             target="_blank"
//                         >
//                             Creator Hub
//                             <Link.Icon aria-hidden="true" />
//                         </Link> */}
//                     </Card.Footer>
//                 </Card>





//                 <Button>
//                     I'm BUtton
//                 </Button>

//                 {/* Week Picker */}
//                 <WeekPicker />

//                 <Card className="w-full">
//                     <CircleDollar aria-label="Dollar sign icon" className="text-primary size-6" role="img" />
//                     <Card.Header>
//                         <Card.Title>Become an Acme Creator!</Card.Title>
//                         <Card.Description>
//                             Visit the Acme Creator Hub to sign up today and start earning credits from your fans and followers.
//                         </Card.Description>
//                     </Card.Header>
//                     <Card.Footer>
//                         <Link
//                             aria-label="Go to Acme Creator Hub (opens in new tab)"
//                             href="https://heroui.com"
//                             rel="noopener noreferrer"
//                             target="_blank"
//                         >
//                             Creator Hub
//                             <Link.Icon aria-hidden="true" />
//                         </Link>
//                     </Card.Footer>
//                 </Card>
//             </div>
//         </>
//     )

// }

export default WODPlanner;