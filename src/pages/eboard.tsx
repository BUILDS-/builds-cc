import * as React from "react";
import { FC } from "react";

import { Container, Grid, Title } from "@mantine/core";
import ProfileCard from "../components/ProfileCard";
import Layout from "components/Layout";
import { graphql } from "gatsby";

interface ProfileProps {
  data: {
    currentEboard: {
      nodes: {
        frontmatter: {
          name: string;
          role: string;
          image: string;
          position: number;
          linkedin?: string;
          github?: string;
          website?: string;
        };
      }[];
    };
    formerEboard: {
      nodes: {
        frontmatter: {
          name: string;
          roles: {
            role: string;
            yearsActive: string;
          }[];
          image?: string;
          position: number;
          linkedin?: string;
          github?: string;
          website?: string;
        };
      }[];
    };
    founders: {
      nodes: {
        frontmatter: {
          name: string;
          role: string;
          linkedin?: string;
          position: number;
        };
      }[];
    };
  };
}

const Eboard: FC<ProfileProps> = ({ data }) => {
  return (
    <Layout>
      <Container>
        <Title py="xl" align="center">
          Our E-Board
        </Title>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          {data.currentEboard.nodes?.map(({ frontmatter }) => (
            <Grid.Col xs={4} key={frontmatter.name}>
              <ProfileCard
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
        <Title py="xl" align="center">
          Former E-Board Members
        </Title>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          {data.formerEboard.nodes
            ?.sort((a, b) => {
              const roleOrder = [
                "President",
                "Vice President",
                "Treasurer",
                "Secretary",
              ];
              return (
                roleOrder.indexOf(a.frontmatter.roles[0]?.role) -
                roleOrder.indexOf(b.frontmatter.roles[0]?.role)
              );
            })
            .sort((a, b) => {
              if (!a.frontmatter.roles || !b.frontmatter.roles) return -99;
              return (
                Number(b.frontmatter.roles[0].yearsActive.split("-")[1]) -
                Number(a.frontmatter.roles[0].yearsActive.split("-")[1])
              );
            })
            // Sort so President is first, then VP, then Treasurer, then Secretary
            // Then sort by year
            .map(({ frontmatter }) => (
              <Grid.Col xs={3} key={frontmatter.name}>
                <ProfileCard
                  name={frontmatter.name}
                  roles={frontmatter.roles}
                  image={frontmatter.image}
                  linkedin={frontmatter.linkedin}
                  //github={frontmatter.github}
                  //website={frontmatter.website}
                />
              </Grid.Col>
            ))}
        </Grid>
        <Title py="xl" align="center">
          Founders
        </Title>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          {data.founders.nodes
            ?.sort((a, b) => a.frontmatter.position - b.frontmatter.position)
            .map(({ frontmatter }) => (
              <Grid.Col xs={4} key={frontmatter.name}>
                <ProfileCard
                  name={frontmatter.name}
                  role={frontmatter.role}
                  linkedin={frontmatter.linkedin}
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
    currentEboard: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/eboard/" } }
      sort: { frontmatter: { position: ASC } }
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
    formerEboard: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/alumni/eboard/" } }
    ) {
      nodes {
        frontmatter {
          name
          roles {
            role
            yearsActive
          }
          linkedin
        }
      }
    }
    founders: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/alumni/founders/" } }
      sort: { frontmatter: { position: ASC } }
    ) {
      nodes {
        frontmatter {
          name
          role
          linkedin
          position
        }
      }
    }
  }
`;
