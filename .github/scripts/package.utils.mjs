import { parseVersion } from './version.utils.mjs';
import { packages } from './package.config.mjs';

const defaultPackage = Object.values(packages)[0];

/**
 * Attempts to parse the latest version from the published packages that a new `dev` version should be based on.
 * The returned version is resolved as following:
 * - If the first matching version is a full release, that version is returned (e.g. `1.5.0`).
 * - If the first matching version is a dev release, that version is returned (e.g. `1.6.0-dev12`).
 * - Release candidates (e.g. `1.6.0-rc2`) are simply ignored.
 *
 * @returns {Promise<object|null>} The latest dev version, or `null`.
 */
export const findBaseVersionForDev = () =>
  findLatestVersionByPredicate(
    (version) =>
      version.preRelease === null || version.preRelease.tag === 'dev',
  );

/**
 * Attempts to parse the latest dev version from the published packages.
 * @returns {Promise<object|null>} The latest dev version, or `null`.
 */
export const findLatestDevVersion = () =>
  findLatestVersionByPredicate((version) => version.preRelease?.tag === 'dev');

/**
 * Attempts to parse the latest release candidate version from the published packages.
 * @returns {Promise<object|null>} The latest rc version, or `null`.
 */
export const findLatestRcVersion = () =>
  findLatestVersionByPredicate((version) => version.preRelease?.tag === 'rc');

/**
 * Attempts to parse the latest hotfix version from the published packages.
 * @returns {Promise<object|null>} The latest hotfix version, or `null`.
 */
export const findLatestHotfixVersion = () =>
  findLatestVersionByPredicate(
    (version) => version.preRelease?.tag === 'hotfix',
  );

/**
 * Attempts to parse the latest next version from the published packages.
 * @returns {Promise<object|null>} The latest next version, or `null`.
 */
export const findLatestNextVersion = () =>
  findLatestVersionByPredicate((version) => version.preRelease?.tag === 'next');

/**
 * Attempts to parse the latest hotfix version from the published packages.
 * @returns {Promise<object|null>} The latest hotfix version, or `null`.
 */
export const findLatestReleasableVersion = () =>
  findLatestVersionByPredicate(
    (version) =>
      version.preRelease?.tag === 'hotfix' || version.preRelease?.tag === 'rc',
  );

/**
 * Attempts to parse the latest release version from the published packages.
 * @returns {Promise<object|null>} The latest release version, or `null`.
 */
export const findLatestReleaseVersion = () =>
  findLatestVersionByPredicate((version) => version.preRelease?.tag == null);

export const findLatestVersionByPredicate = async (test) => {
  let result = null;
  await loadVersions({
    receive: (...args) => {
      if (test(...args)) {
        result = args[0];
      }
    },
    abort: () => result !== null,
  });
  return result;
};

const CACHED_VERSIONS = [];

const loadVersions = async ({ receive, abort, package: packageName }) => {
  const isCacheable =
    packageName === undefined || packageName === defaultPackage;

  if (isCacheable && CACHED_VERSIONS.length !== 0) {
    for (const [version, tags, packageId] of CACHED_VERSIONS) {
      receive(version, tags, packageId);
      if (abort()) {
        return;
      }
    }
    return;
  }

  const { owner, name } = getPackageInfo(packageName ?? defaultPackage);
  const versions = await fetchPackageVersions(owner, name);
  if (versions.length === 0) {
    return;
  }
  let hasAborted = false;
  for (const version of versions) {
    if (isCacheable) {
      CACHED_VERSIONS.push(version);
    }
    if (!hasAborted) {
      receive(...version);
      hasAborted = abort();
    }
  }
};

const getPackageInfo = (url) => {
  const [owner, name] = url.split('/');
  return { owner, name };
};

export const fetchPackageVersions = async (owner, name) => {
  const response = await fetch(`https://registry.npmjs.org/${owner}/${name}`);
  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();

  // Find the tags (e.g. `latest`) of the package.
  const tagsByVersion = new Map();
  for (const [tag, versionString] of Object.entries(data['dist-tags'])) {
    const entry = tagsByVersion.get(versionString);
    if (entry === undefined) {
      tagsByVersion.set(versionString, new Set([tag]));
    } else {
      entry.add(tag);
    }
  }

  // Build a list of versions and their tags.
  // The list is reversed, so it is ordered from newest to oldest.
  const versionList = Object.keys(data.versions);
  const versions = [];
  for (let i = versionList.length - 1; i >= 0; i--) {
    const versionString = versionList[i];
    const version = parseVersion(versionString);
    const tags = tagsByVersion[versionString] ?? new Set();
    versions.push([version, tags]);
  }
  return versions;
};
