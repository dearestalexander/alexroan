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

Games `games`:

- List of games by date with summary information
- Key fields:
  - Game id: `game_id`
  - Date: `game_date_est`
  - Season: `season`
  - Various points totals (home, away, etc.)

Game details `game_details`:

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

## Appendix: dataexpert.io/questions

SPOILERS AHEAD!

There are practice questions at dataexpert.io/questions

As I write this, I've completed around 7 of these. I found them to be helpful in switching into the SQL problem solving mindset and experimenting with differnet things. I recommend giving them a good go without looking up answers or using AI. I found the SQL syntax list on W3 schools helpful, when I wasn't sure on how to do something. A summary of the questions and my attempts below.

### Question: Find Viewers with Multiple Article

[Find Viewers with Multiple Article Views in a Day](https://learn.dataexpert.io/question/find-multiple-article-viewers)

Using the table playground.views, write a SQL query to identify all viewers who viewed more than one article on the same day. The table includes columns viewer_id (the ID of the viewer), article_id (the ID of the article viewed), and view_date (the date of the view). The result should contain a single column named viewer_id, listing each viewer who meets the criteria without duplicates, and should be sorted in ascending order of viewer_id.
These are the tables to query for this question:

playground.views

- article_id int
- author_id int
- viewer_id int
- view_date date

Your answer should include these columns:

- viewer_id integer

**My solution**

First SQL problem I've looked at. Took me a while to get my brain to work on this!

I started by experimenting by counting viewer_id, then adding in GROUP BY.

I realised it may need a query in a query to get from the intermediate calculation to the presentation results. I used a CTE.

```SQL
SELECT * FROM playground.views

WITH counted_viewers AS (
SELECT viewer_id, view_date,
  COUNT(DISTINCT article_id) AS artct
FROM playground.views
  GROUP BY viewer_id, view_date
  HAVING COUNT(DISTINCT article_id) >= 2
)

SELECT viewer_id 
FROM counted_viewers
ORDER BY viewer_id ASC
```

### Question: Check Test Answers

[Check answers](https://learn.dataexpert.io/question/check-test-answers)

Create a SQL query to evaluate test answers stored in a table named playground.answers with columns id (unique question ID), correct_answer (string), and given_answer (which can be NULL). Return a table with columns id and checks, where checks is "no answer" if given_answer is NULL, "correct" if given_answer matches correct_answer, and "incorrect" otherwise. Order the results by id.
These are the tables to query for this question:
playground.answers

- id int
- correct_answer string
- given_answer string

Your answer should include these columns:

- id integer
- checks varchar

**My solution**

We haven't covered conditionals using IF in the dataexpert videos, but I took a guess that SQL had an IF keyword. I checked W3 schools and it is:

`IF(condition, value_if_true, value_if_false)`

I did a bit of testing and found a few things:

- You can nest an IF inside an IF
  - So we can check for correct answer first
  - Then check incorrect answers for null
- You can't use 'check = NULL' as null represents an unknown value
  - You can use 'IS NULL'

```SQL
SELECT id,
IF (given_answer = correct_answer, 'correct', 
  IF (given_answer IS NULL, 'no answer', 'incorrect')) AS checks
FROM playground.answers
ORDER By id
```

I asked ChatGPT it's opinion on this solution, and it recommended CASE over IF:

```SQL
SELECT 
    id,
    CASE
        WHEN given_answer IS NULL THEN 'no answer'
        WHEN given_answer = correct_answer THEN 'correct'
        ELSE 'incorrect'
    END AS checks
FROM playground.answers
ORDER BY id;
```

I'm not a huge fan of CASE in JS, I usually have problems getting it to work. Probably breaks/fallthrough related. It seems CASE is much easier in SQL.

### Question: Total Number of Births Per Year

[Total Number of Births Per Year](https://learn.dataexpert.io/question/total-births-per-year)

Write a SQL query to calculate the total number of births recorded for each year in the playground.us_birth_stats table. Order the results by year.
These are the tables to query for this question:
playground.us_birth_stats

- year int
- month int
- date_of_month int
- day_of_week int
- births int

Your answer should include these columns:

- year integer
- total_births integer

**My solution**

This one seemed a lot easier following question one.

Just a matter of using sum on births, then group and order by year.

```SQL
SELECT year,
SUM(births) AS total_births
FROM playground.us_birth_stats
GROUP BY YEAR
ORDER BY YEAR
```

### Question: Cars with Above Average Engine Size

[Cars with Above Average Engine Size](https://learn.dataexpert.io/question/cars-above-average-engine-size)

Using the table playground.automobile, Create a SQL query to identify cars that have an engine size above the average across all cars in the dataset. The result should include the brand, fuel_type, and engine size, ordered by engine size in descending order and then brand_name in asc order.
These are the tables to query for this question:
playground.automobile

- brand_name string
- fuel_type string
- aspiration string
- door_panel string
- design string
- wheel_drive string
- engine_location string
- engine_type string
- cylinder_count string
- engine_size int
- fuel_system string
- bore double
- stroke double
- compression_ratio double
- horse_power int
- top_RPM int
- city_mileage int
- highway_mileage int
- price_in_dollars int

Your answer should include these columns:

- brand_name varchar
- fuel_type varchar
- engine_size integer

**My solution**

My guess is we use a query to calculate the average engine size. Then use the results of that in a query to compare each row with that average, then output and sort the engines with higher values.

I wondered if we could access the variable in the CTE in the second query, but we can't without doing  a JOIN. I used 'CROSS JOIN' to add average engine size to every row. This feels a bit inneficient?

After joining, it's just a matter of selecting the required output feels, adding the condition and the ordering.

```SQL
WITH ave_eng_cte AS (
  SELECT AVG(engine_size) AS ave_eng
  FROM playground.automobile
) 
SELECT brand_name,
  fuel_type,
  engine_size
FROM playground.automobile
CROSS JOIN ave_eng_cte
WHERE engine_size > ave_eng_cte.ave_eng
ORDER BY engine_size DESC, brand_name
```

### Question: Average Number of Births by Day of the Week

[Average Number of Births by Day of the Week](https://learn.dataexpert.io/question/average-births-per-day-of-week)

Create a SQL query that finds the average number of births for each day of the week across all years in the playground.us_birth_stats table. Cast the average as an integer. Order the results by the day of the week.
These are the tables to query for this question:
playground.us_birth_stats

- year int
- month int
- date_of_month int
- day_of_week int
- births int

Your answer should include these columns:

- day_of_week integer
- average_births integer

**My solution**

Another one that didn't seem to difficult. This time just a matter of getting the average of births by day of the week.

Luckily the 1st lab included the syntax to cast a value to a specific format.

`CAST(<value> AS <type>)`

```SQL
SELECT
  day_of_week,
  CAST(AVG(births) AS INT) AS average_births
FROM playground.us_birth_stats
GROUP BY
  day_of_week
ORDER BY
  day_of_week
```

### Question: Month with the Highest Total Births

[Month with the Highest Total Births](https://learn.dataexpert.io/question/highest-birth-month)

Determine the month with the highest total number of births in the playground.us_birth_stats table. The output should show the month and the total number of births.

These are the tables to query for this question:
playground.us_birth_stats

- year int
- month int
- date_of_month int
- day_of_week int
- births int

Your answer should include these columns:

- month integer
- total_births integer

**My solution**

The main operation is to get the sum of births by month. To filter out the highest value we could sort by births and then limit the output to 1.

```SQL
SELECT month,
  SUM(births) AS total_births
FROM playground.us_birth_stats
  GROUP BY month
  ORDER BY total_births DESC
  LIMIT 1
```

Alternatively, I feel like there should be a way to do this using max(). We could use a CTE to get the total births per month, then use MAX() on that to get the month with the most births.

It works when we just output the number of births, but if we try to add in month, it gives us MAX() per month, which is not what we want.

```SQL
With summed_births AS (
  SELECT month,
  SUM(births) AS total_births
  FROM playground.us_birth_stats
  GROUP BY month
)
SELECT month,
  MAX(total_births)
FROM summed_births
GROUP BY month
```

After a bit of playing around, I found one way to do this is to create two CTEs. The first gets the total per month. The second gets the max() from that. Then we can join them by that max value and use a select on that join to get the month and the max value. It's a bit convoluted, but feels more robust than relying on Limit.

```SQL
WITH sum_b AS (
  SELECT month,
    SUM(births) AS sum_births
  FROM playground.us_birth_stats
  GROUP BY month
), 
max_b AS (
SELECT MAX(sum_births) AS max_births
FROM sum_b
)

SELECT month, max_births AS total_births
FROM max_b
JOIN sum_b ON 
max_b.max_births = sum_b.sum_births
```

### Question: Customers with More Than 20 Orders

Write a SQL query to display all loyal customers from the playground.superstore table. A customer is considered loyal if they have placed more than 20 orders. The query should return the customer ID, customer name, and the total number of orders for each of these customers. Display the result in descending order of their orders and then ascending order of their names
These are the tables to query for this question:
playground.superstore

- row_id int
- order_id string
- order_date date
- ship_date date
- ship_mode string
- customer_id string
- customer_name string
- segment string
- country string
- city string
- state string
- postal_code int
- region string
- product_id string
- category string
- sub_category string
- product_name string
- sales string
- quantity string
- discount string
- profit double

Your answer should include these columns:

- customer_id varchar
- customer_name varchar
- order_count integer

**My solution**

This would appear to be a count on order ID and a condition on the same using 'HAVING' (given that the condition is on an aggregate).

```SQL
SELECT customer_id,
  customer_name,
  count(order_id) AS order_count
FROM playground.superstore
GROUP BY customer_id, customer_name
HAVING count(order_id) > 20
ORDER BY order_count DESC, customer_name
```

This gives 86 results sorted by order count and then name.

I couldn't submit this one, the page gave the status "Data Length is different! Right answer has 1 rows. Your query has 86 rows!"

However, I'm pretty sure multiple rows are correct here.
