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

This is a quick reference to my notes from the [dataexpert.io](https://www.dataexpert.io/) bootcamp run by Zach Wilson.

## SQL

### List of keywords

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

### Basic statements examples

#### Select & Where

```SQL
SELECT * FROM Customers
WHERE Country='Mexico'; 
```

#### Group By

```SQL
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s); 
```

#### Join

Combine rows of two or more tables

- (INNER) JOIN: Matching values in both tables
- LEFT (OUTER) JOIN: All from left table, and matches from the right table
- RIGHT (OUTER) JOIN: All from the right table, and matches from the left table
- FULL (OUTER) JOIN: All when there is a match in either left or right table

```SQL
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
```

## NBA database

### Local set up

There are instructions on the github [handbook](https://github.com/DataExpert-io/data-engineer-handbook/tree/main/) to set up the database locally.

Navigate to intermediate-bootcamp > materials > 1-dimensional-data-modelling > README.md.

### Tables

- Games `games`
  - List of games by date with summary information
  - Key fields
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
Player_seasons
  - Player details per season
    - Key fields:
    - Player name: `player_name`
    - Player age: `age`
    - Player height: `height`
    - Player weight: `weight`
    - Player college: `college`
    - Player games played: `gp`
    - Player points: `pts`

## Lessons

### GROUP BY, JOIN, and Common Table Expression Lab

#### Example 1: lookup player details

Lookup player season data by age, college, pts, etc.

```SQL
/* Ex 1 */
SELECT *
  FROM bootcamp.nba_player_seasons 
  WHERE (age > 40  AND college = 'Florida') OR pts > 30
  LIMIT 50
```

#### Example 2: aggregate player details

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

#### Example 3: join games and game_details

Use join to connect games and games_details

```SQL
SELECT games.game_date_est, games.season, details.player_name, details.pts
  FROM bootcamp.nba_game_details as details 
  JOIN bootcamp.nba_games as games
  ON details.game_id = games.game_id
```

#### Example 4: combine aggregations and joins

Combine aggregations with joins.

```SQL
SELECT games.season, 
  details.player_name,
  SUM(details.pts) as total_pts,
  COUNT(*) as num_games
FROM game_details as details
JOIN games
ON details.game_id = games.game_id
GROUP BY games.season, details.player_name
```

#### Example 5: troubleshoot high scores

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
  SELECT player_name,
                game_id,
                MAX(pts) as pts 
  FROM bootcamp.nba_game_details
  GROUP BY player_name, game_id
),deduped_games AS (
  SELECT DISTINCT game_id, season, game_date_est
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

Additional analysis & notes:

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
    SELECT player_name, game_id
    FROM game_details
    GROUP BY player_name, game_id
    HAVING COUNT(*) > 1
);
```

