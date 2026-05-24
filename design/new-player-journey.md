# New player journey — draft

Draft walkthrough of what a brand-new Backwater player experiences and how they progress.
Assumptions called out in `[brackets]` — none of this is locked, Liam hasn't weighed in.

## First launch
You spawn into a half-loaded hub — not a menu screen, a *place*. Slow fog, a few other players standing around dead terminals. You walk to one. It lists modes, current queue counts, your Echoes balance (0).
`[Assumption: hub world over a clean menu. On-brand, but adds friction. Liam may prefer menu.]`

## Tutorial
There isn't one. First time you click a mode, a corner message: *"you've never played before. someone will go easy on you."* It's a lie.
`[Compromise: optional dummy-range terminal in the hub. 30-sec feel-check, no objective.]`

## First match (default: FFA 6p, not 1v1)
- 1v1 is too brutal for first contact
- FFA hides skill gaps, you'll get at least one kill
- Queue fills fastest

Loadout screen, 8 weapons. Recommend a soft default highlight on **AR** for new accounts (forgiving). Match is short — 3 to 5 min, kill cap.

## Post-match
Brief screen: kills/deaths, placement, Echoes earned. `[~10–30 Echoes per match, scaling with placement]`. Numbers type out one character at a time, half the screen is corrupt.

## First Echoes purchase
A different hub terminal sells cosmetics. `[Categories: weapon skins, character skins, kill effects, sprays.]` Cheap items 50–100, rare 1000+. No daily login, no wheel, no FOMO. Buy what you can afford.

## Sessions 2–5
You learn one weapon. Try **Memoryhold** once, get crushed because you don't know what the artifacts do. Retreat to FFA/TDM. Eventually beat someone in 1v1.

## Long-term progression — three layers, none stat-based
1. **Skill** — you get better. There is no other power curve. A player at 100 hours has the same TTK as you.
2. **Cosmetics** — Echoes accumulate. Rare cosmetic drops from match completion (low %, single pool, no duplicate protection). Cosmetics are the *only* persistent thing you accumulate.
3. **Discovery** — `[my invention, not in the v6 doc]` things in the world that aren't explained. A dead server in the hub occasionally "wakes up" and you can enter. Some artifacts are rumored but not in the official 8. This is the dead-internet hook — exploration rewards, not grinding.

## Open questions (worth deciding before code)
- **SBMM for 1v1** — required or 1v1 dies on arrival. How strict?
- **Party system** — friends queue together for 2v2 / TDM / FFA. When does this ship?
- **Echoes earn rate** — needs a target: how many matches to afford an average skin?
- **Hub: social or solo?** — social feels alive, solo loads faster
- **Smurf prevention in 1v1** — fresh accounts beating veterans is the fastest way to lose the playerbase
- **Memoryhold gating** — should new players queue Memoryhold immediately, or unlocked after N artifact pickups? `[Soft gate is friendlier, but breaks the no-progression promise]`
