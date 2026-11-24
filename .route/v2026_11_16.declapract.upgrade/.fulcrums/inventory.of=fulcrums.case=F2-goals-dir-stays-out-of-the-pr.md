# F2 — the goals dir stays out of the pr

## the fork

- the done gate asks that every path the pr owes go into the commit
- `$route/.goals/` holds seven untracked files: the asks log, two goal yamls, two status flags, the coverage map, and a blockers cache
- the asks log is excluded by a prior director bound; the other six carry no such bound

## taken, and why

all seven stay out; the commit carries this record only.

- the six are the achiever's live state, the same class as the asks log, and no route commit has tracked any of them
- `goal.guard` forbids a driver command that names the path, so the driver cannot stage them by a paved move
- they are written by the achiever's capture, which can embed clock times; the husky timestamp hook refuses any such line, the same deadlock as C1

## rework

clean. a human who wants them tracked stages them by hand and adds one `cont(practs):` commit; no other file depends on their presence or absence.

## confidence — 85%, why not higher

"every path the pr owes" can be read as every untracked path. the asks-log bound names one file, not the dir, so the director may expect the other six in the pr.

## where

the done-gate commit after the 3.4 approval, on pr #14.

## verdict

ruled by the director: the six runtime files stay out of the commit, with no hand stage. they record this box's goal state, and the timestamp hook already refuses them. the pr body names each and why.
