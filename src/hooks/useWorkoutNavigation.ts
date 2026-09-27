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
  const getLocalDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTodayIndex = () => {
    if (!workoutData || workoutData.length === 0) return 0;
    const todayString = getLocalDateString();
    const index = workoutData.findIndex((item) => item.workout_date === todayString);
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
    const todayString = getLocalDateString();
    const todayIndex = workoutData.findIndex((item) => item.workout_date === todayString);
    if (todayIndex !== -1) {
      setCurrentIndex(todayIndex);
    }
  };

  const currentWorkout: WorkoutData | undefined = workoutData?.[currentIndex];

  const workoutDate = currentWorkout
    ? new Date(currentWorkout.workout_date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const isToday = () => {
    if (!currentWorkout) return false;
    const todayString = getLocalDateString();
    return currentWorkout.workout_date === todayString;
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