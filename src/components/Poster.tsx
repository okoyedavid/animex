import { PlaceholderImage } from "./PlaceholderImage";

function Poster({ title, src }: { title: string; src: string }) {
  return (
    <article>
      <PlaceholderImage
        src={src}
        alt={title}
        className="aspect-[0.68] rounded-[8px]"
        sizes="(max-width: 768px) 40vw, 160px"
      />
      <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.06em] text-white">
        {title}
      </h3>
    </article>
  );
}

export { Poster };
