import {
    AlertDialog,
    Avatar,
    Button,
    Card,
    Description,
    Label,
    ListBox,
    NumberField,
    TextArea,
} from "@heroui/react";
import { CircleInfo } from "@gravity-ui/icons";
import { FloppyDisk } from '@gravity-ui/icons';
import { TrashBin } from '@gravity-ui/icons';
import { useState } from "react";
import { IconScoreboard } from '@tabler/icons-react';

type Score = {
    id: string;
    name: string;
    rpe: number;
    comment: string;
    date: Date;
};

function ScoreAndRateComponent({ todaysDate }: { todaysDate: string }) {
    const [rpeValue, setRpeValue] = useState(0);
    const [comment, setComment] = useState("");

    const [scores, setScores] = useState<Score[]>([
        {
            id: "1",
            name: "Bob",
            rpe: 7,
            comment: "Spicy!",
            date: new Date()
        },
        {
            id: "2",
            name: "Fred",
            rpe: 5,
            comment: "Good, Maybe wanted to go heavy!",
            date: new Date()
        },
        {
            id: "3",
            name: "Martha",
            rpe: 9,
            comment: "Tested my max today!",
            date: new Date()
        },
    ]);

    const handleSave = () => {
        const newScore: Score = {
            id: crypto.randomUUID(),
            name: "You",
            rpe: rpeValue,
            comment: comment,
            date: new Date()
        };

        setScores((current) => [newScore, ...current]);

        console.log("RPE:", rpeValue);
        console.log("Comment:", comment);

        // Reset form
        setRpeValue(0);
        setComment("");
    };

    return (
        <Card className="w-full">
            <Card.Header>
                <div className="flex items-center gap-2">
                    <IconScoreboard className="text-orange-500" />
                    <span>Score & Rating</span>
                </div>
                <Description>{todaysDate}</Description>
            </Card.Header>

            <Card.Content>
                {/* RPE */}
                <NumberField
                    value={rpeValue}
                    onChange={setRpeValue}
                    minValue={0}
                    maxValue={10}
                    name="rpe"
                    className="w-full"
                >
                    <div className="flex w-full items-center justify-between">

                        <RPEInfoDialog />

                        <NumberField.Group>
                            <NumberField.DecrementButton />
                            <NumberField.Input className="w-[50px] text-center" disabled />
                            <NumberField.IncrementButton />
                        </NumberField.Group>
                    </div>
                </NumberField>

                {/* Comment */}
                <TextArea
                    required={true}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    aria-label="Workout comment"
                    className="h-32 w-full"
                    placeholder="How did the workout feel?"
                    maxLength={512}
                />
                <Description id="textarea-controlled-description">
                    Characters: {comment.length} / 512
                </Description>

                <br />

                {/* Save */}
                <div className="flex w-full items-center justify-between">

                    <Button
                        isDisabled={rpeValue === 0 && comment.trim() === ''}
                        onPress={handleSave}
                    >
                        <FloppyDisk />
                        Save
                    </Button>

                    <Button variant="secondary"
                        isDisabled={rpeValue === 0 && comment === ''}
                        onClick={() => {
                            setRpeValue(0);
                            setComment('');
                        }}>
                        <TrashBin /> Clear
                    </Button>
                </div>

                <UserScores scoresdata={scores} />

            </Card.Content>
        </Card>
    );
}

function RPEInfoDialog() {
    return (
        <AlertDialog>
            <AlertDialog.Trigger>
                <Label className="cursor-pointer flex items-center gap-1">
                    RPE
                    <CircleInfo className="size-4" />
                </Label>
            </AlertDialog.Trigger>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Heading>
                                Rating of Perceived Exertion
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            <p>
                                Your rate of perceived exertion (RPE) refers to how hard you
                                think you're pushing yourself during exercise.
                            </p>

                            <br />

                            <p>
                                It's subjective, which means you decide how hard you feel
                                you're working during physical activity.
                            </p>

                            <br />

                            More Details <a
                                href="https://en.wikipedia.org/wiki/Rating_of_perceived_exertion"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline dark:text-blue-400"
                            >
                                Rating of perceived exertion
                            </a>
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Okay
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}

function UserScores({ scoresdata }: { scoresdata: Score[] }) {
    return (
        <>
            {/* Scores */}
            <div className="mt-4">
                <ListBox
                    aria-label="Workout scores"
                    className="w-full"
                    selectionMode="single"
                >
                    {scoresdata.map((score) => (
                        <ListBox.Item key={score.id} id={score.id} textValue={score.name}>
                            <div className="flex w-full items-start gap-3">

                                {/* Avatar */}
                                <Avatar size="sm">
                                    <Avatar.Fallback>{score.name.charAt(0)}</Avatar.Fallback>
                                </Avatar>

                                {/* Main content */}
                                <div className="flex flex-col flex-1">

                                    {/* Name + RPE */}
                                    <div className="flex items-center justify-between">
                                        <Label className="font-semibold">{score.name}</Label>
                                        <Description className="font-medium">RPE: {score.rpe}</Description>
                                    </div>

                                    {/* Date */}
                                    <Description className="text-gray-500 dark:text-gray-400 text-sm">
                                        {score.date.toLocaleDateString()}
                                    </Description>

                                    {/* Comment */}
                                    <Description className="mt-1 text-gray-600 dark:text-gray-300">
                                        {score.comment}
                                    </Description>
                                </div>

                                <ListBox.ItemIndicator />
                            </div>
                        </ListBox.Item>

                    ))}
                </ListBox>
            </div>
        </>
    )
}


export default ScoreAndRateComponent;