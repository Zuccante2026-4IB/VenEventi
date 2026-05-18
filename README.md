# VenEventi

Repository "ombrello" del progetto **VenEventi** (GetUp). Aggrega tutti i
sotto-progetti come git submodules e li orchestra tramite Docker Compose.

## Sotto-progetti (submodules)

| Path           | Repo                                            | Ruolo                              |
|----------------|-------------------------------------------------|------------------------------------|
| `Backend/`     | [Backend](https://github.com/Zuccante2026-4IB/Backend)         | Strapi 5 + MySQL                   |
| `Eventi/`      | [Eventi](https://github.com/Zuccante2026-4IB/Eventi)           | Frontend JS gestione eventi        |
| `Design/`      | [Design](https://github.com/Zuccante2026-4IB/Design)           | CSS / asset condivisi              |
| `AI-Agent/`    | [AI-Agent](https://github.com/Zuccante2026-4IB/AI-Agent)       | Agente "Kith" su Cheshire Cat      |
| `static-HTML/` | [static-HTML](https://github.com/Zuccante2026-4IB/static-HTML) | Pagine HTML statiche (homepage)    |

## Prerequisiti

- Docker Engine 24+ e Docker Compose v2
- `git` con supporto submodules

## Avvio rapido

```bash
# 1. Clona la repo con i submodules
git clone --recurse-submodules https://github.com/Zuccante2026-4IB/VenEventi.git
cd VenEventi

# Se l'hai gia' clonata senza --recurse-submodules:
git submodule update --init --recursive

# 2. Configura le variabili d'ambiente
cp .env.example .env
# ...modifica .env con i secret reali...

# 3. Avvia tutto
docker compose up -d
```

## Servizi esposti

| Servizio       | URL                          | Porta |
|----------------|------------------------------|-------|
| Frontend web   | http://localhost:8090        | 8090  |
| Strapi API     | http://localhost:1337        | 1337  |
| Strapi Admin   | http://localhost:1337/admin  | 1337  |
| Cheshire Cat   | http://localhost:1865        | 1865  |

Dal frontend nginx sono proxati anche:
- `http://localhost:8090/api/...` → Strapi
- `http://localhost:8090/cat/...` → Cheshire Cat

## Aggiornare i submodules

```bash
git submodule update --remote --merge
git add .
git commit -m "chore: bump submodules"
```

## Comandi utili

```bash
docker compose logs -f strapi          # log Strapi
docker compose logs -f cheshire-cat    # log AI
docker compose restart strapi          # restart singolo servizio
docker compose down                    # ferma tutto
docker compose down -v                 # ferma tutto + cancella volumi (DB)
```
