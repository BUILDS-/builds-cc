import { describe, expect, test } from "bun:test";
import { matchActiveLink } from "./matchActiveLink";

const HREFS = ["/", "/events", "/eboard"];

describe("matchActiveLink", () => {
  test("matches a trailing-slash url against a slashless href", () => {
    expect(matchActiveLink("/events/", HREFS)).toBe("/events");
  });

  test("matches a slashless url against a slashless href", () => {
    expect(matchActiveLink("/events", HREFS)).toBe("/events");
  });

  test("returns the original href, not the normalized url", () => {
    // hrefs with trailing slashes must come back exactly as listed,
    // because the shell looks up the <a> by its literal href attribute
    expect(matchActiveLink("/eboard", ["/", "/eboard/"])).toBe("/eboard/");
  });

  test("root url matches the root href", () => {
    expect(matchActiveLink("/", HREFS)).toBe("/");
  });

  test("returns null when nothing matches", () => {
    expect(matchActiveLink("/nonsense", HREFS)).toBeNull();
  });

  test("returns null for an empty href list", () => {
    expect(matchActiveLink("/", [])).toBeNull();
  });
});
