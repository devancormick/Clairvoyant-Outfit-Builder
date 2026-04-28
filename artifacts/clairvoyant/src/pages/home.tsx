import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useRef } from "react";
import { garments } from "@/data/garments";
import { prebuiltLooks } from "@/data/looks";
import { useOutfitStore } from "@/stores/outfit";

const heroTagline = "The future version of you already exists.";
const heroSubtitle = "Let her get dressed.";

function HeroSection() {
  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Video hero — falls back to image */}
      <div className="absolute inset-0 w-full h-full bg-charcoal">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
          poster="/assets/editorial/hero.png"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        >
          <source src="/assets/editorial/hero.mp4" type="video/mp4" />
        </video>
        <img
          src="/assets/editorial/hero.png"
          alt="Clairvoyant Editorial"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/80" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-3xl">
        {/* Tagline — staggered word reveal */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory tracking-tight"
          >
            Clairvoyant
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-petal text-lg md:text-xl font-light italic max-w-xl text-center leading-relaxed mb-2"
        >
          "{heroTagline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-petal text-lg md:text-xl font-light italic max-w-xl text-center leading-relaxed mb-12"
        >
          {heroSubtitle}"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/builder"
            className="group relative px-8 py-4 uppercase tracking-[0.15em] text-sm border border-ivory/50 text-ivory hover:border-rouge overflow-hidden inline-block"
          >
            <span className="relative z-10 group-hover:text-ivory transition-colors duration-500">Enter the Builder</span>
            <div className="absolute inset-0 bg-rouge translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.4,0,0.2,1]" />
          </Link>
          <Link
            href="/shop"
            className="px-8 py-4 uppercase tracking-[0.15em] text-sm text-ivory/60 hover:text-ivory transition-colors inline-block"
          >
            The Edit →
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-ivory/30"
        />
      </motion.div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-ivory text-charcoal">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">
            You are not becoming someone new.<br />
            You are stepping into someone<br />who already exists.
          </h2>
          <p className="text-smoke/70 leading-relaxed text-lg max-w-2xl mx-auto">
            Our garments are not costumes. They are architectures of self. Designed in our Los Angeles studio,
            each piece is constructed to hold the weight of memory and the lightness of becoming.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function OccasionEditorialSection() {
  const editorialSections = [
    {
      id: 'evening',
      title: 'The Night Edit',
      subtitle: 'Evening & Night Out',
      quote: 'Garments that hold the weight of occasion.',
      image: '/assets/editorial/lookbook1.png',
      dark: true,
    },
    {
      id: 'daywear',
      title: 'The Day Edit',
      subtitle: 'Daywear & Weekend',
      quote: 'Uncompromising tailoring for the rituals of the everyday.',
      image: '/assets/editorial/hero.png',
      dark: false,
    },
    {
      id: 'formal',
      title: 'Formal Architecture',
      subtitle: 'Formal / Gala',
      quote: 'The architecture of ceremony.',
      image: '/assets/editorial/lookbook2.png',
      dark: true,
    },
  ];

  return (
    <>
      {editorialSections.map((section, i) => (
        <section
          key={section.id}
          className={`py-0 overflow-hidden ${section.dark ? 'bg-charcoal text-ivory' : 'bg-ivory text-charcoal'}`}
        >
          <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Image */}
            <motion.div
              className="w-full md:w-1/2 aspect-[4/5] overflow-hidden relative"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.backgroundColor = '#1C1C1C'; e.currentTarget.style.display = 'none'; }}
              />
            </motion.div>

            {/* Text */}
            <motion.div
              className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={`text-[10px] uppercase tracking-[0.2em] mb-3 ${section.dark ? 'text-petal' : 'text-smoke/50'}`}>
                {section.subtitle}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">{section.title}</h2>
              <p className={`italic font-serif text-lg mb-8 leading-relaxed ${section.dark ? 'text-petal/80' : 'text-smoke/60'}`}>
                "{section.quote}"
              </p>
              <Link
                href={`/shop?occasion=${section.id}`}
                className={`inline-block text-xs uppercase tracking-[0.15em] border px-6 py-3 self-start transition-colors ${
                  section.dark
                    ? 'border-ivory/30 text-ivory/70 hover:border-rouge hover:text-rouge'
                    : 'border-smoke/30 text-smoke/60 hover:border-rouge hover:text-rouge'
                }`}
              >
                Explore the Edit →
              </Link>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
}

function LooksCarouselSection() {
  const { loadLook } = useOutfitStore();
  const [, setLocation] = useLocation();

  const handleOpenLook = (look: typeof prebuiltLooks[0]) => {
    loadLook(look.garmentIds);
    setLocation('/builder');
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-ivory border-t border-smoke/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-between items-baseline mb-10"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-smoke/40 block mb-2">SS26</span>
            <h2 className="font-serif text-4xl text-charcoal">Editorial Looks</h2>
          </div>
          <Link href="/lookbook" className="text-xs uppercase tracking-[0.15em] text-smoke/50 hover:text-rouge transition-colors">
            View Lookbook →
          </Link>
        </motion.div>

        <div
          className="flex gap-5 overflow-x-auto no-scrollbar pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {prebuiltLooks.map((look, i) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group flex-shrink-0 flex flex-col"
              style={{ scrollSnapAlign: 'start', width: 200 }}
            >
              <div className="aspect-[3/4] bg-[#EAE5DF] overflow-hidden mb-4 relative cursor-pointer"
                   onClick={() => handleOpenLook(look)}>
                <img
                  src={look.thumbnail}
                  alt={look.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.9), transparent)' }}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); handleOpenLook(look); }}
                    className="text-[10px] uppercase tracking-[0.15em] text-ivory"
                  >
                    Open in Builder →
                  </button>
                </div>
                <div
                  className="absolute top-3 left-3 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em]"
                  style={{ backgroundColor: 'rgba(123,28,36,0.85)', color: '#F5F0E8' }}
                >
                  {look.occasionLabel}
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.12em] text-smoke/40 mb-1">{look.occasionLabel}</span>
              <span className="font-serif text-lg text-charcoal leading-tight">{look.name}</span>
              <p className="text-xs text-smoke/50 mt-1 leading-relaxed line-clamp-2">{look.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedGarmentsSection() {
  const featured = [
    garments.find(g => g.id === 'drs_corset_gown'),
    garments.find(g => g.id === 'top_silk_corset'),
    garments.find(g => g.id === 'bot_maxi_skirt'),
  ].filter(Boolean);

  const [, setLocation] = useLocation();
  const { setLayer, resetOutfit, setSelectedCategory } = useOutfitStore();

  return (
    <section className="py-24 px-6 md:px-12 bg-[#F0EBE3] border-t border-smoke/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-baseline mb-10"
        >
          <h2 className="font-serif text-4xl text-charcoal">Selected Pieces</h2>
          <Link href="/shop" className="text-xs uppercase tracking-[0.15em] text-smoke/50 hover:text-rouge transition-colors">
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((garment, i) => garment && (
            <motion.div
              key={garment.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col"
            >
              <div
                className="relative aspect-[3/4] bg-[#EAE5DF] mb-5 overflow-hidden cursor-pointer"
                onClick={() => {
                  resetOutfit();
                  setLayer(garment.category, garment);
                  setSelectedCategory(garment.category);
                  setLocation('/builder');
                }}
              >
                <img
                  src={garment.normalizedAssetUrl}
                  alt={garment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                     style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.85), transparent)' }}>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-ivory">Style in Builder →</span>
                </div>
              </div>
              <span className="font-serif text-xl text-charcoal">{garment.name}</span>
              <span className="text-gold font-serif mt-1">${garment.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuilderCTASection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-charcoal text-ivory border-t border-smoke/30 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-petal/60 mb-4">The Atelier</span>
        <h2 className="font-serif text-4xl md:text-5xl mb-6">Compose Your Look</h2>
        <p className="text-petal/80 mb-12 max-w-lg font-light leading-relaxed">
          Explore the collection as a system. Layer silhouettes, combine textures, and compose the identity
          that was always waiting for you.
        </p>
        <Link
          href="/builder"
          className="group relative px-10 py-5 uppercase tracking-[0.15em] text-sm border border-smoke/50 hover:border-rouge transition-colors overflow-hidden"
        >
          <span className="relative z-10 group-hover:text-ivory transition-colors duration-500">Enter the Builder</span>
          <div className="absolute inset-0 bg-rouge translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.4,0,0.2,1]" />
        </Link>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full bg-background">
      <HeroSection />
      <PhilosophySection />
      <OccasionEditorialSection />
      <LooksCarouselSection />
      <FeaturedGarmentsSection />
      <BuilderCTASection />
    </div>
  );
}
