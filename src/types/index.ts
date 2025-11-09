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

export type EventLinkText =
  | "N/A"
  | "Github"
  | "Register"
  | "Slides"
  | "Website"
  | "Discord";

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
  linkText?: EventLinkText;
};

export type ProfileType = {
  username?: string;
  name: string;
  roles?: {
    role: string;
    yearsActive: string;
  }[];
  role?: string;
  yearsActive?: string;
  image?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  password?: string;
};
