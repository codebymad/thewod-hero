import './App.css'
import { DatePicker, Flex, ConfigProvider, theme } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useEffect, useState } from 'react';
import { Button, Description, Header, Label} from '@heroui/react';
import { ChevronLeft, ChevronRight, CircleDollar, Target } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";
import enGB from 'antd/locale/en_GB';
import 'dayjs/locale/en-gb';
import { Moon, Sun } from '@gravity-ui/icons';
import { Bars } from '@gravity-ui/icons';
import { WODDrawer } from './compos/WODDrawer';
import { Avatar } from "@heroui/react";
import { Chip } from "@heroui/react";
import { WorkoutSection } from './compos/WorkoutSection';
import { NumberField } from '@heroui/react';
import { TextArea } from '@heroui/react';
import { ListBox } from '@heroui/react';

dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.locale('en-gb');

interface AppProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

function App({ darkMode, toggleTheme }: AppProps) {
  const weekFormat = 'DD-MMM-YYYY';
  // const weekstart: 'mon' | 'sun' = 'mon'
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const data = [{ "section_name": "strength", "section_notes": ["If unsuccessful last week, use the same weight.", "If successful last week, add 5lbs - 20lbs."], "section_content": "### Bench Press\n**Every 2:00**\n* **Paused Close Grip Bench Press**: 5 x 2\n* **Close Grip Bench Press**: 1 x 10\n\n**Tempo**: 0,3,X,0\n**Intensity**: Around 80%" }, { "section_name": "metcon", "section_notes": ["Fast Ski.", "Heavy but unbroken Power Cleans.", "Smooth Double Unders."], "section_content": "### Wednesday Metcon\n**6 Rounds**:\n* 12/10 **Cal Ski Sprint**\n* 12 **DB Power Clean**\n* 40 **Double Under**\n* Rest 1:30" }, { "section_name": "accessory", "section_notes": [], "section_content": "### After Party\n**3 - 4 Sets**:\n* 10 **Bottoms Up KB Press**\n* 20 **Banded Face Pull**\n\n**3 - 4 Sets**:\n* 10 **DB Chest Fly**\n* 20 **Reverse Fly**" }];

  const iconMap = {
    strength: <Sun className="text-orange-500" />,
    metcon: <Bars className="text-orange-500" />,
    accessory: <Target className="text-orange-500" />,
  };

  return (
    <>

      {/* adadsad */}
      <ConfigProvider
        locale={enGB}
        theme={{
          algorithm: darkMode
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
          token: {
            colorPrimary: '#f97316',
          },
        }}
      >

        <Header >
          <Flex align="center" justify="space-between">

            <Button variant="ghost" onPress={() => setDrawerOpen(true)} isIconOnly>
              <Bars />
            </Button>

            <div className="text-xl font-bold">
              the<strong>WOD</strong>
            </div>

            {/* <Menu
              mode="horizontal"
              items={[
                { key: "workouts", label: "Workouts" },
                { key: "history", label: "History" },
                { key: "progress", label: "Progress" },
              ]}
            /> */}

            <Button variant="ghost" onPress={toggleTheme} isIconOnly>
              {darkMode ? <Sun /> : <Moon />}
            </Button>

          </Flex>
        </Header>


        <div className="w-full px-4">
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-10">

            {/* ================= LEFT SIDE — 70% ================= */}
            <div className="lg:col-span-6 flex flex-col gap-4">

              {/* Date Navigation */}
              <div className="flex items-center justify-between gap-2">

                <Button variant="ghost">
                  <ChevronLeft />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <div className="flex flex-col items-center justify-center gap-2">
                  <Chip size="lg">26 Sep 2026</Chip>
                  <Chip>Today's Workout</Chip>
                </div>

                <Button variant="ghost">
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight />
                </Button>

              </div>

              {/* Main Content Card */}
              <Card className="w-full">
                <Card.Header>
                  <Card.Title>
                    Friday Engine Builder
                    {/* <Separator className="my-4" /> */}
                  </Card.Title>
                  <Card.Description>
                    {/* Lorem ipsum dolor sit amet consectetur. Sed arcu donec id aliquam dolor sed amet
                    faucibus etiam. */}

                    {/* <div> */}
                    {/* <Steps orientation="vertical" items={items} /> */}

                    {/* <Typography>
                       <MarkdownComponent markdown={markdown} />
                      </Typography> */}
                    {/* </div> */}

                  </Card.Description>
                </Card.Header>

                <Card.Content>
                  {/* Your content */}

                  <div className="flex flex-col gap-0">
                    {data.map((section) => (
                      <WorkoutSection
                        key={section.section_name}
                        id={section.section_name}
                        title={section.section_name}
                        content={section.section_content}
                        notes={section.section_notes}
                        icon={iconMap[section.section_name as keyof typeof iconMap]}
                      />
                    ))}
                  </div>
                </Card.Content>
              </Card>

            </div>


            {/* ================= RIGHT SIDE — 30% ================= */}
            <div className="lg:col-span-4 flex flex-col gap-4">

              {/* Right Card 1 */}
              <Card className="w-full">
                {/* <Card.Header>
                  <Card.Title>
                    Score & Rating
                  </Card.Title>
                </Card.Header> */}

                <Card.Content>
                  “Your mind will quit 100 times before your body ever does.”
                </Card.Content>
              </Card>

              {/* Right Card 2 */}
              <Card className="w-full">
                <Card.Header>
                  <Card.Title>
                    Score & Rating
                  </Card.Title>
                </Card.Header>

                <Card.Content>
                  <NumberField className="w-full max-w-64" defaultValue={1} minValue={1} maxValue={10} name="width">
                    <Label>RPE</Label>
                    <NumberField.Group>
                      <NumberField.DecrementButton />
                      <NumberField.Input className="w-[120px]" disabled />
                      <NumberField.IncrementButton />
                    </NumberField.Group>
                  </NumberField>

                  <TextArea
                    aria-label="Quick project update"
                    className="h-32 w-full"
                    placeholder="Share a quick project update..."
                  />

                  <Button>Save</Button>


                  <div>
                    <ListBox aria-label="Users" className="w-full" selectionMode="single">
                      <ListBox.Item id="1" textValue="Bob">
                        <Avatar size="sm">
                          <Avatar.Image
                            alt="Bob"
                            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                          />
                          <Avatar.Fallback>B</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Label>Bob</Label>
                          <Description>RPE: 7</Description>
                          <Description>Spicy!</Description>
                        </div>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="2" textValue="Fred">
                        <Avatar size="sm">
                          <Avatar.Image
                            alt="Fred"
                            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
                          />
                          <Avatar.Fallback>F</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Label>Fred</Label>
                          <Description>RPE: 5</Description>
                          <Description>Good, May be wanted to go heavy!</Description>
                        </div>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="3" textValue="Martha">
                        <Avatar size="sm">
                          <Avatar.Image
                            alt="Martha"
                            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
                          />
                          <Avatar.Fallback>M</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Label>Martha</Label>
                          <Description>RPE: 9</Description>
                          <Description>Tested my max today!</Description>
                        </div>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </div>
                </Card.Content>
              </Card>

            </div>

          </div>
        </div>

        <Flex gap="small" justify="flex-start" align="flex-start" vertical>
          <DatePicker
            defaultValue={dayjs()}
            onFocus={(e) => e.target.click()}
            format={customWeekStartEndFormat}
            picker="week"
            onChange={onChange}
          />
        </Flex>
      </ConfigProvider >


      <Button onPress={toggleTheme}>
        Change Theme
      </Button>


      <Card className="w-full">
        <CircleDollar aria-label="Dollar sign icon" className="text-primary size-6" role="img" />
        <Card.Header>
          <Card.Title>Become an Acme Creator!</Card.Title>
          <Card.Description>
            Visit the Acme Creator Hub to sign up today and start earning credits from your fans and
            followers.
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


      <WODDrawer
        isOpen={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  )
}

export default App