import { Avatar, Button, Card, Description, Label, ListBox, NumberField, TextArea } from "@heroui/react";

function ScoreAndRateComponent() {
    return (
        <>

            <Card className="w-full">
                <Card.Header>
                    <Card.Title>
                        Score & Rating
                    </Card.Title>
                </Card.Header>

                <Card.Content>
                    <NumberField className="w-full max-w-64" defaultValue={1} minValue={1} maxValue={10} name="width">
                        <Label>RPE</Label>
                        <NumberField.Group>
                            <NumberField.DecrementButton />
                            <NumberField.Input className="w-[120px]" disabled />
                            <NumberField.IncrementButton />
                        </NumberField.Group>
                    </NumberField>

                    <TextArea
                        aria-label="Quick project update"
                        className="h-32 w-full"
                        placeholder="Share a quick project update..."
                    />

                    <Button>Save</Button>


                    <div>
                        <ListBox aria-label="Users" className="w-full" selectionMode="single">
                            <ListBox.Item id="1" textValue="Bob">
                                <Avatar size="sm">
                                    <Avatar.Image
                                        alt="Bob"
                                        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                                    />
                                    <Avatar.Fallback>B</Avatar.Fallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <Label>Bob</Label>
                                    <Description>RPE: 7</Description>
                                    <Description>Spicy!</Description>
                                </div>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="2" textValue="Fred">
                                <Avatar size="sm">
                                    <Avatar.Image
                                        alt="Fred"
                                        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
                                    />
                                    <Avatar.Fallback>F</Avatar.Fallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <Label>Fred</Label>
                                    <Description>RPE: 5</Description>
                                    <Description>Good, May be wanted to go heavy!</Description>
                                </div>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="3" textValue="Martha">
                                <Avatar size="sm">
                                    <Avatar.Image
                                        alt="Martha"
                                        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
                                    />
                                    <Avatar.Fallback>M</Avatar.Fallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <Label>Martha</Label>
                                    <Description>RPE: 9</Description>
                                    <Description>Tested my max today!</Description>
                                </div>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        </ListBox>
                    </div>
                </Card.Content>
            </Card>
        </>
    )
}

export default ScoreAndRateComponent;