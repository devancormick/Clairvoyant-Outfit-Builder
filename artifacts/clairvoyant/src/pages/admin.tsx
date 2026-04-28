import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { garments, Garment, GarmentCategory } from "@/data/garments";

// PIN gate — dev password: "admin"
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'admin') {
      onUnlock();
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <h1 className="font-serif text-3xl text-ivory text-center mb-2">Admin Access</h1>
        <p className="text-smoke/50 text-xs uppercase tracking-[0.15em] text-center mb-10">Clairvoyant Atelier</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter access code"
            value={pin}
            onChange={e => setPin(e.target.value)}
            className={`bg-transparent border-b py-3 text-ivory placeholder:text-smoke/30 focus:outline-none text-center tracking-[0.2em] transition-colors ${
              error ? 'border-rouge' : 'border-smoke/30 focus:border-ivory/50'
            }`}
            autoFocus
          />
          {error && (
            <p className="text-rouge text-xs uppercase tracking-[0.15em] text-center">Incorrect code</p>
          )}
          <button
            type="submit"
            className="mt-2 py-4 uppercase tracking-[0.15em] text-sm bg-ivory text-charcoal hover:bg-petal transition-colors"
          >
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  );
}

type AlignmentMeta = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type GarmentAdminState = {
  id: string;
  approved: boolean;
  alignment: AlignmentMeta;
};

function NormalizeDrawer({
  garment,
  meta,
  onSave,
  onClose,
}: {
  garment: Garment;
  meta: GarmentAdminState;
  onSave: (updated: AlignmentMeta) => void;
  onClose: () => void;
}) {
  const [alignment, setAlignment] = useState<AlignmentMeta>({ ...meta.alignment });

  const update = (key: keyof AlignmentMeta, val: number) => {
    setAlignment(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-charcoal/60" onClick={onClose} />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg bg-ivory overflow-y-auto no-scrollbar"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-2xl text-charcoal">{garment.name}</h2>
            <button onClick={onClose} className="text-smoke/40 hover:text-charcoal text-xl leading-none">×</button>
          </div>

          {/* Live preview */}
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 block mb-3">Canvas Preview</span>
            <div className="relative w-full aspect-[2/3] bg-[#EAE5DF] overflow-hidden border border-smoke/10">
              {/* Simulated model */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4C5B8] to-[#B8A898] opacity-30" />
              {/* Garment at specified alignment */}
              <div
                className="absolute border-2 border-rouge/40"
                style={{
                  top: `${alignment.top}%`,
                  left: `${alignment.left}%`,
                  width: `${alignment.width}%`,
                  height: `${alignment.height}%`,
                }}
              >
                <img
                  src={garment.normalizedAssetUrl}
                  alt={garment.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              {/* Anchor line at waist */}
              <div
                className="absolute left-0 right-0 border-t border-dashed border-rouge/30"
                style={{ top: '42%' }}
              />
              <span
                className="absolute right-1 text-[8px] text-rouge/50 uppercase tracking-[0.1em]"
                style={{ top: 'calc(42% + 2px)' }}
              >
                waist
              </span>
              <div
                className="absolute left-0 right-0 border-t border-dashed border-blue-400/30"
                style={{ top: '22%' }}
              />
              <span
                className="absolute right-1 text-[8px] text-blue-400/50 uppercase tracking-[0.1em]"
                style={{ top: 'calc(22% + 2px)' }}
              >
                shoulder
              </span>
            </div>
          </div>

          {/* Sliders */}
          <div className="flex flex-col gap-5">
            {(['top', 'left', 'width', 'height'] as const).map(key => (
              <div key={key}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/50">{key}</span>
                  <span className="text-[10px] text-rouge">{alignment[key]}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={alignment[key]}
                  onChange={e => update(key, Number(e.target.value))}
                  className="w-full accent-rouge"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => onSave(alignment)}
              className="flex-1 py-3 bg-charcoal text-ivory uppercase tracking-[0.15em] text-xs hover:bg-rouge transition-colors"
            >
              Save Alignment
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-smoke/20 text-smoke/50 uppercase tracking-[0.15em] text-xs hover:text-charcoal transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [adminStates, setAdminStates] = useState<Record<string, GarmentAdminState>>(() =>
    Object.fromEntries(garments.map(g => [g.id, {
      id: g.id,
      approved: false,
      alignment: { top: g.hotspotRegion.y, left: g.hotspotRegion.x, width: g.hotspotRegion.width, height: g.hotspotRegion.height },
    }]))
  );
  const [normalizeTarget, setNormalizeTarget] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newGarment, setNewGarment] = useState({ name: '', category: 'top' as GarmentCategory, price: '', assetUrl: '', occasion: [] as string[] });

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;

  const toggleApproved = (id: string) => {
    setAdminStates(prev => ({
      ...prev,
      [id]: { ...prev[id], approved: !prev[id].approved }
    }));
  };

  const saveAlignment = (id: string, alignment: AlignmentMeta) => {
    setAdminStates(prev => ({ ...prev, [id]: { ...prev[id], alignment } }));
    setNormalizeTarget(null);
  };

  const approvedCount = Object.values(adminStates).filter(s => s.approved).length;
  const targetGarment = normalizeTarget ? garments.find(g => g.id === normalizeTarget) : null;
  const targetMeta = normalizeTarget ? adminStates[normalizeTarget] : null;

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-baseline mb-10 border-b border-smoke/10 pb-6">
          <div>
            <h1 className="font-serif text-4xl text-charcoal">Admin — Garment Pipeline</h1>
            <p className="text-smoke/50 text-sm mt-1">
              {approvedCount} of {garments.length} garments approved
            </p>
          </div>
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="text-xs uppercase tracking-[0.15em] border border-charcoal px-4 py-2 text-charcoal hover:bg-charcoal hover:text-ivory transition-colors"
          >
            + New Garment
          </button>
        </div>

        {/* New garment form */}
        <AnimatePresence>
          {showNewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="border border-smoke/20 p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 block mb-2">New Garment</span>
                </div>
                {[
                  { label: 'Name', key: 'name', type: 'text' },
                  { label: 'Price ($)', key: 'price', type: 'number' },
                  { label: 'Asset URL', key: 'assetUrl', type: 'text' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 block mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      value={(newGarment as any)[field.key]}
                      onChange={e => setNewGarment(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full bg-transparent border-b border-smoke/20 py-2 text-charcoal focus:outline-none focus:border-rouge transition-colors text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 block mb-1">Category</label>
                  <select
                    value={newGarment.category}
                    onChange={e => setNewGarment(prev => ({ ...prev, category: e.target.value as GarmentCategory }))}
                    className="w-full bg-transparent border-b border-smoke/20 py-2 text-charcoal focus:outline-none text-sm"
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="dress">Dress</option>
                    <option value="outerwear">Outerwear</option>
                  </select>
                </div>

                {/* Live preview */}
                {newGarment.assetUrl && (
                  <div className="md:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 block mb-2">Canvas Preview</span>
                    <div className="relative w-48 aspect-[2/3] bg-[#EAE5DF] border border-smoke/10 overflow-hidden">
                      <img
                        src={newGarment.assetUrl}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  </div>
                )}

                <div className="md:col-span-2 flex gap-3">
                  <button className="px-6 py-3 bg-charcoal text-ivory uppercase tracking-[0.15em] text-xs hover:bg-rouge transition-colors">
                    Add Garment (stub — localStorage only)
                  </button>
                  <button
                    onClick={() => setShowNewForm(false)}
                    className="px-6 py-3 border border-smoke/20 text-smoke/50 uppercase tracking-[0.15em] text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Garment table */}
        <div className="flex flex-col gap-0 border border-smoke/10">
          {/* Table header */}
          <div className="grid grid-cols-[80px_1fr_100px_100px_80px_120px] gap-4 px-6 py-3 bg-charcoal/5 border-b border-smoke/10 text-[10px] uppercase tracking-[0.15em] text-smoke/40">
            <span>Preview</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {garments.map((garment, i) => {
            const state = adminStates[garment.id];
            return (
              <motion.div
                key={garment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`grid grid-cols-[80px_1fr_100px_100px_80px_120px] gap-4 px-6 py-4 items-center border-b border-smoke/5 hover:bg-smoke/3 transition-colors ${
                  i % 2 === 0 ? '' : 'bg-charcoal/[0.02]'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-16 h-20 bg-[#EAE5DF] overflow-hidden flex-shrink-0">
                  <img
                    src={garment.thumbnailUrl}
                    alt={garment.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>

                {/* Name */}
                <div>
                  <span className="font-serif text-sm text-charcoal block">{garment.name}</span>
                  <span className="text-[10px] text-smoke/40">{garment.sku}</span>
                </div>

                {/* Category */}
                <span className="text-xs uppercase tracking-[0.1em] text-smoke/60">{garment.category}</span>

                {/* Price */}
                <span className="font-serif text-sm" style={{ color: '#B8975A' }}>${garment.price}</span>

                {/* Status chip */}
                <span
                  className={`text-[9px] uppercase tracking-[0.1em] px-2 py-1 self-start ${
                    state?.approved
                      ? 'bg-green-100 text-green-800'
                      : 'bg-smoke/10 text-smoke/50'
                  }`}
                >
                  {state?.approved ? 'Approved' : 'Pending'}
                </span>

                {/* Actions */}
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setNormalizeTarget(garment.id)}
                    className="text-[9px] uppercase tracking-[0.1em] text-smoke/50 hover:text-rouge transition-colors text-left"
                  >
                    Normalize →
                  </button>
                  <button
                    onClick={() => toggleApproved(garment.id)}
                    className={`text-[9px] uppercase tracking-[0.1em] transition-colors text-left ${
                      state?.approved
                        ? 'text-smoke/30 hover:text-charcoal'
                        : 'text-green-700 hover:text-green-900'
                    }`}
                  >
                    {state?.approved ? 'Revoke' : 'Approve'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { label: 'Total Garments', value: garments.length },
            { label: 'Approved', value: approvedCount },
            { label: 'Pending', value: garments.length - approvedCount },
            { label: 'Categories', value: 4 },
          ].map(stat => (
            <div key={stat.label} className="border border-smoke/10 p-5">
              <span className="font-serif text-3xl text-charcoal block">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 mt-1 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Normalize drawer */}
      <AnimatePresence>
        {normalizeTarget && targetGarment && targetMeta && (
          <NormalizeDrawer
            garment={targetGarment}
            meta={targetMeta}
            onSave={(alignment) => saveAlignment(normalizeTarget, alignment)}
            onClose={() => setNormalizeTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
