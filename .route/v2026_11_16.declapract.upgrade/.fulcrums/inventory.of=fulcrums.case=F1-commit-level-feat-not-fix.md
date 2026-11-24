# F1 — commit level: feat, not fix

## the fork

- the stone template prescribes `fix(practs): bump to latest best`
- `git.commit.set` refuses `fix:` on this branch: the branch name `beav/feat-declapract-upgrade` binds the level to `feat`

## taken, and why

`feat(practs): bump to latest best`. the skill's level bind is the enforced contract; the stone text is a template default.

## rework

clean. the squash merge takes the pr title, so a rename of the pr title to `fix(practs): …` before merge yields a patch release instead of a minor one. no caller depends on the level.

## confidence — 80%, why not higher

the release level of an upgrade-only change is a human call: a minor bump on a pure dev-tool upgrade is defensible (new oidc publish path), yet a reader of the changelog may not expect it.

## where

the first route commit of stone 3.3; the pr title follows it.

## verdict

ruled by the director: keep `feat(practs)`.
