import * as React from "react";
import { Title, Text, Stack, List } from "@mantine/core";

const Hacker = () => {
  return (
    <Stack>
      <Title order={2}>What is Hacking?</Title>
      <Text>
        The idea of hacking is learning and building upon existing ideas and reinventing systems.
      </Text>
      <Text>
        Think of hacking as the opportunity to take things apart, fix, or improve upon those ideas or systems to learn and understand how they work.
      </Text>
      <Text>
        No matter who you are, you can create art and something inspiring on a computer, electronics, and anything that you put your mind to.
      </Text>
      <Text>
        If you feel strongly about an idea or want to learn about something, show your enthusiasm, be bold, and you’ll find people who share your passion of discovery and learning here at BUILDS!
      </Text>
      <Title order={3}>
        The Philosophy of the Hacker Ethic
      </Title>
      <List>
        <List.Item>
          Figure things out
        </List.Item>
        <List.Item>
          Improve what already exists
        </List.Item>
        <List.Item>
          Share your knowledge
        </List.Item>
        <List.Item>
          Mistrust authority
        </List.Item>
        <List.Item>
          Promote decentralization
        </List.Item>
      </List>
    </Stack>
  )
}

export default Hacker