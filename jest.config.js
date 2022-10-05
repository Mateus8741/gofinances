module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "/android", "/ios"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
