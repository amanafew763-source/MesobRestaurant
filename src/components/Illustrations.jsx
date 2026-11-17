// Hand-drawn SVG motifs: the mesob basket, the jebena coffee pot, the logo
// and the woven "tilet" border band.

export function MesobLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M20 4 L31 18 H9 Z" />
      <path d="M7 18 H33 L25 27 L29 36 H11 L15 27 Z" />
      <path d="M12 23 L16 21 L20 23 L24 21 L28 23" stroke="var(--berbere)" />
    </svg>
  )
}

export function MesobArt({ label }) {
  return (
    <svg role="img" aria-label={label} viewBox="0 0 220 320" className="art art--mesob">
      <defs>
        <pattern id="weave" width="16" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 12 L8 0 L16 12" fill="none" stroke="#C4452A" strokeWidth="2" />
        </pattern>
      </defs>
      {/* lid */}
      <path d="M110 18 C116 18 120 24 124 32 L178 128 H42 L96 32 C100 24 104 18 110 18 Z" fill="#E8B04A" />
      <path d="M110 18 C116 18 120 24 124 32 L178 128 H42 L96 32 C100 24 104 18 110 18 Z" fill="url(#weave)" opacity="0.55" />
      <path d="M70 86 H150" stroke="#2F7A4F" strokeWidth="6" />
      <path d="M58 106 H162" stroke="#17100C" strokeWidth="3" />
      <circle cx="110" cy="16" r="7" fill="#C4452A" />
      {/* rim */}
      <rect x="34" y="128" width="152" height="14" rx="7" fill="#C4452A" />
      {/* hourglass base */}
      <path d="M40 142 H180 L140 210 L162 296 H58 L80 210 Z" fill="#D99A35" />
      <path d="M40 142 H180 L140 210 L162 296 H58 L80 210 Z" fill="url(#weave)" opacity="0.5" />
      <path d="M58 172 H162" stroke="#2F7A4F" strokeWidth="6" />
      <rect x="74" y="206" width="72" height="10" rx="5" fill="#17100C" opacity="0.6" />
      <path d="M66 262 H154" stroke="#2F7A4F" strokeWidth="6" />
      <rect x="52" y="292" width="116" height="12" rx="6" fill="#C4452A" />
    </svg>
  )
}

export function JebenaArt({ label }) {
  return (
    <svg role="img" aria-label={label} viewBox="0 0 200 320" className="art art--jebena">
      {/* steam */}
      <path className="steam" d="M96 40 C86 28 106 18 96 4" fill="none" stroke="#D9CBB9" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path className="steam steam--late" d="M112 46 C102 34 122 24 112 10" fill="none" stroke="#D9CBB9" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      {/* handle */}
      <path d="M116 104 C168 100 176 160 140 206" fill="none" stroke="#1F1510" strokeWidth="12" strokeLinecap="round" />
      <path d="M116 104 C168 100 176 160 140 206" fill="none" stroke="#3A2A20" strokeWidth="7" strokeLinecap="round" />
      {/* spout */}
      <path d="M52 236 C34 214 26 196 14 176 L24 170 C40 190 52 204 72 222 Z" fill="#3A2A20" stroke="#1F1510" strokeWidth="3" />
      {/* neck */}
      <path d="M88 64 H112 L118 170 H82 Z" fill="#3A2A20" stroke="#1F1510" strokeWidth="3" />
      <rect x="82" y="56" width="36" height="12" rx="6" fill="#4A3628" stroke="#1F1510" strokeWidth="3" />
      {/* body */}
      <circle cx="100" cy="238" r="74" fill="#3A2A20" stroke="#1F1510" strokeWidth="3" />
      <path d="M34 226 Q100 246 166 226" fill="none" stroke="#E8B04A" strokeWidth="4" />
      <path d="M40 212 L50 222 L60 212 L70 222 L80 212 L90 222 L100 212 L110 222 L120 212 L130 222 L140 212 L150 222 L160 212" fill="none" stroke="#C4452A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M84 120 H116" stroke="#E8B04A" strokeWidth="3" />
      <path d="M86 140 H114" stroke="#2F7A4F" strokeWidth="3" />
      {/* straw stopper */}
      <path d="M94 56 L90 34 M100 56 L100 30 M106 56 L110 34" stroke="#C9A35A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function TiletBand() {
  return (
    <div className="tilet" aria-hidden="true" />
  )
}
