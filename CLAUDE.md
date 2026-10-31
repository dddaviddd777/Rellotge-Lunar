# Rellotge Lunar

App web que mostra la fase lunar actual, el compte enrere fins a la pròxima fase, la sortida i la posta de la lluna, què implica cada fase i una guia explicativa amb diagrama. Funciona a l'ordinador i al mòbil, i es pot instal·lar a la pantalla d'inici (PWA).

- **Repositori:** https://github.com/dddaviddd777/Rellotge-Lunar
- **Web publicada (GitHub Pages, branca `main`, arrel):** https://dddaviddd777.github.io/Rellotge-Lunar/
- **Idioma de l'app:** català. **Estil:** minimalista, nocturn i elegant, amb animacions suaus.

## Sobre l'usuari
David no és programador i està aprenent. Explica-li els canvis en català, amb paraules planeres, i digues-li sempre què ha de fer ell (si ha de fer alguna cosa).

## Fitxers
- `index.html`: tota l'app (HTML, CSS i JavaScript en un sol fitxer, sense dependències ni compilació).
- `sw.js`: service worker que desa l'app per funcionar sense connexió.
- `manifest.webmanifest`: nom, colors i icones per instal·lar-la.
- `icona-*.png`: icones de l'app.

## Regles importants
- **Cada vegada que canviïs qualsevol fitxer, puja la versió a `sw.js`** (`const VERSIO = 'rellotge-lunar-vN'`). Si no, els mòbils que ja la tenen instal·lada continuaran veient la versió antiga.
- Tot es calcula al dispositiu. No afegeixis cap servei extern ni API: l'app ha de funcionar sense internet. L'única càrrega externa són les tipografies de Google Fonts, i tenen alternatives del sistema.
- Els càlculs de fases fan servir els algoritmes de Jean Meeus (`phaseJDE`, capítol 49), amb precisió d'un minut aproximadament. La posició de la lluna (il·luminació, distància, sortida i posta) fa servir sèries simplificades. Si els toques, comprova-ho amb fases conegudes, per exemple: lluna nova 2000-01-06 18:14 UTC, lluna nova 2024-05-08 03:22 UTC, lluna plena 2024-05-23 13:53 UTC.
- A la secció "Què implica", separa sempre el que està demostrat científicament de la tradició popular (marcada com a creença).
- Per publicar: commit i push a `main`. GitHub Pages actualitza la web en un o dos minuts.
