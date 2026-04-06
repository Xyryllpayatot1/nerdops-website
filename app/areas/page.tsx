'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CybersecurityAuditModal from '@/components/CybersecurityAuditModal';
import StickyCTA from '@/components/StickyCTA';
import { FAQSection } from '@/components/FAQSection';

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const STATE_NAMES = {
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

const PRIMARY_FIPS = '41'; // Oregon
const ONSITE_FIPS  = '53'; // Washington
const ACTIVE_FIPS  = ['48', '12']; // Texas, Florida

// Portland metro cities with lat/lon
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

// Top 70 US Metro Cities (lat/lon)
const US_METRO_CITIES = [
  { name: 'New York',       lat: 40.7128,  lon: -74.0060  },
  { name: 'Los Angeles',    lat: 34.0522,  lon: -118.2437 },
  { name: 'Chicago',        lat: 41.8781,  lon: -87.6298  },
  { name: 'Houston',        lat: 29.7604,  lon: -95.3698  },
  { name: 'Phoenix',        lat: 33.4484,  lon: -112.0740 },
  { name: 'Philadelphia',   lat: 39.9526,  lon: -75.1652  },
  { name: 'San Antonio',   lat: 29.4241,  lon: -98.4936  },
  { name: 'San Diego',     lat: 32.7157,  lon: -117.1611 },
  { name: 'Dallas',         lat: 32.7767,  lon: -96.7970  },
  { name: 'San Jose',      lat: 37.3382,  lon: -121.8863 },
  { name: 'Austin',         lat: 30.2672,  lon: -97.7431  },
  { name: 'Jacksonville',  lat: 30.3322,  lon: -81.6557  },
  { name: 'Fort Worth',     lat: 32.7555,  lon: -97.3308  },
  { name: 'Columbus',      lat: 39.9612,  lon: -82.9988  },
  { name: 'Indianapolis',  lat: 39.7684,  lon: -86.1581  },
  { name: 'Charlotte',     lat: 35.2271,  lon: -80.8431  },
  { name: 'San Francisco',  lat: 37.7749,  lon: -122.4194 },
  { name: 'Seattle',       lat: 47.6062,  lon: -122.3321 },
  { name: 'Denver',         lat: 39.7392,  lon: -104.9903 },
  { name: 'Washington',     lat: 38.9072,  lon: -77.0369  },
  { name: 'Boston',        lat: 42.3601,  lon: -71.0589  },
  { name: 'Nashville',     lat: 36.1627,  lon: -86.7816  },
  { name: 'Baltimore',     lat: 39.2904,  lon: -76.6122  },
  { name: 'Oklahoma City',  lat: 35.4676,  lon: -97.5164  },
  { name: 'Louisville',     lat: 38.2527,  lon: -85.7585  },
  { name: 'Las Vegas',     lat: 36.1699,  lon: -115.1398 },
  { name: 'Milwaukee',     lat: 43.0389,  lon: -87.9065  },
  { name: 'Albuquerque',   lat: 35.0844,  lon: -106.6504 },
  { name: 'Tucson',        lat: 32.2226,  lon: -110.9747 },
  { name: 'Fresno',        lat: 36.7378,  lon: -119.7871 },
  { name: 'Sacramento',    lat: 38.5816,  lon: -121.4944 },
  { name: 'Mesa',          lat: 33.4152,  lon: -111.8314 },
  { name: 'Kansas City',   lat: 39.0997,  lon: -94.5786  },
  { name: 'Atlanta',        lat: 33.7490,  lon: -84.3880  },
  { name: 'Omaha',         lat: 41.2565,  lon: -95.9345  },
  { name: 'Colorado Springs', lat: 38.8339, lon: -104.8214 },
  { name: 'Raleigh',       lat: 35.7796,  lon: -78.6382  },
  { name: 'Miami',          lat: 25.7617,  lon: -80.1918  },
  { name: 'Virginia Beach', lat: 36.8529,  lon: -75.9780  },
  { name: 'Oakland',       lat: 37.8044,  lon: -122.2712 },
  { name: 'Minneapolis',   lat: 44.9778,  lon: -93.2650 },
  { name: 'Tulsa',         lat: 36.1540,  lon: -95.9928  },
  { name: 'Tampa',         lat: 27.9506,  lon: -82.4572  },
  { name: 'Arlington',     lat: 32.7357,  lon: -97.1081  },
  { name: 'New Orleans',   lat: 29.9511,  lon: -90.0715  },
  { name: 'Wichita',       lat: 37.6872,  lon: -97.3301  },
  { name: 'Cleveland',     lat: 41.4993,  lon: -81.6944  },
  { name: 'Bakersfield',   lat: 35.3733,  lon: -119.0187 },
  { name: 'Aurora',        lat: 39.7294,  lon: -104.8319 },
  { name: 'Anaheim',       lat: 33.8366,  lon: -117.9143 },
  { name: 'Honolulu',      lat: 21.3069,  lon: -157.8583 },
  { name: 'Santa Ana',     lat: 33.7455,  lon: -117.8677 },
  { name: 'Riverside',     lat: 33.9806,  lon: -117.3755 },
  { name: 'Corpus Christi', lat: 27.8006,  lon: -97.3964  },
  { name: 'Lexington',     lat: 38.0406,  lon: -84.5037  },
  { name: 'Henderson',      lat: 36.0395,  lon: -114.9817 },
  { name: 'Stockton',       lat: 37.9577,  lon: -121.2908 },
  { name: 'Saint Paul',     lat: 44.9537,  lon: -93.0900  },
  { name: 'Cincinnati',     lat: 39.1031,  lon: -84.5120  },
  { name: 'St. Paul',      lat: 44.9537,  lon: -93.0900  },
  { name: 'Orlando',       lat: 28.5383,  lon: -81.3792  },
  { name: 'Pittsburgh',    lat: 40.4406,  lon: -79.9959  },
  { name: 'Greensboro',    lat: 36.0726,  lon: -79.7920  },
  { name: 'Lincoln',       lat: 40.8136,  lon: -96.7026  },
  { name: 'Anchorage',     lat: 61.2181,  lon: -149.9003 },
  { name: 'Plano',         lat: 33.0198,  lon: -96.6989  },
  { name: 'Garland',       lat: 32.9126,  lon: -96.6389  },
  { name: 'Irvine',        lat: 33.6846,  lon: -117.8265 },
  { name: 'Newark',        lat: 40.7357,  lon: -74.1724  },
  { name: 'Chula Vista',   lat: 32.6401,  lon: -117.0842 },
  { name: 'Buffalo',       lat: 42.8864,  lon: -78.8784  },
  { name: 'Fort Wayne',    lat: 41.0793,  lon: -85.1394  },
  { name: 'Chandler',      lat: 33.3062,  lon: -111.8413 },
  { name: 'Scottsdale',    lat: 33.4942,  lon: -111.9261 },
  { name: 'St. Petersburg', lat: 27.7676,  lon: -82.6403  },
];

function USMap() {
  const [hovered,     setHovered]     = useState(null); // state FIPS
  const [hoveredCity, setHoveredCity] = useState(null); // city name
  const [mouse,       setMouse]       = useState({ x: 0, y: 0 });
  const [geos,        setGeos]        = useState(null);
  const [portlandPins, setPortlandPins] = useState([]);
  const [metroPins,    setMetroPins]    = useState([]);
  const [ref,         setRef]         = useState(null);

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
        const feats   = topojson.feature(topo, topo.objects.states).features;

        const computedGeos = feats.map((f) => ({
          id:   String(f.id).padStart(2, '0'),
          path: pathGen(f),
        }));

        const computedPortlandPins = PORTLAND_CITIES.map((c) => {
          const pos = proj([c.lon, c.lat]);
          return pos ? { ...c, x: pos[0], y: pos[1] } : null;
        }).filter(Boolean);

        const computedMetroPins = US_METRO_CITIES.map((c) => {
          const pos = proj([c.lon, c.lat]);
          return pos ? { ...c, x: pos[0], y: pos[1] } : null;
        }).filter(Boolean);

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

  const getFill = (id) => {
    if (id === PRIMARY_FIPS) return hovered === id ? '#29abe2' : 'rgba(41,171,226,0.35)';
    if (id === ONSITE_FIPS)  return hovered === id ? 'rgba(41,171,226,0.42)' : 'rgba(41,171,226,0.18)';
    if (ACTIVE_FIPS.includes(id)) return hovered === id ? 'rgba(41,171,226,0.42)' : 'rgba(41,171,226,0.22)';
    return hovered === id ? 'rgba(41,171,226,0.18)' : '#0f1d38';
  };
  const getStroke = (id) => (
    id === PRIMARY_FIPS || id === ONSITE_FIPS || ACTIVE_FIPS.includes(id)
      ? 'rgba(41,171,226,0.5)' : 'rgba(41,171,226,0.15)'
  );

  const tooltip = (() => {
    if (hoveredCity) {
      const c = PORTLAND_CITIES.find((c) => c.name === hoveredCity);
      if (c) {
        return {
          title: hoveredCity,
          sub:   c.primary ? 'HQ — Portland Metro' : `${c.state === 'WA' ? 'SW Washington' : 'Oregon'} — On-Site Available`,
        };
      }
      return {
        title: hoveredCity,
        sub: 'Remote Support Available',
      };
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

  const onMove = (e) => {
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
          {/* State fills */}
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

          {/* US Metro City Pins */}
          {metroPins.map((c) => (
            <g key={c.name}
              onMouseEnter={(e) => { e.stopPropagation(); setHoveredCity(c.name); setHovered(null); }}
              onMouseLeave={() => setHoveredCity(null)}
              className="cursor-pointer"
            >
              <circle
                cx={c.x} cy={c.y} r="2.5"
                fill="rgba(41,171,226,0.6)"
                stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"
              />
            </g>
          ))}

          {/* Portland Metro City Pins */}
          {portlandPins.map((c) => (
            <g key={c.name}
              onMouseEnter={(e) => { e.stopPropagation(); setHoveredCity(c.name); setHovered(null); }}
              onMouseLeave={() => setHoveredCity(null)}
              className="cursor-pointer"
            >
              {c.primary ? (
                <>
                  {/* Pulsing rings for Portland */}
                  <circle cx={c.x} cy={c.y} r="20" fill="rgba(41,171,226,0)">
                    <animate attributeName="r"       values="8;22;8"    dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={c.x} cy={c.y} r="6" fill="#29abe2" stroke="white" strokeWidth="2" />
                  {/* Portland label */}
                  <rect x={c.x + 9} y={c.y - 14} width="68" height="16" rx="3" fill="rgba(13,21,48,0.9)" />
                  <text x={c.x + 43} y={c.y - 3}
                    textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700"
                    fill="#29abe2" pointerEvents="none">
                    Portland, OR
                  </text>
                </>
              ) : (
                <circle
                  cx={c.x} cy={c.y} r="3.5"
                  fill={c.state === 'WA' ? 'rgba(93,213,247,0.9)' : 'rgba(41,171,226,0.9)'}
                  stroke="rgba(255,255,255,0.6)" strokeWidth="1"
                />
              )}
            </g>
          ))}

          {/* Legend */}
          <g transform="translate(610,475)">
            <rect x="0" y="0" width="230" height="115" rx="6"
              fill="rgba(8,15,30,0.92)" stroke="rgba(41,171,226,0.22)" strokeWidth="1"/>
            <rect x="8" y="10" width="16" height="10" rx="2"
              fill="rgba(41,171,226,0.35)" stroke="rgba(41,171,226,0.6)" strokeWidth="1.2"/>
            <text x="30" y="19" fontSize="9" fontFamily="sans-serif" fill="#b0c8e0">Oregon — Primary Service Area</text>
            <rect x="8" y="27" width="16" height="10" rx="2"
              fill="rgba(41,171,226,0.18)" stroke="rgba(41,171,226,0.6)" strokeWidth="1.2"/>
            <text x="30" y="36" fontSize="9" fontFamily="sans-serif" fill="#b0c8e0">Washington — On-Site Available</text>
            <rect x="8" y="44" width="16" height="10" rx="2"
              fill="rgba(41,171,226,0.22)" stroke="rgba(41,171,226,0.5)" strokeWidth="1.2"/>
            <text x="30" y="53" fontSize="9" fontFamily="sans-serif" fill="#b0c8e0">Texas & Florida — Active Coverage</text>
            <rect x="8" y="61" width="16" height="10" rx="2"
              fill="#0f1d38" stroke="rgba(41,171,226,0.15)" strokeWidth="0.8"/>
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

      {/* Hover tooltip */}
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

const OREGON_CITIES     = ['Portland','Gresham','Hillsboro','Beaverton','Lake Oswego','Tualatin','Tigard','Milwaukie','Oregon City','Troutdale','Fairview','Sherwood','Wilsonville','West Linn','Gladstone','Happy Valley'];
const WASHINGTON_CITIES = ['Vancouver','Battleground','Camas','Washougal','Ridgefield','La Center','Woodland','Longview'];
const TEXAS_CITIES     = ['Houston','Dallas','San Antonio','Austin','Fort Worth','Arlington','Plano','Garland','Corpus Christi'];
const FLORIDA_CITIES   = ['Miami','Jacksonville','Tampa','Orlando','St. Petersburg','Chula Vista'];

export default function AreasPage() {
  useReveal();
  const [auditOpen, setAuditOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy2 py-20 px-5 overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="section-label block text-center">Areas We Serve</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight">
            IT Support Across<br />the United States
          </h1>
          <p className="text-gray text-base leading-relaxed max-w-xl mx-auto">
            On-site managed IT, cybersecurity, and 24/7 help desk support throughout Portland, OR
            and the surrounding metro — both sides of the Columbia River. Active coverage in Texas & Florida with remote support available nationwide.
          </p>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="bg-navy py-12 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-10">
            <span className="section-label">Service Map</span>
            <h2 className="font-serif text-3xl font-bold mb-2">Where We Operate</h2>
            <p className="text-gray text-sm">Hover over states or city pins to see coverage details.</p>
          </div>

          <div className="reveal mb-14">
            <USMap />
          </div>

          {/* City lists */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-navy2 border border-white/8 rounded-2xl p-5">
              <h3 className="font-serif font-bold text-base text-white mb-3">Oregon</h3>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                {OREGON_CITIES.map((city) => (
                  <div key={city} className="flex items-center gap-1.5 text-gray text-xs">
                    <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy2 border border-white/8 rounded-2xl p-5">
              <h3 className="font-serif font-bold text-base text-white mb-3">Washington</h3>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                {WASHINGTON_CITIES.map((city) => (
                  <div key={city} className="flex items-center gap-1.5 text-gray text-xs">
                    <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy2 border border-teal/30 rounded-2xl p-5">
              <h3 className="font-serif font-bold text-base text-white mb-3">Texas</h3>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                {TEXAS_CITIES.map((city) => (
                  <div key={city} className="flex items-center gap-1.5 text-gray text-xs">
                    <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy2 border border-teal/30 rounded-2xl p-5">
              <h3 className="font-serif font-bold text-base text-white mb-3">Florida</h3>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                {FLORIDA_CITIES.map((city) => (
                  <div key={city} className="flex items-center gap-1.5 text-gray text-xs">
                    <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray/60">
                Remote support nationwide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote section */}
      <section className="bg-navy2 py-12 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <span className="section-label">Nationwide Coverage</span>
            <h2 className="font-serif text-3xl font-bold mb-5 leading-tight">Remote IT Support Across the United States</h2>
            <p className="text-gray text-sm leading-relaxed mb-7">
              While on-site coverage focuses on the Portland metro area, Texas, and Florida, our remote support infrastructure extends to businesses nationwide — most issues resolved securely through encrypted remote access tools.
            </p>
            <ul className="space-y-3.5 mb-8">
              {[
                'Secure encrypted remote access for immediate resolution',
                '24/7 infrastructure monitoring — no geographic restriction',
                'Cloud services managed and optimized from anywhere',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray">
                  <svg className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/get-started/wizard" className="bg-teal hover:bg-teal/90 text-white font-bold px-7 py-3 rounded-lg transition-all text-sm">
              Get Free Quote
            </Link>
          </div>

          <div className="reveal bg-navy border border-teal/10 rounded-2xl p-8">
            <h3 className="font-serif font-bold text-xl mb-6">Remote Support Performance</h3>
            <div className="space-y-4">
              {[
                { label: 'Average Remote Response Time', val: '< 15 min' },
                { label: 'Remote Issue Resolution Rate',  val: '95%+' },
                { label: 'Connection Security',            val: '100% Encrypted' },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between bg-navy2 border border-white/6 rounded-xl px-5 py-4">
                  <span className="text-gray text-sm">{m.label}</span>
                  <span className="font-serif font-bold text-cyan text-lg">{m.val}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-teal/8 border border-teal/15 rounded-xl text-sm text-gray leading-relaxed">
              Not seeing your city? Call{' '}
              <a href="tel:+15033137121" className="text-teal font-semibold">(503) 313-7121</a> — we likely serve your area.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 px-5 text-center">
        <div className="reveal max-w-xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-5">
            Identify Vulnerabilities Before They Cause Downtime
          </h2>
          <p className="text-gray text-sm leading-relaxed mb-8">
            Secure your Free Cyber Security Audit today. Available to all businesses in Portland, OR and surrounding areas.
          </p>
          <button onClick={() => setAuditOpen(true)} className="bg-teal hover:bg-teal/90 text-white font-bold px-9 py-3.5 rounded-lg transition-all shadow-lg shadow-teal/20 text-sm">
            Claim Your Free Cyber Security Audit
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy2 py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-gray text-sm">Questions about our service areas and coverage.</p>
          </div>
          <div className="reveal">
            <FAQSection faqs={[
              { q: 'What areas do you serve?', a: 'We serve Portland, OR and the entire metro area including Vancouver, WA, Gresham, Hillsboro, Beaverton, Lake Oswego, and surrounding cities. Remote support is available nationwide.' },
              { q: 'Do you offer on-site support?', a: 'Yes. On-site support is available throughout the Portland metro area with same-day or next-day response depending on urgency.' },
              { q: 'Can you support businesses outside Oregon?', a: 'Absolutely. Our remote IT support infrastructure serves businesses nationwide, and we can coordinate on-site support through our partner network.' },
              { q: 'How quickly can you respond to an issue?', a: 'Remote issues are typically addressed within 15 minutes. On-site support is available same-day or next-day depending on the urgency of the issue.' },
              { q: 'Is remote support available 24/7?', a: 'Yes. We provide 24/7 infrastructure monitoring and emergency support line for critical issues regardless of the time or day.' },
            ]} />
          </div>
        </div>
      </section>

      <StickyCTA />

      <CybersecurityAuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
