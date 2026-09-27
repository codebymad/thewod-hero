"use client";

import {
    CalendarDate,
    getLocalTimeZone,
    today,
    type DateValue,
} from "@internationalized/date";

import {
    Button,
    Calendar,
    Chip,
    Description,
} from "@heroui/react";

import { useState } from "react";

import {
    ClockArrowRotateLeft,
    Calendar as CalendarIcon,
} from "@gravity-ui/icons";
import { LocationArrowFill } from '@gravity-ui/icons';

export default function NewWeekPicker() {

    // --------------------------------------------------
    // Get Sunday -> Saturday for the supplied date
    // --------------------------------------------------
    function getWeekDates(
        date: DateValue
    ): CalendarDate[] {
        const jsDate = new Date(
            date.year,
            date.month - 1,
            date.day
        );

        const dayOfWeek = jsDate.getDay();

        // Sunday = 0
        const daysToSunday = dayOfWeek;

        const weekStart = new Date(jsDate);

        weekStart.setDate(
            jsDate.getDate() - daysToSunday
        );

        const weekDates: CalendarDate[] = [];

        for (let i = 0; i < 7; i++) {
            const d = new Date(weekStart);

            d.setDate(
                weekStart.getDate() + i
            );

            weekDates.push(
                new CalendarDate(
                    d.getFullYear(),
                    d.getMonth() + 1,
                    d.getDate()
                )
            );
        }

        return weekDates;
    }

    // --------------------------------------------------
    // Today's date
    // --------------------------------------------------
    const todayDate =
        today(getLocalTimeZone());

    // --------------------------------------------------
    // Selected week
    // --------------------------------------------------
    const [weekDates, setWeekDates] =
        useState<CalendarDate[]>(
            getWeekDates(todayDate)
        );

    // --------------------------------------------------
    // Calendar's focused / visible date
    // --------------------------------------------------
    const [focusedDate, setFocusedDate] =
        useState<DateValue>(todayDate);

    // --------------------------------------------------
    // Calendar view
    // --------------------------------------------------
    const [weeks] = useState(1);

    const [cal_view, setCalView] =
        useState<"week" | "month">("week");

    // --------------------------------------------------
    // Compare two CalendarDate / DateValue values
    // --------------------------------------------------
    function isSameDate(
        date1: DateValue,
        date2: DateValue
    ): boolean {
        return (
            date1.year === date2.year &&
            date1.month === date2.month &&
            date1.day === date2.day
        );
    }

    // --------------------------------------------------
    // Check whether a date belongs to the current week
    // --------------------------------------------------
    function isCurrentWeek(
        date: DateValue
    ): boolean {
        const currentDate =
            today(getLocalTimeZone());

        const currentWeek =
            getWeekDates(currentDate);

        return currentWeek.some(
            weekDate =>
                isSameDate(weekDate, date)
        );
    }

    // --------------------------------------------------
    // Handle calendar date selection
    // --------------------------------------------------
    const handleDateChange = (
        newDates: readonly DateValue[]
    ) => {
        if (newDates.length === 0) {
            return;
        }

        const clickedDate =
            newDates[newDates.length - 1];

        console.log(
            "Clicked date:",
            `${clickedDate.year}-${clickedDate.month}-${clickedDate.day}`
        );

        const selectedWeek =
            getWeekDates(clickedDate);

        // console.log(
        //     "Selected week:",
        //     selectedWeek.map(
        //         date =>
        //             `${date.year}-${date.month}-${date.day}`
        //     )
        // );

        // Update selected week
        setWeekDates(selectedWeek);

        // Move calendar to clicked date
        setFocusedDate(clickedDate);
    };

    // --------------------------------------------------
    // Back to current week
    // --------------------------------------------------
    const handleCurrentWeek = () => {
        const currentDate =
            today(getLocalTimeZone());

        const currentWeek =
            getWeekDates(currentDate);

        // Select current week
        setWeekDates(currentWeek);

        // Move calendar back to today
        setFocusedDate(currentDate);
    };

    // --------------------------------------------------
    // Format date
    // --------------------------------------------------
    const formatDate = (
        date: CalendarDate
    ) => {
        const jsDate = new Date(
            date.year,
            date.month - 1,
            date.day
        );

        const dayName =
            jsDate.toLocaleDateString(
                "en-US",
                {
                    weekday: "short",
                }
            );

        const monthName =
            jsDate.toLocaleDateString(
                "en-US",
                {
                    month: "short",
                }
            );

        return `${dayName}, ${monthName} ${date.day} ${date.year}`;
    };

    // --------------------------------------------------
    // Should "Back to Current Week" be displayed?
    //
    // We check the calendar's focused date rather than
    // weekDates because navigation changes the calendar
    // view without changing the selected dates.
    // --------------------------------------------------
    const showCurrentWeekButton =
        !isCurrentWeek(focusedDate);

    return (
        <div 
        // className="flex flex-col items-center gap-4"
        >

            {/* ------------------------------------------ */}
            {/* Selected week label */}
            {/* ------------------------------------------ */}

            <div className="text-sm font-semibold text-default-700">
                {weekDates.length > 0
                    ? `${formatDate(
                        weekDates[0]
                    )} - ${formatDate(
                        weekDates[6]
                    )}`
                    : "Select a date"}
            </div>



            {/* ------------------------------------------ */}
            {/* Calendar */}
            {/* ------------------------------------------ */}

            <Calendar
                // className="w-full max-w-xl mx-auto"
                aria-label="Event dates"

                selectionMode="multiple"

                value={weekDates}

                onChange={handleDateChange}

                focusedValue={focusedDate}

                onFocusChange={setFocusedDate}

                visibleDuration={
                    cal_view === "week"
                        ? { weeks }
                        : undefined
                }

                pageBehavior="single"

                isDateUnavailable={() => false}
            >
                {/* -------------------------------------- */}
                {/* Calendar Header */}
                {/* -------------------------------------- */}

                <Calendar.Header>

                    <Calendar.NavButton
                        slot="previous"
                    />

                    <div>
                        {cal_view === "month" && <Calendar.Heading />}


                        <Chip
                            size="sm"
                            className="cursor-pointer px-2 py-1 text-xs"
                            onClick={() => {
                                setCalView(
                                    cal_view === "week"
                                        ? "month"
                                        : "week"
                                );
                            }}
                        >
                            <CalendarIcon className="size-3" />

                            {cal_view === "week"
                                ? "Month View"
                                : "Week View"}
                        </Chip>
                    </div>



                    <Calendar.NavButton
                        slot="next"
                    />

                </Calendar.Header>

                {/* -------------------------------------- */}
                {/* Calendar Grid */}
                {/* -------------------------------------- */}

                <Calendar.Grid>

                    <Calendar.GridHeader>
                        {(day) => (
                            <Calendar.HeaderCell>
                                {day}
                            </Calendar.HeaderCell>
                        )}
                    </Calendar.GridHeader>

                    <Calendar.GridBody>
                        {(date) => (
                            <Calendar.Cell
                                date={date}
                            // isDisabled={false}
                            />
                        )}
                    </Calendar.GridBody>

                </Calendar.Grid>

            </Calendar>

            {/* ------------------------------------------ */}
            {/* Description */}
            {/* ------------------------------------------ */}

            <Description className="text-center">
                {weekDates.length
                    ? `${weekDates.length} date(s) selected`
                    : "Select a date"}
            </Description>


            <div className="flex flex-row">

                {showCurrentWeekButton && (
                    <Chip
                        size="sm"
                        className="cursor-pointer px-2 py-1 text-xs"
                        onClick={
                            handleCurrentWeek
                        }
                    >
                        <ClockArrowRotateLeft className="size-3" />

                        Back to Current Week
                    </Chip>
                )}


                <Button variant='secondary' size="sm" onClick={() => {
                    console.log(weekDates);
                    setCalView('week')
                }}>
                    <LocationArrowFill />
                    Submit</Button>
            </div>

        </div>
    );
}