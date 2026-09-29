import { Card } from "@heroui/react";
import { quotes as quotesjson } from "../datafiles/QuotesData";

interface Quote {
    q: string;
    a: string;
}

function QuotesComponent() {
    const quotes: Quote[] = quotesjson;

    if (!quotes.length) { return null; }

    const date = new Date();
    const dateNumber = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

    const index = dateNumber % quotes.length;

    const quote = quotes[index];

    return (
        <Card className="w-full">
            <Card.Content>
                <div className="text-center">
                    <p className="text-md font-small italic">
                        {quote.q}
                    </p>
                    <p className="mt-3 text-sm text-gray-500">
                        {quote.a}
                    </p>
                </div>
            </Card.Content>
        </Card>
    );
}

export default QuotesComponent;