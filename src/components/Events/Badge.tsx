import React from "react";
import { BadgeType } from "types";
import { Badge as MBadge, useMantineColorScheme } from "@mantine/core";

type PropTypes = {
    badge: BadgeType;
    onClick?: () => void;
};

const Badge = ({ badge, onClick }: PropTypes) => {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <MBadge
            color={dark ? "gray.6" : "gray"}
            leftSection={badge.emoji}
            onClick={onClick}
            sx={{ cursor: "pointer" }}
        >
            {badge.label}
        </MBadge>
    );
};

export default Badge;
