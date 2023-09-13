import React from "react";
import {
    createStyles,
    Card,
    Avatar,
    Text,
    Button,
    MantineTheme,
} from "@mantine/core";

import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconExternalLink,
} from "@tabler/icons-react";
import { EboardMemberType } from "types";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
        border: `2px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
        }`,
    },
}));

type SocialLinkTypes = {
    href: string;
    text: string;
    icon?: React.ReactNode;
    theme: MantineTheme;
};

const SocialsLink = ({ href, text, theme, icon }: SocialLinkTypes) => {
    const dark = theme.colorScheme === "dark";

    return (
        <Button
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={icon}
            fullWidth
            radius="md"
            size="sm"
            mt="xs"
            sx={{
                backgroundColor: dark
                    ? theme.fn.variant({
                          variant: "light",
                          color: theme.primaryColor,
                      }).background
                    : theme.colors.dark[4],
                "&:hover": {
                    backgroundColor: dark
                        ? "rgba(224, 49, 49, 0.4)"
                        : theme.colors.dark[5],
                },
            }}
        >
            {text}
        </Button>
    );
};

const EboardMember = ({
    name,
    role,
    image,
    linkedin,
    github,
    website,
}: EboardMemberType) => {
    const { classes, theme } = useStyles();
    return (
        <Card
            withBorder
            p="xl"
            radius="md"
            className={classes.card}
            sx={{ height: "100%" }}
        >
            <Avatar
                src={image}
                size={120}
                radius={100}
                mx="auto"
                className={classes.avatar}
                imageProps={{ loading: "lazy" }}
            />
            <Text align="center" size="lg" weight={500} mt="sm">
                {name}
            </Text>
            <Text align="center" size="sm" color="dimmed" mb="sm">
                {role}
            </Text>
            {linkedin && (
                <SocialsLink
                    href={linkedin}
                    text="LinkedIn"
                    theme={theme}
                    icon={<IconBrandLinkedin size={16} />}
                />
            )}
            {github && (
                <SocialsLink
                    href={github}
                    text="GitHub"
                    theme={theme}
                    icon={<IconBrandGithub size={16} />}
                />
            )}
            {website && (
                <SocialsLink
                    href={website}
                    text="Personal Website"
                    theme={theme}
                    icon={<IconExternalLink size={16} />}
                />
            )}
        </Card>
    );
};

export default EboardMember;
