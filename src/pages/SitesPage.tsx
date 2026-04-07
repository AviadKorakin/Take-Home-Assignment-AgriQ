import { useMemo, useState } from "react";
import { piles } from "../data/mockData";
import PileCard from "../components/sites/PileCard";
import SelectedPilePanel from "../components/sites/SelectedPilePanel";
import styles from "./SitesPage.module.css";

export default function SitesPage() {
  const [selectedPileId, setSelectedPileId] = useState<string>(piles[0].id);

  const selectedPile = useMemo(
    () => piles.find((pile) => pile.id === selectedPileId) ?? piles[0],
    [selectedPileId],
  );

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>Sites</h2>
        <p className={styles.description}>
          All storage piles, current status, and selected sensor view.
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.pilesColumn}>
          {piles.map((pile) => (
            <PileCard
              key={pile.id}
              pile={pile}
              isSelected={pile.id === selectedPile.id}
              onSelect={setSelectedPileId}
            />
          ))}
        </div>

        <SelectedPilePanel pile={selectedPile} />
      </div>
    </section>
  );
}
