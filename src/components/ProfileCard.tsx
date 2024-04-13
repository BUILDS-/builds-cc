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
import { ProfileType } from "types";

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

const ProfileCard = ({
  name,
  roles,
  role,
  yearsActive,
  image,
  linkedin,
  github,
  website,
}: ProfileType) => {
  const { classes, theme } = useStyles();
  return (
    <Card
      withBorder
      p="xl"
      radius="md"
      className={classes.card}
      style={{ ...(!image && { paddingTop: "0.5rem" }) }}
      sx={{ height: "100%" }}
    >
      {image && (
        <Avatar
          src={image}
          size={120}
          radius={100}
          mx="auto"
          className={classes.avatar}
          imageProps={{ loading: "lazy" }}
        />
      )}
      <Text align="center" size="lg" weight={500} mt="sm">
        {name}
      </Text>
      {roles &&
        roles.map(({ role, yearsActive }) => (
          <div key={role}>
            <Text
              align="center"
              size="sm"
              color="dimmed"
              mb={!yearsActive ? "sm" : "null"}
            >
              {role}
            </Text>
            <Text align="center" size="sm" color="dimmed" mb="sm">
              {yearsActive}
            </Text>
          </div>
        ))}
      {role && (
        <Text
          align="center"
          size="sm"
          color="dimmed"
          mb={!yearsActive ? "sm" : "null"}
        >
          {role}
        </Text>
      )}
      {yearsActive && (
        <Text align="center" size="sm" color="dimmed" mb="sm">
          {yearsActive}
        </Text>
      )}
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
          text="Personal Site"
          theme={theme}
          icon={<IconExternalLink size={16} />}
        />
      )}
    </Card>
  );
};

export default ProfileCard;
