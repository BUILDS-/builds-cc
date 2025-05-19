import * as React from "react";

import {
    Card,
    Text,
    Group,
    Badge as MBadge,
    createStyles,
    Image,
    Space,
    Box,
    Button,
} from "@mantine/core";
import format from "date-fns/format";
import { BadgeType, InstructorType } from "types";
import Badge from "./Badge";
import Instructor from "./Instructor";
// import { AddToCalendarButton } from 'add-to-calendar-button-react';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.md,
        height: "50%",
        maxWidth: "50%",
        display: "flex",
        flexDirection: "column",
    },

    section: {
        borderBottom: `1px solid ${theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[3]
            }`,
        padding: theme.spacing.md,

    },

    label: {
        textTransform: "uppercase",
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));

type PropTypes = {
    title: string;
    description: string;
    badges: BadgeType[];
    date: Date;
    image: string;
    instructors: InstructorType[];
    location: string;
    maxWidth?: string;
    link?: string;
    linkText?: string;
};

const Event = ({
    title,
    description,
    badges,
    date,
    image,
    instructors,
    location,
    maxWidth,
    link,
    linkText,
}: PropTypes) => {
    const { classes, theme } = useStyles();
    const is_past = new Date() > date;
    const dark = theme.colorScheme === "dark";

    // const updateInstructors = (id: string | undefined) => {
    //     let current = router.query.instructors ?? [];
    //     if (typeof current === "string") {
    //         current = [current];
    //     }

    //     if (id != null)
    //         router.push({
    //             query: { ...router.query, instructors: [...current, id] },
    //         });
    // };

    // const updateBadges = (id: string | undefined) => {
    //     let current = router.query.badges ?? [];
    //     if (typeof current === "string") {
    //         current = [current];
    //     }

    //     if (id != null)
    //         router.push({
    //             query: { ...router.query, badges: [...current, id] },
    //         });
    // };

    return (
        <Card
            withBorder
            radius="md"
            className={classes.card}
            sx={{
                maxWidth: 400 || "none",
            }}
        >
            <Card.Section
                className={classes.section}
                sx={{maxHeight:300,  padding: 0, overflow: "hidden" }}
            >
                <Image
                    src={image}
                    alt={title}
                    fit="cover"
                    imageProps={{ loading: "lazy" }}
                />
            </Card.Section>

            <Card.Section className={classes.section} sx={{ flex: 1 }}>
                <Text size="lg" weight={500}>
                    {title}
                </Text>
                <Text size="md" color={dark ? "gray.6" : "gray"}>
                    {format(date, "MMMM do, yyyy 'at' h:mm a")}
                </Text>
                <MBadge mb='sm' color="blue.5">📍 {location}</MBadge>
                <Text size="sm">{description}</Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text className={classes.label} color="dimmed">
                    Perfect for you, if you enjoy
                </Text>
                <Group spacing={7} mt={5}>
                    {badges.map((b) => (
                        <Badge
                            key={b.label}
                            badge={b}
                        // onClick={() => updateBadges(b._id)}
                        />
                    ))}
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text className={classes.label} color="dimmed">
                    Instructors
                </Text>
                <Group spacing={10} m={5}>
                    {instructors.map((i, key) => (
                        <Instructor
                            key={key}
                            name={i.name}
                            image={i.image}
                        // onClick={() => updateInstructors(i._id)}
                        />
                    ))}
                </Group>
            </Card.Section>


            <Space h="md" />
            <Box>
                {
                    link && (
                        <Button
                            fullWidth
                            color="blue"
                            variant="outline"
                            disabled={is_past}
                            href={link}
                            component="a"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {linkText ?? "Register"}
                        </Button>
                    )
                }
            </Box>
        </Card>
    );
};

export default Event;
