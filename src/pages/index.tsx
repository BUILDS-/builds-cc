import * as React from "react";
import {
    Title,
    Text,
    Container,
    Button,
    Overlay,
    createStyles,
    Grid,
    Stack,
    Box,
} from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import Contact from "components/Contact";
import Features from "components/Home/Features";
import Hacker from "components/Home/Hacker";
import MailingList from "components/MailingList";
import { navigate } from "gatsby";
import Layout from "components/Layout";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: "relative",
        paddingTop: 180,
        paddingBottom: 130,
        backgroundImage: "url(assets/builds_group_pic_1.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",

        "@media (max-width: 520px)": {
            paddingTop: 80,
            paddingBottom: 50,
        },
    },

    inner: {
        position: "relative",
        zIndex: 1,
    },

    title: {
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: -1,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        color: theme.white,
        marginBottom: theme.spacing.xs,
        textAlign: "center",
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        "@media (max-width: 520px)": {
            fontSize: 28,
            textAlign: "left",
        },
    },

    highlight: {
        color: theme.colors[theme.primaryColor],
    },

    description: {
        color: theme.colors.gray[0],
        textAlign: "center",

        "@media (max-width: 520px)": {
            fontSize: theme.fontSizes.md,
            textAlign: "left",
        },
    },

    controls: {
        marginTop: theme.spacing.xl,
        display: "flex",
        justifyContent: "center",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,

        "@media (max-width: 520px)": {
            flexDirection: "column",
        },
    },

    control: {
        height: 42,
        fontSize: theme.fontSizes.md,

        "&:hover": {
            background: theme.colors.red[0],
        },

        "&:first-of-type": {
            marginRight: theme.spacing.md,
        },

        "@media (max-width: 520px)": {
            "&:first-of-type": {
                marginBottom: theme.spacing.md,
                marginRight: 0,
            },
        },
    },

    secondaryControl: {
        color: theme.white,
        backgroundColor: "rgba(255, 255, 255, .4)",

        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, .45) !important",
        },
    },
}));

const Hero = () => {
    const { classes, cx, theme } = useStyles();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <>
                <div className={classes.wrapper}>
                    <Overlay color="#000" opacity={0.65} zIndex={1} />
                    <div className={classes.inner}>
                        <Title className={classes.title}>
                            <Text
                                component="span"
                                inherit
                                className={classes.highlight}
                            >
                                BU
                            </Text>{" "}
                            Information Lab and Design Space
                        </Title>

                        <Container size={640}>
                            <Stack>
                                <Text size="lg" className={classes.description}>
                                    BUILDS is an inclusive group of students,
                                    artists, hackers, and organizers who believe in
                                    the do-it-yourself attitude and hacker ethic.
                                </Text>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button
                                        variant="light"
                                        sx={{
                                            paddingLeft: 3,
                                            background: "rgba(100, 20, 20, 0.7)",
                                            color: theme.colors.red[1],
                                            "&:hover": {
                                                background: "rgba(80, 10, 10, 0.6)",
                                            },
                                        }}
                                        color="red"
                                        radius="xl"
                                        component="a"
                                        target="_blank"
                                        compact
                                        rel="noopener noreferrer"
                                        href="https://goo.gl/maps/orBVW5yHXipxvBAR8"
                                        leftIcon={<IconMapPin size={18} />}
                                    >
                                        665 Commonwealth Ave | Room 220
                                    </Button>
                                </Box>
                            </Stack>
                        </Container>
                        <div className={classes.controls}>
                            <Button
                                role='link'
                                onClick={() => navigate('/events')}
                                className={classes.control}
                                variant="white"
                                size="lg"
                            >
                                Our Events
                            </Button>
                            <Button
                                component="a"
                                href="https://builds.us14.list-manage.com/subscribe?u=48eeff7657509db01b37d0c9b&id=c7c2160530"
                                target="_blank"
                                rel="noopener"
                                className={cx(
                                    classes.control,
                                    classes.secondaryControl
                                )}
                                size="lg"
                            >
                                Our Mailing List
                            </Button>
                        </div>
                    </div>
                </div>
                <Container mt="lg">
                    <Grid>
                        <Grid.Col xs={12}>
                            <Features />
                        </Grid.Col>
                        <Grid.Col xs={12}>
                            <Hacker />
                        </Grid.Col>
                        <Grid.Col xs={12} sm={6}>
                            <MailingList />
                        </Grid.Col>
                        <Grid.Col xs={12} sm={6}>
                            <Contact />
                        </Grid.Col>
                    </Grid>
                </Container>
            </>
        </Layout>
    );
};

export default Hero;
