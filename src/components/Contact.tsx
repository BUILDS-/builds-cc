import * as React from "react";
import { Card, Stack, Title, Text } from "@mantine/core";

const Contact = () => {
    return (
        <Card withBorder>
            <Stack>
                <Title order={2}>Contact Us</Title>
                <Text
                    component="a"
                    href="https://goo.gl/maps/orBVW5yHXipxvBAR8"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    665 Commonwealth Ave <br />
                    Room 220 <br />
                    Boston, MA 02215
                </Text>
                <Text variant="link" component="a" href="mailto:builds@bu.edu">
                    builds@bu.edu
                </Text>
            </Stack>
        </Card>
    );
};

export default Contact;
