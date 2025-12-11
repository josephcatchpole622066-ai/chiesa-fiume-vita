import { useState, useEffect } from 'react';

// Hook per recuperare dati da Google Analytics
export const useGoogleAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Verifica se gtag è disponibile
        if (typeof window.gtag === 'undefined') {
          throw new Error('Google Analytics non è ancora caricato');
        }

        // Recupera dati da Google Analytics 4
        // Nota: GA4 richiede configurazione server-side per API completa
        // Qui usiamo i dati del client quando disponibili
        
        const data = {
          totalVisits: 0,
          uniqueVisitors: 0,
          avgSessionDuration: '0:00',
          bounceRate: 0,
          topPages: [],
          trafficSources: [],
          deviceTypes: []
        };

        // Prova a leggere dati dalla dataLayer
        if (window.dataLayer) {
          // Processa gli eventi nella dataLayer
          const pageViews = window.dataLayer.filter(item => item.event === 'page_view');
          data.totalVisits = pageViews.length;
        }

        setAnalyticsData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Attendi che GA sia caricato
    const timer = setTimeout(fetchAnalyticsData, 2000);

    return () => clearTimeout(timer);
  }, []);

  return { analyticsData, loading, error };
};
