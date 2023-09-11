import * as React from "react";
import {
    createStyles,
    Container,
    Title,
    Text,
    Button,
    Group,
} from "@mantine/core";
import { Link } from "gatsby";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    inner: {
        position: "relative",
    },

    label: {
        textAlign: "center",
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        paddingBottom: theme.spacing.xl,
        color: theme.fn.primaryColor("light"),

        [theme.fn.smallerThan("sm")]: {
            fontSize: 120,
        },
    },

    content: {
        position: "relative",
        zIndex: 1,

        [theme.fn.smallerThan("sm")]: {
            paddingTop: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: "center",
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan("sm")]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 540,
        margin: "auto",
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
}));

const Custom404 = () => {
    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.inner}>
                <div className={classes.label}>404</div>
                <div className={classes.content}>
                    <Title className={classes.title}>Nothing to see here</Title>
                    <Text
                        color="dimmed"
                        size="lg"
                        align="center"
                        className={classes.description}
                    >
                        Page you are trying to open does not exist. You may have
                        mistyped the address, or the page has been moved to
                        another URL. If you think this is an error contact
                        support.
                    </Text>
                    <Group position="center">
                        <Link to="/">
                            <Button size="md">Take me back to home page</Button>
                        </Link>
                    </Group>
                </div>
            </div>
        </Container>
    );
};

export default Custom404;
