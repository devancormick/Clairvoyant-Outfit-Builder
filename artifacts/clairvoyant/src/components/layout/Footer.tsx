import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-surfacedark text-petal py-12 px-6 md:px-12 text-sm border-t border-smoke/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl text-ivory">Clairvoyant</h3>
          <p className="opacity-80 leading-relaxed max-w-sm">
            A garment becomes a point of entry through which a version of you comes into view.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="uppercase tracking-[0.15em] text-xs text-ivory">Explore</h4>
          <Link href="/builder" className="hover:text-ivory transition-colors w-fit">The Builder</Link>
          <Link href="/shop" className="hover:text-ivory transition-colors w-fit">The Edit</Link>
          <Link href="/lookbook" className="hover:text-ivory transition-colors w-fit">SS26 Lookbook</Link>
          <Link href="/about" className="hover:text-ivory transition-colors w-fit">Maison</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="uppercase tracking-[0.15em] text-xs text-ivory">Atelier</h4>
          <p className="opacity-80">142 Rue du Cherche-Midi<br />75006 Paris, France</p>
          <a href="mailto:atelier@clairvoyant.com" className="hover:text-ivory transition-colors w-fit underline underline-offset-4 decoration-petal/30 hover:decoration-ivory">atelier@clairvoyant.com</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-petal/10 text-xs opacity-60 flex justify-between uppercase tracking-wider">
        <span>© {new Date().getFullYear()} Clairvoyant Paris</span>
        <span>Terms / Privacy</span>
      </div>
    </footer>
  );
}
