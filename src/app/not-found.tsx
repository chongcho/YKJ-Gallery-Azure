import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 text-center">
      <h1 className="font-serif text-6xl mb-4">404</h1>
      <p className="text-text-secondary text-lg mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-3 border-2 border-gold text-gold font-semibold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-colors duration-300"
      >
        Go Home
      </Link>
    </section>
  );
}
