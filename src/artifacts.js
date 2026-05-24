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
];

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
