import { BadgeType, ProfileType, EventType, InstructorType } from "types";

export type EventResponse = {
  events?: EventType[];
  error?: string;
};

export type BadgeResponse = {
  badges?: BadgeType[];
  error?: string;
};

export type InstructorResponse = {
  instructors?: InstructorType[];
  error?: string;
};

export type EboardMemberResponse = {
  eboardMembers?: ProfileType[];
  error?: string;
};

export type AuthenticateResponse = null | ProfileType;

export type LoadStateType = "loading" | "loaded" | "errored";
