export default function Marquee({
  items,
  speedSec = 40,
}: {
  items: string[];
  speedSec?: number;
}) {
  // Duplicate the list once so the translate -50% loop is seamless
  const doubled = [...items, ...items];
  return (
    <div
      className="mask-fade-x relative overflow-hidden border-y border-grey-07 py-6 bg-white"
      aria-hidden
    >
      <div
        className="flex gap-12 whitespace-nowrap animate-marquee"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {doubled.map((it, i) => (
          <span
            key={`${it}-${i}`}
            className="text-3xl lg:text-5xl tracking-tight font-medium text-grey-01 flex items-center gap-12"
          >
            {it}
            <span className="w-2 h-2 rounded-full holo-bg" />
          </span>
        ))}
      </div>
    </div>
  );
}
