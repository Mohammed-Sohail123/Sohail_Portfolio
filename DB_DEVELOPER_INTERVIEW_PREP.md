# Database Developer Interview Prep — Mohammed Sohail

Target: Database Developer, Qatar (WorkWavez Solutions). Stack in the job: **SQL Server / Azure SQL**.
Your real experience: **MySQL and PostgreSQL** in production (Atruha Finance, StafWise, Acadlynk, E-Commerce, EMS).

> How to use this: for every topic, first say what you did in MySQL/PostgreSQL, then show you know the
> SQL Server equivalent. Never claim SQL Server production work you have not done. Interviewers ask
> "show me how" follow-ups, and a made-up answer fails there.

---

## Table of Contents

1. [How to frame your experience](#1-how-to-frame-your-experience)
2. [SQL fundamentals and query writing](#2-sql-fundamentals-and-query-writing)
3. [Schema design and normalization](#3-schema-design-and-normalization)
4. [Indexes](#4-indexes)
5. [Performance tuning and execution plans](#5-performance-tuning-and-execution-plans)
6. [Stored procedures, functions, triggers](#6-stored-procedures-functions-triggers)
7. [Transactions, isolation and locking](#7-transactions-isolation-and-locking)
8. [High availability and disaster recovery](#8-high-availability-and-disaster-recovery)
9. [Data migration and reconciliation](#9-data-migration-and-reconciliation)
10. [Data warehouse and analytics layer](#10-data-warehouse-and-analytics-layer)
11. [Azure SQL and DP-300](#11-azure-sql-and-dp-300)
12. [Scenario questions from your projects](#12-scenario-questions-from-your-projects)
13. [Hands-on practice queries](#13-hands-on-practice-queries)
14. [HR questions for this role](#14-hr-questions-for-this-role)
15. [Two-week study plan](#15-two-week-study-plan)

---

## 1. How to frame your experience

**Tell me about yourself (database version, about 60 seconds)**

"I'm Mohammed Sohail, a software engineer from Hyderabad with about two years of experience. Most of my
work is on the data side of production applications. At Atmez AI Solutions I designed the MySQL data model
for Atruha Finance, a live analytics platform covering 350+ Saudi Exchange stocks with over 1,100 registered
users and paying subscribers. I also modelled the HR database for StafWise and built the PostgreSQL schema
for Acadlynk, our academic platform. Day to day I write and optimize SQL for dashboards and reports, design
relational schemas, and use Redis caching to take load off the database. My production work is in MySQL and
PostgreSQL; I'm now building SQL Server and Azure SQL skills and preparing for DP-300."

**Honest answers to the checklist gaps (say these calmly, do not apologise)**

| They ask | You answer |
|---|---|
| "Do you have 10 years?" | "No, I have about two years. What I can show is production database work on live systems with real users." |
| "SQL Server experience?" | "My production work is MySQL and PostgreSQL. The concepts transfer directly: indexing, execution plans, transactions. I'm practicing T-SQL and SQL Server specifics now." |
| "Arabic?" | "I can read Arabic and I built a bilingual English/Arabic interface for Atruha. I'm not fluent in conversation yet." |
| "HA/DR?" | "I haven't run Always On in production. I understand the options and their trade-offs." Then explain section 8. |

---

## 2. SQL fundamentals and query writing

**Q. Order of logical query processing?**
`FROM` → `JOIN/ON` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `DISTINCT` → `ORDER BY` → `TOP/OFFSET`.
That is why you cannot use a `SELECT` alias inside `WHERE`, but you can in `ORDER BY`.

**Q. WHERE vs HAVING?**
`WHERE` filters rows before grouping. `HAVING` filters groups after aggregation.

**Q. INNER, LEFT, RIGHT, FULL, CROSS JOIN?**
INNER keeps matching rows. LEFT keeps every left row and fills NULLs on the right. FULL keeps both sides.
CROSS returns every combination. Watch out: a filter on the right table in `WHERE` turns a LEFT JOIN into an
INNER JOIN; put it in `ON` instead.

**Q. DELETE vs TRUNCATE vs DROP?**
DELETE removes rows one by one, is fully logged, fires triggers and accepts WHERE. TRUNCATE deallocates pages,
is minimally logged, resets IDENTITY and cannot run if a foreign key references the table. DROP removes the
table itself. In SQL Server both DELETE and TRUNCATE can be rolled back inside a transaction.

**Q. ROW_NUMBER vs RANK vs DENSE_RANK?**
Scores 100, 100, 90 give ROW_NUMBER 1,2,3; RANK 1,1,3; DENSE_RANK 1,1,2.

**Q. CTE vs temp table vs table variable?**
- CTE: a named query for readability and recursion; not stored, and it is re-evaluated each time it is referenced.
- `#temp` table: stored in tempdb, has statistics, can be indexed; best for large intermediate results.
- `@table` variable: limited statistics, best for small row counts.

**Q. UNION vs UNION ALL?**
UNION removes duplicates (sort or hash cost). UNION ALL keeps everything and is faster. Use UNION ALL unless
you need de-duplication.

**Q. How do NULLs behave?**
`NULL = NULL` is unknown, not true. Use `IS NULL`. `COUNT(col)` skips NULLs, `COUNT(*)` does not.
`NOT IN` with a NULL in the subquery returns no rows; use `NOT EXISTS`.

---

## 3. Schema design and normalization

**Q. Explain 1NF, 2NF, 3NF with an example.**
- 1NF: atomic values, no repeating groups (no "skills" column holding "SQL, Java").
- 2NF: no partial dependency on part of a composite key.
- 3NF: no transitive dependency (department name lives in Departments, not repeated in Employees).

**Your example (StafWise):** Employees, Departments, Attendance, LeaveRequests and Payroll are separate
tables linked by foreign keys, so a department rename changes one row.

**Q. When do you denormalize?**
For read-heavy reporting where joins are too costly: summary tables, a reporting schema or an indexed view.
Accept the cost of keeping copies in sync.

**Q. Surrogate key vs natural key?**
Surrogate (INT/BIGINT IDENTITY) is small, stable and good for clustering. Natural key (stock symbol, email)
carries meaning but can change. Common pattern: surrogate primary key plus a UNIQUE constraint on the natural key.

**Q. How do you store money?**
`DECIMAL(19,4)` (or `DECIMAL(18,2)`). Never FLOAT. Relevant to StafWise payroll and Atruha subscriptions.

**Q. How do you design a multi-tenant schema?**
Shared tables with an indexed `OrganizationId` on every tenant table, taken from the authenticated user,
never from the request. SQL Server also offers Row-Level Security to enforce it in the database.

**Q. Which constraints do you use?**
PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK (for example `Quantity >= 0`), NOT NULL, DEFAULT.
Constraints protect data even if application code has a bug.

---

## 4. Indexes

**Q. Clustered vs non-clustered index?**
- Clustered: the table's rows are stored in this order. Only one per table. Usually the primary key.
- Non-clustered: a separate structure holding key columns and a pointer to the row. Many per table.

**Q. What is a covering index and INCLUDE?**
An index that holds every column a query needs, so SQL Server never visits the base table (no Key Lookup).
```sql
CREATE NONCLUSTERED INDEX IX_Orders_Customer_Date
ON dbo.Orders (CustomerId, OrderDate DESC)
INCLUDE (TotalAmount, Status);
```

**Q. How do you choose composite index column order?**
Equality columns first, then range or sort columns. An index on `(CustomerId, OrderDate)` serves
`WHERE CustomerId = 5 ORDER BY OrderDate`, but not `WHERE OrderDate > '2026-01-01'` alone.

**Q. Seek vs scan?**
A seek jumps to matching rows using the index. A scan reads the whole index or table. Scans are fine on small
tables or when most rows are needed.

**Q. What is SARGability?**
A predicate the optimizer can use with an index. Not sargable: `WHERE YEAR(OrderDate) = 2026`,
`WHERE LEFT(Name,3) = 'Moh'`, `WHERE Amount * 1.1 > 100`. Sargable rewrite:
`WHERE OrderDate >= '2026-01-01' AND OrderDate < '2027-01-01'`.

**Q. Filtered index?**
An index with a WHERE clause, e.g. `WHERE Status = 'Pending'`. Small and fast when queries target a subset.

**Q. Downsides of too many indexes?**
Slower INSERT/UPDATE/DELETE, more storage, more maintenance. Check unused indexes with
`sys.dm_db_index_usage_stats`.

**Q. Fragmentation: reorganize or rebuild?**
Common guideline: reorganize between about 5% and 30% fragmentation, rebuild above 30%. Check with
`sys.dm_db_index_physical_stats`. On modern SSD storage, keeping statistics fresh often matters more than
fragmentation.

**Q. Columnstore index?**
Stores data by column and compresses it. Excellent for analytics and aggregates over millions of rows;
poor for single-row lookups. Typical for fact tables.

---

## 5. Performance tuning and execution plans

**Q. A query became slow. Walk me through it.**
1. Find it: Query Store, `sys.dm_exec_query_stats`, or Extended Events.
2. Measure: `SET STATISTICS IO, TIME ON` to see logical reads and CPU time.
3. Read the actual execution plan: look for scans on large tables, Key Lookups, Sorts, Hash Matches that spill
   to tempdb, and big gaps between estimated and actual rows.
4. Fix the cause: add or adjust an index, make predicates sargable, remove N+1 calls, select only needed
   columns, update statistics.
5. Re-measure and compare logical reads before and after.

**Your example:** in Atruha and the E-Commerce project you optimized queries behind dashboards and added
Redis caching. Describe it in MySQL terms (`EXPLAIN`, adding an index, caching a hot list) and then say the
SQL Server tools you would use.

**Q. What are statistics and why do they matter?**
Histograms of data distribution that the optimizer uses to estimate row counts. Stale statistics give bad
estimates and bad plans. `UPDATE STATISTICS dbo.Orders WITH FULLSCAN;`

**Q. What is parameter sniffing?**
SQL Server compiles a procedure plan using the first parameter values it sees. If those were unusual, the
cached plan is bad for everyone else. Fixes: `OPTION (RECOMPILE)` for that statement,
`OPTIMIZE FOR`, splitting into separate procedures, or Query Store plan forcing.

**Q. What is Query Store?**
A built-in history of queries, plans and runtime stats. Lets you find regressions and force a known good plan.

**Q. Key Lookup in a plan?**
The non-clustered index found the row but had to fetch extra columns from the clustered index. Fix with
INCLUDE columns if the query is frequent.

**Q. Implicit conversion?**
Comparing VARCHAR column to an NVARCHAR parameter (or INT to VARCHAR) forces a conversion and can prevent a
seek. Match data types.

**Q. Useful DMVs?**
`sys.dm_exec_query_stats`, `sys.dm_exec_requests`, `sys.dm_os_wait_stats`, `sys.dm_db_missing_index_details`
(treat suggestions as hints, not orders), `sys.dm_db_index_usage_stats`.

**Q. Common wait types?**
`PAGEIOLATCH_*` (reading from disk), `LCK_M_*` (blocking), `CXPACKET/CXCONSUMER` (parallelism),
`WRITELOG` (log write speed), `SOS_SCHEDULER_YIELD` (CPU pressure).

---

## 6. Stored procedures, functions, triggers

**Q. Why use stored procedures?**
Plan reuse, less network traffic, a security boundary (grant EXECUTE, not table access), and one place for
business logic close to the data.

**Template to practice:**
```sql
CREATE OR ALTER PROCEDURE dbo.usp_CreateOrder
    @CustomerId INT,
    @ProductId  INT,
    @Quantity   INT,
    @OrderId    INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRAN;

        UPDATE dbo.Products
        SET Stock = Stock - @Quantity
        WHERE ProductId = @ProductId AND Stock >= @Quantity;

        IF @@ROWCOUNT = 0
            THROW 50001, 'Insufficient stock.', 1;

        INSERT dbo.Orders (CustomerId, ProductId, Quantity, Status, CreatedAt)
        VALUES (@CustomerId, @ProductId, @Quantity, 'Pending', SYSUTCDATETIME());

        SET @OrderId = SCOPE_IDENTITY();

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;
        THROW;
    END CATCH
END;
```
Points to explain: `SET NOCOUNT ON`, `XACT_ABORT ON`, TRY/CATCH with rollback, `THROW` to re-raise,
`SCOPE_IDENTITY()` instead of `@@IDENTITY`, and the conditional UPDATE that prevents overselling.

**Q. Procedure vs function?**
Functions return a value or table and can be used inside SELECT, but cannot change data. Scalar UDFs used to
run row by row and hurt performance (SQL Server 2019+ can inline some). Prefer inline table-valued functions.

**Q. Triggers: when and when not?**
Useful for audit logging. Avoid putting business logic in them: hidden, hard to debug, and they must handle
multi-row operations using the `inserted` and `deleted` tables.

**Q. Dynamic SQL safely?**
Use `sp_executesql` with parameters, and `QUOTENAME()` for object names. Never concatenate user input.

---

## 7. Transactions, isolation and locking

**Q. ACID?**
Atomicity (all or nothing), Consistency (constraints hold), Isolation (concurrent transactions do not see
each other's partial work), Durability (committed data survives a crash, via the transaction log).

**Q. Isolation levels and the problems they prevent?**

| Level | Dirty read | Non-repeatable read | Phantom |
|---|---|---|---|
| READ UNCOMMITTED | possible | possible | possible |
| READ COMMITTED (default) | prevented | possible | possible |
| REPEATABLE READ | prevented | prevented | possible |
| SERIALIZABLE | prevented | prevented | prevented |
| SNAPSHOT | prevented | prevented | prevented (uses row versions) |

Also know **READ_COMMITTED_SNAPSHOT (RCSI)**: readers see the last committed version instead of waiting on
writers. Azure SQL Database turns it on by default.

**Q. Why is NOLOCK dangerous?**
It reads uncommitted data, and can return rows twice or miss rows. Not acceptable for financial or payroll data.

**Q. Blocking vs deadlock?**
Blocking: one session waits for another's lock. Deadlock: two sessions wait on each other; SQL Server kills one
(error 1205). Reduce by accessing tables in the same order, keeping transactions short, and good indexes.
Investigate with the `system_health` Extended Events session.

---

## 8. High availability and disaster recovery

**Two numbers to define first:**
- **RPO** (Recovery Point Objective): how much data loss is acceptable.
- **RTO** (Recovery Time Objective): how long the system may be down.

**Q. Recovery models?**
- SIMPLE: no log backups; restore only to the last full/differential backup.
- FULL: log backups allow point-in-time restore. Needed for production and for Always On.
- BULK_LOGGED: minimal logging for bulk loads; limits point-in-time restore during those operations.

**Q. Backup types and a strategy?**
Full, differential, transaction log. Example: weekly full, daily differential, log backup every 15 minutes
(RPO about 15 minutes). Use `WITH CHECKSUM`, store copies off-site, and **test restores regularly**.
A backup you never restored is not proven.

**Q. Restore sequence?**
Last full → last differential → every log backup in order, `WITH NORECOVERY` until the last, then
`WITH RECOVERY`. Use `STOPAT` for point-in-time.

**Q. Compare SQL Server HA/DR options.**

| Option | Scope | Failover | Readable secondary | Notes |
|---|---|---|---|---|
| Always On Availability Groups | Group of databases | Automatic (sync mode) | Yes | Most common modern choice; needs Windows cluster (or clusterless for read-scale) |
| Failover Cluster Instance | Whole instance | Automatic | No | Shared storage; protects against server failure, not storage failure |
| Log shipping | Database | Manual | Limited (standby mode) | Simple, cheap DR; delay equals backup interval |
| Replication | Tables/objects | Not an HA tool | Yes | For distributing data, reporting copies |

**Q. Synchronous vs asynchronous commit?**
Synchronous: the primary waits for the secondary to harden the log; no data loss, a little latency; used within
one data center. Asynchronous: no waiting; possible data loss; used for distant DR sites.

**Q. Azure SQL equivalents?**
Built-in HA in every tier, automated backups with point-in-time restore, active geo-replication, and
auto-failover groups (one listener endpoint that follows the primary across regions).

**Your honest line:** "I haven't operated Always On in production. In my projects we relied on managed
database backups. Here's how I would design it for an RPO of 15 minutes and RTO of 1 hour..."

---

## 9. Data migration and reconciliation

**Q. How do you plan a migration (for example MySQL to SQL Server)?**
1. Inventory: tables, row counts, data types, constraints, procedures, jobs.
2. Map types: MySQL `TINYINT(1)` → `BIT`, `DATETIME` → `DATETIME2`, `TEXT` → `NVARCHAR(MAX)`,
   `AUTO_INCREMENT` → `IDENTITY`, UTF-8 text → `NVARCHAR` (or a UTF-8 collation).
3. Tools: SQL Server Migration Assistant (SSMA), SSIS, Azure Data Factory, Azure Database Migration Service,
   `bcp`/BULK INSERT for large tables.
4. Load in order: parents before children; disable non-critical indexes and re-enable after the bulk load.
5. Rehearse on a copy, time it, then plan the cutover window and a rollback plan.

**Q. How do you reconcile after migration?**
- Row counts per table on source and target.
- Sums of key numeric columns (total payroll, total order amount) per month.
- Hash comparison per row or per batch (`HASHBYTES('SHA2_256', CONCAT_WS('|', col1, col2, ...))`).
- Check orphan rows (child rows with no parent), NULLs in mandatory columns, duplicate keys.
- Spot-check sample records with the business team, and keep a signed-off reconciliation report.

```sql
-- Find rows in source staging that are missing or different in target
SELECT s.Id
FROM stg.Employees s
LEFT JOIN dbo.Employees t ON t.Id = s.Id
WHERE t.Id IS NULL
   OR HASHBYTES('SHA2_256', CONCAT_WS('|', s.Name, s.DepartmentId, s.Salary))
   <> HASHBYTES('SHA2_256', CONCAT_WS('|', t.Name, t.DepartmentId, t.Salary));
```

**Q. Incremental loads?**
Watermark column (`ModifiedAt`), Change Tracking, or Change Data Capture (CDC). Use `MERGE` carefully
(known edge cases) or separate UPDATE + INSERT statements.

---

## 10. Data warehouse and analytics layer

**Q. OLTP vs OLAP?**
OLTP: many small writes, normalized, current data (StafWise, Atruha transactions). OLAP: large reads and
aggregates, denormalized, historical data.

**Q. Star schema vs snowflake?**
Star: one fact table (measures like SalesAmount, Quantity) surrounded by denormalized dimension tables
(Date, Product, Customer). Snowflake normalizes dimensions further. Star is simpler and faster for BI.

**Q. Fact table types?**
Transaction (one row per event), periodic snapshot (daily stock price per symbol), accumulating snapshot
(order lifecycle with several dates).

**Q. Slowly Changing Dimensions?**
- Type 1: overwrite (lose history).
- Type 2: new row with `ValidFrom`, `ValidTo`, `IsCurrent` (keep history). E.g. employee department changes.
- Type 3: keep previous value in an extra column.

**Q. ETL vs ELT?**
ETL transforms before loading (SSIS). ELT loads raw data first and transforms inside the warehouse
(Azure Synapse, Fabric). Staging tables, then dimensions, then facts.

**Your angle:** Atruha's dashboards are an analytics layer over stock data. Explain how you would model it:
`FactDailyPrice (DateKey, StockKey, Open, High, Low, Close, Volume)` with `DimDate` and `DimStock`
(symbol, company, sector, market TASI/Nomu), plus a columnstore index on the fact table.

---

## 11. Azure SQL and DP-300

**Q. Azure SQL options?**
- **Azure SQL Database:** single database or elastic pool, fully managed (PaaS).
- **Azure SQL Managed Instance:** near-full SQL Server compatibility (SQL Agent, cross-database queries);
  good for lift-and-shift.
- **SQL Server on Azure VM:** full control, you manage OS and SQL Server (IaaS).

**Q. Purchasing models?**
DTU (bundled compute/storage/IO) and vCore (choose compute and storage separately; tiers General Purpose,
Business Critical, Hyperscale). Serverless compute can auto-pause on idle databases.

**Q. Security features?**
Microsoft Entra ID authentication, firewall rules and private endpoints, Transparent Data Encryption
(on by default), Always Encrypted, Dynamic Data Masking, Row-Level Security, auditing, Microsoft Defender for SQL.

**DP-300 (Azure Database Administrator Associate):** the certification the recruiter lists as preferred.
Topics: plan and implement data platform resources, secure the environment, monitor and optimize, automate
tasks, plan and configure HA/DR. Check the current exam outline on Microsoft Learn before booking, because
Microsoft updates the skills list. Microsoft Learn has a free learning path and a free practice assessment.

---

## 12. Scenario questions from your projects

**S1. Two customers buy the last item at the same moment (E-Commerce).**
Conditional update inside a transaction: `UPDATE Products SET Stock = Stock - 1 WHERE ProductId = @Id AND Stock > 0`,
then check `@@ROWCOUNT`. Or `SELECT ... WITH (UPDLOCK, ROWLOCK)` inside the transaction. See the procedure in section 6.

**S2. Payroll ran twice for the same month (StafWise).**
Unique constraint on `(EmployeeId, PayrollMonth)` so a second run fails, run the batch in one transaction,
lock the month after approval, and record adjustments as new rows, not edits.

**S3. One company sees another company's employees (StafWise).**
`OrganizationId` on every tenant table, indexed and filtered on every query, taken from the authenticated
session. In SQL Server, add Row-Level Security with a security predicate function as a second layer.

**S4. The Atruha dashboard query for 350+ stocks is slow.**
Check the plan; add an index on `(StockId, TradeDate DESC) INCLUDE (ClosePrice, Volume)`; precompute daily
aggregates in a summary table; cache the latest snapshot in Redis; avoid one query per stock (N+1).

**S5. Timetable double-booking in Acadlynk.**
Overlap rule: `NewStart < ExistingEnd AND NewEnd > ExistingStart` for the same teacher or room, checked
inside a SERIALIZABLE transaction (or with `UPDLOCK, HOLDLOCK`) so two admins cannot book the same slot.

**S6. Reporting queries slow down the live app.**
Move reporting to a readable secondary (Always On), a read replica in Azure, or a separate reporting/warehouse
database loaded on a schedule. Turn on RCSI so readers do not block writers.

**S7. Someone deleted rows in production by mistake.**
Stop further damage, note the exact time, restore the database to a new name at a point just before the
delete (`STOPAT`), and copy the missing rows back. Afterwards: least-privilege permissions, and require
reviewed scripts for production changes.

---

## 13. Hands-on practice queries

Practice these in SQL Server Developer Edition (free) or Azure SQL free offer.

```sql
-- 1. Second highest salary per department
SELECT DepartmentId, Salary
FROM (
    SELECT DepartmentId, Salary,
           DENSE_RANK() OVER (PARTITION BY DepartmentId ORDER BY Salary DESC) AS rnk
    FROM dbo.Employees
) x
WHERE rnk = 2;

-- 2. Remove duplicate emails, keep the earliest row
WITH d AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY Email ORDER BY CreatedAt) AS rn
    FROM dbo.Users
)
DELETE FROM d WHERE rn > 1;

-- 3. Running total of daily revenue
SELECT OrderDate,
       SUM(TotalAmount) AS DailyRevenue,
       SUM(SUM(TotalAmount)) OVER (ORDER BY OrderDate ROWS UNBOUNDED PRECEDING) AS RunningTotal
FROM dbo.Orders
GROUP BY OrderDate;

-- 4. 7-day moving average closing price per stock (Atruha-style)
SELECT StockId, TradeDate, ClosePrice,
       AVG(ClosePrice) OVER (PARTITION BY StockId ORDER BY TradeDate
                             ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS MA7
FROM dbo.DailyPrices;

-- 5. Employees with no attendance this month
SELECT e.EmployeeId, e.Name
FROM dbo.Employees e
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.Attendance a
    WHERE a.EmployeeId = e.EmployeeId
      AND a.AttendanceDate >= DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1)
);

-- 6. Recursive CTE: employee → manager hierarchy
WITH org AS (
    SELECT EmployeeId, Name, ManagerId, 0 AS Lvl
    FROM dbo.Employees WHERE ManagerId IS NULL
    UNION ALL
    SELECT e.EmployeeId, e.Name, e.ManagerId, o.Lvl + 1
    FROM dbo.Employees e
    JOIN org o ON e.ManagerId = o.EmployeeId
)
SELECT * FROM org;

-- 7. Top 3 products by revenue per category
SELECT * FROM (
    SELECT p.CategoryId, p.Name, SUM(o.TotalAmount) AS Revenue,
           ROW_NUMBER() OVER (PARTITION BY p.CategoryId ORDER BY SUM(o.TotalAmount) DESC) AS rn
    FROM dbo.Orders o JOIN dbo.Products p ON p.ProductId = o.ProductId
    GROUP BY p.CategoryId, p.Name
) x WHERE rn <= 3;
```

---

## 14. HR questions for this role

**Why database development?**
"The part of my work I enjoy most is the data layer: designing schemas, making slow queries fast, and keeping
data correct for things like payments and payroll. I want to go deeper there instead of spreading across
frontend and mobile."

**Why Qatar / the Gulf?**
"I already work on products for the Gulf market. Atruha Finance covers the Saudi Exchange and has an Arabic
interface, so I understand the region's users and bilingual requirements. I'm open to relocating."

**Your biggest gap for this role?**
"Years of experience and production SQL Server. I'm closing the SQL Server gap with hands-on practice and
DP-300 preparation, and I learn fast: I moved from a mechanical diploma into computer science and shipped
production systems within two years."

**Salary, notice period, relocation:** have exact numbers ready for the checklist table (Current CTC,
Expected CTC, Notice Period). Research Qatar salary ranges for your experience level before you state a figure.

**Questions to ask them:**
- Which SQL Server version and is it on-premises or Azure?
- What does the HA/DR setup look like today?
- Is there an ongoing migration or data warehouse project this role supports?
- What would success look like in the first six months?

---

## 15. Two-week study plan

| Days | Focus | Output |
|---|---|---|
| 1–2 | Install SQL Server Developer Edition + SSMS; recreate a small StafWise-style schema | Working database with sample data |
| 3–4 | T-SQL querying, window functions, CTEs (section 13) | All 7 practice queries solved |
| 5–6 | Indexes and execution plans; compare logical reads before/after an index | Screenshot notes of a plan improvement |
| 7 | Stored procedures, TRY/CATCH, transactions (section 6) | Your own `usp_CreateOrder` |
| 8 | Isolation levels, blocking, deadlocks; reproduce a deadlock in two SSMS tabs | Deadlock graph captured |
| 9–10 | Backups, restore, point-in-time restore; read about Always On | Full + log backup and a successful restore |
| 11 | Migration: move a MySQL table to SQL Server with SSMA or bcp; reconcile counts and hashes | Reconciliation query result |
| 12 | Star schema: build `FactDailyPrice` + `DimDate` + `DimStock`; add a columnstore index | Small warehouse model |
| 13 | Azure SQL free tier: create a database, geo-replication concepts, Query Store | Notes for section 11 |
| 14 | Mock interview: answer sections 1, 12 and 14 out loud | Recorded 60-second intro |

After this plan, anything you have actually done (for example "restored a database to a point in time",
"tuned a query from N to M logical reads") is something you can honestly mention, but describe it as practice
work, not production experience.
