import React from "react";
import { BadgeType } from "types";
import { Badge as MBadge, useMantineColorScheme, Image } from "@mantine/core";

type PropTypes = {
    badge: BadgeType;
    onClick?: () => void;
};

const Badge = ({ badge, onClick }: PropTypes) => {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    // check if svg
    const isSvg = badge.emoji.endsWith('.svg');

    const leftSection = isSvg ? (
        <Image
            src={badge.emoji}
            alt=""
            width={16}
            height={16}
            fit="contain"
        />
    ) : (
        badge.emoji
    );

    return (
        <MBadge
            color={dark ? "gray.6" : "gray"}
            leftSection={leftSection}
            onClick={onClick}
            sx={{ cursor: "pointer" }}
        >
            {badge.label}
        </MBadge>
    );
};

export default Badge;
