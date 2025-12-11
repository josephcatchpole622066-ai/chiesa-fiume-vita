import React, { useState, useEffect } from 'react';
import './SiteStatistics.css';

function SiteStatistics() {
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    avgSessionDuration: '0:00',
    bounceRate: 0,
    topPages: [],
    trafficSources: [],
    deviceTypes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useRealData, setUseRealData] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!useRealData) {
        // Dati mock di esempio
        const mockStats = {
          totalVisits: 1247,
          uniqueVisitors: 892,
          avgSessionDuration: '3:42',
          bounceRate: 45.2,
          topPages: [
            { page: 'Homepage', visits: 456, avgTime: '2:15' },
            { page: 'Predicazioni', visits: 312, avgTime: '5:30' },
            { page: 'Testimonianze', visits: 189, avgTime: '4:20' },
            { page: 'Eventi', visits: 145, avgTime: '2:45' },
            { page: 'Contatti', visits: 98, avgTime: '1:30' }
          ],
          trafficSources: [
            { source: 'Ricerca Organica', percentage: 42.5, visitors: 379 },
            { source: 'Social Media', percentage: 28.3, visitors: 252 },
            { source: 'Diretto', percentage: 18.7, visitors: 167 },
            { source: 'Referral', percentage: 10.5, visitors: 94 }
          ],
          deviceTypes: [
            { device: 'Mobile', percentage: 58.2 },
            { device: 'Desktop', percentage: 35.4 },
            { device: 'Tablet', percentage: 6.4 }
          ]
        };
        setStats(mockStats);
        setLoading(false);
        return;
      }

      // Prova a caricare dati reali da API
      try {
        setLoading(true);
        setError(null);
        
        const baseUrl = import.meta.env.BASE_URL || '';
        const response = await fetch(`${baseUrl}api/analytics`);
        
        if (!response.ok) {
          throw new Error('API non disponibile - mostra dati di esempio');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.warn('Impossibile caricare dati reali:', err);
        setError(err.message);
        // Fallback a dati mock
        setUseRealData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [useRealData]);

  if (loading) {
    return (
      <div className="site-statistics">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Caricamento statistiche...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="site-statistics">
      <div className="stats-header">
        <div>
          <h2>📊 Statistiche del Sito</h2>
          <p className="stats-subtitle">
            {useRealData ? 'Dati reali da Google Analytics' : 'Dati di esempio'}
            {error && <span className="error-badge"> - {error}</span>}
          </p>
        </div>
        <button 
          className="toggle-data-btn"
          onClick={() => setUseRealData(!useRealData)}
          title={useRealData ? 'Mostra dati di esempio' : 'Carica dati reali'}
        >
          {useRealData ? '📊 Dati Reali' : '🔄 Carica Dati Reali'}
        </button>
      </div>

      {/* Metriche principali */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalVisits.toLocaleString()}</h3>
            <p>Visite Totali</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{stats.uniqueVisitors.toLocaleString()}</h3>
            <p>Visitatori Unici</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>{stats.avgSessionDuration}</h3>
            <p>Durata Media Sessione</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📉</div>
          <div className="stat-content">
            <h3>{stats.bounceRate}%</h3>
            <p>Bounce Rate</p>
          </div>
        </div>
      </div>

      {/* Pagine più visitate */}
      <div className="stats-section">
        <h3>📄 Pagine Più Visitate</h3>
        <div className="stats-table">
          <table>
            <thead>
              <tr>
                <th>Pagina</th>
                <th>Visite</th>
                <th>Tempo Medio</th>
              </tr>
            </thead>
            <tbody>
              {stats.topPages.map((page, index) => (
                <tr key={index}>
                  <td>{page.page}</td>
                  <td>{page.visits}</td>
                  <td>{page.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sorgenti di traffico */}
      <div className="stats-section">
        <h3>🌐 Sorgenti di Traffico</h3>
        <div className="traffic-sources">
          {stats.trafficSources.map((source, index) => (
            <div key={index} className="traffic-item">
              <div className="traffic-header">
                <span className="traffic-name">{source.source}</span>
                <span className="traffic-percentage">{source.percentage}%</span>
              </div>
              <div className="traffic-bar">
                <div 
                  className="traffic-fill" 
                  style={{ width: `${source.percentage}%` }}
                ></div>
              </div>
              <span className="traffic-visitors">{source.visitors} visitatori</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dispositivi */}
      <div className="stats-section">
        <h3>📱 Dispositivi Utilizzati</h3>
        <div className="device-types">
          {stats.deviceTypes.map((device, index) => (
            <div key={index} className="device-item">
              <div className="device-info">
                <span className="device-name">{device.device}</span>
                <span className="device-percentage">{device.percentage}%</span>
              </div>
              <div className="device-bar">
                <div 
                  className="device-fill" 
                  style={{ width: `${device.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-note">
        <div className="note-content">
          <div>
            <p>📊 <strong>Google Analytics Configurato:</strong> ID G-HZGFT682CB (Stream: 13117999660)</p>
            <p>💡 {useRealData 
              ? 'Stai visualizzando dati reali. Per configurare l\'API e vedere dati aggiornati, segui le istruzioni di configurazione.' 
              : 'I dati mostrati sono esempi. Clicca "Carica Dati Reali" per tentare di caricare statistiche reali.'}</p>
          </div>
          <a 
            href="https://analytics.google.com/analytics/web/#/p13117999660/reports/intelligenthome" 
            target="_blank" 
            rel="noopener noreferrer"
            className="analytics-link"
          >
            Apri Google Analytics →
          </a>
        </div>
        
        {!useRealData && (
          <div className="setup-info">
            <h4>🔧 Come attivare i dati reali:</h4>
            <ol>
              <li>Crea un Service Account in Google Cloud Console</li>
              <li>Abilita Google Analytics Data API</li>
              <li>Aggiungi le credenziali come variabili d'ambiente:
                <ul>
                  <li><code>GA4_PROPERTY_ID=13117999660</code></li>
                  <li><code>GA4_CLIENT_EMAIL=...</code></li>
                  <li><code>GA4_PRIVATE_KEY=...</code></li>
                </ul>
              </li>
              <li>Deploya l'API serverless in <code>api/analytics.js</code></li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default SiteStatistics;
