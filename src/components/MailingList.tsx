import * as React from "react";
import { Card, Stack, Title, Text, Input, Group, Button } from '@mantine/core';

const MailingList = () => {
    return (
        <Card sx={{ height: '100%' }} withBorder>
            <Stack sx={{ height: '100%' }}>
                <Title order={2}>Join the Mailing List</Title>
                <Text sx={{ flex: 1 }}>
                    We never send spam. Sign up to stay updated on things happening in the space!
                </Text>
                <form action="//builds.us14.list-manage.com/subscribe/post?u=48eeff7657509db01b37d0c9b&amp;id=c7c2160530"
                    method="post"
                    target="_blank"
                    noValidate
                >
                    <Group>
                        <Input placeholder="Email" sx={{ flex: 1 }} type='email' name='EMAIL' required />
                        <Button type='submit'>Submit</Button>
                    </Group>
                </form>
            </Stack>
        </Card>
    )
}

export default MailingList