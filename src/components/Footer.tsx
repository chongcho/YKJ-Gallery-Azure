export default function Footer() {
  return (
    <footer className="bg-warm-gray border-t-2 border-gold">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
        <p>&copy; {new Date().getFullYear()} YKJ Gallery</p>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <a
            href="mailto:ykj@ykjgallery.com"
            className="hover:text-gold transition-colors"
          >
            ykj@ykjgallery.com
          </a>
          <span>Seattle, WA, USA</span>
        </div>
      </div>
    </footer>
  );
}
