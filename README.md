# KI-Sichtbarkeits-Check für lokale Unternehmen

Dieses Projekt ist eine **Next.js Web-App** (React) zur Überprüfung der KI-Sichtbarkeit lokaler Unternehmen.  

---

## Features

- Eingabe von Unternehmensinformationen (Name, Branche, Standort)  
- API-Route (`/api/openai/route.js`) zum Senden von Prompts an OpenAI  
- Analyse der KI-Sichtbarkeit **über Web Search mit OpenAI**  
- Die Antwort enthält einen **AI Visibility Score (0-10)** und **3-5 Tipps**, um die Sichtbarkeit zu erhöhen  
- Darstellung der Ergebnisse im Frontend, jeder Tipp in einer neuen Zeile  
- Styling mit **TailwindCSS**  
- Next.js für Frontend und Backend  

> Hinweis: Der bereitgestellte OpenAI API Key unterstützt standardmäßig kein Web Search über Modelle wie gpt-4o-search-preview oder gpt-4o-mini-search-preview.
Deshalb wird gpt-5 mit tools: [{ type: "web_search" }] verwendet, um reale Web-Suchen durchführen zu können.
Web Search braucht länger, um eine Antwort zu liefern, da die KI zusätzlich das Web durchsucht.
Der Aufruf über die Trainingsdaten ist noch implementiert, aber auskommentiert, da der API Key Web Search standardmäßig nicht unterstützt.

---

## Voraussetzungen

- .env Datei mit richtige Openai API Key

---

## Installation & Setup

- npm install
- npm run dev
- http://localhost:3000