import * as React from "react";
import { Box, Title, Text, Stack, Card, Grid, Image } from "@mantine/core";

const _FEATURES = [
    {
        image: "assets/builds_room_number1.jpg",
        title: "Enjoy our Hackerspace",
        description:
            "Our hackerspace is open 24/7. Come in and work on your projects, or just hang out and chat with other members. Our amazing community is incredibly knowledgeable!",
    },
    {
        image: "assets/builds_group_pic_3.jpeg",
        title: "Pursue Personal Projects",
        description:
            "We provide everything you need to bring your ideas to life. We a variety of tools and equipment available for use, including a 3D printer, soldering irons, power tools, computers, and more.",
    },
    {
        image: "assets/builds_group_pic_5.jpeg",
        title: "Attend Events",
        description:
            "We regularly host events on Wednesdays at 7PM. Learn some new techologies during our workshop events, gain academic and professional knowledge during our speaker events, etc.",
    },
];

const Features = () => {
    return (
        <Box>
            <Stack>
                <Title order={2}>What Can You do at BUILDS?</Title>
                <Text>
                    Come join our community, hang out, and be in good company!
                    We'll welcome you with open arms regardless of what you know
                    and who you are! Our hackerspace is open at all hours of the
                    day, but we have formal meetings on Wednesday at 7:00 PM
                    during the fall and spring semesters. We are dedicated to
                    providing every member with the tools and resources they
                    need to pursue their passions.
                </Text>
                <Grid>
                    {_FEATURES.map((feature) => {
                        return (
                            <Grid.Col xs={12} sm={6} md={4} key={feature.title}>
                                <Card withBorder sx={{ height: "100%" }}>
                                    <Card.Section>
                                        <Image
                                            src={feature.image}
                                            height={250}
                                            alt="Norway"
                                            imageProps={{ loading: "lazy" }}
                                        />
                                    </Card.Section>
                                    <Stack>
                                        <Text size="xl" weight={700} mt="md">
                                            {feature.title}
                                        </Text>
                                        <Text>{feature.description}</Text>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </Stack>
        </Box>
    );
};

export default Features;
