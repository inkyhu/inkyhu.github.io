export const manuscript = {
  title: "The Long Mystery",
  subtitle: "Eleven Short Poems and an Unwritten Postscript",
  letter: {
    id: "letter",
    indexLabel: "Letter",
    archiveLabel: "Private correspondence · E.35 / 01",
    salutation: "To my two friends, who seem a little less far away now:",
    paragraphs: [
      "You found it.",
      "I ought to confess that the manuscript is not a novel. It is only a small collection of poems. The long mystery was everything I placed between you and these pages.",
      "A book is usually finished before it meets its reader. I wanted to know whether one might be completed by being read: one reader among my objects, another among my papers, and two voices carrying what neither possessed alone.",
      "The numbers were only hinges. The doors were never the important part.",
      "What follows is the portion I could write by myself. The final poem, however, still requires the two of you. One half is waiting on the page in your hands. The other is here, in the light."
    ],
    cueLines: ["Let the paper speak first.", "Let the light answer."],
    closing: "And then, at last, I shall have my ending.",
    signature: "— Eileen"
  },
  chapters: [
    {
      id: "room-keeps-time",
      numeral: "I",
      title: "The Room Keeps Time",
      range: "01—04",
      introduction: "Four objects retain the habits and small arrangements of an absent afternoon."
    },
    {
      id: "geography-of-leaving",
      numeral: "II",
      title: "A Geography of Leaving",
      range: "05—08",
      introduction: "A departure measured in tickets, rooms, weather, and one paper bird."
    },
    {
      id: "things-written-twice",
      numeral: "III",
      title: "Things Written Twice",
      range: "09—11",
      introduction: "Copies, omissions, and the distance a sentence crosses between two readers."
    }
  ],
  poems: [
    {
      id: "after-the-music",
      chapter: "room-keeps-time",
      order: 1,
      title: "After the Music",
      lines: [
        "After the music,",
        "the needle went on",
        "crossing the same black evening.",
        "",
        "What sounded like dust",
        "was a small door",
        "remembering its name."
      ],
      image: "./assets/cards/01-after-the-music.svg",
      alt: "Abstract charcoal rings crossed by a faded blue line.",
      archiveNumber: "E.35 / 01",
      developmentStatus: "working-draft"
    },
    {
      id: "at-two",
      chapter: "room-keeps-time",
      order: 2,
      title: "At Two",
      lines: [
        "At two,",
        "one hand pointed upward,",
        "the other toward the afternoon.",
        "",
        "Between them,",
        "a crack in the glass",
        "kept a fourth direction."
      ],
      image: "./assets/cards/02-at-two.svg",
      alt: "Abstract clock-like lines divided by a dark diagonal mark.",
      archiveNumber: "E.35 / 02",
      developmentStatus: "working-draft"
    },
    {
      id: "where-she-stood",
      chapter: "room-keeps-time",
      order: 3,
      title: "Where She Stood",
      lines: [
        "The carpet kept",
        "the shape of no one.",
        "",
        "Only one flower",
        "leaned beneath the window,",
        "as if a foot",
        "had just remembered it."
      ],
      image: "./assets/cards/03-where-she-stood.svg",
      alt: "Muted green textile shapes with one displaced burgundy form.",
      archiveNumber: "E.35 / 03",
      developmentStatus: "working-draft"
    },
    {
      id: "behind-the-vase",
      chapter: "room-keeps-time",
      order: 4,
      title: "Behind the Vase",
      lines: [
        "All winter",
        "the vase faced the room.",
        "",
        "On its other side,",
        "a single number",
        "waited without flowers."
      ],
      image: "./assets/cards/04-behind-the-vase.svg",
      alt: "A pale divided form with a small mark hidden along its dark edge.",
      archiveNumber: "E.35 / 04",
      developmentStatus: "working-draft"
    },
    {
      id: "ticket-without-arrival",
      chapter: "geography-of-leaving",
      order: 5,
      title: "Ticket Without Arrival",
      lines: [
        "LONDON remained.",
        "Two o’clock remained.",
        "The place I was going",
        "gave itself to rain.",
        "",
        "A ticket needs",
        "only one clear direction",
        "to become a farewell."
      ],
      image: "./assets/cards/05-ticket-without-arrival.svg",
      alt: "Faded ticket-like bars interrupted by a wash of blue-grey.",
      archiveNumber: "E.35 / 05",
      developmentStatus: "working-draft"
    },
    {
      id: "room-beside-the-room",
      chapter: "geography-of-leaving",
      order: 6,
      title: "The Room Beside the Room",
      lines: [
        "The bookcase opened",
        "like a sentence",
        "revising its last word.",
        "",
        "Beyond it:",
        "a smaller room,",
        "and less dust",
        "than there should have been."
      ],
      image: "./assets/cards/06-room-beside-the-room.svg",
      alt: "Two offset rectangles connected by a narrow dark opening.",
      archiveNumber: "E.35 / 06",
      developmentStatus: "working-draft"
    },
    {
      id: "europe-in-winter",
      chapter: "geography-of-leaving",
      order: 7,
      title: "Europe in Winter",
      lines: [
        "On the map,",
        "snow fell three times",
        "without becoming cold.",
        "",
        "I touched each white mark.",
        "The paper remembered",
        "none of them."
      ],
      image: "./assets/cards/07-europe-in-winter.svg",
      alt: "A blue-grey field with three small ivory marks.",
      archiveNumber: "E.35 / 07",
      developmentStatus: "working-draft"
    },
    {
      id: "paper-bird",
      chapter: "geography-of-leaving",
      order: 8,
      title: "The Paper Bird",
      lines: [
        "Where is the destination?",
        "I asked the paper bird.",
        "",
        "It crossed the river,",
        "climbed over the hill,",
        "and dissolved into the sun."
      ],
      image: "./assets/cards/08-paper-bird.svg",
      alt: "Folded ivory planes move through blue, green, and muted ochre bands.",
      archiveNumber: "E.35 / 08",
      developmentStatus: "stable-draft"
    },
    {
      id: "carbon-copy",
      chapter: "things-written-twice",
      order: 9,
      title: "Carbon Copy",
      lines: [
        "The first page took the ink.",
        "The second took the pressure.",
        "",
        "Years later,",
        "only the lighter sentence",
        "could still be read."
      ],
      image: "./assets/cards/09-carbon-copy.svg",
      alt: "Two nearly matching text-like fields, one fading beneath the other.",
      archiveNumber: "E.35 / 09",
      developmentStatus: "working-draft"
    },
    {
      id: "between-the-letters",
      chapter: "things-written-twice",
      order: 10,
      title: "Between the Letters",
      lines: [
        "You read what I wrote.",
        "Your friend read",
        "what I left out.",
        "",
        "The message waited",
        "in the narrow country",
        "between your voices."
      ],
      image: "./assets/cards/10-between-the-letters.svg",
      alt: "Two dark columns separated by a narrow strip of warm paper.",
      archiveNumber: "E.35 / 10",
      developmentStatus: "working-draft"
    },
    {
      id: "for-the-second-reader",
      chapter: "things-written-twice",
      order: 11,
      title: "For the Second Reader",
      lines: [
        "The first reader",
        "opens the envelope.",
        "",
        "The second",
        "opens the silence.",
        "",
        "Only then",
        "does the letter",
        "know whom it means."
      ],
      image: "./assets/cards/11-for-the-second-reader.svg",
      alt: "Two pale folded shapes meet across a quiet central gap.",
      archiveNumber: "E.35 / 11",
      developmentStatus: "working-draft"
    }
  ],
  coda: {
    id: "coda",
    indexLabel: "Coda",
    title: "The Unwritten Postscript",
    archiveLabel: "Final leaf · divided copy",
    instruction: "Ask the reader holding the final sealed letter to open it. Read in alternation: the paper begins each pair; the light answers.",
    cue: "Let the paper speak first.",
    digitalLines: [
      "the objects continued quietly.",
      "a bird slept inside a sheet of paper.",
      "Two voices were needed for that.",
      "was written between you."
    ]
  }
};
