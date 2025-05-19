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
    console.log("\"A Good Engineer always leaves an Easter Egg\" -Daniyal")
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
                marginLeft:10
            }}
            leftSection={
                image ? (
                    <Image
                        alt=""
                        width={10}
                        height={15}
                        mr={5}
                        src={image}
                        radius={100}
                    />
                ) : (
                
         <Avatar variant="outline" radius="sm" size="xs" color="rgba(255, 255, 255, 1)" src="" />
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
