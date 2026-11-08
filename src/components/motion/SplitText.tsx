import type { CSSProperties } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="split-text-visual">
        {words.map((word, index) => (
          <span className="split-word-mask" key={`${word}-${index}`}>
            <span className="split-word" style={{ "--word-index": index + delay } as CSSProperties}>{word}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
