// Official artifacts. The eight that show up in design docs.
export const ARTIFACTS = [
  {
    id: 'stutter',
    name: 'The Stutter',
    tag: 'temporal',
    blurb: 'fires the same shot four times before it remembers it already fired once.',
    lore: 'recovered from a 2008 build of a place that no longer compiles. the muzzle flash arrives last.',
  },
  {
    id: 'mourner',
    name: 'Mourner',
    tag: 'area',
    blurb: 'a slow projectile that weeps. enemies caught in the trail move at half pace.',
    lore: 'the projectile is heavier on the way back. nobody who held one remembered firing it.',
  },
  {
    id: 'choir',
    name: 'The Choir',
    tag: 'area',
    blurb: 'three voices fire from where you stood three seconds ago.',
    lore: 'they harmonize on the third shot. it is always the loudest. it is always yours.',
  },
  {
    id: 'threadripper',
    name: 'Threadripper',
    tag: 'kinetic',
    blurb: 'a hitscan beam that unspools the wall behind your target.',
    lore: 'leaves a seam in the geometry that other artifacts can use as a doorway.',
  },
  {
    id: 'bloomgun',
    name: 'Bloomgun',
    tag: 'organic',
    blurb: 'plants something. it grows. you do not control what it becomes.',
    lore: 'caretaker recorded 41 outcomes. four were repeats. one ate the caretaker.',
  },
  {
    id: 'witness',
    name: 'The Witness',
    tag: 'recon',
    blurb: 'sees through one wall. the wall sees back.',
    lore: 'do not aim it at a teammate. it will not stop looking at them when you drop it.',
  },
  {
    id: 'longhand',
    name: 'The Long Hand',
    tag: 'reach',
    blurb: 'a melee that does not respect distance. it just decides it has reached you.',
    lore: 'no animation in the player’s view. no animation in yours either.',
  },
  {
    id: 'reliquary',
    name: 'Reliquary',
    tag: 'utility',
    blurb: 'stores the next death you take. one charge. you will need it.',
    lore: 'the death is still there. it is patient.',
  },
];

// Rumored artifacts. Not in any design doc. Unlock by poking the page.
export const RUMORED = [
  {
    id: 'parley',
    name: 'Parley',
    tag: 'social',
    blurb: 'opens a channel. for the duration, the other player can type to you. they cannot fire.',
    lore: 'recovered from a private playtest server. the chat log is missing both halves.',
    unlock: 'konami',
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse',
    tag: 'beacon',
    blurb: 'marks a tile of the map. anyone who walks across that tile, for the rest of the match, you hear them breathing.',
    lore: 'the tile remains marked between matches. nobody has cleaned the database.',
    unlock: 'guestbook',
  },
  {
    id: 'lullaby',
    name: 'Lullaby',
    tag: 'denial',
    blurb: 'plays a chord. anyone who hears it the second time forgets which weapon they are holding.',
    lore: 'composed in three minor keys by a player named lol_who. their account is deleted. the chord is not.',
    unlock: 'devlog',
  },
  {
    id: 'mirror',
    name: 'Mirror',
    tag: 'forbidden',
    blurb: 'spawns your opponent again. they are identical. they are not on your team.',
    lore: 'banned from official playlists. still in the code. still in the lobby browser, in italics.',
    unlock: 'all',
  },
];

export const MODES = [
  { id: '1v1', name: '1v1', size: '2', note: 'primary. pure aim, pure spacing.' },
  { id: '2v2', name: '2v2', size: '4', note: 'pairs. swap callouts mid-round.' },
  { id: 'tdm', name: 'TDM', size: '4v4', note: 'team deathmatch. four caps the chaos.' },
  { id: 'ffa', name: 'FFA', size: '6', note: 'free for all. no friends here.' },
  { id: 'memoryhold', name: 'MEMORYHOLD', size: '2', note: 'artifacts only. 1v1. no standard loadout. signature mode.' },
];

export const LOADOUT = [
  { name: 'Pistol', tag: 'sidearm', note: 'always loaded. always second-best.' },
  { name: 'AR',     tag: 'rifle',   note: 'no recoil model anyone respects. forgiving.' },
  { name: 'SMG',    tag: 'close',   note: 'hipfire only. nobody who matters ADS it.' },
  { name: 'Sniper', tag: 'long',    note: 'one shot. one bolt. one breath you don’t take.' },
  { name: 'Shotgun',tag: 'close',   note: 'reads the room. answers loudly.' },
  { name: 'Knife',  tag: 'silent',  note: 'no draw animation. no apology.' },
  { name: 'Grenade',tag: 'thrown',  note: 'cooks in your hand. nowhere on the body shows it.' },
  { name: 'RPG',    tag: 'heavy',   note: 'one. that’s the joke. that’s also the build.' },
];

// Sectors of the backwater. Used by the ASCII map.
export const SECTORS = [
  {
    id: 'lobby',
    name: 'Old Lobby',
    coords: 'N-1',
    desc: 'the first hub. tile floor. the ground sometimes loads as water. nobody drowns.',
  },
  {
    id: 'cliffside',
    name: 'Cliffside Servers',
    coords: 'W-3',
    desc: 'racks of dead places stacked like books. one is humming. you didn’t plug it in.',
  },
  {
    id: 'glassyard',
    name: 'The Glassyard',
    coords: 'C-0',
    desc: 'every match leaves a shard. by the third week of beta there will be no walkable floor.',
  },
  {
    id: 'attic',
    name: 'Attic',
    coords: 'N-7',
    desc: 'where the unused maps go. you can hear the player versions of yourself, faintly, from above.',
  },
  {
    id: 'undersea',
    name: 'Undersea Build',
    coords: 'S-9',
    desc: 'a place that was never finished. the water has no top.',
  },
  {
    id: 'broadcast',
    name: 'Broadcast Tower',
    coords: 'E-4',
    desc: 'still transmitting. the signal is the guestbook.',
  },
];

// Fake forum / guestbook posts. Some unlock when you discover things.
export const GUESTBOOK_SEED = [
  {
    id: 'g1',
    user: 'crayonmaiden',
    flair: '★',
    when: '11/02/2009 03:14',
    body: 'first. nobody is reading this. that’s actually nice.',
  },
  {
    id: 'g2',
    user: 'mrk_03',
    flair: '',
    when: '11/02/2009 09:51',
    body: 'i grabbed the choir once. heard my own voice three seconds before i died. is that a bug',
  },
  {
    id: 'g3',
    user: '404_meridian',
    flair: '⌬',
    when: '11/03/2009 23:08',
    body: 'the attic exists. it is not on the map. it is on the SOUND map. listen up while spectating.',
  },
  {
    id: 'g4',
    user: 'liam',
    flair: 'dev',
    when: '11/04/2009 01:22',
    body: 'we are not adding ranked. we are not adding ranked. stop asking.',
  },
  {
    id: 'g5',
    user: 'pls',
    flair: '',
    when: '11/04/2009 02:09',
    body: 'add ranked',
  },
  {
    id: 'g6',
    user: 'witness_thing',
    flair: '☼',
    when: '11/04/2009 03:31',
    body: 'i looked through the witness at the witness. it looked back. i am fine. it is fine. everything is fine.',
  },
  {
    id: 'g7',
    user: 'kayla.404',
    flair: '',
    when: '11/04/2009 11:44',
    body: 'the aim trainer here is harder than the one in the actual game. on purpose i hope.',
  },
  {
    id: 'g8',
    user: 'liam',
    flair: 'dev',
    when: '11/04/2009 12:18',
    body: 'we tuned it harder on purpose. you’ll be fine in real matches.',
  },
  {
    id: 'g9',
    user: 'broadcast.tower',
    flair: 'sys',
    when: '11/04/2009 13:00',
    body: 'signal: weak. listeners: 1247. guestbook: tolerable.',
  },
];

// Dev log / patch notes. Glitched dates, sub-versions, ominous notes.
export const DEVLOG = [
  {
    v: '0.0.7',
    date: '11/04/2009',
    title: 'memoryhold soft-open',
    notes: [
      'memoryhold queue is live. expect to lose. expect to enjoy it.',
      'reliquary no longer stores the death of the opponent. only your own. probably.',
      'fixed: footsteps from the attic now play on the correct channel.',
    ],
  },
  {
    v: '0.0.6',
    date: '10/29/2009',
    title: 'glassyard cleanup',
    notes: [
      'shards now despawn at 3min. (was: never).',
      'witness no longer permanently aggros the wall it looked through.',
      'echo earn-rate tuned. numbers withheld.',
    ],
  },
  {
    v: '0.0.5b',
    date: '10/2█/2009',
    title: '[redacted]',
    notes: [
      'we don’t talk about 0.0.5a.',
      'the wall fixed itself.',
    ],
  },
  {
    v: '0.0.4',
    date: '10/14/2009',
    title: 'soft tutorial removed',
    notes: [
      'first-match message now lies on purpose. someone will go easy on you.',
      'aim-trainer added to the hub. nobody is using it. that’s fine.',
    ],
  },
  {
    v: '0.0.3',
    date: '09/30/2009',
    title: 'loadout pass',
    notes: [
      'rpg ammo capped at 1. that is the build.',
      'knife draw animation removed. apologies to nobody.',
    ],
  },
];

// Transmissions. Lore drops. Click to "decode," which marks them discovered.
export const TRANSMISSIONS = [
  {
    id: 't1',
    channel: 'ch.01',
    from: 'admin@backwater',
    subject: 'do not enter the lobby on tuesdays',
    body: 'the lobby on tuesdays is not the lobby on the other days. the floor is the same. nothing else is. queue a match. do not walk around.',
  },
  {
    id: 't2',
    channel: 'ch.07',
    from: 'unknown',
    subject: 're: are we still hosting',
    body: 'we never were. somebody set the variable and left. the rooms keep filling because the variable was never set to false. we cannot find them. we have been looking since may.',
  },
  {
    id: 't3',
    channel: 'ch.03',
    from: 'caretaker_b',
    subject: 'bloomgun log, entry 17',
    body: 'the plant grew the shape of a player. the player did not move. when i shot the plant the player ran away. i have stopped logging.',
  },
  {
    id: 't4',
    channel: 'ch.??',
    from: '[corrupt]',
    subject: '[corrupt]',
    body: 'YOU/STAYED/TOO/LONG/IN/THE/HUB. THE/HUB/REMEMBERS. PLEASE/QUEUE/A/MATCH.',
  },
  {
    id: 't5',
    channel: 'ch.04',
    from: 'liam',
    subject: 'design note (for self)',
    body: 'the artifact you don’t pick up changes the match more than the one you do. design around that. tell bennett.',
  },
  {
    id: 't6',
    channel: 'ch.09',
    from: 'broadcast.tower',
    subject: 'signal report 11/04',
    body: 'signal: weak. listeners: 1247. listeners actually online: 3. the rest are guests. please be polite.',
  },
  {
    id: 't7',
    channel: 'ch.02',
    from: 'glassyard@archive',
    subject: 'shard log, week 4',
    body: 'the shards no longer despawn at 3min. they no longer despawn at all. we are leaving them. please don’t walk barefoot. this is a videogame. nobody is barefoot. you know what i mean.',
  },
  {
    id: 't8',
    channel: 'ch.??',
    from: 'lol_who',
    subject: 'composition: lullaby',
    body: 'i wrote a chord in three minor keys. then i deleted my account. the chord is still on the broadcast tower. play it twice and the other person forgets their weapon. i am not sorry.',
  },
  {
    id: 't9',
    channel: 'ch.05',
    from: 'bennett',
    subject: 'design note (for liam)',
    body: 'i keep wanting to add ranked. don’t let me. remind me of this message when i bring it up. — b',
  },
  {
    id: 't10',
    channel: 'ch.06',
    from: 'admin@backwater',
    subject: 'maintenance window',
    body: 'no maintenance window has been scheduled. there will be no maintenance window. the lobby cannot be brought offline because the lobby is not technically online. please adjust your expectations.',
  },
];

// Live lobby chat seed. Loops endlessly. Users are mostly dead, occasionally
// the broadcast tower or an admin types something cryptic.
export const LOBBY_CHAT = [
  { u: 'crayonmaiden', t: 'queue up. i need a match.' },
  { u: '404_meridian', t: 'nobody is in the attic right now. nobody is ever in the attic.' },
  { u: 'mrk_03',       t: 'is anyone here actually real' },
  { u: 'broadcast.tower', t: 'signal: weak. listeners: 1247.', flair: 'sys' },
  { u: 'liam',         t: 'i can hear you typing.', flair: 'dev' },
  { u: 'pls',          t: 'add ranked' },
  { u: 'crayonmaiden', t: 'pls stop' },
  { u: 'admin@backwater', t: 'someone left the door open. do not panic.', flair: 'sys' },
  { u: '404_meridian', t: 'i found a sector that isn’t on the map. it is on the SOUND map. listen up.' },
  { u: 'mrk_03',       t: 'the witness saw me through three walls. that’s not how it’s supposed to work' },
  { u: 'liam',         t: 'that is exactly how it is supposed to work.', flair: 'dev' },
  { u: 'unknown',      t: 'YOU/STAYED/TOO/LONG. PLEASE/QUEUE.', flair: 'corrupt' },
  { u: 'pls',          t: 'ok forget ranked. add a battle pass' },
  { u: 'liam',         t: 'no.', flair: 'dev' },
  { u: 'crayonmaiden', t: 'i love it here' },
];

// FAQ entries. Press-pitch tone but in-character.
export const FAQ = [
  {
    q: 'when does this come out',
    a: 'when liam and bennett say so. there is no date because there is no date.',
  },
  {
    q: 'is it pay to win',
    a: 'no. echoes only buy cosmetics. there is no other currency, no premium currency, no battle pass.',
  },
  {
    q: 'will there be ranked',
    a: 'no. matchmaking will try to be fair. there will be no ladder to climb. play because you want to.',
  },
  {
    q: 'is memoryhold the main mode',
    a: 'it is the signature mode. the main mode is whatever you keep clicking on.',
  },
  {
    q: 'platform',
    a: 'roblox. pc + console + mobile per roblox’s usual cross-play. mouse + keyboard is the intended input.',
  },
  {
    q: 'how do i join the playtest',
    a: 'there isn’t one yet. when there is, it will be linked in the broadcast.tower channel.',
  },
  {
    q: 'who is this for',
    a: 'people who liked old roblox horror servers, twitchy 1v1 shooters, and rooms that don’t quite finish loading.',
  },
];

// Echoes "shop" — vibe artifact only. No actual purchase. Echoes are the
// discovery count from localStorage; "owning" something means having discovered
// enough things to afford it. Nothing persists into the eventual game.
export const COSMETICS = [
  { id: 'sk_pistol_rust',   name: 'pistol skin: rust',   cat: 'weapon',   cost: 1 },
  { id: 'sk_ar_bone',       name: 'AR skin: bone',       cat: 'weapon',   cost: 2 },
  { id: 'sk_sniper_choir',  name: 'sniper: choir',       cat: 'weapon',   cost: 6 },
  { id: 'av_lobby_kid',     name: 'avatar: lobby kid',   cat: 'avatar',   cost: 3 },
  { id: 'av_signal_eater',  name: 'avatar: signal eater',cat: 'avatar',   cost: 8 },
  { id: 'eff_thread_kill',  name: 'kill fx: unspooling', cat: 'effect',   cost: 5 },
  { id: 'eff_mourner_kill', name: 'kill fx: weep',       cat: 'effect',   cost: 7 },
  { id: 'spr_404',          name: 'spray: 404_meridian', cat: 'spray',    cost: 2 },
  { id: 'spr_attic',        name: 'spray: attic vacancy',cat: 'spray',    cost: 4 },
  { id: 'av_witness',       name: 'avatar: witness',     cat: 'avatar',   cost: 12 },
];

// Press-kit copy. Used by the press section. Short enough to be tweet-quoted.
export const PRESS = {
  blurb: 'BACKWATER is a twitchy 1v1 Roblox shooter built on top of a server graveyard. Eight artifacts you don’t fully control. One signature mode called MEMORYHOLD. No battle pass. No ranked. You remember it wrong.',
  byline: 'developed by liam and bennett (BDRMega).',
  contact: 'contact: bennett.racich@gmail.com',
  links: [
    { label: 'site',        href: 'https://backwater.web.app' },
    { label: 'youtube',     href: 'https://youtube.com/@BDRMega' },
  ],
};

// Fake live stats. The numbers drift inside fixed bounds.
export const STATS = [
  { id: 'peak',     label: 'peak concurrent (alleged)',  value: '1247',  tone: 'bone' },
  { id: 'queue',    label: 'lobbies open (right now)',   value: '03',    tone: 'sick' },
  { id: 'avg_ttk',  label: 'average TTK (memoryhold)',   value: '0.42s', tone: 'rust' },
  { id: 'avg_match',label: 'average 1v1 match length',   value: '4:13',  tone: 'bone' },
  { id: 'echoes',   label: 'total echoes minted',        value: '∞',     tone: 'dim'  },
  { id: 'signal',   label: 'broadcast signal',           value: 'weak',  tone: 'rust' },
];

// Extended artifact dossiers. Cross-references the official 8.
// Each entry is paired by id with ARTIFACTS for the field guide page.
export const FIELD_GUIDE = {
  stutter: {
    classifier: 'Class A / temporal',
    discovered: '02/14/2008 — recovered from a non-compiling build of place_id 03128841',
    sightings: 7,
    pairings: ['choir', 'longhand'],
    warning: 'do not use indoors. the fourth shot does not respect ceilings.',
  },
  mourner: {
    classifier: 'Class A / area',
    discovered: '11/02/2008 — found floating in the round room of the lobby. did not despawn.',
    sightings: 18,
    pairings: ['witness'],
    warning: 'the slow trail also slows your teammate. it does not check.',
  },
  choir: {
    classifier: 'Class B / area',
    discovered: '03/19/2009 — heard before it was seen. seen 11 seconds later.',
    sightings: 4,
    pairings: ['stutter'],
    warning: 'voices include yours. do not respond to them.',
  },
  threadripper: {
    classifier: 'Class C / kinetic',
    discovered: '01/06/2009 — recovered from a hole that should not exist in cliffside-3',
    sightings: 12,
    pairings: ['bloomgun'],
    warning: 'the unspooled wall is walkable by everything, not just you.',
  },
  bloomgun: {
    classifier: 'Class D / organic',
    discovered: '07/22/2009 — appeared after a player typed "i wish there was a garden mode"',
    sightings: 41,
    pairings: ['threadripper'],
    warning: 'one log entry ends mid-sentence. caretaker_b stopped responding to pings.',
  },
  witness: {
    classifier: 'Class B / recon',
    discovered: '02/30/2009 — date is intentional',
    sightings: 9,
    pairings: ['mourner'],
    warning: 'never aim at a teammate. it does not forget faces.',
  },
  longhand: {
    classifier: 'Class C / reach',
    discovered: '08/01/2009 — recovered from the attic. nobody put it there.',
    sightings: 16,
    pairings: ['stutter'],
    warning: 'no animation. the screen flash is the kill confirmation.',
  },
  reliquary: {
    classifier: 'Class A / utility',
    discovered: '04/11/2009 — found in the inventory of a player who had never logged on',
    sightings: 2,
    pairings: [],
    warning: 'the stored death does not expire. it waits.',
  },
};

// Credits scroll. Real names + in-character "departments."
export const CREDITS = [
  { role: 'design',                names: ['liam', 'bennett (BDRMega)'] },
  { role: 'programming',           names: ['bennett (BDRMega)'] },
  { role: 'art direction',         names: ['liam'] },
  { role: 'audio',                 names: ['the lobby itself', 'lol_who (deleted)'] },
  { role: 'qa',                    names: ['caretaker_b (missing)', 'broadcast.tower'] },
  { role: 'community',             names: ['crayonmaiden', 'mrk_03', '404_meridian', 'kayla.404'] },
  { role: 'special thanks',        names: ['everyone who typed memoryhold while reading this'] },
  { role: 'memorial',              names: ['the rooms that didn’t make it'] },
];

// Roadmap entries. In-character broadcasts, vague-on-purpose.
export const ROADMAP = [
  {
    when: 'next',
    title: 'memoryhold open trial',
    body: 'small group. real match. real losses. likely the people in the guestbook above and the eight of you who already typed memoryhold somewhere.',
  },
  {
    when: 'after that',
    title: 'sector: cliffside walkable',
    body: 'just walkable. not playable. you can stand on it and listen to the rack of dead servers hum. one will be playable. nobody is supposed to know which one.',
  },
  {
    when: 'when liam says',
    title: 'parley as a real artifact',
    body: 'the rumored one. it’s a social mechanic and we have to test it before we trust it. it might break the game. it might be the game.',
  },
  {
    when: 'soon',
    title: 'echoes wallet on the live site',
    body: 'fake right now. real soon. your discoveries here will mean something specific in the actual game. probably a spray. probably the 404_meridian one.',
  },
  {
    when: 'eventually',
    title: 'second signature mode',
    body: 'not announced. not named. one playtester has seen a glimpse. they will not say what it was.',
  },
  {
    when: '—',
    title: 'we’re not announcing dates',
    body: 'dates are how indie studios disappoint people. we will ship when liam says we ship.',
  },
];

// Loadout builder — fake "match prediction" for the chosen weapon + artifact.
// Pure vibe-prediction. Nothing predictive about it.
export const LOADOUT_PREDICTIONS = [
  'expected outcome: you will get one kill you’re proud of and three you’re not.',
  'expected outcome: a 1-1 trade where someone laughs in voice. nobody is on voice.',
  'expected outcome: 9-3. you are the 3.',
  'expected outcome: 3-9. you are the 9. fix your sensitivity.',
  'expected outcome: the artifact spawns. the artifact lands. the artifact is not yours. you die anyway.',
  'expected outcome: your opponent disconnects. the lobby logs it as a win. nobody is happier.',
  'expected outcome: even. you both grab a coffee in spirit.',
  'expected outcome: you carry. liam tunes the gun next patch.',
  'expected outcome: you lose to a player named ".". it is fine.',
];

// Pattern memory ("hold the sequence") — each step is an artifact id.
// Reused IDs are fine; sequence grows by one per round.
export const MEMORY_TILES = ['stutter', 'mourner', 'choir', 'threadripper', 'bloomgun', 'witness'];

// Boot-sequence lines. Shown one at a time.
export const BOOT_LINES = [
  'POST: ok',
  'memory check ........... 640K ok',
  'mounting /backwater ........... ok',
  'loading place_id: 02810493 ........... ok',
  'loading place_id: 04713??? ........... missing',
  'reconstructing from cache ........... partial',
  'binding artifact registry ........... 8 of ??',
  'opening signal: weak',
  'welcome back.',
];
