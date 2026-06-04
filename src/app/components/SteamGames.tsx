import { useMemo, useState } from "react";
import { siteConfig } from "../../config/site.config";
import {
  GAMING_CATEGORY_META,
  gamingGalleryItems,
  type GamingCategoryKey
} from "../../data/gaming-gallery";

const FILTERS: ("All" | GamingCategoryKey)[] = [
  "All",
  "actionAdventure",
  "rpg",
  "visualNovel",
  "shooter",
  "puzzle",
  "platformer",
  "multiplayer",
  "rhythm",
  "simulation",
  "misc"
];

const ROTATIONS = [-3.5, 2.1, -1.8, 3.2, -2.7, 1.5, -0.8, 2.9, -3.1, 1.2];
const OFFSET_X = [4, -6, 8, -3, 5, -7, 2, -5, 6, -4];
const OFFSET_Y = [-5, 3, -2, 6, -4, 2, -6, 4, -3, 5];

function getCardStyle(index: number) {
  return {
    rotate: ROTATIONS[index % ROTATIONS.length],
    tx: OFFSET_X[index % OFFSET_X.length],
    ty: OFFSET_Y[index % OFFSET_Y.length]
  };
}

function getSizeMultiplier(hours: number | null): number {
  if (hours === null) return 1;
  if (hours >= 100) return 1.3;
  if (hours >= 60) return 1.16;
  if (hours >= 30) return 1.08;
  return 1;
}

export function SteamGames() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") {
      return gamingGalleryItems;
    }
    return gamingGalleryItems.filter((game) => game.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="gaming" className="panel glass">
      <div className="section-title-wrap">
        <h2 className="section-title">Gaming Gallery</h2>
        <p className="section-subtitle">Games that inspire my design philosophy</p>
      </div>
      <div className="section-link-row">
        <a href={siteConfig.steam.profileUrl} target="_blank" rel="noreferrer">
          View Full Steam Library
        </a>
      </div>

      <div className="filter-row gaming-filter-row">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "chip chip--active" : "chip"}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter === "All" ? "All" : GAMING_CATEGORY_META[filter].label}
            <span className="chip-count">
              {filter === "All"
                ? gamingGalleryItems.length
                : gamingGalleryItems.filter((item) => item.category === filter).length}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? <p className="muted center-text">No games found in this category.</p> : null}

      <div className="gaming-wall">
        {filtered.map((game, index) => {
          const { rotate, tx, ty } = getCardStyle(index);
          const size = getSizeMultiplier(game.hours);
          const cardWidth = Math.round(220 * size);
          const cardHeight = Math.round(160 * size);
          const categoryColor = GAMING_CATEGORY_META[game.category].color;

          return (
            <a
              key={game.id}
              className="gaming-card"
              href={game.storeUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                width: `${cardWidth}px`,
                minHeight: `${cardHeight}px`,
                transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg)`,
                borderColor: `${categoryColor}66`
              }}
              title={`${GAMING_CATEGORY_META[game.category].display} · ${game.playtimeLabel}`}
            >
              <div
                className="gaming-card__cover"
                style={{ backgroundColor: "#0f172a" }}
              >
                <img
                  src={game.coverUrl}
                  alt={game.name}
                  loading="lazy"
                  onError={(event) => {
                    const image = event.currentTarget;
                    if (!image.dataset.fallback) {
                      image.dataset.fallback = "1";
                      image.src = `https://placehold.co/460x215/e2e8f0/0f172a?text=${encodeURIComponent(
                        game.name
                      )}`;
                    }
                  }}
                />
                <div className="gaming-card__cover-overlay" />
                <span>{GAMING_CATEGORY_META[game.category].label}</span>
                <strong>{game.playtimeLabel}</strong>
              </div>
              <div className="gaming-card__body">
                <h3>{game.name}</h3>
                <p>
                  {GAMING_CATEGORY_META[game.category].display}
                  {!game.isSteamApp ? ` · ${game.platformLabel}` : ""}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
