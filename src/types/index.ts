export type InstructorType = {
    _id?: string;
    name: string;
    image?: string;
};

export type BadgeType = {
    _id?: string;
    emoji: string;
    label: string;
};

export type EventType = {
    _id?: string;
    title: string;
    description: string;
    date: Date;
    image: string;
    location: string;
    instructors: InstructorType[];
    badges: BadgeType[];
    link?: string;
    linkText?: string;
};

export type EboardMemberType = {
    username?: string;
    name: string;
    role: string;
    image: string;
    linkedin?: string;
    github?: string;
    website?: string;
    password?: string;
};
