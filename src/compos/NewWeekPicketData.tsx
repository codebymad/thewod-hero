"use client";

import { Calendar } from "@heroui/react";
import { useState } from "react";

export function NewWeekPickerData() {
  const [weeks
    /*, setWeeks*/] = useState(1);

  return (
    <div className="flex flex-col items-center gap-6">
      <Calendar aria-label="Week view"
        firstDayOfWeek="mon"
        visibleDuration={{ weeks }}
        selectionMode="multiple"
      >
        <Calendar.Header>
          <Calendar.Heading />
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
    </div>
  );
}