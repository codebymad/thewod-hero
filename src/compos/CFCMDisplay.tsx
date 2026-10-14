import React, { useEffect, useState } from "react";
import { getDailyCFCM } from "../libs/SupabaseEdgeFunctions";
import { Button, ButtonGroup, Card, Separator, Spinner } from "@heroui/react";
import { IconArrowBackUp, IconArrowsShuffle2 } from "@tabler/icons-react";
import MarkdownComponent from "./MarkdownComponent";

function CFCMDisplay() {
    const [randomData, setRandomData] = useState<any>(null);
    const [randomLoading, setRandomLoading] = useState(false);

    const loadWod = async (date: string) => {
        setRandomLoading(true);

        try {
            if (date === (-99).toString()) {
                const today = new Date();
                const formattedDate = today.toISOString().split('T')[0];
                date = formattedDate;
                date = new Date().toLocaleDateString('en-CA')
            }
            const data = await getDailyCFCM(date);
            setRandomData(data);
        } catch {
            setRandomData(null);
        } finally {
            setRandomLoading(false);
        }
    };

    useEffect(() => {
        loadWod((-99).toString());
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-start">
            <div className="w-full max-w-4xl">
                <div className="mb-6 flex justify-center">
                    <ButtonGroup>
                        <Button
                            variant="secondary"
                            onPress={() => {
                                const randomYear =
                                    Math.floor(
                                        1000 +
                                        Math.random() * 9000
                                    );
                                const randomMon =
                                    Math.floor(
                                        10 +
                                        Math.random() * 90
                                    );
                                const randomDate =
                                    Math.floor(
                                        10 +
                                        Math.random() * 90
                                    );
                                loadWod((randomYear.toString() + '-' + randomMon.toString() + '-' + randomDate.toString()));
                            }}
                        >
                            <IconArrowsShuffle2 size={18} />
                            Random
                        </Button>

                        <Button
                            variant="secondary"

                            onPress={() => loadWod((-99).toString())}
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
                            {randomData.wod?.s?.map((section: any, index: number) => (
                                <React.Fragment key={section.id}>
                                    <div className="flex flex-col justify-center items-center">
                                        <h4 className="text-orange-500" key={index}><strong>{section.title}</strong></h4>

                                        <MarkdownComponent markdown={(section.display_content).replace(/^\*/gm, '\\*').replace(/\n/g, '  \n')} />

                                        {/* {section.section_notes?.map((note: any, noteIndex: number) => (
                            <Description key={noteIndex}>{note}</Description>
                        ))} */}
                                    </div>

                                    <Separator className="my-4" />
                                </React.Fragment>
                            ))}
                        </Card.Content>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default CFCMDisplay;