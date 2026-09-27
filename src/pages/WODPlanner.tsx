import { CircleDollar } from "@gravity-ui/icons";
import { Autocomplete, Button, Card, EmptyState, Link, ListBox, SearchField, useFilter, type Key } from "@heroui/react";
import WeekPicker from "../compos/WeekPicker";
import NewWeekPicker from "../compos/NewWeekPicker";
// import { NewWeekPickerData } from "../compos/NewWeekPicketData";
import { useState } from "react";
import { Drawer } from "@heroui/react";

function WODPlanner() {
    const [selectedKey1, setSelectedKey1] = useState<Key | null>(null);
    const items = [
        { id: "option1", name: "Option 1" },
        { id: "option2", name: "Option 2" },
        { id: "option3", name: "Option 3" },
        { id: "option4", name: "Option 4" },
    ];
    const { contains } = useFilter({ sensitivity: "base" });


    return (
        <>

            <Drawer>
                <Button variant="secondary">Open Drawer</Button>
                <Drawer.Backdrop >
                    <Drawer.Content placement="bottom" className="w-full max-w-xl mx-auto">
                        <Drawer.Dialog>
                            <Drawer.Header>
                                <Drawer.Heading>Select Program & Dates</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                <div className="flex flex-col items-center justify-content">
                                    <Autocomplete
                                        className="w-[256px]"
                                        placeholder="Select Program"
                                        selectionMode="single"
                                        value={selectedKey1}
                                        variant="primary"
                                        onChange={setSelectedKey1}
                                    >
                                        {/* <Label>Select Program</Label> */}
                                        <Autocomplete.Trigger>
                                            <Autocomplete.Value />
                                            <Autocomplete.ClearButton />
                                            <Autocomplete.Indicator />
                                        </Autocomplete.Trigger>
                                        <Autocomplete.Popover>
                                            <Autocomplete.Filter filter={contains}>
                                                <SearchField
                                                    autoFocus
                                                    aria-label="Search options"
                                                    name="search"
                                                    variant="secondary"
                                                >
                                                    <SearchField.Group>
                                                        <SearchField.SearchIcon />
                                                        <SearchField.Input placeholder="Search..." />
                                                        <SearchField.ClearButton />
                                                    </SearchField.Group>
                                                </SearchField>
                                                <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                                                    {items.map((item) => (
                                                        <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                                                            {item.name}
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                    ))}
                                                </ListBox>
                                            </Autocomplete.Filter>
                                        </Autocomplete.Popover>
                                    </Autocomplete>

                                    <NewWeekPicker />
                                </div>
                            </Drawer.Body>
                            {/* <Drawer.Footer>
                                <Button slot="close" variant="secondary">
                                    Cancel
                                </Button>
                                <Button slot="close">Confirm</Button>
                            </Drawer.Footer> */}
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>

            {/* Temporary UI Elements - Remove These Later */}
            <div className="px-4 py-4 space-y-4">


                {/*                 
                <NewWeekPickerData /> */}


                <Card className="w-full">
                    <Card.Header>
                        <Card.Title>Weekly WOD Planner</Card.Title>
                        <Card.Description>
                            Plan your workouts for the week
                        </Card.Description>
                    </Card.Header>
                    <Card.Content>

                        <Autocomplete
                            className="w-[256px]"
                            placeholder="Select Program"
                            selectionMode="single"
                            value={selectedKey1}
                            variant="primary"
                            onChange={setSelectedKey1}
                        >
                            {/* <Label>Select Program</Label> */}
                            <Autocomplete.Trigger>
                                <Autocomplete.Value />
                                <Autocomplete.ClearButton />
                                <Autocomplete.Indicator />
                            </Autocomplete.Trigger>
                            <Autocomplete.Popover>
                                <Autocomplete.Filter filter={contains}>
                                    <SearchField
                                        autoFocus
                                        aria-label="Search options"
                                        name="search"
                                        variant="secondary"
                                    >
                                        <SearchField.Group>
                                            <SearchField.SearchIcon />
                                            <SearchField.Input placeholder="Search..." />
                                            <SearchField.ClearButton />
                                        </SearchField.Group>
                                    </SearchField>
                                    <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                                        {items.map((item) => (
                                            <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                                                {item.name}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Autocomplete.Filter>
                            </Autocomplete.Popover>
                        </Autocomplete>

                        <NewWeekPicker />

                    </Card.Content>
                    <Card.Footer>
                        {/* <Link
                            aria-label="Go to Acme Creator Hub (opens in new tab)"
                            href="https://heroui.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Creator Hub
                            <Link.Icon aria-hidden="true" />
                        </Link> */}
                    </Card.Footer>
                </Card>





                <Button>
                    I'm BUtton
                </Button>

                {/* Week Picker */}
                <WeekPicker />

                <Card className="w-full">
                    <CircleDollar aria-label="Dollar sign icon" className="text-primary size-6" role="img" />
                    <Card.Header>
                        <Card.Title>Become an Acme Creator!</Card.Title>
                        <Card.Description>
                            Visit the Acme Creator Hub to sign up today and start earning credits from your fans and followers.
                        </Card.Description>
                    </Card.Header>
                    <Card.Footer>
                        <Link
                            aria-label="Go to Acme Creator Hub (opens in new tab)"
                            href="https://heroui.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Creator Hub
                            <Link.Icon aria-hidden="true" />
                        </Link>
                    </Card.Footer>
                </Card>
            </div>
        </>
    )

}

export default WODPlanner;