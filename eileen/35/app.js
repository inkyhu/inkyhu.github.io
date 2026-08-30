import { manuscript } from "./data/poems.js";

const chapterList = document.querySelector("#chapter-list");
const readingPanel = document.querySelector("#reading-panel");
const shelfContent = document.querySelector("#shelf-content");
const shelfTitle = document.querySelector("#shelf-title");
const shelfRange = document.querySelector("#shelf-range");
const readingStatus = document.querySelector("#reading-status");

const state = {
  unlocked: false,
  view: "letter",
  activeChapter: manuscript.chapters[0].id,
  activePoem: manuscript.poems[0].id
};

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function chapterFor(id) {
  return manuscript.chapters.find((chapter) => chapter.id === id);
}

function poemFor(id) {
  return manuscript.poems.find((poem) => poem.id === id);
}

function poemsInChapter(id) {
  return manuscript.poems.filter((poem) => poem.chapter === id);
}

function setReadingStatus(message) {
  readingStatus.textContent = "";
  window.requestAnimationFrame(() => {
    readingStatus.textContent = message;
  });
}

function updateHash(value) {
  window.history.replaceState(null, "", `#${value}`);
}

function focusReading() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  readingPanel.focus({ preventScroll: true });
  readingPanel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

function selectLetter(shouldFocus = true) {
  state.view = "letter";
  render();
  updateHash("letter");
  setReadingStatus("Letter from Eileen selected.");
  if (shouldFocus) focusReading();
}

function selectChapter(chapterId, shouldFocus = true) {
  if (!state.unlocked) return;

  const poems = poemsInChapter(chapterId);
  state.view = "poem";
  state.activeChapter = chapterId;
  state.activePoem = poems[0].id;
  render();
  updateHash(state.activePoem);
  setReadingStatus(`${poems[0].title} selected.`);
  if (shouldFocus) focusReading();
}

function selectPoem(poemId, shouldFocus = true) {
  const poem = poemFor(poemId);
  if (!state.unlocked || !poem) return;

  state.view = "poem";
  state.activeChapter = poem.chapter;
  state.activePoem = poem.id;
  render();
  updateHash(poem.id);
  setReadingStatus(`${poem.title} selected.`);
  if (shouldFocus) focusReading();
}

function selectCoda(shouldFocus = true) {
  if (!state.unlocked) return;

  state.view = "coda";
  render();
  updateHash("coda");
  setReadingStatus("Coda: The Unwritten Postscript selected.");
  if (shouldFocus) focusReading();
}

function unlockManuscript() {
  state.unlocked = true;
  document.body.classList.add("manuscript-open");
  render();
  setReadingStatus("The manuscript is open. Three chapters and the coda are now available.");
}

function buildIndexButton({ number, title, subtitle, selected, disabled, onSelect }) {
  const button = createElement("button", "index-entry");
  button.type = "button";
  button.disabled = disabled;
  button.setAttribute("aria-current", selected ? "page" : "false");
  button.addEventListener("click", onSelect);

  const reference = createElement("span", "index-reference", number);
  reference.setAttribute("aria-hidden", "true");

  const copy = createElement("span", "index-copy");
  copy.append(createElement("span", "index-title", title));
  if (subtitle) copy.append(createElement("span", "index-subtitle", subtitle));

  button.append(reference, copy);
  return button;
}

function renderNavigation() {
  chapterList.replaceChildren();
  chapterList.append(
    buildIndexButton({
      number: "—",
      title: manuscript.letter.indexLabel,
      subtitle: "For two readers",
      selected: state.view === "letter",
      disabled: false,
      onSelect: () => selectLetter()
    })
  );

  manuscript.chapters.forEach((chapter) => {
    chapterList.append(
      buildIndexButton({
        number: chapter.numeral,
        title: chapter.title,
        subtitle: chapter.range,
        selected: state.view === "poem" && state.activeChapter === chapter.id,
        disabled: !state.unlocked,
        onSelect: () => selectChapter(chapter.id)
      })
    );
  });

  chapterList.append(
    buildIndexButton({
      number: "C",
      title: `${manuscript.coda.indexLabel}. ${manuscript.coda.title}`,
      subtitle: "Divided copy",
      selected: state.view === "coda",
      disabled: !state.unlocked,
      onSelect: () => selectCoda()
    })
  );
}

function appendPoemLines(container, lines) {
  let stanza = createElement("p", "poem-stanza");

  lines.forEach((line, index) => {
    if (line === "") {
      if (stanza.childNodes.length) container.append(stanza);
      stanza = createElement("p", "poem-stanza");
      return;
    }

    const lineElement = createElement("span", "poem-line", line);
    stanza.append(lineElement);

    if (index === lines.length - 1 && stanza.childNodes.length) {
      container.append(stanza);
    }
  });
}

function renderLetter() {
  const { letter } = manuscript;
  const article = createElement("article", "document letter-document reading-enter");

  article.append(createElement("p", "document-meta", letter.archiveLabel));
  article.append(createElement("h1", "letter-salutation", letter.salutation));

  const body = createElement("div", "letter-body");
  letter.paragraphs.forEach((paragraph) => body.append(createElement("p", "", paragraph)));

  const cues = createElement("div", "letter-cues");
  letter.cueLines.forEach((line) => cues.append(createElement("p", "", line)));
  body.append(cues, createElement("p", "letter-closing", letter.closing));

  const signature = createElement("p", "signature", letter.signature);
  body.append(signature);
  article.append(body);

  const opening = createElement("div", "opening-control");
  if (state.unlocked) {
    opening.append(createElement("p", "manuscript-opened", "The leaves are open."));
  } else {
    const openButton = createElement("button", "open-button", "Open the manuscript");
    openButton.type = "button";
    openButton.addEventListener("click", unlockManuscript);
    opening.append(openButton);
  }
  article.append(opening);
  return article;
}

function createSequenceButton(label, onSelect, direction) {
  const button = createElement("button", `sequence-button sequence-button--${direction}`, label);
  button.type = "button";
  button.addEventListener("click", onSelect);
  return button;
}

function renderPoem() {
  const poem = poemFor(state.activePoem);
  const chapter = chapterFor(poem.chapter);
  const article = createElement("article", "document poem-document reading-enter");

  article.append(
    createElement(
      "p",
      "document-meta",
      `${chapter.numeral}. ${chapter.title} · ${poem.archiveNumber}`
    )
  );
  article.append(createElement("h1", "poem-title", poem.title));
  article.append(createElement("p", "chapter-introduction", chapter.introduction));

  const poemBody = createElement("div", "poem-body");
  appendPoemLines(poemBody, poem.lines);
  article.append(poemBody);

  const sequence = createElement("nav", "reading-sequence");
  sequence.setAttribute("aria-label", "Move through the manuscript");
  const poemIndex = manuscript.poems.findIndex((entry) => entry.id === poem.id);

  if (poemIndex === 0) {
    sequence.append(createSequenceButton("← Letter", () => selectLetter(), "previous"));
  } else {
    const previous = manuscript.poems[poemIndex - 1];
    sequence.append(
      createSequenceButton(`← ${previous.title}`, () => selectPoem(previous.id), "previous")
    );
  }

  if (poemIndex === manuscript.poems.length - 1) {
    sequence.append(createSequenceButton("Coda →", () => selectCoda(), "next"));
  } else {
    const next = manuscript.poems[poemIndex + 1];
    sequence.append(createSequenceButton(`${next.title} →`, () => selectPoem(next.id), "next"));
  }

  article.append(sequence);
  return article;
}

function renderCoda() {
  const { coda } = manuscript;
  const article = createElement("article", "document coda-document reading-enter");
  article.append(createElement("p", "document-meta", coda.archiveLabel));

  const heading = createElement("h1", "coda-title");
  heading.append(createElement("span", "coda-prefix", "Coda"));
  heading.append(document.createTextNode(coda.title));
  article.append(heading);
  article.append(createElement("p", "coda-instruction", coda.instruction));
  article.append(createElement("p", "coda-cue", coda.cue));

  const turns = createElement("ol", "coda-turns");
  turns.setAttribute("aria-label", "The lines held by the light");
  coda.digitalLines.forEach((line, index) => {
    const turn = createElement("li", "coda-turn");
    turn.style.setProperty("--turn", index);

    const paperPause = createElement("div", "paper-pause");
    paperPause.setAttribute("aria-hidden", "true");
    paperPause.append(createElement("span", "", `paper · ${String(index + 1).padStart(2, "0")}`));

    const lightLabel = createElement(
      "span",
      "light-label",
      `light answers · ${String(index + 1).padStart(2, "0")}`
    );
    const lightLine = createElement("p", "light-line", line);
    turn.append(paperPause, lightLabel, lightLine);
    turns.append(turn);
  });
  article.append(turns);

  const sequence = createElement("nav", "reading-sequence");
  sequence.setAttribute("aria-label", "Move through the manuscript");
  const lastPoem = manuscript.poems[manuscript.poems.length - 1];
  sequence.append(
    createSequenceButton(`← ${lastPoem.title}`, () => selectPoem(lastPoem.id), "previous")
  );
  article.append(sequence);
  return article;
}

function renderReading() {
  let documentView;
  if (state.view === "letter") documentView = renderLetter();
  if (state.view === "poem") documentView = renderPoem();
  if (state.view === "coda") documentView = renderCoda();
  readingPanel.replaceChildren(documentView);
}

function buildPoemCard(poem, chapter) {
  const button = createElement("button", "poem-card");
  button.type = "button";
  const isSelected = state.view === "poem" && state.activePoem === poem.id;
  button.classList.toggle("poem-card--active", isSelected);
  button.setAttribute("aria-pressed", String(isSelected));
  button.setAttribute("aria-label", `Read ${poem.title}, poem ${String(poem.order).padStart(2, "0")}`);
  button.addEventListener("click", () => selectPoem(poem.id));

  const image = document.createElement("img");
  image.className = "poem-card-image";
  image.src = poem.image;
  image.alt = poem.alt;
  image.width = 600;
  image.height = 760;
  image.loading = "lazy";

  const copy = createElement("span", "poem-card-copy");
  copy.append(
    createElement(
      "span",
      "poem-card-meta",
      `${String(poem.order).padStart(2, "0")} · ${chapter.numeral}`
    ),
    createElement("span", "poem-card-title", poem.title),
    createElement("span", "poem-card-archive", poem.archiveNumber)
  );

  button.append(image, copy);
  return button;
}

function renderShelf() {
  shelfContent.replaceChildren();

  if (!state.unlocked) {
    shelfTitle.textContent = "The manuscript";
    shelfRange.textContent = "sealed";
    const sealed = createElement("div", "shelf-note shelf-note--sealed");
    sealed.append(
      createElement("span", "shelf-rule", ""),
      createElement("p", "", "Eleven leaves wait behind the letter."),
      createElement("small", "", "Read Eileen’s note before disturbing their order.")
    );
    shelfContent.append(sealed);
    return;
  }

  if (state.view === "letter") {
    shelfTitle.textContent = "The manuscript";
    shelfRange.textContent = "01—11";
    const ready = createElement("div", "shelf-note shelf-note--ready");
    ready.append(createElement("p", "", "Three gatherings. Eleven short poems. One divided final leaf."));
    const begin = createElement("button", "begin-link", "Begin with chapter I →");
    begin.type = "button";
    begin.addEventListener("click", () => selectChapter(manuscript.chapters[0].id));
    ready.append(begin);
    shelfContent.append(ready);
    return;
  }

  if (state.view === "coda") {
    shelfTitle.textContent = "Final leaf";
    shelfRange.textContent = "divided";
    const finalNote = createElement("div", "shelf-note shelf-note--coda");
    finalNote.append(
      createElement("p", "", "This copy contains only the lines held by the light."),
      createElement("small", "", "The complete postscript exists only while it is read together.")
    );
    shelfContent.append(finalNote);
    return;
  }

  const chapter = chapterFor(state.activeChapter);
  shelfTitle.textContent = `${chapter.numeral}. ${chapter.title}`;
  shelfRange.textContent = chapter.range;
  const cardList = createElement("div", "poem-card-list");
  poemsInChapter(chapter.id).forEach((poem) => cardList.append(buildPoemCard(poem, chapter)));
  shelfContent.append(cardList);
}

function render() {
  renderNavigation();
  renderReading();
  renderShelf();
}

function moveFocusWithin(container, event) {
  if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) {
    return;
  }

  const buttons = [...container.querySelectorAll("button:not(:disabled)")];
  const currentIndex = buttons.indexOf(document.activeElement);
  if (currentIndex === -1 || buttons.length === 0) return;

  event.preventDefault();
  let nextIndex = currentIndex;
  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    nextIndex = (currentIndex + 1) % buttons.length;
  }
  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
  }
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = buttons.length - 1;
  buttons[nextIndex].focus();
}

chapterList.addEventListener("keydown", (event) => moveFocusWithin(chapterList, event));
shelfContent.addEventListener("keydown", (event) => moveFocusWithin(shelfContent, event));

function restoreLinkedPage() {
  const target = decodeURIComponent(window.location.hash.slice(1));
  const linkedPoem = poemFor(target);

  if (linkedPoem) {
    state.unlocked = true;
    state.view = "poem";
    state.activeChapter = linkedPoem.chapter;
    state.activePoem = linkedPoem.id;
    document.body.classList.add("manuscript-open");
  }

  if (target === "coda") {
    state.unlocked = true;
    state.view = "coda";
    document.body.classList.add("manuscript-open");
  }
}

restoreLinkedPage();
render();
