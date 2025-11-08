import * as React from "react";
import { createStyles, Container, Group, ActionIcon, Text } from "@mantine/core";
import { IconBrandInstagram, IconBrandDiscord, IconBrandGithub, IconBrandFacebook, IconMail } from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 32,
        borderTop: `1px solid ${theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[2]
            }`,
    },

    inner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    copyright: {
        [theme.fn.smallerThan("xs")]: {
            marginTop: theme.spacing.md,
        },
    },
}));



const Footer = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { classes } = useStyles();
    const dark = colorScheme === "dark";

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Group
                    spacing={0}
                    position="right"
                    noWrap
                >
                    <ActionIcon component='a' href='mailto:builds@bu.edu' target='_blank' rel='noopener' size="lg">
                        <IconMail stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component='a' href='https://github.com/BUILDS-' target='_blank' rel='noopener' size="lg">
                        <IconBrandGithub stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component='a' href='https://discord.gg/CDY4bdzcNh' target='_blank' rel='noopener' size="lg">
                        <IconBrandDiscord stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component='a' href='https://www.facebook.com/buildsbu' target='_blank' rel='noopener' size="lg">
                        <IconBrandFacebook stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component='a' href='https://www.instagram.com/bu_builds/' target='_blank' rel='noopener' size="lg">
                        <IconBrandInstagram stroke={1.5} />
                    </ActionIcon>
                </Group>
                <Text size='sm' className={classes.copyright}>© 2025 BUILDS</Text>
            </Container>
        </div>
    );
}

export default Footer;