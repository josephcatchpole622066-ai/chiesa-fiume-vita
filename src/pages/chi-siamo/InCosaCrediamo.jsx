import React from 'react';
import './InCosaCrediamo.css';

const InCosaCrediamo = () => {
  const beliefs = [
    {
      icon: '✝️',
      title: 'La Bibbia',
      content: 'Crediamo che la Bibbia è la Parola ispirata di Dio, infallibile e autorevole. È la nostra guida suprema per la fede e la condotta di vita (2 Timoteo 3:16-17).'
    },
    {
      icon: '👑',
      title: 'Dio',
      content: 'Crediamo in un solo Dio, eternamente esistente in tre persone: Padre, Figlio e Spirito Santo. Dio è creatore di tutte le cose, onnipotente, onnisciente e onnipresente (Genesi 1:1, Matteo 28:19).'
    },
    {
      icon: '❤️',
      title: 'Gesù Cristo',
      content: 'Crediamo che Gesù Cristo è il Figlio di Dio, nato da una vergine, vissuto senza peccato, morto sulla croce per i nostri peccati, risorto il terzo giorno e asceso al cielo. È l\'unico mediatore tra Dio e gli uomini (Giovanni 1:1-14, 1 Timoteo 2:5).'
    },
    {
      icon: '🕊️',
      title: 'Lo Spirito Santo',
      content: 'Crediamo nello Spirito Santo, terza persona della Trinità, che convince il mondo di peccato, rigenera, abita e guida i credenti nella verità (Giovanni 16:8, Tito 3:5).'
    },
    {
      icon: '💔',
      title: 'Il Peccato',
      content: 'Crediamo che tutti gli esseri umani sono peccatori per natura e per scelta, separati da Dio e bisognosi di salvezza (Romani 3:23, 6:23).'
    },
    {
      icon: '🎁',
      title: 'La Salvezza',
      content: 'Crediamo che la salvezza è un dono gratuito di Dio, ricevuto mediante la fede in Gesù Cristo. Non può essere guadagnata con le opere, ma è per grazia attraverso la fede (Efesini 2:8-9, Giovanni 3:16).'
    },
    {
      icon: '⛪',
      title: 'La Chiesa',
      content: 'Crediamo nella Chiesa universale, il corpo di Cristo, composta da tutti i veri credenti. La chiesa locale è una manifestazione visibile di questo corpo, dove i credenti si riuniscono per adorare, crescere e servire (1 Corinzi 12:12-27, Efesini 4:11-16).'
    },
    {
      icon: '💧',
      title: 'Il Battesimo',
      content: 'Crediamo nel battesimo per immersione dei credenti come atto pubblico di obbedienza e testimonianza della fede in Cristo (Matteo 28:19, Atti 2:38).'
    },
    {
      icon: '🍞',
      title: 'La Santa Cena',
      content: 'Crediamo nella Santa Cena come memoriale della morte di Cristo, praticata regolarmente dai credenti per ricordare il sacrificio del Signore (1 Corinzi 11:23-26).'
    },
    {
      icon: '🙏',
      title: 'La Vita Cristiana',
      content: 'Crediamo che i credenti sono chiamati a vivere una vita santa, separata dal peccato, caratterizzata dall\'amore per Dio e per il prossimo, e dal servizio attivo nel Regno di Dio (1 Pietro 1:15-16, Galati 5:22-23).'
    },
    {
      icon: '🌍',
      title: 'La Missione',
      content: 'Crediamo che la chiesa ha ricevuto da Cristo il mandato di predicare il Vangelo a ogni creatura, fare discepoli di tutte le nazioni e testimoniare l\'amore di Dio nel mondo (Matteo 28:18-20, Atti 1:8).'
    },
    {
      icon: '⏳',
      title: 'Il Ritorno di Cristo',
      content: 'Crediamo nel ritorno personale e visibile di Gesù Cristo, nella risurrezione dei morti, nel giudizio finale e nell\'eternità: vita eterna per i credenti e separazione eterna da Dio per coloro che rifiutano Cristo (1 Tessalonicesi 4:16-17, Apocalisse 20:11-15).'
    }
  ];

  return (
    <div className="credenze-page">
      {/* Hero */}
      <section className="credenze-hero">
        <div className="container hero-content">
          <h1>In Cosa Crediamo</h1>
          <p>La nostra fede e i nostri valori</p>
        </div>
      </section>

      {/* Introduzione */}
      <section className="intro-section">
        <div className="container">
          <div className="intro-content">
            <h2>La Nostra Dichiarazione di Fede</h2>
            <p>
              Come Chiesa Fiume di Vita, fondiamo la nostra fede e pratica sulla Parola di Dio, 
              la Bibbia. Qui presentiamo i principi fondamentali che guidano il nostro cammino 
              spirituale e la nostra vita comunitaria.
            </p>
            <p>
              Questi insegnamenti rappresentano il cuore della fede cristiana evangelica e 
              sono condivisi da milioni di credenti in tutto il mondo.
            </p>
          </div>
        </div>
      </section>

      {/* Beliefs Grid */}
      <section className="beliefs-section">
        <div className="container">
          <div className="beliefs-grid">
            {beliefs.map((belief, index) => (
              <div key={index} className="belief-card">
                <div className="belief-icon">{belief.icon}</div>
                <h3>{belief.title}</h3>
                <p>{belief.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Versetti Chiave */}
      <section className="scripture-section">
        <div className="container">
          <h2>Versetti Fondamentali</h2>
          <div className="scripture-grid">
            <div className="scripture-card">
              <p className="verse">
                "Infatti è per grazia che siete stati salvati, mediante la fede; 
                e ciò non viene da voi; è il dono di Dio. Non è in virtù di opere 
                affinché nessuno se ne vanti."
              </p>
              <p className="reference">Efesini 2:8-9</p>
            </div>

            <div className="scripture-card">
              <p className="verse">
                "Gesù gli disse: «Io sono la via, la verità e la vita; nessuno 
                viene al Padre se non per mezzo di me.»"
              </p>
              <p className="reference">Giovanni 14:6</p>
            </div>

            <div className="scripture-card">
              <p className="verse">
                "Perché Dio ha tanto amato il mondo, che ha dato il suo unigenito 
                Figlio, affinché chiunque crede in lui non perisca, ma abbia vita eterna."
              </p>
              <p className="reference">Giovanni 3:16</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="credenze-cta">
        <div className="container">
          <h2>Vuoi saperne di più?</h2>
          <p>
            Se hai domande sulla nostra fede o vuoi approfondire questi insegnamenti, 
            saremo felici di parlare con te.
          </p>
          <div className="cta-buttons">
            <a href="/contatti" className="cta-button primary">Contattaci</a>
            <a href="/sermons" className="cta-button secondary">Ascolta le Predicazioni</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InCosaCrediamo;
