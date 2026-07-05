'use client';

/**
 * 10 unique header + sub-header design variations.
 * All light backgrounds, no dark sections.
 * Drop any single <HeaderVariantN /> into a page, or render <HeaderVariationsGallery />
 * to preview all ten stacked.
 */

/* 1 — Bold serif display, warm ochre underline, left-aligned */
export const HeaderVariant1 = () => (
    <div className="bg-white px-8 py-20 md:px-16">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-neutral-900 leading-[1.05] max-w-3xl">
            Find a home that
            <span className="relative inline-block ml-3">
                fits your life
                <svg className="absolute left-0 -bottom-2 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0,6 Q50,0 100,5 T200,4" stroke="#B8823C" strokeWidth="4" fill="none" />
                </svg>
            </span>
        </h1>
        <p className="mt-6 font-sans text-lg text-neutral-500 max-w-xl">
            Browse verified listings across Lagos, Abuja, and Port Harcourt — updated daily by licensed agents.
        </p>
    </div>
);

/* 2 — Split layout, monospace eyebrow, tight sans headline */
export const HeaderVariant2 = () => (
    <div className="bg-slate-50 px-8 py-20 md:px-16 grid md:grid-cols-[1fr_2fr] gap-6 items-end">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            MLS / IDX — Nigeria
        </p>
        <div>
            <h1 className="font-sans text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight">
                Property search, without the noise.
            </h1>
            <p className="mt-3 font-sans text-base text-slate-500 max-w-lg">
                One search bar. Every registered listing. No duplicate ads, no dead links.
            </p>
        </div>
    </div>
);

/* 3 — Oversized single word + inline sub-header beside it */
export const HeaderVariant3 = () => (
    <div className="bg-white px-8 py-16 md:px-16 flex flex-col md:flex-row md:items-center gap-6">
        <h1 className="font-serif text-7xl md:text-8xl font-black text-emerald-950 leading-none">
            Home.
        </h1>
        <p className="font-sans text-lg text-neutral-600 border-l-2 border-emerald-800/30 pl-5 max-w-sm">
            A currency-strength-grade level of data rigor, applied to real estate. Know a listing's true history before you call the agent.
        </p>
    </div>
);

/* 4 — Centered, small caps eyebrow pill, generous whitespace */
export const HeaderVariant4 = () => (
    <div className="bg-neutral-50 px-8 py-24 text-center">
        <span className="inline-block rounded-full border border-neutral-300 px-4 py-1 text-xs font-sans font-medium tracking-wide text-neutral-500">
            Now covering 6 cities
        </span>
        <h1 className="mt-6 font-sans text-4xl md:text-5xl font-bold text-neutral-900">
            The clearest way to buy or rent in Nigeria
        </h1>
        <p className="mt-4 font-sans text-base text-neutral-500 max-w-md mx-auto">
            Filter by title status, agent rating, and neighborhood trend — not just price and bedrooms.
        </p>
    </div>
);

/* 5 — Right-aligned, condensed display type, vertical rule accent */
export const HeaderVariant5 = () => (
    <div className="bg-white px-8 py-20 md:px-16 text-right border-r-4 border-amber-600/80 mr-4">
        <h1 className="font-sans text-5xl font-extrabold text-stone-900 [font-stretch:condensed] leading-tight">
            Every listing,
            <br />
            verified twice.
        </h1>
        <p className="mt-4 font-sans text-base text-stone-500 ml-auto max-w-sm">
            Agent documents checked at submission, and again before the listing goes live.
        </p>
    </div>
);

/* 6 — Two-tone headline (mixed weight/color within one line) */
export const HeaderVariant6 = () => (
    <div className="bg-stone-50 px-8 py-20 md:px-16">
        <h1 className="font-serif text-5xl md:text-6xl leading-tight text-stone-900">
            <span className="font-light italic text-stone-400">Search less.</span>
            <br />
            <span className="font-bold">Move in sooner.</span>
        </h1>
        <p className="mt-6 font-sans text-lg text-stone-500 max-w-lg">
            Smart alerts tell you the moment a matching property lists in your target area.
        </p>
    </div>
);

/* 7 — Boxed sub-header card overlapping the headline baseline */
export const HeaderVariant7 = () => (
    <div className="bg-white px-8 pt-20 pb-28 md:px-16 relative">
        <h1 className="font-sans text-5xl md:text-6xl font-bold text-sky-950 max-w-2xl">
            Real estate data built like a trading terminal.
        </h1>
        <div className="mt-[-1.5rem] md:ml-8 inline-block bg-sky-50 border border-sky-200 rounded-lg px-5 py-4 max-w-md relative z-10">
            <p className="font-sans text-sm text-sky-900">
                Price history, days-on-market, and neighborhood momentum — charted, not buried in a PDF.
            </p>
        </div>
    </div>
);

/* 8 — Vertical stack, huge tracked-out eyebrow, minimal headline */
export const HeaderVariant8 = () => (
    <div className="bg-neutral-50 px-8 py-20 md:px-16">
        <p className="font-sans text-[11px] font-semibold tracking-[0.35em] uppercase text-rose-700/70 mb-4">
            Agent Network
        </p>
        <h1 className="font-sans text-4xl md:text-5xl font-medium text-neutral-900 max-w-xl">
            Work with agents who answer.
        </h1>
        <p className="mt-3 font-sans text-neutral-500 max-w-md">
            Response-time ratings on every profile, drawn from actual buyer feedback.
        </p>
    </div>
);

/* 9 — Diagonal accent strip behind headline, sans-serif slab sub-header */
export const HeaderVariant9 = () => (
    <div className="bg-white px-8 py-24 md:px-16 relative overflow-hidden">
        <div className="absolute -left-10 top-10 w-56 h-16 bg-lime-100 -rotate-3" />
        <h1 className="relative font-serif text-5xl md:text-6xl font-bold text-neutral-900 max-w-2xl">
            Rent smarter. Buy sharper.
        </h1>
        <p className="relative mt-5 font-sans text-base text-neutral-600 max-w-lg bg-white/80 inline-block">
            Compare cost-per-square-meter across neighborhoods before you schedule a single viewing.
        </p>
    </div>
);

/* 10 — Minimal, single hairline rule, generous tracking, no color accent */
export const HeaderVariant10 = () => (
    <div className="bg-white px-8 py-24 md:px-16">
        <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-neutral-800 max-w-2xl">
            A quieter way to search for property.
        </h1>
        <div className="w-16 h-px bg-neutral-300 my-6" />
        <p className="font-sans text-neutral-500 max-w-md">
            No pop-ups, no fake urgency banners. Just listings, filtered the way you actually think.
        </p>
    </div>
);

const HeaderVariationsGallery = () => {
    const variants = [
        HeaderVariant1, HeaderVariant2, HeaderVariant3, HeaderVariant4, HeaderVariant5,
        HeaderVariant6, HeaderVariant7, HeaderVariant8, HeaderVariant9, HeaderVariant10,
    ];

    return (
        <div className="bg-white">
            {variants.map((Variant, i) => (
                <div key={i} className="border-b border-neutral-200">
                    <div className="px-8 pt-4 text-xs font-mono text-neutral-400">Variant {i + 1}</div>
                    <Variant />
                </div>
            ))}
        </div>
    );
};

export default HeaderVariationsGallery;