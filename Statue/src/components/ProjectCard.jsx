export default function ProjectCard({ title, href, imageSrc, description }) {
  return (
    <div className="bg-black/70 p-4 border border-white/10 z-[999]">
      <div className="flex items-center justify-between pb-3 border-b border-white/20">
        <div>{title}</div>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-stone-400"
        >
          Visit
        </a>
      </div>
      <div className="pt-3">{description}</div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block aspect-video w-full overflow-hidden"
      >
        <img
          src={imageSrc}
          alt={`${title} preview`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </a>
    </div>
  );
}
