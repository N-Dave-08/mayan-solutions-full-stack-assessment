// import { createDefaultPreset } from "ts-jest";

/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",

  testMatch: ["**/*.test.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  clearMocks: true,
};

export default config;
