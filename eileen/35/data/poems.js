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
      "The manuscript is not a novel, as you may have expected, but a small collection of poems. This is not an evasion. The poems are real, and the mystery surrounding them is real as well.",
      "Read them first."
    ],
    cueLines: ["The last page will explain why I required two readers to reach the first."],
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
    archiveLabel: "Final leaf · complete copy",
    salutation: "To my two friends—",
    blocks: [
      {
        type: "paragraph",
        text: "You have reached the manuscript."
      },
      {
        type: "paragraph",
        text: "It is, I confess, a modest object: eleven short poems, hardly enough paper to justify a locked bookcase. If either of you expected an unpublished masterpiece, you may lodge a complaint with the author. I shall give it the solemn attention such complaints deserve."
      },
      {
        type: "paragraph",
        text: "But the poems are real, and they are yours to read. They are the manuscript I promised."
      },
      {
        type: "pivot",
        text: "The long mystery was the way I asked you to reach them."
      },
      {
        type: "paragraph",
        text: "I have always preferred a mystery that leaves behind more than an answer. An answer closes a question. A good mystery alters the way one looks at an ordinary thing."
      },
      {
        type: "paragraph",
        text: "A record is no longer only music. A clock keeps more than time. A ticket may remember its departure after its destination has been rubbed away. A sheet of paper may contain a bird, provided another voice knows where it should be folded."
      },
      {
        type: "pivot",
        text: "So I made a book that began before its first page."
      },
      {
        type: "paragraph",
        text: "One of you stood among my objects. The other kept watch over my papers. Neither possessed enough, which meant that each had to borrow the other’s attention."
      },
      {
        type: "paragraph",
        text: "You described, misheard, corrected, waited, and tried again. The numbers mattered, of course—but only because of what you had to give one another before they would appear."
      },
      {
        type: "pivot",
        text: "That was the part I could not write alone."
      },
      {
        type: "paragraph",
        text: "I could arrange the room. I could leave the papers. I could write these eleven poems. But I could not decide the exact words one of you would use for a mark, or how long the other would remain silent before understanding. I could not write the laugh after a wrong answer, or the small change in a voice when a guess became certain."
      },
      {
        type: "paragraph",
        text: "Those sentences existed only while passing between you. No archive could preserve them faithfully. This page least of all."
      },
      {
        type: "paragraph",
        text: "Perhaps that is why I called it unwritten. Not because nothing was here, and not because I had neglected my ending. I simply left room for two readers inside it."
      },
      {
        type: "closing",
        text: "So yes: you found my manuscript."
      },
      {
        type: "closing",
        text: "And, with admirable thoroughness, my dear completionists, you also completed the mystery around it."
      },
      {
        type: "closing",
        text: "I supplied the pages."
      },
      {
        type: "closing",
        text: "You made the distance between them readable."
      },
      {
        type: "final",
        text: "That will do very nicely for an ending."
      }
    ],
    signature: "— Eileen",
    shelfNote: "A complete final leaf: the part Eileen could write, and the space she left for two readers."
  },
  physicalNote: {
    title: "For the reader holding the paper—",
    instruction: "Please read this aloud.",
    paragraphs: [
      "A final correction.",
      "I did consider hiding half an ending in this envelope. It would have been clever. It would also have been rather tiresome.",
      "There is no missing line here. You have already spent quite long enough putting my sentences back together.",
      "Keep this letter as evidence that the manuscript was read as intended: not by one brilliant reader, but by two patient ones."
    ],
    closing: "With my thanks—and no further clues,",
    signature: "Eileen",
    developmentStatus: "working-draft"
  },
  creatorNote: {
    id: "outside-the-manuscript",
    title: "Outside the manuscript",
    label: "A note from the maker",
    paragraphs: [
      "I made The Unwritten Postscript because I love literary puzzles in which objects are not merely clues, but ways of reading.",
      "I wanted two people to hold different parts of the same story—and to discover that describing, listening, waiting, and correcting one another could become the story itself.",
      "Eileen’s manuscript is fictional. The conversation that completes it is not."
    ],
    signature: "— Inky"
  }
};
