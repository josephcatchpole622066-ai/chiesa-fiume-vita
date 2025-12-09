# Deployment su GitHub Pages con Dominio Personalizzato

## Setup Iniziale

### 1. Configura GitHub Pages

1. Vai su **Settings** del repository
2. Vai su **Pages** (menu laterale)
3. In **Source**, seleziona **GitHub Actions**

### 2. Prepara il Dominio

#### Opzione A: Dominio Personalizzato (es. chiesafiumevita.it)

1. **Acquista il dominio** su un provider (es. Namecheap, GoDaddy, Google Domains, Aruba)

2. **Configura i DNS** del tuo provider con questi record:

   ```
   Type    Name    Value
   A       @       185.199.108.153
   A       @       185.199.109.153
   A       @       185.199.110.153
   A       @       185.199.111.153
   CNAME   www     josephcatchpole622066-ai.github.io
   ```

3. **Modifica il file `public/CNAME`** con il tuo dominio:
   ```
   tuodominio.com
   ```
   oppure per un sottodominio:
   ```
   chiesa.tuodominio.com
   ```

#### Opzione B: Usa il dominio GitHub gratuito

- Rimuovi il file `public/CNAME`
- Il sito sarà su: `https://josephcatchpole622066-ai.github.io/chiesa-fiume-vita/`
- Modifica `vite.config.js` impostando `base: '/chiesa-fiume-vita/'`

### 3. Deploy

1. **Fai merge di `dev` in `main`**:

   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```

2. Il workflow `deploy.yml` partirà automaticamente e deployerà il sito

3. Dopo qualche minuto, il sito sarà live!

### 4. Verifica il Deploy

- Vai su **Actions** nel repository per vedere il progresso
- Una volta completato, visita il tuo dominio

## Domini Consigliati per Chiesa

- **chiesafiumevita.it** - Dominio italiano (.it circa €10/anno)
- **chiesafiumevita.com** - Dominio internazionale (.com circa €12/anno)
- **fiumevita.church** - Dominio specifico per chiese (.church circa €30/anno)

## Provider Dominio Consigliati

1. **Namecheap** - Economico e facile da usare
2. **Google Domains** - Semplice, integrato con Google
3. **Aruba** - Provider italiano, supporto in italiano
4. **Register.it** - Altro provider italiano

## Troubleshooting

### Il sito non si carica

- Aspetta 10-15 minuti dopo il primo deploy
- Controlla che il workflow sia completato in **Actions**

### Dominio personalizzato non funziona

- Aspetta 24-48 ore per la propagazione DNS
- Verifica i record DNS con: `nslookup tuodominio.com`
- Controlla che `public/CNAME` contenga il dominio corretto

### Errori di build

- Controlla i log in **Actions**
- Verifica che `npm run build` funzioni in locale

## Note Importanti

- **HTTPS**: GitHub Pages fornisce automaticamente certificato SSL gratuito
- **Deploy automatico**: Ogni push su `main` trigghera un nuovo deploy
- **Dominio**: Può essere cambiato in qualsiasi momento modificando `public/CNAME`
