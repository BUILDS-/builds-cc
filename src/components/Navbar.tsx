import React, { ReactNode, useEffect, useState, FC } from "react";

import {
  createStyles,
  Header,
  Container,
  Group,
  ActionIcon,
  useMantineColorScheme,
  Burger,
  Transition,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

type LinkType = {
  link: string;
  label: string;
};

const LINKS: LinkType[] = [
  { link: "/", label: "Home" },
  { link: "/events", label: "Events" },
  { link: "/eboard", label: "E-Board" },
];

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 10,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).color,
    },
  },
}));

const Navbar: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [items, setItems] = useState<ReactNode[]>([]);
  const dark = colorScheme === "dark";

  const [opened, { toggle, close }] = useDisclosure(false);

  const { classes, cx } = useStyles();

  const location = useLocation();

  useEffect(() => {
    const active = location.pathname;

    let newItems = LINKS.map((link) => (
      <Link
        key={link.label}
        to={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
      >
        {link.label}
      </Link>
    ));

    setItems(newItems);
  }, [dark, location.pathname]);

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Link to="/">
          <a>
            {dark ? (
              <img src="/assets/BUILDS-darkmode.svg" height="24" />
            ) : (
              <img src="/assets/BUILDS-lightmode.svg" height="24" />
            )}
          </a>
        </Link>
        <Group spacing="lg">
          <Group spacing="xs" className={classes.links}>
            {items}
          </Group>
          <ActionIcon
            variant="outline"
            sx={{
              color: dark ? "#ffc9c9" : "red",
              borderColor: dark ? "#ffc9c9" : "red",
            }}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </Group>
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper
              className={classes.dropdown}
              withBorder
              style={styles}
              onClick={() => close()}
            >
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default Navbar;
