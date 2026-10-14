import { useEffect, useState } from "react";
import { getDailyMEF } from "../libs/SupabaseEdgeFunctions";
import { Accordion, Button, ButtonGroup, Card, Description, Separator, Spinner } from "@heroui/react";
import { IconArrowBackUp, IconArrowsShuffle2, IconBarbell, IconNote } from "@tabler/icons-react";
import MarkdownComponent from "./MarkdownComponent";
import { ChevronDown } from "@gravity-ui/icons";

function MEFDisplay() {
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
            const data = await getDailyMEF(date);
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

                                <Card key={index} variant="default">
                                    <Card.Content>
                                        {/* <div className="mt-4"> */}

                                        <div className="flex flex-col justify-center items-center" key={index}>
                                            <div className="flex items-center gap-2 text-orange-500">
                                                <IconBarbell size={18} />
                                                <span className="text-md font-semibold whitespace-pre-line">
                                                    {section.section_name.toUpperCase()}
                                                </span>
                                            </div>
                                          

                                            <MarkdownComponent markdown={(section.section_content).replace(/\n/g, '  \n\n ')} />

                                            <Accordion variant="surface" className="w-full">
                                                {section.section_notes?.map((note: any, noteIndex: number) => (
                                                    <Accordion.Item key={noteIndex}>
                                                        <Accordion.Heading>
                                                            <Accordion.Trigger>
                                                                <div className="flex items-center gap-2">
                                                                    <IconNote size={18} />
                                                                    <span className="text-lg font-semibold">Note</span>
                                                                </div>
                                                                <Accordion.Indicator>
                                                                    <ChevronDown />
                                                                </Accordion.Indicator>
                                                            </Accordion.Trigger>
                                                        </Accordion.Heading>
                                                        <Accordion.Panel>
                                                            <Accordion.Body><Description key={noteIndex} className="whitespace-pre-line">{note}</Description></Accordion.Body>
                                                        </Accordion.Panel>
                                                    </Accordion.Item>
                                                ))}
                                            </Accordion>
                                            <Separator className="my-4" />
                                        </div>


                                        {/* </div> */}
                                    </Card.Content>
                                </Card>
                            ))}

                        </Card.Content>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default MEFDisplay;