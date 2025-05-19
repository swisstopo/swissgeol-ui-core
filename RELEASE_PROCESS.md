# Release Process

This document is meant to explain the release process of the swissgeol Core UI Library.
It details how new features are deployed, and how the development process affect the library's version numbers.

[1. Development Cycle](#development-cycle)  
[1.1. Development Branch](#development-branch)  
[1.2. Patches](#patches)  
[1.3. Breaking Changes](#breaking-changes)  
[1.4. Release](#release)  
[3. Versioning](#versioning)  
[4. Naming Conventions for Branches](#naming-conventions-for-branches)

## Development Cycle

Our development and release cycle is based on Git branches.
The default procedure is _development branch_ → `develop` → `main`.

### Development Branch

When developing, a new branch should be created bas*ed* on `develop`,
see [Naming Conventions for Branches](#naming-conventions-for-branches)
When the branch's change is fully developed, a _pull request_ can be opened that targets `develop`.
After receiving the approval of at least one reviewer, the PR can be merged.

During development, it can be beneficial to structure your commits as [atomically](https://en.wikipedia.org/wiki/Atomic_commit?useskin=vector) as possible, within reason.
This makes it easier to track your changes and can also help during review.
However, before merging your PR, you should consider squashing your commits into a smaller set of large commits.
This keeps our final commit graph clean and simple.
Commonly, a single final commit per PR is enough, although there are definitely situations when more than that can be beneficial.

#### Patches

When an already released version has bugs that have to fixed immediately, a patch can be deployed.
To do, simply merge your development branch directly into `main` instead of `develop`.
Afterward, you should immediately merge `main` back onto `develop` to ensure the two branches remain compatible.

#### Breaking Changes

When a branch contains breaking changes, the library's major version number should change.
Major upgrades should happen rarely, and come with a relatively high upgrade cost for library consumers.

To create a major release, create a new branch `next` (or merge into it if it already exists).
As soon as the release is ready for use, merge it into `develop`, and then into `main`.
Note that as soon as `next` → `develop` is merged, any further minor changes will be subject to the major release.

### Release

When a set of changes is ready to be released, a new library version can be published.
This is done by merging `develop` into `main` via pull request.

## Versioning

This project follows [Semantic Versioning](https://semver.org/).  
**The major version** changes when `next` is merged into `develop`
**The minor version** changes with every normal release.
**The patch version** changes when a patch is merged into `main`.

During development, versions are identified by suffix labels.

- When merging into `develop`, a _development version_ in the format `A.B.C-devX` is assigned.
  `A.B.C` is based on the current full release, with `B` incremented by one and `C` set to zero.
  `X` increments with every continuous merge where `A.B.C` doesn't change.
- When merging `develop` into `main`, a _release version_ is created by stripping the label from the current dev release.
- When merging a development branch into `main`, a _release version_ is created
  based on the latest release, with the patch version incremented by one.
- When merging into `next`, a new _next version_ in the format `A.B.C-nextX` is assigned.
  `A.B.C` is based on the current full release, with `A` incremented by one and `B` and `C` set to zero.
  `X` increments with every continuous merge where `A.B.C` doesn't change.
- When merging `next` into `develop`, the resulting development version is based on the next version.

These rules give us the following behavior, ensuring consistent and idempotent versioning:

- Patch only increment the patch version.
- Development versions only increment the minor version.
- Next versions are the only way to increment the major version.

## Naming Conventions for Branches

> Note that branch names other than `main` and `develop` do not impact the release process.
> The following conventions are purely for standardization and documentation purposes.

The branch should follow the naming convention `{branch-type}/assets-{issue}-{title}`, where:

- `{branch-type}` describes the impact of the change.
- `{issue}` is the ID of the GitHub issue that describes the change.
- `{title}` is the issue's title, put into `snake-case` and possibly shortened for ease of use.

The following branch types can be used:

- `feature/` are new features or functional changes to existing ones. This is the most common change type.
- `bugfix/` are bugfixes. They should mainly be used when the branch's issue is labelled as `bug`.
- `hotfix/` are changes that are meant to be deployed ASAP. Unlike other branches, hotfixes should be based on and target `main`.
- `chore/` are maintenance tasks, such as dependency updates or documentation tasks.

For special cases where a branch is created that is not backed by an issue,
the naming convention changes to `{branch-type}/{title}`, where `{title}` needs to be defined ad-hoc.
