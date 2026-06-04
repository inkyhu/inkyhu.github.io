export type GamingCategoryKey =
  | "actionAdventure"
  | "rpg"
  | "visualNovel"
  | "shooter"
  | "puzzle"
  | "platformer"
  | "multiplayer"
  | "rhythm"
  | "simulation"
  | "misc";

export interface GamingGalleryItem {
  id: string;
  name: string;
  category: GamingCategoryKey;
  hours: number | null;
  playtimeLabel: string;
  storeUrl: string;
  coverUrl: string;
  isSteamApp: boolean;
  platformLabel: string;
}

export const GAMING_CATEGORY_META: Record<
  GamingCategoryKey,
  { label: string; display: string; color: string }
> = {
  actionAdventure: {
    label: "Action & Adventure",
    display: "Action & Adventure",
    color: "#f97316"
  },
  rpg: {
    label: "RPG",
    display: "RPG",
    color: "#8b5cf6"
  },
  visualNovel: {
    label: "Visual Novel",
    display: "Visual Novel & Narrative Adventure",
    color: "#ec4899"
  },
  shooter: {
    label: "Shooter",
    display: "Shooter",
    color: "#ef4444"
  },
  puzzle: {
    label: "Puzzle",
    display: "Puzzle",
    color: "#0ea5e9"
  },
  platformer: {
    label: "Platformer",
    display: "Platformer & Metroidvania",
    color: "#22c55e"
  },
  multiplayer: {
    label: "Multiplayer",
    display: "Party & Co-op",
    color: "#f59e0b"
  },
  rhythm: {
    label: "Rhythm",
    display: "Rhythm & Music",
    color: "#6366f1"
  },
  simulation: {
    label: "Simulation",
    display: "Simulation & Management",
    color: "#14b8a6"
  },
  misc: {
    label: "Misc",
    display: "Miscellaneous / Sandbox / Casual",
    color: "#64748b"
  }
};

type RawItem = [name: string, hours: number | null, playtimeLabel?: string];

const rawByCategory: Record<GamingCategoryKey, RawItem[]> = {
  actionAdventure: [
    ["The Legend of Zelda: Breath of the Wild", 112.8],
    ["The Legend of Zelda: Tears of the Kingdom", 107.4],
    ["Death Stranding Director's Cut", 82.7],
    ["Black Myth: Wukong", 62.7],
    ["Death Stranding 2: On the Beach", 58.5],
    ["Uncharted: Legacy of Thieves Collection", 29.1],
    ["Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles", 9.0],
    ["OPUS: Rocket of Whispers", 5.0],
    ["Firewatch", 3.3],
    ["A Short Hike", 3.1],
    ["Old Man's Journey", 2.3]
  ],
  rpg: [
    ["Persona 5 Royal", 112.2],
    ["Persona 3 Reload", 72.3],
    ["Persona 4 Golden", 17.3],
    ["Cyberpunk 2077", 7.2],
    ["Pokemon Legends: Arceus", 6.4],
    ["Disco Elysium", null, "未记录 (Epic)"]
  ],
  visualNovel: [
    ["Fate/stay night REMASTERED", 79.2],
    ["Cupid Parasite", 37.0],
    ["WITCH ON THE HOLY NIGHT", 29.5],
    ["My Fulfilling Real Life", 16.1],
    ["JACKJEANNE", 15.5],
    ["Detroit: Become Human", 14.8],
    ["ATRI -My Dear Moments-", 13.2],
    ["OPUS: Echo of Starsong - Full Bloom Edition", 10.9],
    ["Stella of The End", 10.2],
    ["CLANNAD", 7.3],
    ["Life is Strange", 7.1],
    ["Color Gray", 5.5],
    ["Marco & The Galaxy Dragon", 4.5],
    ["Mixtape", 4.5],
    ["Melancholy Love", 3.8],
    ["Before Your Eyes", 3.6],
    ["Billionaire Lovers", 3.6],
    ["Doki Doki Literature Club!", 3.5],
    ["What Remains of Edith Finch", 3.4],
    ["STEINS;GATE", 3.2],
    ["A Field of Flowers and Stars", 3.0],
    ["OshiRabu: Waifus Over Husbandos", 2.7],
    ["The Song of Saya", 2.5],
    ["Until Then", 2.1],
    ["TSUKIHIME -A piece of blue glass moon-", 2.1],
    ["Daydream", 1.9],
    ["Phoenix Wright: Ace Attorney Trilogy", 1.8],
    ["OshiRabu: Waifus Over Husbandos ~Love or Die~", 1.5]
  ],
  shooter: [
    ["Apex Legends", 104.1],
    ["Splatoon 3", 27.6],
    ["Splatoon 2", 2.5],
    ["PUBG: BATTLEGROUNDS", 2.1]
  ],
  puzzle: [
    ["The Talos Principle / Essence of Existence", 32.2],
    ["Tandem: A Tale of Shadows", 17.8],
    ["Chants of Sennaar", 9.0],
    ["The Last Campfire", 4.0],
    ["Jenny LeClue - Detectivu", 3.5],
    ["Behind the Frame: The Finest Scenery", 3.1],
    ["Storyteller", 3.1],
    ["Shift Happens", 2.8],
    ["Carto", 2.6],
    ["Assemble with Care", 2.5],
    ["The Stanley Parable: Ultra Deluxe", 2.4]
  ],
  platformer: [
    ["ASTRO BOT", 6.2],
    ["POPUCOM", 5.8],
    ["ASTRO's PLAYROOM", 4.9],
    ["INSIDE", 4.7],
    ["Hollow Knight: Voidheart Edition", 4.6],
    ["Celeste", 2.8]
  ],
  multiplayer: [
    ["It Takes Two", 20.1],
    ["Fall Guys: Ultimate Knockout", 7.8],
    ["Overcooked! 2", 7.4],
    ["Human: Fall Flat", 6.3],
    ["Party Animals", 4.2],
    ["Among Us", 4.2],
    ["Super Bunny Man", 2.4],
    ["Goose Goose Duck", 2.3],
    ["Untitled Goose Game", 2.1],
    ["Party Party Time", 1.9]
  ],
  rhythm: [
    ["Muse Dash", 80.8],
    ["Hi-Fi RUSH", 4.9],
    ["Rhythm Doctor", 2.2],
    ["UNBEATABLE [white label]", 1.5]
  ],
  simulation: [
    ["Chinese Parents", 10.0],
    ["Volcano Princess", 9.8],
    ["Tomodachi Life", 8.2],
    ["Satisfactory", 5.6],
    ["SPACEPLAN", 3.5],
    ["VPet", 2.6],
    ["Minecraft for Windows", 1.6]
  ],
  misc: [
    ["Sky: Children of the Light", 8.6],
    ["Bongo Cat", 7.8],
    ["Character Battle: Survival", 2.7],
    ["despelote", 2.5],
    ["TOEM", 2.2],
    ["Bubble People", 2.0],
    ["VRChat", 1.6]
  ]
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatHours(hours: number | null, custom?: string) {
  if (custom) {
    return custom;
  }
  if (hours === null) {
    return "未记录";
  }
  return `${hours.toFixed(1)} hours`;
}

const NON_STEAM_LINKS: Record<string, { platformLabel: string; storeUrl: string }> = {
  "the-legend-of-zelda-breath-of-the-wild": {
    platformLabel: "Nintendo eShop",
    storeUrl:
      "https://www.nintendo.com/us/store/products/the-legend-of-zelda-breath-of-the-wild-switch/"
  },
  "the-legend-of-zelda-tears-of-the-kingdom": {
    platformLabel: "Nintendo eShop",
    storeUrl:
      "https://www.nintendo.com/us/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/"
  },
  "death-stranding-2-on-the-beach": {
    platformLabel: "PlayStation Store",
    storeUrl:
      "https://store.playstation.com/en-us/search/death%20stranding%202%20on%20the%20beach"
  },
  "pokemon-legends-arceus": {
    platformLabel: "Nintendo eShop",
    storeUrl:
      "https://www.nintendo.com/us/store/products/pokemon-legends-arceus-switch/"
  },
  "disco-elysium": {
    platformLabel: "Epic Games Store",
    storeUrl:
      "https://store.epicgames.com/en-US/p/disco-elysium-the-final-cut"
  },
  "splatoon-3": {
    platformLabel: "Nintendo eShop",
    storeUrl:
      "https://www.nintendo.com/us/store/products/splatoon-3-switch/"
  },
  "splatoon-2": {
    platformLabel: "Nintendo eShop",
    storeUrl:
      "https://www.nintendo.com/us/store/products/splatoon-2-switch/"
  },
  "astro-bot": {
    platformLabel: "PlayStation Store",
    storeUrl:
      "https://store.playstation.com/en-us/search/astro%20bot"
  },
  "astros-playroom": {
    platformLabel: "PlayStation Store",
    storeUrl:
      "https://store.playstation.com/en-us/search/astro%27s%20playroom"
  },
  "fall-guys-ultimate-knockout": {
    platformLabel: "Epic Games Store",
    storeUrl:
      "https://store.epicgames.com/en-US/p/fall-guys"
  },
  "tomodachi-life": {
    platformLabel: "Nintendo",
    storeUrl:
      "https://www.nintendo.com/us/store/products/tomodachi-life-3ds/"
  }
};

const STEAM_APP_IDS: Record<string, string> = {
  "death-stranding-directors-cut": "1850570",
  "black-myth-wukong": "2358720",
  "uncharted-legacy-of-thieves-collection": "1659420",
  "demon-slayer-kimetsu-no-yaiba-the-hinokami-chronicles": "1490890",
  "opus-rocket-of-whispers": "742250",
  "firewatch": "383870",
  "a-short-hike": "1055540",
  "old-mans-journey": "581270",
  "persona-5-royal": "1687950",
  "persona-3-reload": "2161700",
  "persona-4-golden": "1113000",
  "cyberpunk-2077": "1091500",
  "disco-elysium": "632470",
  "witch-on-the-holy-night": "2052410",
  "detroit-become-human": "1222140",
  "atri-my-dear-moments": "1230140",
  "opus-echo-of-starsong-full-bloom-edition": "1504500",
  clannad: "324160",
  "life-is-strange": "319630",
  "marco-the-galaxy-dragon": "1202540",
  "before-your-eyes": "1082430",
  "doki-doki-literature-club": "698780",
  "what-remains-of-edith-finch": "501300",
  steinsgate: "412830",
  "the-song-of-saya": "702050",
  "phoenix-wright-ace-attorney-trilogy": "787480",
  "apex-legends": "1172470",
  "pubg-battlegrounds": "578080",
  "the-talos-principle-essence-of-existence": "257510",
  "tandem-a-tale-of-shadows": "1436920",
  "chants-of-sennaar": "1931770",
  "the-last-campfire": "990630",
  "jenny-leclue-detectivu": "319870",
  "behind-the-frame-the-finest-scenery": "1634150",
  storyteller: "1624540",
  "shift-happens": "359840",
  carto: "1172450",
  "assemble-with-care": "1202900",
  "the-stanley-parable-ultra-deluxe": "1703340",
  inside: "304430",
  "hollow-knight-voidheart-edition": "367520",
  celeste: "504230",
  "it-takes-two": "1426210",
  "fall-guys-ultimate-knockout": "1097150",
  "overcooked-2": "728880",
  "human-fall-flat": "477160",
  "party-animals": "1260320",
  "among-us": "945360",
  "super-bunny-man": "673750",
  "goose-goose-duck": "1568590",
  "untitled-goose-game": "837470",
  "muse-dash": "774171",
  "hi-fi-rush": "1817230",
  "rhythm-doctor": "774181",
  "unbeatable-white-label": "1290490",
  "chinese-parents": "736190",
  "volcano-princess": "1669980",
  satisfactory: "526870",
  spaceplan: "616110",
  "sky-children-of-the-light": "2325290",
  "bongo-cat": "3419430",
  toem: "1307580",
  vrchat: "438100"
};

function getStoreInfo(name: string) {
  const slug = slugify(name);

  const nonSteam = NON_STEAM_LINKS[slug];
  if (nonSteam) {
    return {
      isSteamApp: false,
      platformLabel: nonSteam.platformLabel,
      storeUrl: nonSteam.storeUrl,
      coverUrl: `https://placehold.co/460x215/0f172a/ffffff?text=${encodeURIComponent(name)}`
    };
  }

  const appId = STEAM_APP_IDS[slug];
  if (appId) {
    return {
      isSteamApp: true,
      platformLabel: "Steam",
      storeUrl: `https://store.steampowered.com/app/${appId}/`,
      coverUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`
    };
  }

  return {
    isSteamApp: false,
    platformLabel: "Steam Search",
    storeUrl: `https://store.steampowered.com/search/?term=${encodeURIComponent(name)}`,
    coverUrl: `https://placehold.co/460x215/e2e8f0/0f172a?text=${encodeURIComponent(name)}`
  };
}

export const gamingGalleryItems: GamingGalleryItem[] = (
  Object.keys(rawByCategory) as GamingCategoryKey[]
).flatMap((category) =>
  rawByCategory[category].map(([name, hours, label]) => {
    const storeInfo = getStoreInfo(name);
    return {
      id: `${category}-${slugify(name)}`,
      name,
      category,
      hours,
      playtimeLabel: formatHours(hours, label),
      storeUrl: storeInfo.storeUrl,
      coverUrl: storeInfo.coverUrl,
      isSteamApp: storeInfo.isSteamApp,
      platformLabel: storeInfo.platformLabel
    };
  })
);
