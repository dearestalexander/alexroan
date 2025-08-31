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

## Easy questions (dataexpert.io/questions)

SPOILERS AHEAD!

There are practice questions at dataexpert.io/questions

As I write this, I've completed around 7 of these. I found them to be helpful in switching into the SQL problem solving mindset and experimenting with differnet things. I recommend giving them a good go without looking up answers or using AI. I found the SQL syntax list on W3 schools helpful, when I wasn't sure on how to do something. A summary of the questions and my attempts below.

### Question: Find Viewers with Multiple Article

[Find Viewers with Multiple Article Views in a Day](https://learn.dataexpert.io/question/find-multiple-article-viewers)

Using the table playground.views, write a SQL query to identify all viewers who viewed more than one article on the same day. The table includes columns viewer_id (the ID of the viewer), article_id (the ID of the article viewed), and view_date (the date of the view). The result should contain a single column named viewer_id, listing each viewer who meets the criteria without duplicates, and should be sorted in ascending order of viewer_id.

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

### Question: Identifying Empty Departments

[Identifying Empty Departments](https://www.dataexpert.io/question/empty-departments-list)

Given two tables, playground.employees and playground.departments, with employees containing id, full_name, and department, and departments containing id (unique department ID) and dep_name (department name), write a SQL query to build a table with one column, dep_name. This table should list all the departments that currently have no employees, sorted by the department id.

**My Solution**

I'm unsure if there is a JOIN that can return rows from one table without a match in another. Before searching for that, I decided on the following approach:

- Join tables using an `RIGHT JOIN` to get all rows in playground.departments
- Rows with NULL in full_name will represent departments without an employee
- I used a CTE to prepare the query, then the select to show only dep_name.

```SQL
WITH departments AS
(
SELECT dep_name,
  full_name
FROM playground.employees as pe
RIGHT JOIN playground.departments as pd
ON pe.department = pd.id
WHERE full_name IS NULL
)
SELECT dep_name
FROM departments
```

### Question: Filtering Students in Active Clubs

[Filtering Students in Active Clubs](https://www.dataexpert.io/question/active-club-members)

Given tables clubs (id: unique club id, name: club name) and students (id: unique student id, name: student name, club_id: club's id), return a list from the students table for those who are in clubs that still exist in the clubs table. The result should have three columns (id, name, club_id) and be sorted by students' ids (id) and include only those students whose club_id matches an id in the clubs table.

**My Solution**

By default JOIN gets matching values in both tables. That should work in this case, only returning the students with a club in the club table.

We don't need a CTE here, as we can just specify the required output fields.

```SQL
SELECT ps.id as id,
  ps.name as name,
  ps.club_id as club_id
FROM playground.students as ps
JOIN playground.clubs as pc
ON ps.club_id = pc.id
```

### Question: Identifying the Bank Robber

[Identifying the Bank Robber](https://www.dataexpert.io/question/bank-robber-identification)

Using table playground.suspect, filter out suspects who cannot be the bank robber based on the following clues: the robber is not taller than 170cm, and their name matches the pattern "B. Gre?n" where the first letter of the name is "B" or "b" and the surname is similar to "Green" but with the fourth letter being unreadable and potentially any character. The match should be case-insensitive. For each suspect that fits these criteria, select their id, name, and surname. Order the results by suspect id in ascending order.

**My Solution**

The key with this one is using WHERE and LIKE.

We can then use `_` or `%` to help matching the strings.

- `%` matches any number of unknown chars
- `_` matches a specific number of unknowns e.g. `__` for two

As it's case insensitive we can also use UPPER on the first name to simplify.

So, to summarise:

- Convert first name to upper using `Upper(name)`
- Use `WHERE` and `LIKE` on surname with `Gre_n`
- Use `WHERE` with height <= 170
- Use `WHERE` and `LIKE` on name with `B%`

Due to oder of operations uppername isn't available for WHERE so we need to use CTEs. I ended up chaining two, to get to the final output without the uppername column.

Could this be simplified?

```SQL
WITH robbers AS
(
SELECT id,
  name,
  UPPER(name) as uppername,
  surname,
  height
FROM playground.suspect
WHERE surname LIKE 'Gre_n'
  AND height <= 170
), 
robbers2 AS
(
SELECT id,
  name,
  surname,
  UPPER(name) as uppername
FROM robbers
WHERE uppername LIKE 'B%'  
)
SELECT id,
  name,
  surname
FROM robbers2
```

### Question: Determining the Order of Succession

[Determining the Order of Succession](https://www.dataexpert.io/question/order-of-succession)

Given a table Successors with columns: name, birthday, and gender, write a SQL query to list the names of the King's children in order of their succession to the throne and their birthday("name", "birthday"). Succession is based on age seniority. Prefix the name with "King" for males and "Queen" for females. The result should be sorted by birthday in ascending order to determine the succession order.

**My Solution**

```SQL
SELECT name,
  birthday
FROM playground.successors
ORDER BY birthday
```

### Question: Top Reviewed Customers per Product

[Top Reviewed Customers per Product](https://www.dataexpert.io/question/top-reviewed-customers-per-product)

Using the table playground.product_reviews, write a SQL query to identify, for each product, the customer who provided the highest review score. If there are ties in review score, the customer with the most helpful votes should be considered top. The output should include columns for product_id, customer_id, review_score, and helpful_votes, capturing the details of the top review for each product ordered in ascending order of product_id

**My Solution**

To start I tried ordering by review_score, then helpful_votes. This puts the row you want at the top of each set of product specific rows. But I couldn't think of a way to then filter by just the first row. I tried playing around with DISTINCT, but couldn't get that to work.

I then thought perhaps just using MAX will work. I was unsure if using MAX on two columns would return the right values. But it does seem to work.

```SQL
SELECT product_id,
  customer_id,
  MAX(review_score) AS review_score,
  MAX(helpful_votes) AS helpful_votes
FROM playground.product_reviews
GROUP BY product_id, customer_id
ORDER BY product_id
```

### Question: Find US Customers Who Rented and Streamed Videos in Early February

[Find US Customers Who Rented and Streamed Videos in Early February](https://www.dataexpert.io/question/us-customers-rented-streamed-early-feb)

Write a SQL query to return the US customers who rented a video on February 1st, 2023, and then streamed the same video between February 2nd and February 8th, 2023. Use the tables playground.rental for rental data and playground.streams for streaming data. The output should include unique user IDs of these customers ordered in ascending order.

**My solution**

For this one we can join the rental and stream tables on two fields: rental_id and user_id. We can then use `WHERE` on:

- rental_date = DATE '2023-02-01'
- stream_date > DATE '2023-02-01` AND stream_date < DATE '2023-02-08'

We can place this logic inside a CTE and then just return user_id from the main select to get to the output format requirements.

```SQL
WITH rental AS
(
  SELECT pr.rental_date,
    pr.user_id,
    ps.stream_date,
    pr.rental_id as ren_rental,
    ps.rental_id as str_rental
  FROM playground.rental as pr
  JOIN playground.streams as ps
    ON pr.user_id = ps.user_id AND
      pr.rental_id = ps.rental_id
  WHERE pr.rental_date = DATE '2023-02-01'
  AND (ps.stream_date > DATE '2023-02-02'
  AND ps.stream_date < DATE '2023-02-08')
)
SELECT user_id
FROM rental
```

This returns two results. The question seems to expect only one results. I double checked the tables manually, and two results seems correct.

### Question: Analyze Yearly Profit Performance

[Analyze Yearly Profit Performance](https://www.dataexpert.io/question/yearly-profit-performance)

Write a SQL query to analyze the profit performance of the company throughout the years using the playground.superstore table. Ensure to convert profit from varchar to a suitable numeric type for aggregation. The output should include the year extracted from the order_date (order_year), the total annual profit (total_profit) rounded to two decimal places, and should be ordered by year in descending order.

**My solution**

I had to look up a couple of things for this one:

- How to extract year? Seems there are options depending on the DB
  - Option 1: `EXTRACT(YEAR FROM date_value)`
    - PostgreSQL, Oracle, and Firebird, support the EXTRACT function.
  - Option 2: `YEAR(date_value)`
    - MySQL, MariaDB, SQL Server, Db2, SAP HANA, Informix, and Teradata do not support the EXTRACT function. Instead, they offer the YEAR function.

- How to round to two decimal places
  - `ROUND(field, 2)`

I wanted to print out date types in a column for the SUM() results, but couldn't figure out a function or method to do that.

```SQL
SELECT YEAR(order_date) as order_year,
  ROUND(SUM(profit), 2) AS total_profit
FROM playground.superstore
GROUP BY YEAR(order_date)
```

### Question: Select Rows With Maximum Revenue

[Select Rows With Maximum Revenue](https://www.dataexpert.io/question/select-max-revenue-rows)

Using the table playground.revenue, write a SQL query to select rows from a given table that have the maximum revenue value for each id. The resultant table should have three columns - "id", "rev", "content". Additionally, the results should be ordered in descending order by revenue.

**My Solution**

I decided to use MAX() within a CTE to get the max revenue lines, then use the id plus the max value to join back to the table and pick out the content field.

```SQL

WITH max_rev AS
(
SELECT id,
  MAX(rev) as max
FROM playground.revenue
GROUP BY id
)
SELECT mr.id,
  pr.rev,
  pr.content
FROM max_rev as mr
LEFT JOIN playground.revenue as pr
  ON mr.id = pr.id AND
    mr.max = pr.rev
ORDER BY mr.max DESC
```

## Medium questions (dataexpert.io/questions)

### Question: Salary Range Difference

[Salary Range Difference](https://www.dataexpert.io/question/salary-range-difference)

Calculate the difference between the sum of the highest salaries and the sum of the lowest salaries in the company. The table "playground.employees_salary" contains columns "id" (unique employee ID), "name" (employee's name), and "salary" (employee's salary as a positive integer). The result should be a single column "difference" with one row representing the calculated difference. If the "playground.employees_salary" table is empty, "difference" should be 0.

**My solution**

I misunderstood this question at first, but it might still be useful to show my first attempt.

I interpreted it as summing all the high value and all the low values and calculating the difference. So, split the table at the middle and sum values higher than the middle value, and sum values lower than the middle value. To do this:

- Start with a CTE to prepare:
  - I used row_number with order on salary to give rows an incrementing ID from lowest to highest salary
  - I used count to get total number of rows
- Then in a following CTE:
  - I used sum twice to add two columns, one for highest salaries, one lowest
  - Inside the sum I used CASE to pick only the relevant values
- Then in main it's just a matter of subtracting lowest from highest.

However, this returns 700, which is incorrect. Luckily the web page informed me 1700 is expected. So, will aim to solve for that in attempt 2 (see below)

Attempt 1: returns 700:

```SQL
With salary_ordered AS
(
SELECT *,
  ROW_NUMBER() OVER(ORDER BY salary) as rn,
  COUNT(*) OVER() AS tr
FROM playground.employees_salary
), highest_lowest AS
(
SELECT
  SUM(CASE WHEN rn <= tr / 2 THEN salary END) AS lowest_half,
  SUM(CASE WHEN rn > tr / 2 THEN salary END) AS highest_half
FROM salary_ordered
)
SELECT highest_half - lowest_half AS difference
FROM highest_lowest
```

So 1700 is expected. Looking at the data more closely the highest entries are actually 2 entries, both with 1300, the lowest entry is one entry with 900. So, 1300 + 1300 - 900 = 700.

We can't simply use MAX() and MIN() as we don't know if there are duplicate high or low values.

What we could try, is to use RANK() which will assign the same ID to duplicate values. We can then utilise that same ID to sum entries. This will work with any number of duplicates are present as highest and lowest values.

- 1st CTE
  - Rank over salary and add a columns for both ascending & descending salary
- 2nd CTE
  - Use sum and case again, but this time based on rank = 1 in asc/desc directions.
- Main
  - Calculate the difference.

Attemp 2: returns expected 1700

```SQL
With salary_ranked AS
(
SELECT *,
  RANK() OVER(ORDER BY salary DESC) AS rk_de,
  RANK() OVER(ORDER BY salary) AS rk_ac
FROM playground.employees_salary;
), highest_lowest AS
(
SELECT
  SUM(CASE WHEN rk_de = 1 THEN salary END) AS highest,
  SUM(CASE WHEN rk_ac = 1 THEN salary END) AS lowest
FROM salary_ranked
)
SELECT highest - lowest AS difference
FROM highest_lowest
```

### Question: Find Product Prices

[Find Product Prices](https://www.dataexpert.io/question/find-product-prices)

Using the table playground.product_prices, create a SQL query to find all products and their prices on 2023-08-17, assuming the initial price of all products was 10 before any price changes. Order the results in ascending order of product_id.

**My Solution**

Took me a while to figure out a way to do this!

I started experimenting with using CASE to put either the new price in a new column if change_date was before or equal to the 17th, otherwise the old price, but this still left the challenge of multiple rows per product where a product had gone through several price changes.

I thought back to the previous exercise with CASE inside of SUM() and thought maybe this can work with CASE inside MAX. We can't tell it which values to use in a MAX() calculation to get one row per product with the latest price up to the 17th.

It feels quite elegant this time.

```SQL
SELECT product_id,
  MAX(CASE 
    WHEN change_date <= DATE '2023-08-17'
      THEN new_price
    ELSE d_price
  END) AS price
FROM playground.product_prices
GROUP BY product_id
ORDER BY product_id
```

### Question: Comparing State Fatal Collisions to the National Average

[Comparing State Fatal Collisions to the National Average](https://www.dataexpert.io/question/state-fatal-collisions)

Using playground.bad_drivers, write a SQL query to compare each state’s fatal collisions per billion miles to the national average. Include a column that indicates whether the state is "Above Average" or "Below Average". The resultant table should have three columns, "state", "fatal_collisions_per_billion_miles" and "comparison_to_national_avg". Show the result ordered by state name asc.

**My Solution**

I thought this one would be quite simple, but I had a few issues getting it to work. I decided to use an initial CTE to calculate the national average. I then forgot how to add that into the original table. The easiest turns out to be a cross join. The very long field names made this tricky to write on the web app. Once the average is added to the table case can be used to update a new column with either 'above average' or 'below average'

```SQL
WITH nat_ave AS
(
SELECT
 AVG(FATAL_COLLISIONS_PER_BILLION_MILES) 
  AS ave
FROM playground.bad_drivers
), comparison AS
(
SELECT pbd.*,
  nat_ave.ave AS national_average,
  CASE
  WHEN pbd.fatal_collisions_per_billion_miles 
  > nat_ave.ave THEN 'Above Average'
  WHEN pbd.fatal_collisions_per_billion_miles
  < nat_ave.ave THEN 'Below Average'
  END AS comparison
FROM playground.bad_drivers pbd
CROSS JOIN nat_ave
)
SELECT state,
fatal_collisions_per_billion_miles,
comparison AS comparison_to_national_avg
FROM comparison;
```

### Question: Who are the top 10 authors by number of reviews?

[Who are the top 10 authors by number of reviews?](https://www.dataexpert.io/question/top-10-authors-by-reviews)

Using bootcamp.books, find the top 10 authors by reviews, no_of_reviews is a string column with bad data, try your best to get the values to parse correctly

**My Solution**

Number of reviews shows up as NULL for all books, so not sure what can be done here.

```SQL
SELECT *
FROM bootcamp.books
WHERE NO_OF_REVIEWS IS NOT NULL
-- return 0
```
