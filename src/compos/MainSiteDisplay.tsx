import { useEffect, useState } from "react";
import { getDailyMS } from "../libs/SupabaseEdgeFunctions";
import { Button, ButtonGroup, Card, Description, Separator, Spinner } from "@heroui/react";
import { IconArrowBackUp, IconArrowsShuffle2 } from "@tabler/icons-react";
import MarkdownComponent from "./MarkdownComponent";

function MainSiteDisplay() {
    const [randomData, setRandomData] = useState<any>(null);
    const [randomLoading, setRandomLoading] = useState(false);

    const loadWod = async (random: boolean) => {
        setRandomLoading(true);

        try {
            const data = await getDailyMS(random.toString());
            setRandomData(data);
        } catch {
            setRandomData(null);
        } finally {
            setRandomLoading(false);
        }
    };

    useEffect(() => {
        loadWod(false);
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-start">
            <div className="w-full max-w-4xl">
                <div className="mb-6 flex justify-center">
                    <ButtonGroup>
                        <Button
                            variant="secondary"
                            onPress={() => {
                                loadWod(true);
                            }}
                        >
                            <IconArrowsShuffle2 size={18} />
                            Random
                        </Button>

                        <Button
                            variant="secondary"

                            onPress={() => loadWod(false)}
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
                        <Card.Content className="p-6 md:p-8">
                            {randomData.sections?.map((section: any, index: number) => (
                                <>
                                    <div key={index} className="flex flex-col justify-center items-center">
                                        <h4 className="text-orange-500"><strong>{section.section_name}</strong></h4>

                                        <MarkdownComponent markdown={(section.section_content).replace(/\n/g, '  \n')} />



                                        {section.section_notes?.map((note: any, noteIndex: number) => (
                                            <Description key={noteIndex}>{note}</Description>
                                        ))}

                                    </div>

                                    <Separator className="my-4" />

                                </>
                            ))
                            }
                        </Card.Content>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default MainSiteDisplay;