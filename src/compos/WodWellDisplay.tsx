import { useEffect, useState } from "react";
import { getDailyWW } from "../libs/SupabaseEdgeFunctions";
import { Button, ButtonGroup, Card, Checkbox, Spinner, Tag, TagGroup } from "@heroui/react";
import { IconArrowBackUp, IconArrowsShuffle2 } from "@tabler/icons-react";
import MarkdownComponent from "./MarkdownComponent";


function WodWellDisplay() {
    const [randomData, setRandomData] = useState<any>(null);
    const [randomLoading, setRandomLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const loadWod = async (date: number) => {
        setRandomLoading(true);

        try {
            const now = new Date();

            const dateValue =
                date === -99
                    ? now.getFullYear() * 10000 +
                    (now.getMonth() + 1) * 100 +
                    now.getDate()
                    : date;

            const data = await getDailyWW(dateValue.toString(), isSelected);
            setRandomData(data);
        } catch {
            setRandomData(null);
        } finally {
            setRandomLoading(false);
        }
    };

    useEffect(() => {
        loadWod(-99);
    }, [isSelected]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-start">
            <div className="w-full max-w-4xl">
                <div className="mb-6 flex justify-center">
                    <ButtonGroup>
                        <Button
                            variant="secondary"
                            onPress={() => {
                                const randomId =
                                    Math.floor(
                                        10000000 +
                                        Math.random() * 90000000
                                    );
                                loadWod(randomId);
                            }}
                        >
                            <IconArrowsShuffle2 size={18} />
                            Random
                        </Button>

                        <Button
                            variant="secondary"

                            onPress={() => loadWod(-99)}
                        >
                            <IconArrowBackUp size={18} />
                            Today
                        </Button>

                        <Button
                            variant="secondary"
                            onPress={() => loadWod(-99)}
                        >
                            <Checkbox name="basic-terms" isSelected={isSelected} onChange={setIsSelected} >
                                <Checkbox.Content>
                                    <Checkbox.Control >
                                        <Checkbox.Indicator />
                                    </Checkbox.Control>
                                    Bodyweight
                                </Checkbox.Content>
                            </Checkbox>
                        </Button>
                    </ButtonGroup>
                </div>

                {randomLoading && (
                    <div className="flex justify-center py-12">
                        <Spinner>Loading WOD...</Spinner>
                    </div>
                )}

                {!randomLoading && !randomData && (
                    <Card>
                        <Card.Content className="py-12 text-center">
                            <p className="text-default-500">
                                No WOD available
                            </p>
                        </Card.Content>
                    </Card>
                )}

                {!randomLoading && randomData && (
                    <Card variant="default">
                        <Card.Content className="p-2 md:p-2 flex flex-col items-center justify-center text-center">
                            <TagGroup aria-label="Tags" selectionMode="none">
                                <TagGroup.List>
                                    {(randomData?.category ?? []).map((category: string) => (
                                        <Tag key={category} id={category}>
                                            {category}
                                        </Tag>
                                    ))}
                                </TagGroup.List>
                            </TagGroup>
                            <h4 className="text-orange-500 pt-2">
                                <strong>{randomData?.title || "Workout of the Day"}</strong>
                            </h4>

                            <div className="prose prose-neutral max-w-none">
                                <MarkdownComponent
                                    markdown={
                                        randomData?.display_content ||
                                        "No WOD available"
                                    }
                                />
                            </div>
                        </Card.Content>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default WodWellDisplay;