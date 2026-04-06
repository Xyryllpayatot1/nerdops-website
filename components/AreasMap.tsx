'use client';

import { useState, useEffect } from 'react';

const STATE_NAMES: Record<string, string> = {
  '01':'Alabama','02':'Alaska','04':'Arizona','05':'Arkansas','06':'California',
  '08':'Colorado','09':'Connecticut','10':'Delaware','12':'Florida','13':'Georgia',
  '15':'Hawaii','16':'Idaho','17':'Illinois','18':'Indiana','19':'Iowa',
  '20':'Kansas','21':'Kentucky','22':'Louisiana','23':'Maine','24':'Maryland',
  '25':'Massachusetts','26':'Michigan','27':'Minnesota','28':'Mississippi',
  '29':'Missouri','30':'Montana','31':'Nebraska','32':'Nevada','33':'New Hampshire',
  '34':'New Jersey','35':'New Mexico','36':'New York','37':'North Carolina',
  '38':'North Dakota','39':'Ohio','40':'Oklahoma','41':'Oregon','42':'Pennsylvania',
  '44':'Rhode Island','45':'South Carolina','46':'South Dakota','47':'Tennessee',
  '48':'Texas','49':'Utah','50':'Vermont','51':'Virginia','53':'Washington',
  '54':'West Virginia','55':'Wisconsin','56':'Wyoming',
};

const PRIMARY_FIPS = '41';
const ONSITE_FIPS  = '53';
const ACTIVE_FIPS  = ['48', '12'];

const PORTLAND_CITIES = [
  { name: 'Portland',     lat: 45.5231, lon: -122.6765, primary: true,  state: 'OR' },
  { name: 'Gresham',      lat: 45.5001, lon: -122.4302, primary: false, state: 'OR' },
  { name: 'Hillsboro',    lat: 45.5229, lon: -122.9898, primary: false, state: 'OR' },
  { name: 'Beaverton',    lat: 45.4871, lon: -122.8037, primary: false, state: 'OR' },
  { name: 'Lake Oswego',  lat: 45.4207, lon: -122.7009, primary: false, state: 'OR' },
  { name: 'Tualatin',     lat: 45.3837, lon: -122.7626, primary: false, state: 'OR' },
  { name: 'Tigard',       lat: 45.4312, lon: -122.7719, primary: false, state: 'OR' },
  { name: 'Milwaukie',    lat: 45.4457, lon: -122.6400, primary: false, state: 'OR' },
  { name: 'Oregon City',  lat: 45.3565, lon: -122.6068, primary: false, state: 'OR' },
  { name: 'Troutdale',    lat: 45.5393, lon: -122.3879, primary: false, state: 'OR' },
  { name: 'Fairview',     lat: 45.5393, lon: -122.4346, primary: false, state: 'OR' },
  { name: 'Sherwood',     lat: 45.3540, lon: -122.8396, primary: false, state: 'OR' },
  { name: 'Wilsonville',  lat: 45.2990, lon: -122.7726, primary: false, state: 'OR' },
  { name: 'West Linn',    lat: 45.3651, lon: -122.6374, primary: false, state: 'OR' },
  { name: 'Gladstone',    lat: 45.3796, lon: -122.5968, primary: false, state: 'OR' },
  { name: 'Happy Valley', lat: 45.4457, lon: -122.5307, primary: false, state: 'OR' },
  { name: 'Vancouver',    lat: 45.6387, lon: -122.6615, primary: false, state: 'WA' },
  { name: 'Battleground', lat: 45.7804, lon: -122.5290, primary: false, state: 'WA' },
  { name: 'Camas',        lat: 45.5876, lon: -122.3993, primary: false, state: 'WA' },
  { name: 'Washougal',    lat: 45.5829, lon: -122.3535, primary: false, state: 'WA' },
  { name: 'Ridgefield',   lat: 45.8154, lon: -122.7426, primary: false, state: 'WA' },
  { name: 'La Center',    lat: 45.8618, lon: -122.6724, primary: false, state: 'WA' },
  { name: 'Woodland',     lat: 45.9071, lon: -122.7451, primary: false, state: 'WA' },
  { name: 'Longview',     lat: 46.1382, lon: -122.9382, primary: false, state: 'WA' },
];

const US_METRO_CITIES = [
  { name: 'New York',       lat: 40.7128,  lon: -74.0060  },
  { name: 'Los Angeles',    lat: 34.0522,  lon: -118.2437 },
  { name: 'Chicago',        lat: 41.8781,  lon: -87.6298  },
  { name: 'Houston',        lat: 29.7604,  lon: -95.3698  },
  { name: 'Phoenix',        lat: 33.4484,  lon: -112.0740 },
  { name: 'Philadelphia',   lat: 39.9526,  lon: -75.1652  },
  { name: 'San Antonio',    lat: 29.4241,  lon: -98.4936  },
  { name: 'San Diego',      lat: 32.7157,  lon: -117.1611 },
  { name: 'Dallas',         lat: 32.7767,  lon: -96.7970  },
  { name: 'San Jose',       lat: 37.3382,  lon: -121.8863 },
  { name: 'Austin',         lat: 30.2672,  lon: -97.7431  },
  { name: 'Jacksonville',   lat: 30.3322,  lon: -81.6557  },
  { name: 'Fort Worth',     lat: 32.7555,  lon: -97.3308  },
  { name: 'Columbus',       lat: 39.9612,  lon: -82.9988  },
  { name: 'Indianapolis',   lat: 39.7684,  lon: -86.1581  },
  { name: 'Charlotte',      lat: 35.2271,  lon: -80.8431  },
  { name: 'San Francisco',  lat: 37.7749,  lon: -122.4194 },
  { name: 'Seattle',        lat: 47.6062,  lon: -122.3321 },
  { name: 'Denver',         lat: 39.7392,  lon: -104.9903 },
  { name: 'Washington',     lat: 38.9072,  lon: -77.0369  },
  { name: 'Boston',         lat: 42.3601,  lon: -71.0589  },
  { name: 'Nashville',      lat: 36.1627,  lon: -86.7816  },
  { name: 'Baltimore',      lat: 39.2904,  lon: -76.6122  },
  { name: 'Oklahoma City',  lat: 35.4676,  lon: -97.5164  },
  { name: 'Louisville',     lat: 38.2527,  lon: -85.7585  },
  { name: 'Las Vegas',      lat: 36.1699,  lon: -115.1398 },
  { name: 'Milwaukee',      lat: 43.0389,  lon: -87.9065  },
  { name: 'Albuquerque',    lat: 35.0844,  lon: -106.6504 },
  { name: 'Tucson',         lat: 32.2226,  lon: -110.9747 },
  { name: 'Fresno',         lat: 36.7378,  lon: -119.7871 },
  { name: 'Sacramento',     lat: 38.5816,  lon: -121.4944 },
  { name: 'Mesa',           lat: 33.4152,  lon: -111.8314 },
  { name: 'Kansas City',    lat: 39.0997,  lon: -94.5786  },
  { name: 'Atlanta',        lat: 33.7490,  lon: -84.3880  },
  { name: 'Omaha',          lat: 41.2565,  lon: -95.9345  },
  { name: 'Colorado Springs', lat: 38.8339, lon: -104.8214 },
  { name: 'Raleigh',        lat: 35.7796,  lon: -78.6382  },
  { name: 'Miami',          lat: 25.7617,  lon: -80.1918  },
  { name: 'Virginia Beach', lat: 36.8529,  lon: -75.9780  },
  { name: 'Oakland',        lat: 37.8044,  lon: -122.2712 },
  { name: 'Minneapolis',    lat: 44.9778,  lon: -93.2650  },
  { name: 'Tulsa',          lat: 36.1540,  lon: -95.9928  },
  { name: 'Tampa',          lat: 27.9506,  lon: -82.4572  },
  { name: 'Arlington',      lat: 32.7357,  lon: -97.1081  },
  { name: 'New Orleans',    lat: 29.9511,  lon: -90.0715  },
  { name: 'Wichita',        lat: 37.6872,  lon: -97.3301  },
  { name: 'Cleveland',      lat: 41.4993,  lon: -81.6944  },
  { name: 'Bakersfield',    lat: 35.3733,  lon: -119.0187 },
  { name: 'Aurora',         lat: 39.7294,  lon: -104.8319 },
  { name: 'Anaheim',        lat: 33.8366,  lon: -117.9143 },
  { name: 'Honolulu',       lat: 21.3069,  lon: -157.8583 },
  { name: 'Santa Ana',      lat: 33.7455,  lon: -117.8677 },
  { name: 'Riverside',      lat: 33.9806,  lon: -117.3755 },
  { name: 'Corpus Christi', lat: 27.8006,  lon: -97.3964  },
  { name: 'Lexington',      lat: 38.0406,  lon: -84.5037  },
  { name: 'Henderson',      lat: 36.0395,  lon: -114.9817 },
  { name: 'Stockton',       lat: 37.9577,  lon: -121.2908 },
  { name: 'Saint Paul',     lat: 44.9537,  lon: -93.0900  },
  { name: 'Cincinnati',     lat: 39.1031,  lon: -84.5120  },
  { name: 'Orlando',        lat: 28.5383,  lon: -81.3792  },
  { name: 'Pittsburgh',     lat: 40.4406,  lon: -79.9959  },
  { name: 'Greensboro',     lat: 36.0726,  lon: -79.7920  },
  { name: 'Lincoln',        lat: 40.8136,  lon: -96.7026  },
  { name: 'Anchorage',      lat: 61.2181,  lon: -149.9003 },
  { name: 'Plano',          lat: 33.0198,  lon: -96.6989  },
  { name: 'Garland',        lat: 32.9126,  lon: -96.6389  },
  { name: 'Irvine',         lat: 33.6846,  lon: -117.8265 },
  { name: 'Newark',         lat: 40.7357,  lon: -74.1724  },
  { name: 'Chula Vista',    lat: 32.6401,  lon: -117.0842 },
  { name: 'Buffalo',        lat: 42.8864,  lon: -78.8784  },
  { name: 'Fort Wayne',     lat: 41.0793,  lon: -85.1394  },
  { name: 'Chandler',       lat: 33.3062,  lon: -111.8413 },
  { name: 'Scottsdale',     lat: 33.4942,  lon: -111.9261 },
  { name: 'St. Petersburg', lat: 27.7676,  lon: -82.6403  },
];

interface GeoShape { id: string; path: string | null; }
interface CityPin { name: string; lat: number; lon: number; primary?: boolean; state?: string; x: number; y: number; }

export default function AreasMap() {
  const [hovered,      setHovered]      = useState<string | null>(null);
  const [hoveredCity,  setHoveredCity]  = useState<string | null>(null);
  const [mouse,        setMouse]        = useState({ x: 0, y: 0 });
  const [geos,         setGeos]         = useState<GeoShape[] | null>(null);
  const [portlandPins, setPortlandPins] = useState<CityPin[]>([]);
  const [metroPins,    setMetroPins]    = useState<CityPin[]>([]);
  const [ref,          setRef]          = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [topojson, d3geo] = await Promise.all([
          import('topojson-client'),
          import('d3-geo'),
        ]);
        const res  = await fetch('/us-states.json');
        const topo = await res.json();

        const proj    = d3geo.geoAlbersUsa().scale(1000).translate([480, 300]);
        const pathGen = d3geo.geoPath().projection(proj);
        const feats   = (topojson.feature(topo, topo.objects.states) as any).features;

        const computedGeos: GeoShape[] = feats.map((f: any) => ({
          id:   String(f.id).padStart(2, '0'),
          path: pathGen(f),
        }));

        const computedPortlandPins: CityPin[] = PORTLAND_CITIES.map((c) => {
          const pos = proj([c.lon, c.lat]);
          return pos ? { ...c, x: pos[0], y: pos[1] } : null;
        }).filter(Boolean) as CityPin[];

        const computedMetroPins: CityPin[] = US_METRO_CITIES.map((c) => {
          const pos = proj([c.lon, c.lat]);
          return pos ? { ...c, x: pos[0], y: pos[1] } : null;
        }).filter(Boolean) as CityPin[];

        if (!cancelled) {
          setGeos(computedGeos);
          setPortlandPins(computedPortlandPins);
          setMetroPins(computedMetroPins);
        }
      } catch (e) {
        console.error('Map load error', e);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const getFill = (id: string) => {
    if (id === PRIMARY_FIPS) return hovered === id ? '#29abe2' : 'rgba(41,171,226,0.35)';
    if (id === ONSITE_FIPS)  return hovered === id ? 'rgba(41,171,226,0.42)' : 'rgba(41,171,226,0.18)';
    if (ACTIVE_FIPS.includes(id)) return hovered === id ? 'rgba(41,171,226,0.42)' : 'rgba(41,171,226,0.22)';
    return hovered === id ? 'rgba(41,171,226,0.18)' : '#0f1d38';
  };
  const getStroke = (id: string) => (
    id === PRIMARY_FIPS || id === ONSITE_FIPS || ACTIVE_FIPS.includes(id)
      ? 'rgba(41,171,226,0.5)' : 'rgba(41,171,226,0.15)'
  );

  const tooltip = (() => {
    if (hoveredCity) {
      const c = PORTLAND_CITIES.find((c) => c.name === hoveredCity);
      if (c) return { title: hoveredCity, sub: c.primary ? 'HQ — Portland Metro' : `${c.state === 'WA' ? 'SW Washington' : 'Oregon'} — On-Site Available` };
      return { title: hoveredCity, sub: 'Remote Support Available' };
    }
    if (hovered) {
      if (hovered === PRIMARY_FIPS) return { title: 'Oregon', sub: 'Portland Metro — Primary Service Area' };
      if (hovered === ONSITE_FIPS)  return { title: 'Washington', sub: 'SW Washington — On-Site Available' };
      if (hovered === '48') return { title: 'Texas', sub: 'Active Coverage — On-Site Available' };
      if (hovered === '12') return { title: 'Florida', sub: 'Active Coverage — On-Site Available' };
      return { title: STATE_NAMES[hovered] || hovered, sub: 'Remote Support Available Nationwide' };
    }
    return null;
  })();

  const onMove = (e: React.MouseEvent) => {
    if (!ref) return;
    const r = ref.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={setRef}
      className="relative rounded-2xl overflow-hidden border border-white/8"
      style={{ background: '#080f1e' }}
      onMouseMove={onMove}
      onMouseLeave={() => { setHovered(null); setHoveredCity(null); }}
    >
      {!geos && (
        <div className="flex items-center justify-center" style={{ height: 480 }}>
          <div className="text-gray text-sm animate-pulse">Loading map…</div>
        </div>
      )}

      {geos && (
        <svg viewBox="0 0 960 600" className="w-full h-auto block">
          {geos.map(({ id, path }) => path && (
            <path
              key={id}
              d={path}
              fill={getFill(id)}
              stroke={getStroke(id)}
              strokeWidth={id === PRIMARY_FIPS || id === ONSITE_FIPS || ACTIVE_FIPS.includes(id) ? 1.0 : 0.5}
              onMouseEnter={() => { setHovered(id); setHoveredCity(null); }}
              className="cursor-pointer transition-colors duration-100"
            />
          ))}

          {metroPins.map((c) => (
            <g key={c.name}
              onMouseEnter={(e) => { e.stopPropagation(); setHoveredCity(c.name); setHovered(null); }}
              onMouseLeave={() => setHoveredCity(null)}
              className="cursor-pointer"
            >
              <circle cx={c.x} cy={c.y} r="2.5" fill="rgba(41,171,226,0.6)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            </g>
          ))}

          {portlandPins.map((c) => (
            <g key={c.name}
              onMouseEnter={(e) => { e.stopPropagation(); setHoveredCity(c.name); setHovered(null); }}
              onMouseLeave={() => setHoveredCity(null)}
              className="cursor-pointer"
            >
              {c.primary ? (
                <>
                  <circle cx={c.x} cy={c.y} r="20" fill="rgba(41,171,226,0)">
                    <animate attributeName="r"       values="8;22;8"    dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={c.x} cy={c.y} r="6" fill="#29abe2" stroke="white" strokeWidth="2" />
                  <rect x={c.x + 9} y={c.y - 14} width="68" height="16" rx="3" fill="rgba(13,21,48,0.9)" />
                  <text x={c.x + 43} y={c.y - 3} textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#29abe2" pointerEvents="none">
                    Portland, OR
                  </text>
                </>
              ) : (
                <circle cx={c.x} cy={c.y} r="3.5"
                  fill={c.state === 'WA' ? 'rgba(93,213,247,0.9)' : 'rgba(41,171,226,0.9)'}
                  stroke="rgba(255,255,255,0.6)" strokeWidth="1"
                />
              )}
            </g>
          ))}

          <g transform="translate(610,475)">
            <rect x="0" y="0" width="230" height="115" rx="6" fill="rgba(8,15,30,0.92)" stroke="rgba(41,171,226,0.22)" strokeWidth="1"/>
            <rect x="8" y="10" width="16" height="10" rx="2" fill="rgba(41,171,226,0.35)" stroke="rgba(41,171,226,0.6)" strokeWidth="1.2"/>
            <text x="30" y="19" fontSize="9" fontFamily="sans-serif" fill="#b0c8e0">Oregon — Primary Service Area</text>
            <rect x="8" y="27" width="16" height="10" rx="2" fill="rgba(41,171,226,0.18)" stroke="rgba(41,171,226,0.6)" strokeWidth="1.2"/>
            <text x="30" y="36" fontSize="9" fontFamily="sans-serif" fill="#b0c8e0">Washington — On-Site Available</text>
            <rect x="8" y="44" width="16" height="10" rx="2" fill="rgba(41,171,226,0.22)" stroke="rgba(41,171,226,0.5)" strokeWidth="1.2"/>
            <text x="30" y="53" fontSize="9" fontFamily="sans-serif" fill="#b0c8e0">Texas & Florida — Active Coverage</text>
            <rect x="8" y="61" width="16" height="10" rx="2" fill="#0f1d38" stroke="rgba(41,171,226,0.15)" strokeWidth="0.8"/>
            <text x="30" y="70" fontSize="9" fontFamily="sans-serif" fill="#b0c8e0">All Other States — Remote Support</text>
            <circle cx="16" cy="88" r="5" fill="#29abe2" stroke="white" strokeWidth="1.5"/>
            <text x="30" y="92" fontSize="9" fontFamily="sans-serif" fill="#b0c8e0">Portland Metro HQ</text>
            <circle cx="16" cy="102" r="3.5" fill="rgba(41,171,226,0.9)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
            <text x="30" y="106" fontSize="9" fontFamily="sans-serif" fill="#b0c8e0">Service Area City</text>
            <circle cx="200" cy="88" r="2.5" fill="rgba(41,171,226,0.6)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
            <text x="208" y="92" fontSize="8" fontFamily="sans-serif" fill="#b0c8e0">Remote City</text>
          </g>
        </svg>
      )}

      {tooltip && ref && (
        <div
          className="absolute pointer-events-none z-20 rounded-xl shadow-2xl"
          style={{
            left: Math.min(mouse.x + 16, ref.offsetWidth - 220),
            top:  Math.max(mouse.y - 55, 8),
            background: 'rgba(8,15,30,0.96)',
            border: '1px solid rgba(41,171,226,0.35)',
            backdropFilter: 'blur(10px)',
            padding: '10px 14px',
            minWidth: 195,
          }}
        >
          <p className="text-white font-bold text-xs mb-0.5">{tooltip.title}</p>
          <p className="text-xs" style={{ color: '#29abe2' }}>{tooltip.sub}</p>
        </div>
      )}
    </div>
  );
}
