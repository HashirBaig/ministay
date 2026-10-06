import { lazy, Suspense, useState } from "react";
import type { FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  MapPin,
  Search,
  ShieldCheck,
  Trees,
  Users,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { availableStays, stays } from "@/data/stays";
import type { Stay } from "@/data/stays";
const HeroAtmosphere = lazy(
  () => import("@/components/landing/HeroAtmosphere"),
);

function localDate(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
const euro = (amount: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function LandingPage() {
  const reduced = useReducedMotion();
  const [checkIn, setCheckIn] = useState(() => localDate(4));
  const [checkOut, setCheckOut] = useState(() => localDate(8));
  const [guests, setGuests] = useState(2);
  const [results, setResults] = useState(stays);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Stay | null>(null);
  const [notice, setNotice] = useState<"manage" | "admin" | null>(null);
  const [searchSummary, setSearchSummary] = useState("");
  const reveal = {
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55 },
  };

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkIn || !checkOut || checkIn < localDate() || checkOut <= checkIn) {
      setError(
        "Choose a check-in date from today and a check-out date after check-in.",
      );
      return;
    }
    setError("");
    setSearched(true);
    setResults(availableStays(checkIn, checkOut, guests));
    setSearchSummary(
      `${checkIn} → ${checkOut} · ${guests} ${guests === 1 ? "guest" : "guests"}`,
    );
    document.getElementById("stays")?.scrollIntoView({
      behavior: reduced ? "instant" : "smooth",
      block: "start",
    });
  }

  return (
    <div className="ministay">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#" aria-label="MiniStay home">
            <span className="brand-icon">
              <Trees size={24} />
            </span>
            MiniStay<span className="brand-dot">.</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#stays">Stays</a>
            <Button
              variant="ghost"
              className="nav-manage"
              onClick={() => setNotice("manage")}
            >
              Manage booking
            </Button>
            <Button className="admin-button" onClick={() => setNotice("admin")}>
              Admin
              <ArrowRight size={14} />
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-photo" />
          <div className="hero-shade" />
          <Suspense fallback={null}>
            <HeroAtmosphere />
          </Suspense>
          <div className="container hero-content">
            <motion.div {...reveal} className="hero-copy">
              <span className="eyebrow">
                <Leaf size={14} /> LESS RUSH. MORE NATURE.
              </span>
              <h1 id="hero-heading">
                Find your next stay<span>.</span>
              </h1>
              <p>Cabins, tents and more. Enjoy nature, stress free.</p>
            </motion.div>
            <motion.form
              {...reveal}
              transition={{ duration: 0.55, delay: reduced ? 0 : 0.12 }}
              className="search-panel"
              onSubmit={search}
            >
              <div className="search-field">
                <Label htmlFor="check-in">Check-in</Label>
                <Input
                  id="check-in"
                  type="date"
                  min={localDate()}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div className="search-field">
                <Label htmlFor="check-out">Check-out</Label>
                <Input
                  id="check-out"
                  type="date"
                  min={checkIn || localDate()}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
              <div className="search-field">
                <Label htmlFor="guests">Guests</Label>
                <div className="guest-select">
                  <Users size={17} />
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button type="submit" className="search-button">
                <Search size={18} />
                Search stays
              </Button>
              {error && (
                <p className="search-error" role="alert">
                  {error}
                </p>
              )}
            </motion.form>
            <div className="hero-footnote">
              <MapPin size={14} /> Little escapes. Lasting memories.
            </div>
          </div>
        </section>

        <section
          className="container stays-section"
          id="stays"
          aria-labelledby="stays-heading"
        >
          <div className="section-heading">
            <div>
              <span className="section-kicker">YOUR NEXT LITTLE ESCAPE</span>
              <h2 id="stays-heading">Available stays</h2>
              <p>
                {searched
                  ? searchSummary
                  : "A few lovely places to switch off and settle in."}
              </p>
            </div>
            <span className="result-count" role="status" aria-live="polite">
              {results.length} stays {searched ? "found" : "to explore"}
            </span>
          </div>
          <div className="stay-grid">
            {results.map((stay, index) => (
              <motion.div
                key={stay.id}
                {...reveal}
                transition={{
                  duration: 0.4,
                  delay: reduced ? 0 : index * 0.08,
                }}
                whileHover={reduced ? undefined : { y: -5 }}
              >
                <Card className="stay-card">
                  <div className="stay-image">
                    <img
                      src={stay.image}
                      alt={
                        stay.name === "Glamping Tent"
                          ? "Camping tent in a natural setting"
                          : `${stay.name} in a peaceful natural setting`
                      }
                      loading="lazy"
                    />
                    <span className="image-badge">
                      {stay.id === "glamping-tent" ? (
                        <Leaf size={13} />
                      ) : stay.id === "lake-house" ? (
                        <Waves size={13} />
                      ) : (
                        <Trees size={13} />
                      )}
                      {stay.id === "glamping-tent"
                        ? "Under the stars"
                        : stay.id === "lake-house"
                          ? "By the water"
                          : "In the forest"}
                    </span>
                  </div>
                  <div className="stay-body">
                    <span className="card-kicker">{stay.category}</span>
                    <h3>{stay.name}</h3>
                    <p className="capacity">
                      <Users size={15} /> Sleeps {stay.capacity}
                    </p>
                    <div className="stay-bottom">
                      <p>
                        <strong>{euro(stay.price)}</strong>
                        <span> / night</span>
                      </p>
                      <Button
                        onClick={() => setSelected(stay)}
                        aria-label={`View ${stay.name}`}
                      >
                        View
                        <ArrowRight size={15} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          {results.length === 0 && (
            <div className="empty-state">
              <Trees size={32} />
              <h3>No stays for these dates</h3>
              <p>
                Try different dates or fewer guests to find your little escape.
              </p>
            </div>
          )}
          {searched && (
            <Button
              className="reset-button"
              variant="ghost"
              onClick={() => {
                setResults(stays);
                setSearched(false);
                setError("");
              }}
            >
              Show all stays
            </Button>
          )}
          <div className="trust-strip">
            <span>
              <Leaf size={18} /> Closer to nature
            </span>
            <span>
              <ShieldCheck size={18} /> Simple, stress-free stays
            </span>
            <span>
              <Trees size={18} /> A little room to breathe
            </span>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a className="footer-brand" href="#">
          MiniStay.
        </a>
        <p>A small escape from the everyday.</p>
        <span>© {new Date().getFullYear()} MiniStay</span>
      </footer>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="stay-dialog">
          {selected && (
            <>
              <img
                className="dialog-photo"
                src={selected.image}
                alt={selected.name}
              />
              <DialogTitle className="dialog-title">
                {selected.name}
              </DialogTitle>
              <DialogDescription>{selected.description}</DialogDescription>
              <div className="amenity-list">
                {selected.amenities.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p>
                <strong>{euro(selected.price)} / night</strong> · Sleeps{" "}
                {selected.capacity}
              </p>
              <p className="demo-note">
                Demo accommodation. Booking and payments are not connected yet.
              </p>
              <Button onClick={() => setSelected(null)}>Back to stays</Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!notice}
        onOpenChange={(open) => {
          if (!open) setNotice(null);
        }}
      >
        <DialogContent>
          <DialogTitle>
            {notice === "manage" ? "Manage your booking" : "Admin area"}
          </DialogTitle>
          <DialogDescription>
            {notice === "manage"
              ? "Booking lookup will be available when the booking API is connected. For now, explore the stays and try the search."
              : "This landing-page demo has no admin backend yet. Booking management can be connected here later."}
          </DialogDescription>
          <Button onClick={() => setNotice(null)}>Back to MiniStay</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
