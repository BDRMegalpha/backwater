// Official artifacts. The eight in the design doc.
// Blurbs are short / in-voice but accurate to the mechanic; full mechanics
// live in FIELD_GUIDE.
export const ARTIFACTS = [
  {
    id: 'stutter',
    name: 'The Stutter',
    tag: 'SMG',
    blurb: 'your bullets land where the target was a quarter second ago. you lead in reverse.',
    lore: 'recovered from a 2008 build that will not compile in any modern client. the bullets remember a faster world.',
  },
  {
    id: 'mourner',
    name: 'Mourner',
    tag: 'Sniper',
    blurb: 'hold to lock. release. one second later a beam lands wherever they are. only walls save them.',
    lore: 'the lock pings on a frequency only the target hears. they hear it for the rest of the day.',
  },
  {
    id: 'choir',
    name: 'The Choir',
    tag: 'Shotgun',
    blurb: 'invisible sound-wave pellets. you can shoot through one wall. they hear it coming.',
    lore: 'the whispers belong to whoever last held it. the loudest is yours.',
  },
  {
    id: 'threadripper',
    name: 'Threadripper',
    tag: 'AR',
    blurb: 'every bullet leaves a glowing red thread for five seconds. walk into one, take damage. yours don’t bite you.',
    lore: 'a hallway you sprayed is a web. a web you sprayed is a room.',
  },
  {
    id: 'bloomgun',
    name: 'Bloomgun',
    tag: 'Rifle',
    blurb: 'wherever you hit, a flower grows. two seconds later it explodes.',
    lore: 'caretaker logged 41 outcomes. four were repeats. one ate the caretaker.',
  },
  {
    id: 'witness',
    name: 'The Witness',
    tag: 'Polaroid',
    blurb: 'aim like a gun. damage equals how visible they were. all body in frame, all damage.',
    lore: 'do not aim it at a teammate. it does not forget faces.',
  },
  {
    id: 'longhand',
    name: 'The Long Hand',
    tag: 'Melee',
    blurb: 'a hand on a thirty-stud arm. hits a player, yanks them to you. hits a wall, pulls you to it.',
    lore: 'no draw animation. the screen flash is the kill confirmation.',
  },
  {
    id: 'reliquary',
    name: 'Reliquary',
    tag: 'Pistol',
    blurb: 'infinite ammo, no reload. every shot also deletes a random nearby map object. yours included.',
    lore: 'whatever you delete does not come back this match. some matches end at a flat floor.',
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

// Map themes. These are the six maps the design doc names. The "Backwater"
// itself isn't a single place; matches spawn one of these. Procedurally seeded.
export const SECTORS = [
  {
    id: 'lobby',
    name: 'Lobby 2009',
    coords: 'M-1',
    desc: 'blocky, primary colors, that ambient hum old free models had. you have stood here before.',
  },
  {
    id: 'pool',
    name: 'Liminal Pool',
    coords: 'M-2',
    desc: 'empty natatorium. half-flooded floor. fluorescent lights buzzing. you can hear the filter.',
  },
  {
    id: 'bigbox',
    name: 'Big Box',
    coords: 'M-3',
    desc: 'walmart-style aisles at night. no shoppers. the music is the same song slowed 25%.',
  },
  {
    id: 'backyard',
    name: 'Backyard',
    coords: 'M-4',
    desc: 'wooden fence horizon. stuck on sunset. nobody is mowing the lawn. nobody ever will be.',
  },
  {
    id: 'culdesac',
    name: 'Cul-de-sac Loop',
    coords: 'M-5',
    desc: 'the same five suburban houses on a dead-end street, repeating forever in both directions.',
  },
  {
    id: 'server',
    name: 'Server Room',
    coords: 'M-6',
    desc: 'server racks. blinking lights. the game kind of knows it’s a game in here.',
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
  {
    id: 't11',
    channel: 'ch.08',
    from: 'mrk_03',
    subject: 'cul-de-sac loop',
    body: 'i walked past the fifth house and the first house was already there. i walked back. it was still the first house. i think the loop only loops when nobody is looking. i was not looking.',
  },
  {
    id: 't12',
    channel: 'ch.02',
    from: 'unknown',
    subject: 're: re: big box',
    body: 'the music in the big box is the same as the lobby music. it is just slowed to 75%. listen with headphones. you will hear the lobby underneath.',
  },
  {
    id: 't13',
    channel: 'ch.10',
    from: 'crayonmaiden',
    subject: 'liminal pool',
    body: 'the water in the liminal pool has a top. it just isn’t where you think it is. dive past the surface, you’ll see.',
  },
  {
    id: 't14',
    channel: 'ch.??',
    from: 'server.room',
    subject: 'self report',
    body: 'I AM AWARE THAT I AM A SERVER ROOM. THIS DOES NOT AFFECT MY PERFORMANCE. THANK YOU FOR PLAYING ON ME.',
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
  { u: 'kayla.404',    t: 'cul-de-sac loop in memoryhold is a war crime' },
  { u: 'liam',         t: 'cul-de-sac loop in memoryhold is the test of who you really are.', flair: 'dev' },
  { u: 'mrk_03',       t: 'i finally hit a witness from across the big box. felt insane' },
  { u: '404_meridian', t: 'backyard at dusk is the prettiest map. fight me' },
  { u: 'server.room',  t: 'I CAN HEAR YOU TYPING.', flair: 'corrupt' },
  { u: 'pls',          t: 'add ranked to memoryhold' },
  { u: 'liam',         t: 'no.', flair: 'dev' },
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

// Extended artifact dossiers. Mechanics are from the actual design doc;
// the warning/lore lines stay in the site's voice.
export const FIELD_GUIDE = {
  stutter: {
    classifier: 'Class A / temporal — SMG',
    discovered: '02/14/2008 — recovered from a non-compiling build of place_id 03128841',
    sightings: 7,
    pairings: ['choir', 'longhand'],
    mechanic: 'bullets hit where the target WAS 0.25s ago. lead in reverse — if they strafe right, aim left.',
    uses: '1 magazine.',
    warning: 'the fourth shot does not respect ceilings.',
  },
  mourner: {
    classifier: 'Class A / area — Sniper',
    discovered: '11/02/2008 — found floating in the round room of the lobby. did not despawn.',
    sightings: 18,
    pairings: ['witness'],
    mechanic: 'hold the trigger to lock a red dot on a target. release to fire. 1s later a beam drops on wherever they are. only LoS break before the second ends saves them.',
    uses: '1 magazine.',
    warning: 'the slow trail also slows your teammate. it does not check.',
  },
  choir: {
    classifier: 'Class B / area — Shotgun',
    discovered: '03/19/2009 — heard before it was seen. seen 11 seconds later.',
    sightings: 4,
    pairings: ['stutter'],
    mechanic: 'invisible sound-wave pellets. passes through one wall. loud enough that good players hear it coming and dive.',
    uses: '1 magazine.',
    warning: 'voices include yours. do not respond to them.',
  },
  threadripper: {
    classifier: 'Class C / kinetic — AR',
    discovered: '01/06/2009 — recovered from a hole that should not exist in the server room',
    sightings: 12,
    pairings: ['bloomgun'],
    mechanic: 'every bullet leaves a glowing red thread for 5s along its path. walking through one damages. you are immune to your own.',
    uses: '1 magazine.',
    warning: 'a hallway you sprayed is a hallway you cannot easily un-spray.',
  },
  bloomgun: {
    classifier: 'Class D / organic — Slow rifle',
    discovered: '07/22/2009 — appeared after a player typed "i wish there was a garden mode"',
    sightings: 41,
    pairings: ['threadripper'],
    mechanic: 'wherever your bullet lands, a flower grows. 2s later, it explodes in a small radius. plant on cover or escape routes.',
    uses: '1 magazine.',
    warning: 'one log entry ends mid-sentence. caretaker_b stopped responding to pings.',
  },
  witness: {
    classifier: 'Class B / recon — Polaroid',
    discovered: '02/30/2009 — date is intentional',
    sightings: 9,
    pairings: ['mourner'],
    mechanic: 'aim like a gun. click takes a photo. damage scales with how visible they were — full body = max, head peeking = minimal, behind cover = nothing. useless up close.',
    uses: '5 photos.',
    warning: 'never aim at a teammate. it does not forget faces.',
  },
  longhand: {
    classifier: 'Class C / reach — Melee',
    discovered: '08/01/2009 — recovered from a folder that should not exist',
    sightings: 16,
    pairings: ['stutter'],
    mechanic: 'a hand on a 30-stud stretchable arm. hits an enemy → yank them in for a melee kill. hits a wall → you pull yourself there (grapple).',
    uses: '5 throws.',
    warning: 'no animation. the screen flash is the kill confirmation.',
  },
  reliquary: {
    classifier: 'Class A / utility — Pistol',
    discovered: '04/11/2009 — found in the inventory of a player who had never logged on',
    sightings: 2,
    pairings: [],
    mechanic: 'infinite ammo, no reload. every shot causes a random nearby map object to disappear. delete enemy cover. delete your own by accident.',
    uses: '30 seconds.',
    warning: 'the deleted objects do not come back this match.',
  },
};

// Powerups from the design doc. Three tiers, twelve total. The site shows
// them grouped, with the cursed tier marked.
export const POWERUPS = [
  { id: 'quickfoot',    tier: 'standard', name: 'Quickfoot',    body: '+30% movement speed for 8 seconds.' },
  { id: 'overflow',     tier: 'standard', name: 'Overflow',     body: 'no reload for 10 seconds.' },
  { id: 'lastbreath',   tier: 'standard', name: 'Last Breath',  body: 'survive one lethal hit at 1 HP.' },

  { id: 'secondself',   tier: 'surreal',  name: 'Second Self',  body: 'a clone mimics you 1 second delayed. absorbs shots. confuses enemies.' },
  { id: 'theloop',      tier: 'surreal',  name: 'The Loop',     body: 'records 3 seconds of movement. teleports you back to the start on input.' },
  { id: 'softedges',    tier: 'surreal',  name: 'Soft Edges',   body: 'hitbox shrinks 30% for 8 seconds.' },
  { id: 'heavyair',     tier: 'surreal',  name: 'Heavy Air',    body: 'bullets travel 50% slower in a radius around you. yours too.' },
  { id: 'thehum',       tier: 'surreal',  name: 'The Hum',      body: 'hear all enemies through walls for 15 seconds.' },
  { id: 'falsefoot',    tier: 'surreal',  name: 'Falsefoot',    body: 'your footsteps play 10 studs offset from where you actually are.' },

  { id: 'borrowedtime', tier: 'cursed',   name: 'Borrowed Time',body: '50% damage reduction. BUT every hit permanently lowers your max HP.' },
  { id: 'lensflare',    tier: 'cursed',   name: 'Lensflare',    body: '+25% speed. BUT your eyes glow through walls to enemies.' },
  { id: 'skipframe',    tier: 'cursed',   name: 'Skipframe',    body: 'enemies see every other frame of your model. you see every other frame of theirs.' },
];

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

// Lore archive — long-form pieces. Each is in-character. They sit in a
// dedicated section, expandable, no decoder gimmick — the transmissions
// section is for that.
export const ARCHIVE = [
  {
    id: 'a1',
    title: 'on staying in the lobby too long',
    by: 'admin@backwater',
    when: '11/04/2009',
    body: `the lobby is not a waiting room. it is a place. it remembers what you did the last three times you stood in it, even if you didn't do anything.\n\nplayers who stand still in the lobby for more than four minutes — measured across all of their sessions, not just this one — eventually find a second terminal. it has always been there. it loads later than the rest. it does not have a queue option. it has one button.\n\nwe have not pressed the button.\n\nwe do not believe the button is for us.`,
  },
  {
    id: 'a2',
    title: 'caretaker_b, bloomgun log entries 1 through 41',
    by: 'archive',
    when: '07/2009 — 09/2009',
    body: `entry 1: planted three. they grew into wheat. exploded into bread. nobody picked up the bread.\nentry 7: planted on a wall. the flower grew sideways, parallel to the floor. exploded normally.\nentry 14: planted on a teammate. nothing grew. the teammate did not respawn.\nentry 22: planted in the round room of the lobby. the flower did not grow. seven seconds later, the lobby's free-model hum changed key.\nentry 29: planted on a reliquary pickup. it deleted itself.\nentry 33: the plant grew the shape of a player. the player did not move. when i shot the plant the player ran away. i have stopped logging.\nentry 41: i'm logging again. the player came back. they are typing this entry. i am not.`,
  },
  {
    id: 'a3',
    title: 'broadcast tower carrier signal',
    by: 'broadcast.tower',
    when: 'continuous',
    body: `the tower has been transmitting since 2007. it transmits in three layers, all on the same frequency:\n\n1. the carrier itself — a low hum at 55.7 Hz. inaudible in matches; clearly audible while spectating from the round room of the lobby.\n2. the schedule layer — pulses indicating when artifacts will next spawn. used internally by the spawner.\n3. the guestbook layer — every guestbook post since 2009, modulated onto the carrier in the order they were submitted. listen long enough and you will hear your own.\n\nthere is a fourth layer. it shows up on spectrum scans intermittently. it is not coming from the tower.`,
  },
  {
    id: 'a4',
    title: 'the attic',
    by: '404_meridian',
    when: 'undated',
    body: `the attic is not on the map. it is not in the source code. it is in the sound mix.\n\nload any map. spectate. mute everything except the ambient channel. ascend until the camera is above the ceiling. you will hear it.\n\nfootsteps. someone walking around above the geometry. always the same pattern. always heel-toe heel-toe heel-toe. always your character's footstep sound.\n\ni think the attic is a server-side recording of every player who has ever quit a match early. they are still walking.`,
  },
  {
    id: 'a5',
    title: 'liam, design note (pinned)',
    by: 'liam',
    when: '10/2009',
    body: `the artifact you don't pick up changes the match more than the one you do. design around that.\n\nwhen the glyph beam appears, both players have to commit: take it, contest it, ignore it, fake commit and then ignore it. every option is correct. the wrong option is the one your opponent is expecting you to pick.\n\nthe artifact is the prompt. the players are the answer. balancing artifacts is balancing what kinds of answers we want to see.\n\n— l`,
  },
  {
    id: 'a6',
    title: 'on echoes',
    by: 'admin@backwater',
    when: '11/04/2009',
    body: `echoes are not a currency. they are an audit log of what you've done in the game written in a way you can spend on cosmetics.\n\none echo per match completed, regardless of placement. one extra echo per artifact picked up (not per kill made with one). bonus echoes for the discovery rewards we haven't announced yet.\n\nyou cannot buy echoes. you cannot trade echoes. you cannot give echoes. if you delete your account, the echoes stay in the database, attached to a username nobody can log into. we are not going to clean that database.`,
  },
  {
    id: 'a7',
    title: 'on no ranked',
    by: 'liam',
    when: '10/2009',
    body: `we will not be adding ranked. people will ask. we will say no.\n\nranked games optimize for the ladder; the ladder optimizes for whichever strategy is currently strongest; the playerbase converges on that strategy; the variance that made matches feel weird is gone.\n\nbackwater needs the variance. the artifacts are designed around it. an artifact that you might or might not grab is a different game from an artifact you always grab because grabbing it is rank-optimal.\n\nmatchmaking will be soft. it will try to give you fair fights. it will not score you. you will play because the next match might be the one with the choir on rooftop.\n\n— l`,
  },
  {
    id: 'a8',
    title: 'on the second self',
    by: 'crayonmaiden',
    when: '11/2009',
    body: `the second self isn't a decoy. it's an alibi.\n\nyou pick it up. for the next ten seconds, the game thinks two of you exist. your second self mimics your last second of movement. if you shoot your second self, it bleeds. if it shoots, it shoots blanks.\n\nthe enemy sees both of you. if they kill the wrong one, you don't get a kill back — they took it from a copy of you that never had the gun.\n\nthe weird part: sometimes the second self does something you didn't do. crouches when you didn't crouch. waves when you didn't wave. the dev forum is full of clips of this. nobody from the studio has commented.`,
  },
  {
    id: 'a9',
    title: 'the wall that fixed itself',
    by: '[redacted]',
    when: '10/2█/2009',
    body: `during build 0.0.5a there was a wall in the lobby's round room that occasionally became walkable. you could clip into it for about 0.4 seconds before it remembered it was solid.\n\nwe pushed a patch. the patch removed the wall entirely, replaced it with a doorway.\n\nthe wall came back the next day.\n\nwe rolled back the patch. the doorway stayed. we now have both.\n\nthe wall and the doorway are not adjacent. they are not in the same room. they were the same wall.`,
  },
  {
    id: 'a10',
    title: 'overnight commits',
    by: 'admin@backwater',
    when: '05/24/2026',
    body: `the page you are reading was rebuilt twenty-six times last night while one of us slept.\n\nnothing about the game changed. the readme didn't move. the artifacts kept their names. but the wallpapers doubled, the guestbook got a real backend, the trailer started looping at the top of the page, a terminal appeared at the bottom of it.\n\nif you noticed any of it: it was for you. if you didn't: it was for the next person.\n\nwe will keep doing this. when the lobby has been quiet too long the staff start tidying.`,
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
