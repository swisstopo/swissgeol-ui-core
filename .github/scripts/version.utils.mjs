// TODO is this possible?
import { findLatestDevVersion, findLatestReleaseVersion } from "./package.utils.mjs";

const SEMANTIC_VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-\w+)?$/;
export const parseVersion = (tag) => {
  if (!SEMANTIC_VERSION_PATTERN.test(tag)) {
    return null;
  }
  const [major, minor, patch, preRelease] = tag.split(/[.-]/);
  return {
    major: parseInt(major),
    minor: parseInt(minor),
    patch: parseInt(patch),
    preRelease: preRelease.length === 0 ? null : parsePreRelease(preRelease),
  };
};

const NUMBERED_PRERELEASE_PATTERN = /^([a-zA-Z]+)(\d+)$/;
const parsePreRelease = (preRelease) => {
  const match = preRelease.match(NUMBERED_PRERELEASE_PATTERN);
  if (match === null) {
    return { tag: preRelease, number: null };
  }
  const [_, tag, number] = match;
  return { tag, number: parseInt(number) };
};

export const stringifyVersion = (version) => {
  const string = `${version.major}.${version.minor}.${version.patch}`;
  if (version.preRelease === null) {
    return string;
  }
  return `${string}-${version.preRelease.tag}${version.preRelease.number ?? ""}`;
};

export const isSameVersion = (a, b, { ignorePreRelease }) => {
  const isEqual = a.major === b.major && a.minor === b.minor && a.patch === b.patch;
  return (
    (ignorePreRelease && isEqual) ||
    (isEqual && a.preRelease?.tag === b.preRelease?.tag && a.preRelease?.number === b.preRelease?.number)
  );
};

export const compareBaseVersions = (a, b) => {
  if (a.major !== b.major) {
    return a.major - b.major;
  }
  if (a.minor !== b.minor) {
    return a.major - b.major;
  }
  return a.patch - b.patch;
};

export const incrementDevVersion = (version) => {
  const tag = "dev";

  // if there is no previous version,
  // then we start with a new pre-release version.
  if (version === null) {
    return { major: 1, minor: 0, patch: 0, preRelease: { tag, number: 1 } };
  }

  // If the previous version was a full release,
  // or if it was a patch pre-release,
  // then we increment the minor version and reset the pre-release number.
  if (version.preRelease === null || version.patch !== 0) {
    return {
      ...version,
      minor: version.minor + 1,
      patch: 0,
      preRelease: { tag, number: 1 },
    };
  }

  // If the previous version was a minor pre-release,
  // then we increment the pre-release number.
  return {
    ...version,
    preRelease: { tag, number: version.preRelease.number + 1 },
  };
};

export const determineNextReleaseVersionBySourceBranch = async (sourceBranch) => {
  // Merges from `develop` are "normal" release candidates.
  // They take their version from the latest dev release.
  if (sourceBranch === "develop") {
    const { findLatestDevVersion } = await import("./package.utils.mjs");
    const devVersion = await findLatestDevVersion();
    if (devVersion === null) {
      throw new Error("Merge from 'develop' expects a dev release to be present, but none was found.");
    }
    return { ...devVersion, preRelease: null };
  }

  // Sources other than `develop` are considered to be patches.

  const { findLatestReleaseVersion } = await import("./package.utils.mjs");
  const releaseVersion = await findLatestReleaseVersion();
  if (releaseVersion === null) {
    throw new Error("Hotfix expects a release to be present, but none was found.");
  }
  return {
    ...releaseVersion,
    patch: releaseVersion.patch + 1,
  };
};
