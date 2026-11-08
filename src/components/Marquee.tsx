export default function Marquee({ variant = "light" }: { variant?: "light" | "outlined" }) {
  const items = ["Interior Design", "Construction", "Renovation", "Multan", "Islamabad", "Rawalpindi"];

  return (
    <div className={`editorial-marquee ${variant === "outlined" ? "editorial-marquee-outlined" : ""}`} aria-label="Interior design, construction and renovation in Multan, Islamabad and Rawalpindi">
      <span className="sr-only">Interior Design · Construction · Renovation · Multan · Islamabad · Rawalpindi</span>
      <div className="editorial-marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <span className="editorial-marquee-copy" key={copy}>
            {items.map((item) => <span key={item}>{item}<i>·</i></span>)}
          </span>
        ))}
      </div>
    </div>
  );
}
