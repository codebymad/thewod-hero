import { CircleDollar } from "@gravity-ui/icons";
import { Button, Card, Link } from "@heroui/react";
import WeekPicker from "../compos/WeekPicker";

function WODPlanner() {

    return (
        <>

            {/* Temporary UI Elements - Remove These Later */}
            <div className="px-4 py-4 space-y-4">
                <Button>
                    I'm BUtton
                </Button>

                {/* Week Picker */}
                <WeekPicker />

                <Card className="w-full">
                    <CircleDollar aria-label="Dollar sign icon" className="text-primary size-6" role="img" />
                    <Card.Header>
                        <Card.Title>Become an Acme Creator!</Card.Title>
                        <Card.Description>
                            Visit the Acme Creator Hub to sign up today and start earning credits from your fans and followers.
                        </Card.Description>
                    </Card.Header>
                    <Card.Footer>
                        <Link
                            aria-label="Go to Acme Creator Hub (opens in new tab)"
                            href="https://heroui.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Creator Hub
                            <Link.Icon aria-hidden="true" />
                        </Link>
                    </Card.Footer>
                </Card>
            </div>
        </>
    )

}

export default WODPlanner;