import { useEffect, useState } from "react";
import { getDailyWW } from "../libs/SupabaseEdgeFunctions";
import { Button, ButtonGroup, Card, Spinner } from "@heroui/react";
import { IconArrowBackUp, IconArrowsShuffle2 } from "@tabler/icons-react";
import MarkdownComponent from "./MarkdownComponent";

function WodWellDisplay() {
    const [randomData, setRandomData] = useState<any>(null);
    const [randomLoading, setRandomLoading] = useState(false);

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

            const data = await getDailyWW(dateValue.toString());
            setRandomData(data);
        } catch {
            setRandomData(null);
        } finally {
            setRandomLoading(false);
        }
    };

    useEffect(() => {
        loadWod(-99);
    }, []);

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
                        <Card.Content className="p-6 md:p-8 flex flex-col items-center justify-center text-center">
                            <h4 className="text-orange-500">
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