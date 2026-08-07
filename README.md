# ChaseCareer
 
Hi I build a AI-powered career guidance platform that analyzes uploaded resumes, generates personalized career path & skill gap recommendations based on user's career interests, mainly to help guide myself, and hopefully others too !!

This project is a combination to reach my two goals:
As a Software Engineering student with a passion in AI, I'm very determined to dive into this path, hence this project..
by buiiding this, I get to learn LLM integration anddd set out a AI Engineer roadmap + skill analysis for myself. :D 

## What It Does?
 
1. Users register and log in securely (JWT-based authentication).
2. Users upload a resume (PDF), which is parsed and stored.
3. Users tell the assistant what career path they're interested in (e.g. "cybersecurity", "DevOps").
4. The app sends the extracted resume data and interest to Google Cloud's Vertex AI (Gemini), which analyzes the candidate's existing skills, experience, and projects against the target role and returns a personalized skillgap analysis and recommended next steps.
   
## Tech Stack

- Next.js / React
- TypeScript
- Tailwind CSS
- Spring Boot
- H2 Database (file based persistence)
- Apache PDFBox (text extraction)
- Google Cloud Vertex AI API (Gemini)

## Architecture
 
The frontend and backend are separate applications that communicate over authenticated REST HTTP requests:
 
```
Next.js frontend
|
 HTTP (JWT in Authorization header)
->  Spring Boot backend
 │
 ├─ H2 database (users, documents)
 └─ Vertex AI (Gemini)
```

## Running Locally

**Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
 
**For Backend**
```bash
cd backend/chase
mvn spring-boot:run
```
Runs on `http://localhost:8080`.
 
**For Frontend**
```bash
npm install
npm run dev
```
Runs on `http://localhost:3000`.

Make sure to have Google Cloud project with the Vertex AI API enabled and valid Application Default Credentials configured locally to use the AI feature.

## Status & Notes
 
Core features (authentication, resume upload/extraction, AI career analysis) are functional.
Built as a solo project to explore mainly backend security, and practical LLM integration.

##Improvements to be made (future)
-Migrate current h2 to PostgreSQL
-Deploy via Vercel

