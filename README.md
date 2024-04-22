# How to Run??

## Prerequisites
Before running the application, ensure you have the following:

1. Docker installed on your machine.

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory.

3. Create a `.env` file in the root directory of the project with the following content:

```plaintext
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=postgres-db
POSTGRES_PORT=5432
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

4. Run docker compose up
