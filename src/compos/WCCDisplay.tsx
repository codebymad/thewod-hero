import {  useEffect, useState } from "react";
import { getDailyWCC } from "../libs/SupabaseEdgeFunctions";
import { Accordion, Button, ButtonGroup, Card, Description, Separator, Spinner } from "@heroui/react";
import { IconAppWindow, IconArrowBackUp, IconArrowsShuffle2, IconNote } from "@tabler/icons-react";
import MarkdownComponent from "./MarkdownComponent";
import { ChevronDown } from "@gravity-ui/icons";
import { IconBarbell } from '@tabler/icons-react';

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

                        <Accordion variant="surface" hideSeparator className="w-full" allowsMultipleExpanded={false}>
                            {randomData.map((program: any, programIndex: number) => (
                                <>
                                    <Accordion.Item key={programIndex}>
                                        <Accordion.Heading>
                                            <Accordion.Trigger>

                                                <div className="flex items-center gap-2 text-orange-500">
                                                    <IconAppWindow size={18} />
                                                    <span className="text-lg font-semibold">{program.program_name}</span>
                                                </div>
                                                <Accordion.Indicator>
                                                    <ChevronDown />
                                                </Accordion.Indicator>
                                            </Accordion.Trigger>
                                        </Accordion.Heading>
                                        <Accordion.Panel>
                                            <Accordion.Body>
                                                <Card key={programIndex} variant="default">
                                                    <Card.Content className="p-6 md:p-8">


                                                        <div className="mt-4">
                                                            {program.sections?.map((section: any, index: number) => (

                                                                <>
                                                                    <div className="flex flex-col justify-center items-center" key={index}>
                                                                        <div className="flex items-center gap-2 text-orange-500">
                                                                            <IconBarbell size={18} />
                                                                            <span className="text-lg font-semibold whitespace-pre-line">
                                                                                {section.section_name.split('|')[0]}
                                                                            </span>
                                                                        </div>
                                                                        <Description>{section.section_name.split('|').slice(1).join('|')} </Description>



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

   

                                                                </>







                                                            ))}
                                                        </div>

                                                    </Card.Content>
                                                </Card>
                                            </Accordion.Body>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </>
                            ))}
                        </Accordion >




                    </div>
                )}
            </div>
        </div >
    );
}

export default WCCDisplay;