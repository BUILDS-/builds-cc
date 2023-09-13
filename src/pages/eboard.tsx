import * as React from "react";
import { FC } from "react";

import {
    Container,
    Grid,
    Title,
} from "@mantine/core";
import EboardMember from "../components/EboardMember";
import Layout from "components/Layout";
import { graphql } from "gatsby";

interface EboardProps {
    data: {
        allMarkdownRemark: {
            nodes: {
                frontmatter: {
                    name: string;
                    role: string;
                    image: string;
                    position: number;
                    linkedin?: string;
                    github?: string;
                    website?: string;
                }
            }[]
        }
    }
}

const Eboard: FC<EboardProps> = ({ data }) => {
    return (
        <Layout>
            <Container>
                <Title py="xl" align="center">
                    Our E-Board
                </Title>
                <Grid sx={{ display: "flex", justifyContent: "center" }}>
                    {data.allMarkdownRemark.nodes?.map(({ frontmatter }) => (
                        <Grid.Col xs={4} key={frontmatter.name}>
                            <EboardMember
                                name={frontmatter.name}
                                role={frontmatter.role}
                                image={frontmatter.image}
                                linkedin={frontmatter.linkedin}
                                github={frontmatter.github}
                                website={frontmatter.website}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </Layout>
    );
};

export default Eboard;

// gets markdown files from the src/pages/eboard folder
export const query = graphql`
    query {
        allMarkdownRemark(
            filter: {
                fileAbsolutePath: {
                    regex: "/src/pages/eboard/"
                }
            },
            sort: {
                frontmatter: {
                    position: ASC
                }
            }
        ) {
            nodes {
                frontmatter {
                    name
                    role
                    image
                    linkedin
                    github
                    website
                    position
                }
            }
        }
    }
`