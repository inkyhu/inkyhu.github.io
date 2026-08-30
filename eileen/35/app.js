import { getManuscript, uiCopy } from "./data/poems.js";

const chapterList = document.querySelector("#chapter-list");
const readingPanel = document.querySelector("#reading-panel");
const shelfContent = document.querySelector("#shelf-content");
const shelfTitle = document.querySelector("#shelf-title");
const shelfRange = document.querySelector("#shelf-range");
const readingStatus = document.querySelector("#reading-status");
const skipLink = document.querySelector("#skip-link");
const masthead = document.querySelector("#masthead");
const archiveMark = document.querySelector("#archive-mark");
const publicationTitle = document.querySelector("#publication-title");
const publicationSubtitle = document.querySelector("#publication-subtitle");
const copyMark = document.querySelector("#copy-mark");
const contentsLabel = document.querySelector("#contents-label");
const chapterIndex = document.querySelector("#chapter-index");
const languageSwitch = document.querySelector("#language-switch");
const languageButtons = [...document.querySelectorAll("[data-language]")];
const descriptionMeta = document.querySelector('meta[name="description"]');

const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
const initialLanguage = requestedLanguage === "zh" ? "zh" : "en";
let manuscript = getManuscript(initialLanguage);

const state = {
  language: initialLanguage,
  unlocked: false,
  view: "letter",
  activeChapter: manuscript.chapters[0].id,
  activePoem: manuscript.poems[0].id
};

function interfaceText() {
  return uiCopy[state.language];
}

function formatText(template, values) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, value),
    template
  );
}

function applyLanguageChrome() {
  const ui = interfaceText();
  document.documentElement.lang = ui.lang;
  document.title = ui.pageTitle;
  descriptionMeta.content = ui.pageDescription;
  document.body.classList.toggle("language-zh", state.language === "zh");

  skipLink.textContent = ui.skipLink;
  masthead.setAttribute("aria-label", ui.mastheadLabel);
  archiveMark.setAttribute("aria-label", ui.archiveMarkLabel);
  publicationTitle.textContent = manuscript.title;
  publicationSubtitle.textContent = manuscript.subtitle;
  copyMark.textContent = ui.copyMark;
  contentsLabel.textContent = ui.contents;
  chapterIndex.setAttribute("aria-label", ui.contentsLabel);
  languageSwitch.setAttribute("aria-label", ui.languageLabel);

  languageButtons.forEach((button) => {
    const language = button.dataset.language;
    button.setAttribute("aria-pressed", String(language === state.language));
    button.setAttribute(
      "aria-label",
      language === "en" ? ui.switchToEnglish : ui.switchToChinese
    );
  });
}

function setLanguage(language) {
  if (!uiCopy[language] || language === state.language) return;

  state.language = language;
  manuscript = getManuscript(language);
  const url = new URL(window.location.href);
  if (language === "zh") {
    url.searchParams.set("lang", "zh");
  } else {
    url.searchParams.delete("lang");
  }
  window.history.replaceState(null, "", url);
  applyLanguageChrome();
  render();
  setReadingStatus(interfaceText().languageChanged);
}

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
  const url = new URL(window.location.href);
  url.hash = value;
  window.history.replaceState(null, "", url);
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
  setReadingStatus(interfaceText().letterSelected);
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
  setReadingStatus(
    formatText(interfaceText().selectedTemplate, { title: poems[0].title })
  );
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
  setReadingStatus(formatText(interfaceText().selectedTemplate, { title: poem.title }));
  if (shouldFocus) focusReading();
}

function selectCoda(shouldFocus = true) {
  if (!state.unlocked) return;

  state.view = "coda";
  render();
  updateHash("coda");
  setReadingStatus(interfaceText().codaSelected);
  if (shouldFocus) focusReading();
}

function unlockManuscript() {
  state.unlocked = true;
  document.body.classList.add("manuscript-open");
  render();
  setReadingStatus(interfaceText().manuscriptUnlocked);
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
  const ui = interfaceText();
  chapterList.replaceChildren();
  chapterList.append(
    buildIndexButton({
      number: "—",
      title: manuscript.letter.indexLabel,
      subtitle: ui.forTwoReaders,
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
      title: `${manuscript.coda.indexLabel}${ui.titleSeparator}${manuscript.coda.title}`,
      subtitle: ui.finalPage,
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
  const ui = interfaceText();
  const article = createElement("article", "document letter-document reading-enter");

  article.append(createElement("p", "document-meta", letter.archiveLabel));
  article.append(createElement("h1", "letter-salutation", letter.salutation));

  const body = createElement("div", "letter-body");
  letter.paragraphs.forEach((paragraph) => body.append(createElement("p", "", paragraph)));
  if (letter.closing) body.append(createElement("p", "letter-closing", letter.closing));

  const signature = createElement("p", "signature", letter.signature);
  body.append(signature);
  article.append(body);

  const opening = createElement("div", "opening-control");
  if (state.unlocked) {
    opening.append(createElement("p", "manuscript-opened", ui.manuscriptOpened));
  } else {
    const openButton = createElement("button", "open-button", ui.openManuscript);
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
  const ui = interfaceText();
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
  sequence.setAttribute("aria-label", ui.moveThrough);
  const poemIndex = manuscript.poems.findIndex((entry) => entry.id === poem.id);

  if (poemIndex === 0) {
    sequence.append(createSequenceButton(`← ${ui.letter}`, () => selectLetter(), "previous"));
  } else {
    const previous = manuscript.poems[poemIndex - 1];
    sequence.append(
      createSequenceButton(`← ${previous.title}`, () => selectPoem(previous.id), "previous")
    );
  }

  if (poemIndex === manuscript.poems.length - 1) {
    sequence.append(createSequenceButton(`${ui.coda} →`, () => selectCoda(), "next"));
  } else {
    const next = manuscript.poems[poemIndex + 1];
    sequence.append(createSequenceButton(`${next.title} →`, () => selectPoem(next.id), "next"));
  }

  article.append(sequence);
  return article;
}

function renderCoda() {
  const { coda, creatorNote } = manuscript;
  const ui = interfaceText();
  const article = createElement("article", "document coda-document reading-enter");
  article.append(createElement("p", "document-meta", coda.archiveLabel));

  const heading = createElement("h1", "coda-title");
  heading.append(createElement("span", "coda-prefix", ui.codaPrefix));
  heading.append(document.createTextNode(coda.title));
  article.append(heading);

  const codaBody = createElement("div", "coda-body");
  codaBody.append(createElement("p", "coda-salutation", coda.salutation));
  coda.blocks.forEach((block) => {
    codaBody.append(createElement("p", `coda-block coda-block--${block.type}`, block.text));
  });
  codaBody.append(createElement("p", "coda-signature", coda.signature));
  article.append(codaBody);

  const outside = document.createElement("details");
  outside.className = "creator-note";
  outside.id = creatorNote.id;

  const summary = document.createElement("summary");
  const summaryCopy = createElement("span", "creator-note-summary");
  summaryCopy.append(
    createElement("span", "creator-note-title", creatorNote.title),
    createElement("span", "creator-note-label", creatorNote.label)
  );
  summary.append(summaryCopy, createElement("span", "creator-note-marker", "+"));

  const creatorBody = createElement("div", "creator-note-body");
  creatorNote.paragraphs.forEach((paragraph) => {
    creatorBody.append(createElement("p", "", paragraph));
  });
  creatorBody.append(createElement("p", "creator-note-signature", creatorNote.signature));
  outside.append(summary, creatorBody);
  const creatorNoteLinked = decodeURIComponent(window.location.hash.slice(1)) === creatorNote.id;
  outside.open = creatorNoteLinked;
  outside.addEventListener("toggle", () => {
    const marker = outside.querySelector(".creator-note-marker");
    marker.textContent = outside.open ? "−" : "+";
    updateHash(outside.open ? creatorNote.id : "coda");
    setReadingStatus(outside.open ? ui.creatorOpened : ui.creatorClosed);
  });
  article.append(outside);
  if (creatorNoteLinked) {
    window.requestAnimationFrame(() => outside.scrollIntoView({ block: "start" }));
  }

  const sequence = createElement("nav", "reading-sequence");
  sequence.setAttribute("aria-label", ui.moveThrough);
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
  const ui = interfaceText();
  const button = createElement("button", "poem-card");
  button.type = "button";
  const isSelected = state.view === "poem" && state.activePoem === poem.id;
  button.classList.toggle("poem-card--active", isSelected);
  button.setAttribute("aria-pressed", String(isSelected));
  button.setAttribute(
    "aria-label",
    formatText(ui.poemCardTemplate, {
      title: poem.title,
      order: String(poem.order).padStart(2, "0")
    })
  );
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
  const ui = interfaceText();
  shelfContent.replaceChildren();

  if (!state.unlocked) {
    shelfTitle.textContent = ui.shelfManuscript;
    shelfRange.textContent = ui.sealed;
    const sealed = createElement("div", "shelf-note shelf-note--sealed");
    sealed.append(
      createElement("span", "shelf-rule", ""),
      createElement("p", "", ui.sealedMessage),
      createElement("small", "", ui.sealedHint)
    );
    shelfContent.append(sealed);
    return;
  }

  if (state.view === "letter") {
    shelfTitle.textContent = ui.shelfManuscript;
    shelfRange.textContent = "01—11";
    const ready = createElement("div", "shelf-note shelf-note--ready");
    ready.append(createElement("p", "", ui.readyMessage));
    const begin = createElement("button", "begin-link", ui.beginChapter);
    begin.type = "button";
    begin.addEventListener("click", () => selectChapter(manuscript.chapters[0].id));
    ready.append(begin);
    shelfContent.append(ready);
    return;
  }

  if (state.view === "coda") {
    shelfTitle.textContent = ui.finalLeaf;
    shelfRange.textContent = ui.complete;
    const finalNote = createElement("div", "shelf-note shelf-note--coda");
    finalNote.append(
      createElement("p", "", manuscript.coda.shelfNote),
      createElement("small", "", ui.creatorWaits)
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
languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

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

  if (target === "coda" || target === manuscript.creatorNote.id) {
    state.unlocked = true;
    state.view = "coda";
    document.body.classList.add("manuscript-open");
  }
}

restoreLinkedPage();
applyLanguageChrome();
render();
