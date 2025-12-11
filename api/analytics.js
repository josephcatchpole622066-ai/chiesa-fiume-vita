// API per recuperare dati da Google Analytics 4
// Questo file va deployato come serverless function (es. Netlify/Vercel)

export default async function handler(req, res) {
  // Abilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { BetaAnalyticsDataClient } = require('@google-analytics/data');
    
    // Credenziali da variabili d'ambiente
    const propertyId = process.env.GA4_PROPERTY_ID || '13117999660';
    
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA4_CLIENT_EMAIL,
        private_key: process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
    });

    // Report: Ultimi 30 giorni
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        { name: 'pagePath' },
        { name: 'sessionDefaultChannelGroup' },
        { name: 'deviceCategory' },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'screenPageViews' },
      ],
    });

    // Processa i dati
    const topPages = [];
    const trafficSources = {};
    const deviceTypes = {};
    let totalSessions = 0;
    let totalUsers = 0;
    let totalDuration = 0;
    let totalBounceRate = 0;

    response.rows?.forEach(row => {
      const pagePath = row.dimensionValues[0].value;
      const channelGroup = row.dimensionValues[1].value;
      const device = row.dimensionValues[2].value;
      
      const users = parseInt(row.metricValues[0].value);
      const sessions = parseInt(row.metricValues[1].value);
      const duration = parseFloat(row.metricValues[2].value);
      const bounceRate = parseFloat(row.metricValues[3].value);
      const pageViews = parseInt(row.metricValues[4].value);

      totalSessions += sessions;
      totalUsers += users;
      totalDuration += duration * sessions;
      totalBounceRate += bounceRate * sessions;

      // Top pages
      const existingPage = topPages.find(p => p.page === pagePath);
      if (existingPage) {
        existingPage.visits += pageViews;
        existingPage.avgTime = formatDuration((existingPage.avgTime * existingPage.visits + duration) / (existingPage.visits + pageViews));
      } else {
        topPages.push({
          page: pagePath === '/' ? 'Homepage' : pagePath.replace(/^\//, ''),
          visits: pageViews,
          avgTime: formatDuration(duration)
        });
      }

      // Traffic sources
      if (!trafficSources[channelGroup]) {
        trafficSources[channelGroup] = 0;
      }
      trafficSources[channelGroup] += users;

      // Device types
      if (!deviceTypes[device]) {
        deviceTypes[device] = 0;
      }
      deviceTypes[device] += users;
    });

    // Ordina e formatta
    topPages.sort((a, b) => b.visits - a.visits);
    const top5Pages = topPages.slice(0, 5);

    const trafficSourcesArray = Object.entries(trafficSources).map(([source, visitors]) => ({
      source: translateSource(source),
      visitors,
      percentage: ((visitors / totalUsers) * 100).toFixed(1)
    }));

    const deviceTypesArray = Object.entries(deviceTypes).map(([device, count]) => ({
      device: translateDevice(device),
      percentage: ((count / totalUsers) * 100).toFixed(1)
    }));

    const avgDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;
    const avgBounce = totalSessions > 0 ? totalBounceRate / totalSessions : 0;

    res.status(200).json({
      totalVisits: totalSessions,
      uniqueVisitors: totalUsers,
      avgSessionDuration: formatDuration(avgDuration),
      bounceRate: avgBounce.toFixed(1),
      topPages: top5Pages,
      trafficSources: trafficSourcesArray,
      deviceTypes: deviceTypesArray
    });

  } catch (error) {
    console.error('Errore GA4:', error);
    res.status(500).json({ 
      error: 'Errore nel recupero dati',
      message: error.message 
    });
  }
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function translateSource(source) {
  const translations = {
    'Organic Search': 'Ricerca Organica',
    'Direct': 'Diretto',
    'Social': 'Social Media',
    'Referral': 'Referral',
    'Paid Search': 'Ricerca a Pagamento',
    'Email': 'Email'
  };
  return translations[source] || source;
}

function translateDevice(device) {
  const translations = {
    'mobile': 'Mobile',
    'desktop': 'Desktop',
    'tablet': 'Tablet'
  };
  return translations[device] || device;
}
