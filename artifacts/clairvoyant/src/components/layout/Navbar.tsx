import { Link, useLocation } from "wouter";

export function Navbar() {
  const [location] = useLocation();

  return (
    <header className="fixed top-0 w-full z-50 mix-blend-difference text-ivory pointer-events-none">
      <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 pointer-events-auto">
        <Link href="/" className="text-2xl font-serif tracking-wide uppercase hover:opacity-70 transition-opacity">
          Clairvoyant
        </Link>
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-[0.15em]">
          <Link href="/builder" className={`hover:opacity-70 transition-opacity ${location === '/builder' ? 'border-b border-ivory pb-1' : ''}`}>Builder</Link>
          <Link href="/shop" className={`hover:opacity-70 transition-opacity ${location === '/shop' ? 'border-b border-ivory pb-1' : ''}`}>Shop</Link>
          <Link href="/lookbook" className={`hover:opacity-70 transition-opacity ${location === '/lookbook' ? 'border-b border-ivory pb-1' : ''}`}>Lookbook</Link>
          <Link href="/about" className={`hover:opacity-70 transition-opacity ${location === '/about' ? 'border-b border-ivory pb-1' : ''}`}>About</Link>
        </nav>
      </div>
    </header>
  );
}
