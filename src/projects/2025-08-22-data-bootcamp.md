---
title: dataexpert.io beginners bootcamp notes
author: Alexander Roan
date: 2025-08-22
tags: 
hashtags:
project: ["Data"]
subproject: ["dataexpert.io"]
image: /assets/images/data/dataexpert-home.png
imageAlt: A screenshot of the dataexpert.io homepage
description: A page to track key notes for the dataexpert.io bootcamp.
---

## Intro

This is a quick reference for the [dataexpert.io](https://www.dataexpert.io/) bootcamp run by Zach Wilson.

It's my draft notes, so there may be innacuracies or typos!

Last update: 23rd August 2025.

## NBA data

The data is accessible in a datalake at [dataexpert.io/query](https://www.dataexpert.io/query).

You can also install locally with PostgreSQL and docker. It's not difficult to do. I found instructions in the [handbook](https://github.com/DataExpert-io/data-engineer-handbook/tree/main/).

Navigate to intermediate-bootcamp > materials > 1-dimensional-data-modelling > README.md.

Some steps from lesson/lab 2 only work in the datalake.

### NBA summary of main tables

- Games `games`:
  - List of games by date with summary information
  - Key fields:
    - Game id: `game_id`
    - Date: `game_date_est`
    - Season: `season`
    - Various points totals (home, away, etc.)
- Game details `game_details`:
  - Player details by game
  - Key fields:
    - Game id: `game_id`,
    - Team id: `team_id`
    - Team city: `team_city`
    - Player id: `player_id`
    - Player_name: `player_name`
    - Player points: `pts`
Player_seasons `player_seasons`:
  - Player details per season
    - Key fields:
    - Player name: `player_name`
    - Player age: `age`
    - Player height: `height`
    - Player weight: `weight`
    - Player college: `college`
    - Player games played: `gp`
    - Player points: `pts`

## L1: GROUP BY, JOIN, and Common Table Expression

### SQL keywords

- `SELECT`: select data from a database
- `WHERE`:  filter records
- Conditionals
  - `AND`:
  - `OR`:
- `GROUP BY`
  - Group rows that have the same values into summary rows
  - Often used with aggregates
- `ORDER BY`
  - Add `DESC` to reverse order `ORDER BY details.pts DESC`
- `JOIN`: Join
  - `ON`: specify field for join
- `INSERT INTO`: insert new records in a table
- `DELETE`: delete existing records in a table
- `UPDATE`: modify the existing records in a table.
- Keywords:
  - `DISTINCT` to deduplicate (using 'GROUP BY' vs. 'DISTINCT'?)
  - `AS` create new name for column or table
- Aggregates:
  - `COUNT()`: return the number of rows that match a specified criteria
  - `MAX()`: return the largest valu eof a selected column
  - `MIN()`: return the smallest value of a selected column
  - `SUM()`: return total sum of numeric column
  - `AVG()`: return average of numeric column
  - `ARRAY_AGG()`:
    - Consolidates values from multiple rows into a single array
    - Groups by specified `GROUP BY`
    - Ordering in the array can be controlled by `ORDER BY`
    - Combined with `DISTINCT` to collect only unique values
    - Supports `FILTER` to include only specific rows
    - Preserves original data types
    - Useful for generating JSON output.
  - `JOIN()`: combine rows of two or more tables
  - (INNER) JOIN: matching values in both tables
  - LEFT (OUTER) JOIN: all from left table, matches from the right table
  - RIGHT (OUTER) JOIN: all from the right, matches from the left table
  - FULL (OUTER) JOIN: all when there is a match in either left or right table

### SQL statements examples

Select & Where

```SQL
SELECT * FROM Customers
WHERE Country='Mexico'; 
```

Group By

```SQL
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s); 
```

Join

```SQL
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
```

### L1 walkthrough

#### 1.1: Lookup player details

Lookup player season data by age, college, pts, etc.

```SQL
SELECT *
FROM bootcamp.nba_player_seasons 
WHERE (age > 40  AND college = 'Florida') OR pts > 30
LIMIT 50
```

#### 1.2: Aggregate player details

Experiment with aggregations on player_seasons

```SQL
/* Ex 2 */
SELECT country, 
  COUNT(*), 
  AVG(pts), 
  SUM(reb), 
  ARRAY_AGG(DISTINCT player_name)
FROM bootcamp.nba_player_seasons 
GROUP BY country
```

#### 1.3: Join games and game_details

Use join to connect games and games_details

```SQL
SELECT games.game_date_est, 
  games.season, 
  details.player_name, 
  details.pts
FROM bootcamp.nba_game_details AS details 
JOIN bootcamp.nba_games AS games
ON details.game_id = games.game_id
```

#### 1.4: Combine aggregations and joins

Combine aggregations with joins.

```SQL
SELECT games.season,
  details.player_name,
  SUM(details.pts) AS total_pts,
  COUNT(*) AS num_games
FROM game_details AS details
JOIN games
ON details.game_id = games.game_id
GROUP BY games.season, details.player_name
```

#### 1.5: Troubleshoot high scores

Start by investigating a single player, add:

```SQL
SELECT ARRAY_AGG(DISTINCT games.game_date_set_est)
WHERE details.player_name = 'LeBron James'
```

Next remove duplicates and filter games to exclude playoffs

- Get pts per player per game by de-duplicating game_details
  - Get max pts grouped by `player_name` and `game_id`
- Get a list of unique games excl. games that happen after April 15 of next year
  - (cutting off before the playoffs)
- Join two CTEs on game_id, filter by 'Lebron James' and get some aggregates

```SQL
WITH deduped_details AS (
  SELECT 
    player_name,
    game_id,
    MAX(pts) as pts 
  FROM bootcamp.nba_game_details
  GROUP BY player_name, game_id
), deduped_games AS (
  SELECT DISTINCT 
    game_id,
    season,
    game_date_est
  FROM bootcamp.nba_games
  WHERE game_date_est < DATE(CAST((season + 1) AS VARCHAR) || '-04-15')
)

SELECT games.season, 
  details.player_name,
  SUM(details.pts) as total_pts, 
  COUNT(*) as num_games
  ARRAY_AGG(DISTINCT games.game_date_est)
FROM deduped_details as details 
JOIN deduped_games as games
ON details.game_id = games.game_id
WHERE details.player_name = 'LeBron James'
GROUP BY games.season, details.player_name
```

#### Alex comments

If you want to double check games per month to validate playoffs are included

```SQL
SELECT
  EXTRACT(MONTH FROM game_date_est) AS month,
  COUNT(*) AS games_count
FROM games
GROUP BY month
ORDER BY month;
```

If you want to validate there are duplicates in game_details

```SQL
SELECT
  player_name, 
  game_id,
  COUNT(*) AS player_game_count
FROM game_details
GROUP BY player_name, game_id
HAVING COUNT(*) > 1
ORDER BY payer_game_count DESC;
```

Join this back to table to see duplicate rows

```SQL
SELECT *
FROM game_details
WHERE (player_name, game_id) IN (
  SELECT 
    player_name, 
    game_id
  FROM game_details
  GROUP BY player_name, game_id
  HAVING COUNT(*) > 1
);
```

## L2: Common Table Expressions

### Key points

- Data engineering principles:
  - Filter as soon as you can to process the least amount of data
- SQL does not execute in order written. The order is:
  - FROM/JOIN > WHERE > GROUP BY / HAVING > SELECT > ORDER BY > LIMIT
- This lesson illustrats how important ordering is important when using CTEs
  - Filter, then rank
  - Rank, then filter (different results)

### Set up steps

- Before creating tables in dataexpert.io/query create your schema:
  - In the query tool click 'important' and note your schema
  - Run command `CREATE SCHEMA  <schemaname>`

### SQL Storage structures

Table

- Permanent storage (until Deleted)
- If you need to 'materialise data'
- (Zach loves tables)

Temporary table

- Temporary storage, removed when a query finishes

Sub query

- Not recommended for nested queries
- Best used when returning a single number or result
- Less easy to read due to name/alias at the end
  - Name/alias is optional? (details to be confirmed)

View

- Consider like a 'CTE with a name'
- Useful for queries with logic
- No storage, so they executes every time their query results are needed
  - One benefit over a table is the will pick up any changes

```SQL
CREATE VIEW alex.players_better_than_lebron
SELECT * FROM player_seasons
WHERE pts >  (SELECT MAX(pts) FROM player_seasons WHERE player_name = 'LeBron James')
```

Common table expression (CTE)

- Useful for complex queries
- A CTE doesn't store data, it's not a temporary table
  - If referenced multiple times, it'll run multiple times
- Zach generally recommends CTEs over sub queries
  - Improved readibility (name comes first)

Materialised views

- Not frequently used in analytics

### SQL Datatypes

- VARCHAR (string - 'variable character')
- DECIMAL (floating point)
- TINYINT
- SMALLINT
- INTEGER
- BIGINT

### SQL Keywords

- `UNION ALL`: Join data from multiple selects in query results (appends)
- `CREATE TABLE`: Create table
- `EXPLAIN`:
  - Shows the query tree
  - Search for 'scan' to see table scans
  - Useful  to illustrate the difference querying with views vs. tables
- `Rank()`: Add a column ranking results based on a specified field:
  - `RANK() OVER (ORDER BY <field> DESC) as var_name`

Datalake related

- `DESCRIBE <tablename>`
- `SHOW CREATE TABLE <tablename>`
- `PARTITION BY`

### L2 walkthrough

#### 2.1: Add a ranking to a table

- Who has scored the most points in a season ever?
- Use `RANK()` to add a new column assigning a rank

```SQL
SELECT
  player_name,
  pts,
  RANK() OVER (ORDER BY pts DESC) as rank
FROM bootcamp.nba_player_seasons
ORDER BY rank
```

#### 2.2: Attempt to filter the calculated rank with `WHERE`

- What if we wanted to get the top ten ranked players only?
  - Adding `WHERE rank <=10` fails:
  - 'ERROR:  column "rank" does not exist`
  - This is due to order in which SQL executes
  - `WHERE` before `SELECT`, at which point rank isn't calculated

```SQL
SELECT
  player_name,
  pts,
  RANK() OVER (ORDER BY pts DESC) as rank
FROM bootcamp.nba_player_seasons
WHERE rank <=10
ORDER BY rank
```

#### 2.3: Use a CTE to add rank, then filter

- This will effectively move the `SELECT` above the `WHERE`
- Consider it like a query within a query:
  - Query all players first to get rank column
  - Then query condition on rank column
- A CTE doesn't store data, it's not a temporary table
- If referenced multiple times, it'll run multiple times

```SQL
WITH ranked_players AS (
  SELECT
    player_name,
    pts,
    RANK() OVER (ORDER BY pts DESC) as rank
  FROM bootcamp.nba_player_seasons
)

SELECT * FROM ranked_players
WHERE rank <= 10
```

Alternatively subquery syntax can be used, but this is less readable due to name/sub at the end:

```SQL
SELECT * FROM (
  SELECT
    player_name,
    pts,
    RANK() OVER (ORDER BY pts DESC) AS rank
    FROM bootcamp.nba_player__seasons
) sub
WHERE rank <= 10
```

#### 2.4: Illustration of multiple executions of a CTE

- Create a CTE
- Query it twice, using `UNION ALL` to join results
- Add `EXPLAIN` at the top to get the query plan, this shows:
  - Definition of CTE 'ranked_players'
  - 1st execution 'CTE scan' for 'rank <= 10
  - 2nd execution 'CTE scan' for rank <= 20
- This illustrates there is no long term storage and re-use of the 1st run
  
```SQL
EXPLAIN WITH ranked_players AS (
  SELECT
    player_name,
    pts,
    RANK() OVER (ORDER BY pts DESC) as rank
  FROM bootcamp.nba_player_seasons
)

SELECT * FROM ranked_players
WHERE rank <= 10
UNION ALL

SELECT * FROM ranked players
WHERE rank >= 100
```

#### 2.5: Create a table, and store intermediate results (vs. using CTE)

- If not already done, create your schema
  - In dataquery.io, get your schema name from 'Important'
  - Then use: `CREATE SCHEMA <yourschemaname>`
  - (replace with your username, for me it's 'dearestalexander')
- Create a table with the rankings
  - Same as the CTE but with `CREATE TABLE` rather than `WITH`

```SQL
CREATE TABLE dearestalexander.nba_players_ranked AS
SELECT
  player_name,
  pts,
  RANK() OVER (ORDER BY pts DESC) AS rank
FROM bootcamp.nba_player_seasons
```

Query the table:

```SQL
SELECT * FROM dearestalexander.nba_players_ranked
  WHERE rank <= 10
```

#### 2.6: Investigating data lake partitions (in dataexpert.io/query)

Use `SHOW CREATE TABLE bootcamp.nba_player_seasons`, it should return the following, which shows it is partitioned on season:

```CLI
CREATE TABLE academy.bootcamp.nba_player_seasons ( player_name varchar, age integer, height varchar, weight integer, college varchar, country varchar, draft_year varchar, draft_round varchar, draft_number varchar, gp double, pts double, reb double, ast double, netrtg double, oreb_pct double, dreb_pct double, usg_pct double, ts_pct double, ast_pct double, season integer ) WITH ( format = 'PARQUET', format_version = 1, location = 's3://zachwilsonsorganization-522/ce557692-2f28-41e8-8250-8608042d2acb/04ae3f4b-8516-4220-adad-6deaaa2582dc', object_store_layout_enabled = true, partitioning = ARRAY['season'] )
```

Compare with `SHOW CREATE TABLE dearestalexander.nba_players_ranked`, it should return the following, which shows no partitions:

```CLI
CREATE TABLE academy.dearestalexander.nba_players_ranked ( player_name varchar, pts double, rank bigint ) WITH ( format = 'PARQUET', format_version = 2, location = 's3://zachwilsonsorganization-522/ce557692-2f28-41e8-8250-8608042d2acb/41b87fc5-fcf3-428f-a0fa-7c8c04d2f569', max_commit_retry = 4, object_store_layout_enabled = true )
```

This illustrates the bootcamp tables are partitioned.

- Note =ARRAY['seasons'] at the end of the bootcamp.nba_player_seasons
- The data is split up by season
- Tip 'think of partitions as folders'
- This partition improves efficiency for season specific searches
  - A query doesn't have to work through the entire table of all seasons.

#### 2.7: Create an empty partitioned table & use insert to update

- Create players_ranked, but this time partitioned on season
- This will only work in datalake?

```SQL
CREATE TABLE dearestalexander.players_ranked_partitioned (
  player_name VARCHAR, 
  pts DECIMAL,
  rank BIGINT,
  season SMALLINT
)
WITH (
  partitioning = ARRAY['season']
)
```

Use a CTE to insert data into the empty table

- Define a CTE as the way to update the table
- Select from the CTE with a condition, this will update the table
  - We update only 2007 season data below

```SQL
INSERT INTO dearestalexander.nba_players_ranked_partitioned
-- Use a CTE 
WITH players_ranked AS (
  SELECT 
    player_name, 
    pts, 
    RANK() OVER (ORDER BY pts DESC) AS rank,
    season
  FROM
    bootcamp.nba_player_seasons
)

SELECT * FROM players_ranked
WHERE  season = 2007 -- NOTE WHERE IS OUTSIDE CTE
```

Check the table:

```SQL
SELECT * FROM dearestalexander.nba_players_ranked_partitioned 
WHERE season = 2007
```

This shows 2007 season data.

Try checking for rank number 1 in 2007:

```SQL
SELECT * FROM dearestalexander.nba_players_ranked_partitioned 
WHERE season = 2007 AND rank = 1
```

This doesn't return any results:

- It's because rank is being applied to all data before the season condition
  - `RANK()` is applied on bootcamp.nba_player_seasons
  - This updates our partitioned table with all seasons (partitioned by season)
  - Our select then pulls out only one season
  - That season doesn't have a no.1 rank (calculated across all seasons)

Delete the partition table data to try a different approach

`DELETE FROM dearestalexander.nba_playeres_ranked_partitioned`

Now, try moving the 'WHERE' inside the CTE:

- Update only 1 season data in the partitioned table
- Calculate rank on that seasons data

```SQL
INSERT INTO dearestalexander.nba_players_ranked_partitioned
-- Use a CTE 
WITH players_ranked AS (
  SELECT 
    player_name, 
    pts, 
    RANK() OVER (ORDER BY pts DESC) AS rank,
    season
  FROM
    bootcamp.nba_player_seasons
  WHERE  season = 2007 -- MOVED WHERE inside the CTE
)

SELECT * FROM players_ranked
```

Try checking again for rank number 1 in 2007:

```SQL
SELECT * FROM dearestalexander.nba_players_ranked_partitioned 
WHERE season = 2007 AND rank = 1
```

- This time you get the 2007 data with the no. 1 score.
- The rankings are being calculated on filtered 2007 data
