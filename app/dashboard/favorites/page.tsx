import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div>
      <span className="chip">Favorites</span>
      <h1 className="heading-display mt-3 text-4xl">Your saved gems</h1>
      <p className="text-muted mt-2">
        Heart any asset in the studio and it lands here for quick reuse.
      </p>

      <div className="mt-16 card p-12 text-center">
        <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-cream-100 dark:bg-sand-800 text-terracotta-500">
          <Heart className="h-6 w-6" />
        </div>
        <div className="mt-5 font-serif text-2xl text-sand-900 dark:text-cream-50">
          Nothing here yet
        </div>
        <p className="mt-2 text-muted">
          Tap the heart on any generated asset to save it.
        </p>
      </div>
    </div>
  );
}
