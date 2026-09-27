import { ChevronLeft, ChevronRight, ClockArrowRotateLeft } from "@gravity-ui/icons";
import { Button, Card, Chip, Label, ProgressBar } from "@heroui/react";
import { useEffect, useState } from "react";
import { useWorkoutNavigation, type WorkoutData } from "../hooks/useWorkoutNavigation";
import { getDailyWodDB_HOME } from "../libs/SupabaseEdgeFunctions";
import { WorkoutSection } from "../compos/WorkoutSection";
import ScoreAndRateComponent from "../compos/ScoreAndRateComponent";

function HomePage() {

    const [workoutData, setWorkoutData] = useState<WorkoutData[]>([]);
    const [loading, setLoading] = useState(true);
    const { currentWorkout, workoutDate, isToday, handlePrevious, handleNext, handleToday, isPrevDisabled, isNextDisabled, setCurrentIndex } = useWorkoutNavigation(workoutData);

    useEffect(() => {
        const loadWorkouts = async () => {
            const data = await getDailyWodDB_HOME();
            setWorkoutData(data);

            // Get today's date in local timezone (YYYY-MM-DD format)
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const todayString = `${year}-${month}-${day}`;

            console.log('Today (Local):', todayString);
            console.log('All workout dates:', data.map((item: WorkoutData) => item.workout_date));

            const todayIndex = data.findIndex((item: WorkoutData) => item.workout_date === todayString);

            console.log('Today index:', todayIndex);

            if (todayIndex !== -1) {
                setCurrentIndex(todayIndex);
            }

            setLoading(false);
        };
        loadWorkouts();
    }, [setCurrentIndex]);


    return (
        <>

            <div className="w-full px-4 py-4">
                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-10">
                    {/* ================= LEFT SIDE — 70% ================= */}
                    <div className="lg:col-span-6 flex flex-col gap-4">
                        {/* Date Navigation */}
                        <div className="flex items-center justify-between gap-2">
                            <Button
                                variant="ghost"
                                onPress={handlePrevious}
                                isDisabled={isPrevDisabled}
                            >
                                <ChevronLeft />
                                <span className="hidden sm:inline">Previous</span>
                            </Button>

                            <div className="flex flex-col items-center justify-center gap-2">
                                <Chip size="lg">{workoutDate}</Chip>
                                {isToday() ? (
                                    <Chip>
                                        <span className="relative flex size-1.5">
                                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                                            <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
                                        </span>
                                        Today's Workout
                                    </Chip>
                                ) : (
                                    <Chip
                                        size="sm"
                                        className="cursor-pointer px-2 py-1 text-xs"
                                        onClick={handleToday}
                                    >
                                        <ClockArrowRotateLeft className="size-3" />
                                        Back to Today
                                    </Chip>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                onPress={handleNext}
                                isDisabled={isNextDisabled}
                            >
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight />
                            </Button>
                        </div>

                        {/* Workout Content */}

                        {loading ? (
                            // Show Loading Icon
                            <ProgressBar isIndeterminate aria-label="Loading" className="w-full">
                                <Label>Loading...</Label>
                                <ProgressBar.Track>
                                    <ProgressBar.Fill />
                                </ProgressBar.Track>
                            </ProgressBar>
                        ) : (
                            // Not Loading, Show Content
                            currentWorkout && (
                                <WorkoutSection key={currentWorkout.workout.wod_id} data={currentWorkout} />
                            )
                        )}
                    </div>

                    {/* ================= RIGHT SIDE — 30% ================= */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {/* Quote Card */}
                        <Card className="w-full">
                            <Card.Content>
                                "Your mind will quit 100 times before your body ever does."
                            </Card.Content>
                        </Card>

                        {/* Score and Rate */}
                        <ScoreAndRateComponent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;