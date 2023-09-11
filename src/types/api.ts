import { BadgeType, EboardMemberType, EventType, InstructorType } from "types";

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
    eboardMembers?: EboardMemberType[];
    error?: string;
};

export type AuthenticateResponse = null | EboardMemberType;

export type LoadStateType = "loading" | "loaded" | "errored";
