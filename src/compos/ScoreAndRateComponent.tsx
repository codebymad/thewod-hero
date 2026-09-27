import {
    Avatar,
    Button,
    Card,
    Description,
    Label,
    ListBox,
    NumberField,
    TextArea,
    Tooltip,
} from "@heroui/react";
import { CircleInfo } from "@gravity-ui/icons";
import { FloppyDisk } from '@gravity-ui/icons';
import { TrashBin } from '@gravity-ui/icons';
import { useState } from "react";

type Score = {
    id: string;
    name: string;
    rpe: number;
    comment: string;
};

function ScoreAndRateComponent() {
    const [rpeValue, setRpeValue] = useState(0);
    const [comment, setComment] = useState("");

    const [scores, setScores] = useState<Score[]>([
        {
            id: "1",
            name: "Bob",
            rpe: 7,
            comment: "Spicy!",
        },
        {
            id: "2",
            name: "Fred",
            rpe: 5,
            comment: "Good, Maybe wanted to go heavy!",
        },
        {
            id: "3",
            name: "Martha",
            rpe: 9,
            comment: "Tested my max today!",
        },
    ]);

    const handleSave = () => {
        const newScore: Score = {
            id: crypto.randomUUID(),
            name: "You",
            rpe: rpeValue,
            comment: comment,
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
                <Card.Title>Score & Rating</Card.Title>
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
                        <Tooltip delay={0}>
                            <Tooltip.Trigger>
                                <Label className="flex items-center gap-1">
                                    RPE
                                    <CircleInfo className="size-4" />
                                </Label>
                            </Tooltip.Trigger>

                            <Tooltip.Content>
                                <div className="max-w-xs">
                                    <p className="font-semibold">
                                        Rating of Perceived Exertion
                                    </p>
                                    <p>
                                        Your rate of perceived exertion (RPE) refers to how hard
                                        you think you're pushing yourself during exercise.
                                    </p>
                                    <p>
                                        It's subjective, which means you decide how hard you feel
                                        you're working during physical activity.
                                    </p>
                                </div>
                            </Tooltip.Content>
                        </Tooltip>

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


                {/* Scores */}
                <div className="mt-4">
                    <ListBox
                        aria-label="Workout scores"
                        className="w-full"
                        selectionMode="single"
                    >
                        {scores.map((score) => (
                            <ListBox.Item
                                key={score.id}
                                id={score.id}
                                textValue={score.name}
                            >
                                <Avatar size="sm">
                                    <Avatar.Fallback>
                                        {score.name.charAt(0)}
                                    </Avatar.Fallback>
                                </Avatar>

                                <div className="flex flex-col">
                                    <Label>{score.name}</Label>
                                    <Description>RPE: {score.rpe}</Description>
                                    <Description>{score.comment}</Description>
                                </div>

                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </div>
            </Card.Content>
        </Card>
    );
}

export default ScoreAndRateComponent;