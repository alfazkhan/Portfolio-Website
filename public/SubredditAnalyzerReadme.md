# Reddit Data Scrapper Project Readme

A full-stack Reddit analysis platform that combines a React dashboard with a Python FastAPI backend, NLP pipelines, and PostgreSQL-backed storage.

## Live Demo

Access the live deployment at:

- https://subanalyzer.theonlyalfaz.com/


## What the Project Does

This project is built to discover and analyze Reddit data with a full-stack platform that combines scraping, database storage, NLP, and dashboard visualization.

- #### Subreddit selection and post count input with Cache summary display of tracked subreddit statistics
   ![Subreddit Input](/Screenshots/UserInput.png)

- Sentiment analysis views
   ![Sentiment Analysis](/Screenshots/Sentiments.png)

- Keyword frequency and pie chart visualization
  ![Keyword Chart](/Screenshots/Keyword-Table.png)

- Posts table with sortable/filterable results
   ![Posts Table](/Screenshots/Post-Table.png)

- Post frequency analytics
  ![Post Frequency](/Screenshots/Post-Frequency.png)


## Architecture

### Frontend

- React 19
- Vite
- Chakra UI
- Redux Toolkit
- Chart.js / react-chartjs-2
- Firebase
- Recharts
- PapaParse

### Backend

- Python 3
- FastAPI
- Uvicorn
- Playwright
- Transformers
- PyTorch
- spaCy
- NLTK
- PostgreSQL via `asyncpg`


## License
This repository is intended for learning, experimentation, and personal analytics. Modify as needed for your own deployment or research use case.