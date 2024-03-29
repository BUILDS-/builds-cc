import * as React from "react";
import { FC, useEffect, useState, useMemo } from "react";
import {
    Container,
    createStyles,
    Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Event from "components/Events/Event";
import { useMediaQuery } from "@mantine/hooks";
import { BadgeType, EventType, InstructorType } from "types";
import Layout from "components/Layout";
import { graphql } from "gatsby";

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
                        {...event}
                        date={new Date(event.date)}
                    />
                </Carousel.Slide>
            ))}
        </Carousel>
    );
};
interface EventsProps {
    data: {
        allMarkdownRemark: {
            nodes: {
                frontmatter: {
                    title: string;
                    description: string;
                    badges: BadgeType[];
                    date: Date;
                    image: string;
                    instructors: InstructorType[];
                    location: string;
                    link?: string;
                    linkText?: string;
                }
            }[]
        }
    }
}

const Events: FC<EventsProps> = ({ data }) => {
    // State data
    const [current, setCurrent] = useState<number>();

    const events = useMemo(() => {
        return data.allMarkdownRemark.nodes.map(
            ({ frontmatter }) => ({
                title: frontmatter.title,
                description: frontmatter.description,
                badges: frontmatter.badges,
                date: frontmatter.date,
                image: frontmatter.image,
                instructors: frontmatter.instructors,
                location: frontmatter.location,
                link: frontmatter?.link,
                linkText: frontmatter?.linkText,
            })
        ).reverse(); // since we're getting the most recent events first, we have to reverse the array
    }, [data]);

    useEffect(() => {
        console.log(events);

        // current is the most recent event that hasn't passed
        const now = new Date();

        // Find the most recent event that hasn't passed
        const curr = events.findIndex((e) => e.date > now);
        setCurrent(curr);

        // If no events are upcoming, set current to the last event
        if (curr === -1) {
            setCurrent(events.length - 1);
        }
    }, [events])

    return (
        <Layout>
            <Container>
                <Title py="xl" align="center">
                    Events
                </Title>
                <EventsCarousel current={current} events={events}/>
            </Container>
        </Layout>
    );
};

export default Events;

export const query = graphql`
    query {
        allMarkdownRemark(
            limit: 10
            filter: { fileAbsolutePath: { regex: "src/events/" } }
            sort: { frontmatter : { date : DESC } }
        ) {
            nodes {
                frontmatter {
                    title
                    description
                    badges {
                        label
                        emoji
                    }
                    date
                    image
                    instructors {
                        name
                        image
                    }
                    location
                    link
                    linkText
                }
            }
        }
    }
`;