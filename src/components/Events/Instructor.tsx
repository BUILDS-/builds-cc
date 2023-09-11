import * as React from "react";

import { Badge, Image, useMantineColorScheme } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { InstructorType } from "types";

type PropTypes = {
    image?: string;
    name: string;
    scale?: number;
    onClick?: () => void;
};

const Instructor = ({ image, name, scale, onClick }: PropTypes) => {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <Badge
            onClick={onClick}
            color={dark ? "gray.6" : "gray"}
            styles={{
                leftSection: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            }}
            sx={{
                paddingLeft: 0,
                transform: `scale(${scale ?? 1})`,
                cursor: "pointer",
            }}
            leftSection={
                image ? (
                    <Image
                        alt="Avatar for badge"
                        width={17}
                        height={17}
                        mr={5}
                        src={image}
                        radius={100}
                    />
                ) : (
                    <IconUserCircle
                        height={17}
                        width={17}
                        size={17}
                        style={{ margin: 0, marginRight: 5 }}
                    />
                )
            }
            size="md"
            radius="xl"
        >
            {name}
        </Badge>
    );
};

export default Instructor;
