/* SVG icons representativos para cada OE de la Agenda Urbana Española */

const icons = {
  1: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3 L16 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M11 8 Q16 3 21 8" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M8 12 Q16 6 24 12" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M5 16 Q16 9 27 16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <rect x="4" y="27" width="24" height="2" rx="1" fill={color}/>
      <rect x="8" y="21" width="16" height="2" rx="1" fill={`${color}40`}/>
    </svg>
  ),
  2: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="12" height="18" rx="1" stroke={color} strokeWidth="2"/>
      <rect x="18" y="6" width="10" height="22" rx="1" stroke={color} strokeWidth="2"/>
      <line x1="4" y1="28" x2="28" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <rect x="7" y="14" width="3" height="3" fill={color} opacity="0.5"/>
      <rect x="12" y="14" width="3" height="3" fill={color} opacity="0.5"/>
      <rect x="21" y="10" width="3" height="3" fill={color} opacity="0.5"/>
    </svg>
  ),
  3: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18 Q8 10 14 12 Q12 6 20 8 Q24 4 28 10 Q32 10 30 18 Z" stroke={color} strokeWidth="2" fill={`${color}15`} strokeLinejoin="round"/>
      <path d="M12 22 L10 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 22 L16 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 22 L22 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  4: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4 L28 22 L4 22 Z" stroke={color} strokeWidth="2" fill={`${color}15`} strokeLinejoin="round"/>
      <path d="M4 22 L28 22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="10" y1="22" x2="10" y2="28" stroke={color} strokeWidth="2"/>
      <line x1="22" y1="22" x2="22" y2="28" stroke={color} strokeWidth="2"/>
      <circle cx="16" cy="14" r="3" stroke={color} strokeWidth="2"/>
      <path d="M14 28 L18 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  5: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="10" width="22" height="14" rx="3" stroke={color} strokeWidth="2"/>
      <rect x="22" y="14" width="8" height="6" rx="2" stroke={color} strokeWidth="2"/>
      <circle cx="8" cy="24" r="3" stroke={color} strokeWidth="2"/>
      <circle cx="18" cy="24" r="3" stroke={color} strokeWidth="2"/>
      <line x1="4" y1="16" x2="20" y2="16" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <circle cx="25" cy="27" r="1.5" fill={color} opacity="0.6"/>
    </svg>
  ),
  6: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 20 C8 16 12 14 16 14 C20 14 24 16 24 20 L24 28 L8 28 Z" stroke={color} strokeWidth="2" fill={`${color}15`}/>
      <circle cx="16" cy="9" r="5" stroke={color} strokeWidth="2"/>
      <circle cx="7" cy="12" r="3.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="25" cy="12" r="3.5" stroke={color} strokeWidth="1.5"/>
      <path d="M2 28 L8 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 28 L30 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  7: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="18" rx="10" ry="7" stroke={color} strokeWidth="2"/>
      <path d="M10 18 Q10 10 16 10 Q22 10 22 16" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="16" cy="10" r="2" fill={color}/>
      <line x1="16" y1="8" x2="16" y2="4" stroke={color} strokeWidth="2"/>
      <line x1="12" y1="6" x2="14" y2="9" stroke={color} strokeWidth="1.5" opacity="0.6"/>
      <line x1="20" y1="6" x2="18" y2="9" stroke={color} strokeWidth="1.5" opacity="0.6"/>
      <line x1="9" y1="20" x2="9" y2="28" stroke={color} strokeWidth="2"/>
      <line x1="23" y1="20" x2="23" y2="28" stroke={color} strokeWidth="2"/>
      <line x1="7" y1="28" x2="25" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  8: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16 L16 6 L28 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="8" y="16" width="16" height="12" rx="1" stroke={color} strokeWidth="2"/>
      <rect x="13" y="22" width="6" height="6" rx="1" fill={`${color}30`} stroke={color} strokeWidth="1.5"/>
      <circle cx="23" cy="11" r="3" fill={`${color}20`} stroke={color} strokeWidth="1.5"/>
      <path d="M22.5 11 L23 10.5 L24 11.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  9: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="24" height="18" rx="2" stroke={color} strokeWidth="2"/>
      <line x1="4" y1="18" x2="28" y2="18" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <line x1="12" y1="22" x2="12" y2="28" stroke={color} strokeWidth="2"/>
      <line x1="20" y1="22" x2="20" y2="28" stroke={color} strokeWidth="2"/>
      <line x1="9" y1="28" x2="23" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="11" r="3" stroke={color} strokeWidth="1.5"/>
      <path d="M21 8 L22 7 M21 14 L22 15 M11 8 L10 7 M11 14 L10 15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  10: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="20" height="24" rx="2" stroke={color} strokeWidth="2"/>
      <line x1="10" y1="10" x2="22" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="14" x2="22" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="18" x2="18" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="23" cy="23" r="5" fill="white" stroke={color} strokeWidth="1.5"/>
      <path d="M21 23 L22.5 24.5 L25 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

export default function OEIcon({ id, color = '#1B3A6B', size = 32 }) {
  const IconComp = icons[id]
  if (!IconComp) return null
  return <IconComp color={color} size={size} />
}
