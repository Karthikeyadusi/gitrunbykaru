const CACHE_KEY = 'grbk_live_stats_v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const FALLBACK_STATS = {
  downloads: 700,
  releases: 6,
  stars: 12,
  latestVersion: 'v2.0.3',
  isLive: false
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
    // Fetch npm download count
    const npmRes = await fetch('https://api.npmjs.org/downloads/point/last-month/gitrunbykaru');
    const npmData = npmRes.ok ? await npmRes.json() : null;

    // Fetch GitHub repo metadata
    const ghRes = await fetch('https://api.github.com/repos/Karthikeyadusi/gitrunbykaru');
    const ghData = ghRes.ok ? await ghRes.json() : null;

    // Fetch GitHub releases count
    const relRes = await fetch('https://api.github.com/repos/Karthikeyadusi/gitrunbykaru/releases');
    const relData = relRes.ok ? await relRes.json() : null;

    const liveStats = {
      downloads: npmData?.downloads ? Math.max(700, npmData.downloads) : FALLBACK_STATS.downloads,
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
