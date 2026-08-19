import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#f8f3e8] px-5"><section className="surface max-w-lg p-8 text-center"><p className="eyebrow">404</p><h1 className="mt-3 font-display text-5xl text-[#263e34]">This path has wandered off.</h1><p className="mt-4 text-sm leading-6 text-[#6b6255]">The page you requested is not part of this Kenya journey.</p><Link href="/" className="mt-7 inline-flex rounded-full bg-[#315b49] px-5 py-3 text-sm font-bold text-white">Return home</Link></section></main>;
}
