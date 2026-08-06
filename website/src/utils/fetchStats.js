const CACHE_KEY = 'grbk_live_stats_v3';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export function formatRoundedDownloads(count) {
  const num = Number(count) || 1370;
  const rounded = Math.floor(num / 10) * 10;
  return `${rounded.toLocaleString()}+`;
}

export const FALLBACK_STATS = {
  downloads: 1370,
  formattedDownloads: '1,370+',
  releases: 7,
  latestVersion: 'v2.1.2',
  isLive: false,
};

export async function fetchLiveStats() {
  // Check local storage cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.data;
      }
    }
  } catch {
    // localStorage unavailable (incognito / blocked)
  }

  try {
    // Fetch all-time npm download count (2020-01-01 to 2030-01-01 range)
    const npmRes = await fetch('https://api.npmjs.org/downloads/point/2020-01-01:2030-01-01/gitrunbykaru');
    const npmData = npmRes.ok ? await npmRes.json() : null;

    // Fetch GitHub repo metadata
    const ghRes = await fetch('https://api.github.com/repos/Karthikeyadusi/gitrunbykaru');
    const ghData = ghRes.ok ? await ghRes.json() : null;

    // Fetch GitHub releases count
    const relRes = await fetch('https://api.github.com/repos/Karthikeyadusi/gitrunbykaru/releases');
    const relData = relRes.ok ? await relRes.json() : null;

    const rawDownloads = npmData?.downloads ? Math.max(1370, npmData.downloads) : FALLBACK_STATS.downloads;

    const liveStats = {
      downloads: rawDownloads,
      formattedDownloads: formatRoundedDownloads(rawDownloads),
      releases: Array.isArray(relData) && relData.length > 0 ? relData.length : FALLBACK_STATS.releases,
      stars: ghData?.stargazers_count ?? FALLBACK_STATS.stars,
      latestVersion: Array.isArray(relData) && relData[0]?.tag_name ? relData[0].tag_name : FALLBACK_STATS.latestVersion,
      isLive: true
    };

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: liveStats }));
    } catch {
      // cache write failed
    }

    return liveStats;
  } catch (err) {
    return FALLBACK_STATS;
  }
}
