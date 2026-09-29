import { ChevronLeft, ChevronRight, ClockArrowRotateLeft } from "@gravity-ui/icons";
import { Button, Chip } from "@heroui/react";
import { useEffect, useState } from "react";
import { useWorkoutNavigation, type WorkoutData } from "../hooks/useWorkoutNavigation";
import { getDailyWodDB_HOME } from "../libs/SupabaseEdgeFunctions";
import { WorkoutSection } from "../compos/WorkoutSection";
import ScoreAndRateComponent from "../compos/ScoreAndRateComponent";
import QuotesComponent from "../compos/QuotesComponent";
import { AutoSkeleton } from "@auto-skeleton/react";

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


    // const bone = "animate-shine rounded-lg bg-neutral-200/90 dark:bg-neutral-800/90";
    // if (loading) {
    //     return (
    //         <>

    //             <div className="w-full px-4 py-4">
    //                 <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-10">

    //                     {/* ================= LEFT SIDE — 60% ================= */}
    //                     <div className="flex flex-col gap-4 lg:col-span-6">

    //                         {/* Date Navigation */}
    //                         <div className="flex items-center justify-between gap-2">
    //                             {/* Previous */}
    //                             <Skeleton className="h-10 w-24 rounded-lg" />

    //                             {/* Date + Today */}
    //                             <div className="flex flex-col items-center justify-center gap-2">
    //                                 {/* Date chip */}
    //                                 <Skeleton className="h-8 w-32 rounded-full" />

    //                                 {/* Today's Workout chip */}
    //                                 <Skeleton className="h-6 w-28 rounded-full" />
    //                             </div>

    //                             {/* Next */}
    //                             <Skeleton className="h-10 w-24 rounded-lg" />
    //                         </div>

    //                         {/* Workout Content */}
    //                         <div className="flex flex-col gap-4">

    //                             {/* Workout title/header */}
    //                             <Skeleton className="h-10 w-3/4 rounded-lg" />

    //                             {/* Workout description */}
    //                             <div className="flex flex-col gap-2">
    //                                 <Skeleton className="h-4 w-full rounded" />
    //                                 <Skeleton className="h-4 w-11/12 rounded" />
    //                                 <Skeleton className="h-4 w-4/5 rounded" />
    //                             </div>

    //                             {/* Workout sections */}
    //                             <div className="rounded-xl border p-4">
    //                                 <Skeleton className="mb-4 h-6 w-40 rounded" />

    //                                 <div className="flex flex-col gap-3">
    //                                     <Skeleton className="h-5 w-full rounded" />
    //                                     <Skeleton className="h-5 w-10/12 rounded" />
    //                                     <Skeleton className="h-5 w-9/12 rounded" />
    //                                 </div>
    //                             </div>

    //                             <div className="rounded-xl border p-4">
    //                                 <Skeleton className="mb-4 h-6 w-32 rounded" />

    //                                 <div className="flex flex-col gap-3">
    //                                     <Skeleton className="h-5 w-full rounded" />
    //                                     <Skeleton className="h-5 w-11/12 rounded" />
    //                                     <Skeleton className="h-5 w-8/12 rounded" />
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     </div>

    //                     {/* ================= RIGHT SIDE — 40% ================= */}
    //                     <div className="flex flex-col gap-4 lg:col-span-4">

    //                         {/* Quote Card */}
    //                         <div className="rounded-xl border p-5">
    //                             <div className="flex flex-col gap-4">
    //                                 <Skeleton className="h-6 w-20 rounded" />

    //                                 <div className="flex flex-col gap-2">
    //                                     <Skeleton className="h-4 w-full rounded" />
    //                                     <Skeleton className="h-4 w-11/12 rounded" />
    //                                     <Skeleton className="h-4 w-9/12 rounded" />
    //                                 </div>

    //                                 <Skeleton className="h-4 w-32 rounded" />
    //                             </div>
    //                         </div>

    //                         {/* Score and Rate */}
    //                         <div className="rounded-xl border p-5">
    //                             <div className="flex flex-col gap-4">

    //                                 <Skeleton className="h-6 w-32 rounded" />

    //                                 <div className="flex items-center gap-4">
    //                                     <Skeleton className="h-16 w-16 rounded-full" />

    //                                     <div className="flex flex-1 flex-col gap-2">
    //                                         <Skeleton className="h-4 w-24 rounded" />
    //                                         <Skeleton className="h-4 w-full rounded" />
    //                                     </div>
    //                                 </div>

    //                                 <Skeleton className="h-10 w-full rounded-lg" />

    //                             </div>
    //                         </div>

    //                     </div>
    //                 </div>
    //             </div>
    //             {/* <div className="w-[250px] space-y-5 rounded-xl border border-border/80 bg-surface p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
    //                 <Skeleton className={`h-32 ${bone}`} />
    //                 <div className="space-y-3">
    //                     <Skeleton className={`h-3 w-3/5 ${bone}`} />
    //                     <Skeleton className={`h-3 w-4/5 ${bone}`} />
    //                     <Skeleton className={`h-3 w-2/5 ${bone}`} />
    //                 </div>
    //             </div> */}
    //         </>
    //     )
    // }


    return (
        <>

            <AutoSkeleton id='autoskeleton' loading={loading}
                options={{
                    animation: "pulse",  // "wave" | "pulse" | "none"
                    cache: true,
                }}

            >
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
                            {
                                currentWorkout && (
                                    <WorkoutSection key={currentWorkout.workout.wod_id} data={currentWorkout} />
                                )
                            }

                        </div>

                        {/* ================= RIGHT SIDE — 30% ================= */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            {/* Quote Card */}
                            <QuotesComponent />

                            {/* Score and Rate */}
                            <ScoreAndRateComponent todaysDate={workoutDate}/>
                        </div>
                    </div>
                </div>
            </AutoSkeleton>
        </>
    )
}

export default HomePage;