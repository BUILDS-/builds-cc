import * as React from "react";
import { FC } from "react";

import {
    Container,
    Grid,
    Title,
} from "@mantine/core";
import { EboardMemberType } from "types";
import EboardMember from "../components/EboardMember";

const eboardMembers : EboardMemberType[] = [
    {
        name: "Dominic Maglione",
        bio: "President",
        image: "assets/eboard/dcmag.jpeg",
        linkedin: "https://www.linkedin.com/in/dcmaglione/",
        github: "https://github.com/dcmaglione",
        website: "https://dcmaglione.com/",
    },
    {
        name: "Phillip Tran",
        bio: "Vice President",
        image: "assets/eboard/ptran.jpeg",
        linkedin: "https://www.linkedin.com/in/ptrandev/",
        github: "https://github.com/ptrandev",
        website: "https://ptran.dev/",
    },
    {
        name: "Vineet Raju",
        bio: "Secretary",
        image: "assets/eboard/rvineet02.jpeg",
        linkedin: "https://www.linkedin.com/in/vineet-raju/",
        github: "https://github.com/rvineet02",
        website: "https://www.vineetraju.dev/",
    },
    {
        name: "Arkash Jain",
        bio: "Treasurer",
        image: "assets/eboard/arkashj.jpeg",
        linkedin: "https://www.linkedin.com/in/arkashj/",
        github: "https://github.com/ArkashJ",
        website: "https://personal-website-arkashj.vercel.app/",
    },
    {
        name: "Alicja Mahr",
        bio: "Outreach Coordinator",
        image: "assets/eboard/amahr.jpeg",
        linkedin: "https://www.linkedin.com/in/alicjamahr/",
        github: "https://github.com/braxton",
        website: "https://mahr.cc/",
    }
]

const Eboard: FC = () => {

    return (
        <Container>
            <Title py="xl" align="center">
                Our E-Board
            </Title>
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
                {eboardMembers?.map((member) => (
                    <Grid.Col xs={4} key={member.name}>
                        <EboardMember
                            name={member.name}
                            bio={member.bio}
                            image={member.image}
                            linkedin={member.linkedin}
                            github={member.github}
                            website={member.website}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
};

export default Eboard;
