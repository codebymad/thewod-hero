import { DatePicker, Flex } from "antd";
import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import { useEffect } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.locale('en-gb');

function WeekPicker() {
    const weekFormat = 'DD-MMM-YYYY';

    function customWeekStartEndFormat(value: Dayjs): string {
        const selectedDate = Array.isArray(value) ? value[0] : value;

        let start_day;
        let end_day;

        const monday = selectedDate.isoWeekday(1);
        const sunday = selectedDate.isoWeekday(7);
        start_day = monday;
        end_day = sunday;


        return `${start_day.format(weekFormat)} - ${end_day.format(weekFormat)}`;
        // const sunday = selectedDate.isoWeekday(1);
        // const sat = selectedDate.isoWeekday(7);
        // return `${sunday.format(weekFormat)} ~ ${sat.format(weekFormat)}`;
    }

    function onChange(date: Dayjs | Dayjs[] | null, dateString: string | null): void {
        if (date) {
            console.log('Clicked Date: ', dateString)
            const selectedDate = Array.isArray(date) ? date[0] : date;

            const monday = selectedDate.isoWeekday(1);
            const sunday = selectedDate.isoWeekday(7);

            const weekNumber = selectedDate.isoWeek();
            const year = selectedDate.year();

            const weekDates = Array.from({ length: 7 }, (_, i) =>
                monday.add(i, 'day')
            );

            console.log('Week Number:', weekNumber);
            console.log('Year:', year);
            console.log('Week Dates (Monday-Sunday):');

            weekDates.forEach((date, index) => {
                const dayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                console.log(`${dayName[index]}: ${date.format('YYYY-MM-DD')}`);
            });

            console.log('Date range:', `${monday.format('YYYY-MM-DD')} to ${sunday.format('YYYY-MM-DD')}`);
        }
    }


    useEffect(() => {
        const today = dayjs();
        const monday = today.isoWeekday(1);
        const sunday = today.isoWeekday(7);
        const dateString = `${monday.format('MM/DD')} ~ ${sunday.format('MM/DD')}`;
        onChange(today, dateString)
    }, [])


    return (
        <>
            <Flex gap="small" justify="flex-start" align="flex-start" vertical>
                <DatePicker

                    defaultValue={dayjs()}
                    onFocus={(e) => e.target.click()}
                    format={customWeekStartEndFormat}
                    picker="week"
                    onChange={onChange}
                    style={{
                        borderRadius: 16, // HeroUI-like
                        padding: "6px 10px",
                    }}
                />
            </Flex>
        </>
    )
}

export default WeekPicker;