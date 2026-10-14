import { Fragment, useEffect, useState } from "react";
import { getDailyWCC } from "../libs/SupabaseEdgeFunctions";
import { Button, ButtonGroup, Card, Description, Separator, Spinner } from "@heroui/react";
import { IconArrowBackUp, IconArrowsShuffle2 } from "@tabler/icons-react";
import MarkdownComponent from "./MarkdownComponent";

function WCCDisplay() {
    const [randomData, setRandomData] = useState<any>(null);
    const [randomLoading, setRandomLoading] = useState(false);

    const loadWod = async (random: boolean) => {
        setRandomLoading(true);

        try {
            const data = await getDailyWCC(random.toString());
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
                    <div className="flex flex-col gap-4">
                        {randomData.map((program: any, programIndex: number) => (
                            <Card key={programIndex} variant="default">
                                <Card.Content className="p-6 md:p-8">
                                    <details open={programIndex === 0} className="group">
                                        <summary className="flex items-center justify-between cursor-pointer list-none">
                                            <h3 className="text-xl font-bold">{program.program_name}</h3>
                                            <span className="text-orange-500 transition-transform group-open:rotate-180">▼</span>
                                        </summary>

                                        <div className="mt-4">
                                            {program.sections?.map((section: any, index: number) => (
                                                <Fragment key={index}>
                                                    <div className="flex flex-col justify-center items-center">
                                                        <h4 className="text-orange-500"><strong>{section.section_name}</strong></h4>

                                                        <MarkdownComponent markdown={(section.section_content).replace(/\n/g, '  \n\n ')} />

                                                        {section.section_notes?.map((note: any, noteIndex: number) => (
                                                            <Description key={noteIndex} className="whitespace-pre-line">{note}</Description>
                                                        ))}
                                                    </div>

                                                    <Separator className="my-4" />
                                                </Fragment>
                                            ))}
                                        </div>
                                    </details>
                                </Card.Content>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WCCDisplay;