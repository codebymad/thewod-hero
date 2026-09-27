import './App.css'
import { Flex } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Header, Label, ProgressBar } from '@heroui/react';
import { ChevronLeft, ChevronRight, CircleDollar } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";
import { Moon, Sun } from '@gravity-ui/icons';
import { Bars } from '@gravity-ui/icons';
import { WODDrawer } from './compos/WODDrawer';
import { Chip } from "@heroui/react";
import { WorkoutSection } from './compos/WorkoutSection';
import WeekPicker from './compos/WeekPicker';
import ScoreAndRateComponent from './compos/ScoreAndRateComponent';
import { useWorkoutNavigation } from './hooks/useWorkoutNavigation';
import { getDailyWodDB_HOME } from './libs/SupabaseEdgeFunctions';
import { ClockArrowRotateLeft } from '@gravity-ui/icons';
import type { WorkoutData } from './hooks/useWorkoutNavigation';

interface AppProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

function App({ darkMode, toggleTheme }: AppProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [workoutData, setWorkoutData] = useState<WorkoutData[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentWorkout, workoutDate, isToday, handlePrevious, handleNext, handleToday, isPrevDisabled, isNextDisabled, setCurrentIndex } = useWorkoutNavigation(workoutData);

  useEffect(() => {
    const loadWorkouts = async () => {
      const data = await getDailyWodDB_HOME();
      setWorkoutData(data);

      // Set to today's workout after data loads
      const today = new Date().toISOString().split('T')[0];
      const todayIndex = data.findIndex((item: WorkoutData) => item.workout_date === today);
      if (todayIndex !== -1) {
        setCurrentIndex(todayIndex);
      }

      setLoading(false);
    };
    loadWorkouts();
  }, [setCurrentIndex]);


  return (
    <>
      <Header>
        <Flex align="center" justify="space-between">
          <Button variant="ghost" onPress={() => setDrawerOpen(true)} isIconOnly>
            <Bars />
          </Button>

          <div className="text-xl font-bold">
            the<strong>WOD</strong>
          </div>

          <Button variant="ghost" onPress={toggleTheme} isIconOnly>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </Flex>
      </Header>

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




      {/* Week Picker */}
      <WeekPicker />

      {/* Drawer */}
      <WODDrawer isOpen={drawerOpen} onOpenChange={setDrawerOpen} />

      {/* Temporary UI Elements - Remove These Later */}
      <div className="px-4 py-4 space-y-4">
        <Button onPress={toggleTheme}>
          Change Theme
        </Button>

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
  );
}

export default App;