/* eslint-disable react/jsx-key */
import * as React from "react";
import {
    Box,
    Container,
    createStyles,
    Group,
    MultiSelect,
    SelectItem,
    Title,
    Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Event from "components/Events/Event";
import { useMediaQuery } from "@mantine/hooks";
import { BadgeType, EventType, InstructorType } from "types";
import { useEffect, useState } from "react";
import { IconFilter } from "@tabler/icons";
import axios from "axios";
import { BadgeResponse, InstructorResponse } from "types/api";

const useStyles = createStyles((theme) => ({
    filters: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing.md,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
        gap: theme.spacing.md,
        borderBottom: `1px solid ${theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
            }`,
        borderTop: `1px solid ${theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
            }`,
    },

    filterIcon: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[6],
    },

    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },

    notFound: {
        width: "100%",
        textAlign: "center",
        fontSize: theme.fontSizes.xl,
    },
}));

type CarousePropTypes = {
    current: number | undefined;
    events: EventType[];
};

const EventsCarousel = ({ current, events }: CarousePropTypes) => {
    // Styles
    const { theme } = useStyles();
    const dark = theme.colorScheme === "dark";

    const isBiggerThanMd = useMediaQuery("(min-width: 768px)");

    return (
        <Carousel
            slideSize="40%"
            slideGap="md"
            controlSize={30}
            draggable
            withControls={isBiggerThanMd}
            withIndicators
            align={isBiggerThanMd ? "center" : "start"}
            pb={44}
            breakpoints={[
                { maxWidth: "lg", slideSize: "40%" },
                { maxWidth: "md", slideSize: "50%" },
                {
                    maxWidth: "sm",
                    slideSize: "82%",
                    slideGap: "sm",
                },
            ]}
            styles={{
                control: {
                    backgroundColor: dark ? "dark" : "gray",
                    color: dark ? "black" : "white",
                    opacity: 1,
                },
                indicator: {
                    backgroundColor: dark ? "dark" : "gray",
                },
            }}
            height="100%"
            initialSlide={current}
        >
            {events.map((event, key) => (
                <Carousel.Slide key={key}>
                    <Event
                        title={event.title}
                        description={event.description}
                        badges={event.badges}
                        date={new Date(event.date)}
                        image={event.image}
                        instructors={event.instructors}
                        location={event.location}
                    />
                </Carousel.Slide>
            ))}
        </Carousel>
    );
};

// const Filters = () => {
//     const { classes } = useStyles();

//     const [badges, setBadges] = useState<SelectItem[]>([]);
//     const [instructors, setInstructors] = useState<SelectItem[]>([]);


//     const filterInstructors = (instructorIds: string[]) => {
//         router.push({ query: { ...router.query, instructors: instructorIds } });
//     };

//     const getSelInstructors = () => {
//         if (typeof router.query.instructors === "string")
//             return [router.query.instructors];
//         return router.query.instructors ?? [];
//     };

//     const filterBadges = (badgeIds: string[]) => {
//         router.push({ query: { ...router.query, badges: badgeIds } });
//     };

//     const getSelBadges = () => {
//         if (typeof router.query.badges === "string")
//             return [router.query.badges];
//         return router.query.badges ?? [];
//     };

//     return (
//         <Box className={classes.filters}>
//             <Group pr="md" align="flex-start" spacing={0}>
//                 <IconFilter className={classes.filterIcon} size={24} />
//                 <Text className={classes.filterIcon}>Filters</Text>
//             </Group>
//             <MultiSelect
//                 data={instructors}
//                 placeholder="Select instructors"
//                 onChange={filterInstructors}
//                 value={getSelInstructors()}
//             />
//             <MultiSelect
//                 data={badges}
//                 placeholder="Select badges"
//                 onChange={filterBadges}
//                 value={getSelBadges()}
//             />
//         </Box>
//     );
// };

const events: EventType[] = [
    {
        title: "Build Your Own Macropad",
        description: "Learn how to build your own macropad using hotswap sockets and QMK firmware!",
        badges: [
            {
                label: "Hardware",
                emoji: "🖥️",
            },
        ],
        // date is April 27, 2023 at 7:00PM EST
        date: new Date(2023, 3, 27, 19, 0, 0, 0),
        image: "../assets/events/macropad.jpg",
        instructors: [
            {
                name: "Dominic Maglione",
                image: "",
            }
        ],
        location: "CDS 220",
    },
    {
        title: "BUILDS Welcome Event",
        description: "Come join us for our first event of the semester! Free food and drinks provided. Socialize, learn about BUILDS, and meet our members!",
        badges: [
            {
                label: "Social",
                emoji: "🎉",
            },
        ],
        // date is Sept 12, 2023 at 7:30PM EST
        date: new Date(2023, 8, 12, 19, 30, 0, 0),
        image: "../assets/builds_group_pic_1.jpeg",
        instructors: [
            {
                name: "BUILDS",
                image: "",
            }
        ],
        location: "CDS 220",
    },
    {
        title: "Pimp My Terminal",
        description: "Learn how to customize your terminal to make it look cool and be more productive!",
        badges: [
            {
                label: "Terminal",
                emoji: "⌨️",
            },
        ],
        // date is Sept 19, 2023 at 7:30PM EST
        date: new Date(2023, 8, 19, 19, 30, 0, 0),
        image: "../assets/events/pimp-my-terminal.svg",
        instructors: [
            {
                name: "Dominic Maglione",
                image: "",
            }
        ],
        location: "CDS 220",
    }
]

const Events: NextPage = () => {
    // Styles
    const { classes } = useStyles();

    // State data
    const [current, setCurrent] = useState<number>();

    useEffect(() => {
        // current is the most recent event that hasn't passed
        const now = new Date();

        // Find the most recent event that hasn't passed
        const curr = events.findIndex((e) => e.date > now);
        setCurrent(curr);

        // If no events are upcoming, set current to the last event
        if (curr === -1) {
            setCurrent(events.length - 1);
        }
    }, [])

    return (
        <Container>
            <Title py="xl" align="center">
                Events
            </Title>
            {/* <Filters /> */}
            <EventsCarousel current={current} events={events} />
        </Container>
    );
};

export default Events;
