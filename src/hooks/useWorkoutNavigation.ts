import { useState } from 'react';

export interface WorkoutData {
  workout_date: string;
  workout: {
    tags: string[];
    wod_id: string;
    content: any[];
    wod_name: string;
  };
}

export function useWorkoutNavigation(workoutData: WorkoutData[]) {
  const getTodayIndex = () => {
    if (!workoutData || workoutData.length === 0) return 0;
    const today = new Date().toISOString().split('T')[0];
    const index = workoutData.findIndex((item) => item.workout_date === today);
    return index === -1 ? 0 : index;
  };

  const [currentIndex, setCurrentIndex] = useState<number>(getTodayIndex());

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < workoutData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleToday = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayIndex = workoutData.findIndex((item) => item.workout_date === today);
    if (todayIndex !== -1) {
      setCurrentIndex(todayIndex);
    }
  };

  const currentWorkout: WorkoutData | undefined = workoutData?.[currentIndex];

  const workoutDate = currentWorkout
    ? new Date(currentWorkout.workout_date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const isToday = () => {
    if (!currentWorkout) return false;
    const today = new Date().toISOString().split('T')[0];
    return currentWorkout.workout_date === today;
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === workoutData.length - 1;

  return {
    currentIndex,
    currentWorkout,
    workoutDate,
    isToday,
    handlePrevious,
    handleNext,
    handleToday,
    setCurrentIndex,
    isPrevDisabled,
    isNextDisabled,
  };
}