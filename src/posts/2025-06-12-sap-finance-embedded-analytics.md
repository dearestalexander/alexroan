---
title: SAP S4HANA Embedded Analytics for FInance - Apps, Architecture, and Implementation Tips
author: Alexander Roan
date: 2025-06-12
tags: 
hashtags: ["post", "article", "finance", "featured"]
project: 
subproject:
image: /assets/images/blog/embedded-analytics/embedded-analytics-cover.jpg
imageAlt:
description: Embedded analytics in SAP S/4HANA sounds like a BW in SAP, but it's not. It's a core capability that utilises HANA, the virtual data model and Fiori to blend analytics and transactions in real time. It's part of the core S/4HANA platform. In this post, I explain the architecture, key app types, and how to approach implementation with real examples from finance.
---

## Introduction

If you come from the world of SAP R/3 or SAP ECC, you may hear the term ‘embedded analytics’ and assume it refers to a module or add-on, but it’s really a capability built into S/4HANA itself.

In this post, I’ll walk through embedded analytics, showing some examples for finance and sharing a few thoughts based on my own experience.

### The old paradigm

SAP R/3 and SAP ECC are transactional systems. They sit on top of traditional relational databases that are not optimised for analytical operations. They couldn’t efficiently calculate totals on the fly, never mind aggregation, filtering, sorting etc.

(That’s why the general ledger had totals tables like GLT0 and FAGLFLEXT).

Secondly, the SAP graphical user interface (SAP GUI), was relatively static. It wasn’t easy to create role or context specific transactions.

### The new paradigm

From SAP ECC to SAP S/4HANA, one of the biggest changes is the HANA database. It brings three new capabilities:

1. In memory computing

2. Columnar store

3. Parallel processing.

Combined, these enable S/4HANA to efficiently handle analytical operations.

Secondly, the new user interface: Fiori, is built on common technologies, HTML, CSS, JavaScript etc. This makes Fiori less proprietary and more dynamic.

SAP positions Fiori as a design language as well as a set of apps. They have published a [design system](https://www.sap.com/design-system/?external) to allow customers to build their own apps. Many of the analytical apps we will look at are based on re-usable design templates.

## Enter the ‘analytical app’

This combination of flexibility from Fiori and power from HANA means we can create role based analytical apps.

- There is no longer a need to load data to a data warehouse
- There is no longer a need to implement a separate analytics or dashboard user interface.

Fiori itself includes many transactional and analytical apps. With embedded analytics, we are referring to a subset of popular analytical apps.

I would break down embedded analytics into three categories:

- Analytical apps
  - Overview pages
  - Analytical list pages
  - Multi-dimensional reports
  - Smart business KPIs
  - Review booklets
- Tools
  - Query browser
  - View browser
- Embedded SAP analytics cloud.

Let’s look at each one and discuss some examples.

## Analytical Apps by Category

Before we start, let’s look at how to find information about apps online.

### How to find apps

The Fiori app library is published online: [Fiori apps library](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F4067')/S30PCE).

An important note is that app availability varies by S/4HANA version. For example, some apps will release in Cloud version first before coming to on-premise versions. Other apps may only be available in Cloud versions. For the purposes of this post, we will look at all versions. Some apps listed may only be available on the Cloud.

1. Under categories, select ‘all apps’ (16,932 apps listed!)
2. On the bottom right of the left sidebar, click the ‘filter’ icon
3. Enter some filters e.g. ‘Analytical’ apps, ‘Finance’ line of business

This gives a much more focused list of apps to scroll through (351).

We will look at ‘overview’ apps first. Enter ‘overview’ in search to narrow the list further. A list of apps that include the following is shown:

- Revenue accounting overview
- General ledger overview
- Accounts receivable overview
- Sales accounting overview
- Asset accounting overview
- Accounts payable overview

![Fiori app library](/assets/images/blog/embedded-analytics/appsearch-0.jpg)
![Fiori app library](/assets/images/blog/embedded-analytics/appsearch-1.jpg)

### Overview pages

#### Purpose

I would describe the overview page apps as analytical ‘home pages’ for a function. They show more detail than a simple KPI, but less detail than a more focused report.

They could be considered an entry level view into the analytics for the area in question.

Overview pages have a consistent layout. A header at the top with a range of search fields, followed by the content area, which is made up of cards. The cards may have charts, values, links etc. Users can drill down from the cards to see more detail.

Content ‘cards’ are a well-established concept in frontend design, and it’s good to see SAP embrace this.

SAP provide several standard overview pages. Customers can develop their own.

#### Example – General ledger overview

I found two different iterations of the general ledger overview. The first is from the Fiori app library, the second from the analytics SAP help page. This highlights how pages can be set up differently.

![App - general ledger overview - sample 1.](/assets/images/blog/embedded-analytics/gl-ovp.png)

![App - general ledger overview - sample 2](/assets/images/blog/embedded-analytics/gl-ovp-2.png)

#### Layout and contents

They are split into two main content sections:

Filter toolbar at the top:

- The filter affects all the cards on the page
- `Adapt filter` can be used to add/remove fields
- A set of filters can be saved as a variant. For example – a range of company codes.

Multiple cards are displayed below the filters:

- The cards show either charts or lists
- Users can move or hide cards. A card can be set as mandatory
- Examples of cards for general ledger overview include:
  - G/L account balance
  - Recognised revenue
- Drill-down is possible at multiple levels:
  - Click the card header for less granular drill down
  - Click card detail such as a bar chart column to see details

#### My thoughts

I like these overview pages. They come across as a classic functional dashboard. Having this directly in S/4HANA is great.

Key here is the customisation. If we take a typical general ledger accountant or manager, their focus tends to vary widely by organisation and industry.

In financial services, for example, I would want my overview screen to show recent transactions on certain accounts where accuracy and substantiation of assets is critical.

In manufacturing, I may want a view more oriented towards cost of goods sold or profit and loss by function.

I don’t think I’ve ever encountered a G/L accountant who cared about days payables outstanding, so it’s unusual to see that there. I could understand a cash flow metric being there, though.

#### References

- [Fiori app library – general ledger overview](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F2445')/S30PCE)
- [SAP help – general ledger overview](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/651d8af3ea974ad1a4d74449122c620e/a5f2a13c0e0f408d9481190784a49b13.html?locale=en-US)
- [Best practices – SAP Fiori Analytical Apps for G/L Accounting](https://me.sap.com/processnavigator/SolP/BGC)
- [Help SAP – SAP UI5 development – overview pages](https://help.sap.com/docs/ABAP_PLATFORM_NEW/468a97775123488ab3345a0c48cadd8f/c64ef8c6c65d4effbfd512e9c9aa5044.html?locale=en-US)

### Analytical list pages (ALP)

#### Purpose

Analytical list pages aim to bring together analytical and transactional work. The idea is to combine an analytical view with transaction data such that, the analytics provide a basis to act.

The best examples of these layouts combine a filter, a chart and a work list of items into one page.

In the Fiori app library, these will be marked as Fiori elements apps. SAP provide templates, customer can also create their own. They all have headers which allow for filtering and sorting.

#### Example: Commitments by cost centre

![Analytical list app - commitments by cost centre](/assets/images/blog/embedded-analytics/commitments.png)

Commitments is a great example. An accountant may want to monitor commitments to spot something that is out of line with plan or previous period actuals.

In case you are not familiar with commitments, let’s go into more detail.

In this app you can compare commitments, actuals, and plan/budget:

- **Commitments**: these are goods or services you have agreed to buy but haven’t yet received or paid for. There is no accounting impact yet: consider them as planned future expenses
  - In S/4HANA this could be a purchase requisition or purchase order with no goods receipt or invoice receipt
  - Commitments data comes from the extension ledger in the universal journal
- **Actuals**: actual accounting postings to cost centres come from the universal journal (ACDOCA) main ledger
- **Budget/plan**: can either come from the universal journal plan table (ACDOCP) or BW.

S/4HANA utilises ‘extension ledgers’ for commitment tracking, an example:

- Purchase requisition/purchase order (PR/PO) for £10,000
  - Commitment created for £10,000 (if the PO is linked to a cost centre)
- Goods receipt (GR) is received
  - Commitment is reduced by £10,000
  - Actual cost is posted for £10,000 (via accounting journal)
- Invoice receipt (IR) is received
  - Clears GR/IR account and finalises the transaction

In ECC commitment information was stored in CO tables. With the S/4HANA changes it has moved to an extension ledger of the universal journal. It is separated out from the main ledger (ACDOCA) as these aren’t accounting postings.

This app pulls:

- Actuals from ledger 0L
- Commitments from extension ledger (usually OE)

#### Example 2: Allowance for doubtful accounts

![Analytical list app - allowance for doubtful accounts](/assets/images/blog/embedded-analytics/allowance-for=doubtful-accounts.jpg)

Shifting from payables to receivables, another good example is doubtful debts. This app is called allowance for doubtful accounts.

The chart on the top half does an excellent job of showing the difference between overdue receivables and allowances made.

This may trigger an accountant to either change the allowances made or to follow up on some overdue items.

The customer balances are shown under the chart, and the accountant can drill down into the individual line items.

#### Layout and contents

- Header to set filters
  - Compact display: simple drop-down lists (see example 1)
  - Visual display: mini charts (see example 2)
- Content area 1: charts/lists
  - Charts are shown summarising KPIs to identify areas to investigate
  - There is a toolbar to change chart/list types and content
  - Charts are interactive. Clicking on them filters the work list shown below
- Content area 2: list of transactions i.e. work list
  - Add/remove fields
  - You can 'group' transactions by dimension in settings
  - Drill-down using a variety of apps to different levels of detail

#### References

- [App library – commitments by cost center](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F3016')/S30PCE)
- [Help sap – commitments by cost center](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/90d3445c84e94bddba8660fda05f93fb.html?locale=en-US)
- [App library – allowance for doubtful accounts](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F2686')/S30PCE)
- [Help sap – allowance for doubtful accounts](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/3cb1182b4a184bdd93f8d62e3f1f0741/c6c8af53b9754824b6c1eb0694a94a40.html?locale=en-US)
- [Help – SAP UI5 development – analytical list page](https://help.sap.com/docs/ABAP_PLATFORM_NEW/468a97775123488ab3345a0c48cadd8f/3d33684b08ca4490b26a844b6ce19b83.html?locale=en-US)

### Multidimensional reports

#### Purpose

These apps are analytical queries. You could think of them like pivot tables in MS Excel. They allow you to select different dimensions and choose whether to split data into rows or columns via those dimensions.

They are a special kind of Fiori app labelled as Web Dynpro apps in the app library.

Like other apps, they’re launched from tiles on the Fiori launchpad. However, they can also be launched from the query browser, which will be discussed later.

Multidimensional report capabilities:

- Usually a long list of dimensions (depends on the query)
- Sorting
- Filtering
- Switching dimensions
- Pivot
- Add totals
- Display data hierarchically
- Drill-down
- Bookmark navigation state - makes it easy to share or return after drill-down
- Save page layout (after organising)
- Export to MS Excel or PDF
- Create new Fiori tile from the report
- Navigate to other apps
  - For example, from a customer you can use the right click context menu to navigate to apps such as view sales order, change sales order

As these multidimensional reports are based on queries that contain many fields, users need to select what’s of interest to them via the navigation panel.

#### Example: Balance sheet/income statement – multidimensional

![Multidimensional report - balance sheet/income statement](/assets/images/blog/embedded-analytics/balance-sheet.jpg)

- Generated ‘on the fly’ from line items (ACDOCA)
- Can select operational, local or group chart of accounts
- Drill down into individual G/L account line items
- Export to excel or PDF
- Various features
  - Add dimensions such as profit centre, segment
  - Show various currencies
  - Compare periods
  - Compare actual / plan
  - Compare actuals across multiple ledgers
  - Link through to ‘display G/L account balances’, ‘display line items in general ledger’ etc.

This app is based on the CDS view `C_FinStmntComparison`. More on this later.

#### Example 2: Journal Entry Analyser

![Multidimensional app - journal entry analyser](/assets/images/blog/embedded-analytics/journal-entry-analyzer.jpg)

- Overview of aggregated amounts of selected journal entries by G/L account
- You can choose to group by many options; company code, fiscal year, posting date, business area, functional area, profit centre
- Drill down into each journal to see detail

This app is based on the CDS view `C_GLLINEITEMSQ0001`. More on this later.

#### Layout and contents

- Search filters at the top
- Left side navigation panel, which allows you to select row and column fields
- Data table to the bottom/right

#### References

- [Fiori app library – balance sheet/income statement - multidimensional](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('W0161')/S30PCE)
- [SAP help – balance sheet/income statement - multidimensional](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/651d8af3ea974ad1a4d74449122c620e/d8d608a19a5449f9916fc5a2ff8fb12f.html?locale=en-US&state=PRODUCTION&version=2023.003)
- [Fiori app library – journal entry analyser](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F0956')/S30PCE)
- [SAP help – journal entry analyser](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/651d8af3ea974ad1a4d74449122c620e/ea2e03565eea410ee10000000a441470.html?locale=en-US)
- [Multidimensional data grid apps](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/f7a8c8547996b109e10000000a423f68.html?locale=en-US)
- [Data analyser reports](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/03898508f364492cb82913a2c15b6527.html?locale=en-US)

### Smart business key performance indicators (KPIs)

#### Purpose

These are tiles that you place on the Fiori launchpad to show specific key performance indicators (KPIs). The KPIs can be shown as values or via mini charts.

SAP delivers various predefined KPIs. Users can select them from a role-based catalogue.

[Custom KPIs](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/cd00a13df0ca4194a625a2667a8e96ff.html?locale=en-US) can also be created.

The KPI tiles support drill down into more detail via other analytical apps. For example, drill down into a multidimensional report. See also the section on analytical path framework at the end.

#### Example: Accounts payable

![A launchpad page with various AP KPIs.](/assets/images/blog/embedded-analytics/accounts-payable-smart-KPIs.jpg)

This screenshot from [SAP learning](https://learning.sap.com/learning-journeys/discovering-sap-s-4hana-embedded-analytics/working-with-smart-business-kpis_aa722ae8-5aa9-47db-b2d4-7252da8014da) shows various KPI tiles for Accounts Payable arranged on a Fiori launchpad page. The first is ‘overdue payables’ – app ID F1746 ([SAP Help](https://help.sap.com/docs/SAP_S4HANA_CLOUD/031c345485b84c8c94265be9ef61d3a8/a8848854c46ee75ee10000000a44176d.html?locale=en-US) / [Fiori app library](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F1746')/S30PCE)).

#### Layout and contents

- Individual tiles organised on Fiori Launchpad pages
- Tiles show either values or mini charts
- Tiles can be configured to highlight value based on predefined ranges. In the example cash discount utilisation is highlighted in red.

#### My thoughts

These tiles are very useful. It’s a flexible way to build a dashboard for a specific user role. The embedded analytics features: real-time data, and drill-down add a lot of power here.

To get the most out of this requires some thought. A common mistake a project team might make is to throw all Accounts Payable KPIs on a single page for an AP clerk or AP manager. However, if you think about these KPIs, the context of how the information can be used varies widely.

I could envision a set of KPIs for an Accounts Payable clerk or manager that they may review and action daily. This could include overdue payables. Personally, I may want to add KPI tiles for topics such as blocked invoices, or payment status for critical vendors.

On the other hand, I may set up a different page for the monthly reviews that include KPIs like invoice processing time, ageing analysis, reversals etc.

#### References

- [SAP Help – manage KPIs and reports](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/c00cbf7fe8464663aee830fb6e7eec13.html?locale=en-US)
- [SAP Help – financial statement based KPIs](https://help.sap.com/docs/SAP_S4HANA_CLOUD/6b39bd1d0e5e4099a5b65d835c29c696/35637a796f0b481d85d524d5ef364b53.html?locale=en-US)

### Review booklets

#### Purpose

Review booklets combine multiple related reports into a collection of easy to navigate pages.

One of the first review booklets was "group financial statements". This makes sense, as the financial statements are a set of reports that together measure the state of an organisation.

Features of review booklets:

- Utilise analytical queries
- Similar functionalities to multidimensional reports; pivot tables, drill-downs, hierarchies
- As with other apps, this is a template design. Review booklets can be created or adapted
- Group Financial Statements includes:
  - Consolidated balance sheet
  - Profit and loss statement
  - Cash flow statement
  - Statement of changes in equity

Review booklets are a good example of apps that were delivered in S4/HANA cloud first. I believe the first booklets will be available for on-premise this year.

#### Example: Group financial statements (F6133)

![Group financial statements review booklet - one](/assets/images/blog/embedded-analytics/review-booklets-1.jpg)

![Group financial statements review booklet - two](/assets/images/blog/embedded-analytics/review-booklets-2.jpg)

#### Other examples

- [Cost centers review booklet (F7763)](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F7763')/S34)
- [Group view on accounting (F6401)](https://help.sap.com/docs/SAP_S4HANA_CLOUD/90c07e91c7a64f328be3fd6b48955b13/e9bf7e567b2b42f78a6ac25f6e5f061d.html?locale=en-US)
- [Service and profitability review booklet (F6600)](https://help.sap.com/docs/SAP_S4HANA_CLOUD/e6175604fc874bfe84aa14d2f9ae1fbd/9fe7a855d2da46dabf0e729bf462161e.html?locale=en-US)

#### Layout and contents

- Global filters: affect content on all pages
- Page filters: affect the content on a single page
- The booklet is split into page groups (like tabs)
- Each page group has one or more pages to subdivide the topic
- Each page shows pivots and/or charts side by side
- Columns and rows can be adjusted
- Side toolbar: from multidimensional reports
- Right sidebar: with formatting options
- Navigate from review booklets to other apps
  - Global and page filters are applied as you navigate.

Views can be saved and shared if authorisation allows.

#### References

- [Fiori app library – group financial statement review booklet](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F6133')/S30PCE)
- [SAP help – group financial statements review booklet](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4ebf1502064b406c964b0911adfb3f01/55a7b8dafa7942e3891d22722d6f34c7.html?locale=en-US)
- [Review booklets](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/68b8107b923a4538b42920caa2dee102.html?locale=en-US)
- [Review booklet designer](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/2acb23f7cabc472a8aec1988ed15b1ac.html?locale=en-US)

### Query browser

#### Purpose

The query browser isn’t an analytical app itself; it’s an app to search for analytical queries. You can however launch analytical queries from within the query browser. This opens them as multidimensional reports.

Analytical queries are a special type of CDS view. I will cover this later under solution architecture. I’ll note here that you can browse finance CDS view online. [Help portal – CDS views for Finance](https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/70efdf57f8c2073ee10000000a4450e5.html?locale=en-US).

If you click on CDS views for general ledger and then look for items with a technical name starting `C_\` these are analytical queries. For example, in this list, we can see the query `C_FinStmntComparison` that was used in the balance sheet/income statement multidimensional report.

Query features

- SAP provides many standard queries
- Customers can develop their own queries
- Access to queries is role-based
- Queries can be added to favourites
- Queries collect data by business scenario
- The data is projected into the multidimensional analysis tool

Note that the query browser does not identify underlying views or source tables, but the view browser can show this.

#### Example

![Query browser](/assets/images/blog/embedded-analytics/query-browser.PNG)

Unfortunately, I don’t have a screenshot of a finance query to hand, but here is a screenshot of the sales order item query (C_SalesOrderItemQry):

![Query browser - sales order item](/assets/images/blog/embedded-analytics/sales-order-item-query.jpg)

Note the "open for analysis" button on the bottom right, this will open the query as a multidimensional report.

#### Layout and contents

On the first page, you will see a list of analytical queries. For navigation:

- **Search:** search for analytical views (or tables, view descriptions, column names, annotations, user tags)
- **Filter**: filter by tag or application component

After selecting a query, you will see query details and the option to open for analysis.

#### References

- [Fiori app library – query browser](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F1068')/S30PCE)
- [SAP help – query browser](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/3a24b854ee8f8d21e10000000a44176d.html?locale=en-US)

### View browser

The query browser only shows analytical queries. Those are CDS views of type "consumption". However, the information presented is limited.

The view browser shows all CDS views with more detail.

[Analytics – view browser](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/0bde695751505c08e10000000a441470.html?locale=en-US)

### Embedded SAC

#### Purpose

So, SAP analytics cloud is a whole other thing!

But you get a taste of analytics cloud with embedded analytics called ‘SAP analytics cloud embedded version’

To illustrate the difference, we could consider \`stories\`: one of the key features of analytics cloud. This is where we bring together values, charts, and other visualisations: images, pictograms, etc. to create a story.

For example, a management accountant may use multidimensional reports for analysis. They may then use a story to link together various pieces of information to explain a situation. A simple example might be showing a decline in profitability in a story which highlights a couple of connected things, reducing volume from a key customer and increasing costs for a particular cost centre.

What exactly is included with the 'SAP analytics cloud embedded version'?

- Limited set of features
- S/4HANA data only
- Wrapped in Fiori UI
- Stories can be set as jump targets from embedded analytics apps
- Small number of predefined stories
- Ability to create your own stories

#### Example: operating income

![SAP analytics cloud - operating income](/assets/images/blog/embedded-analytics/analytics-cloud.jpg)

Source: SAP learning

#### Example: working capital

![SAP analytics cloud - working capital](/assets/images/blog/embedded-analytics/analytics-cloud-working-capital.png)

Source: SAP help

#### References

- [SAP help – stories](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/22c3b9bd3f80442bbe1e2f7f8885f6e3.html?locale=en-US)
- [SAP help – integrate SAP analytics cloud content](https://help.sap.com/docs/SAP_S4HANA_CLOUD/918bca53037f408f91a2295d04ac16bc/6e8059e6ae454c4e8b4dedce6f13f5b1.html?locale=en-US)
- [SAP help – data visualisations (stories)](https://help.sap.com/docs/SAP_ANALYTICS_CLOUD/00f68c2e08b941f081002fd3691d86a7/29e0feaf17584e118ef30e6102008224.html?locale=en-US)

### Other items

#### Analytical path framework

When browsing analytical apps, you may come across this term.

This is the approach to define how you drill down from KPIs into details. For example, from a KPI you may want to drill down into a chart, then from the chart into multidimensional reporting.

[Analysis path framework](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/42d2df5636eb307be10000000a44147b.html?locale=en-US)

## Solution Architecture

Let’s look at the main components of the solution architecture.

Embedded analytics is made possible by:

1. The performance capabilities of HANA database tables
2. Various features of Fiori (web-based, flexible, role-based, extensible etc.)

One piece of the puzzle which I’ve hinted at but not explained is the virtual data model, which sits between the tables and Fiori.

![Solution architecture](/assets/images/blog/embedded-analytics/solution-architecture.jpg)

You can [download](/assets/images/blog/embedded-analytics/S4HANA-Embedded-Analytics-Arch.pptx) the PowerPoint version of this diagram.

### Virtual data model (VDM)

SAP database tables are mostly structured by module and business transaction. Analytical apps in Fiori are structured by user-role and business scenario. We need a way to bridge this gap.

In a simple application, data is retrieved from tables directly using code (usually SQL).

However, as we are talking about thousands of tables and thousands of apps, SAP came up with a better way to manage this.

This is the virtual data model (VDM).

As per the name, it’s a virtual structure only. Data is not stored in the VDM.

The VDM is made up of core data services views (CDS views), it will make more sense if we describe those.

### Core data services (CDS)

Think of a CDS view as the specification of a set of fields along with information about those fields. They are code based and are a mix of SQL and SAP proprietary language.

CDS views are structured into layers:

- Basic views
  - These are the lowest level CDS views
  - They get data from tables
  - In finance think ACDOCA, SKB1 etc.
- Composite views
  - These can’t read tables, but can read other views
  - These can’t be consumed by apps
  - In finance, for example, this could be now a combination of tables
- Consumption views
  - Think of these as the queries
  - They are ready to be consumed by apps
  - These views are based on what the analytical app needs.

An example – commitments.

Earlier in this post, we discussed an analytical app based on commitment data. That app required commitments, actuals and plan/budgets. That means the consumption view would be an aggregation of all of this data. This consumption view will rely on many composite views, which in turn rely on several basic views.

In addition to many standard CDS views, customers can create their own.

Available CDS views can be seen on [SAP help](https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/5418de55938d1d22e10000000a44147b.html?locale=en-US).

### Fiori

Fiori is positioned as a design system as well as a set of apps.

Many of these apps are based on design templates that can be used to create your own apps. Fiori itself is a large topic; in this post I’d just highlight a few key points:

- The Fiori frontend is based on standard technologies; HTML, CSS, JavaScript bundled together into SAP’s framework SAPUI5 (SAP developed JS framework based on OpenUI5)
- Fiori connects to the S/4HANA backend using OData services (ABAP RESTful protocol). This connects Fiori to the CDS views
- Fiori apps are typically launched from the Fiori Launchpad (FLP), which runs in a browser and handles navigation, user roles, app tiles, etc.

So, when you use one of these Fiori apps generally what is happening is:

1. Fiori app (JS) → calls OData endpoint (/sap/opu/odata/....)
2. OData service → implemented via an ABAP backend (often based on CDS views)
3. CDS view → reads from HANA and pushes data back via the service

As a side note, in ECC, the SAP GUI client communicates with the ABAP server using proprietary protocols, which was much more difficult to customise.

## Implementation considerations

Let’s consider two main scenarios:

1. New S/4HANA implementations and upgrades from ECC
2. S/4HANA already implemented, but with minimal Fiori and/or analytics.

For new implementations and upgrades, when we consider the core S/4HANA work, the workload is huge. The change management impact is huge. This is before thinking about Fiori or analytics.

It's challenging to get requirements and design right for the Finance (FI CO). This is especially true for large international organisations. Designing optimal chart of accounts, cost centre and profit centre hierarchies is a big exercise. On top of the basics, more complexity is introduced with topics like multiple ledgers, product cost control, and margin analysis.

Figuring out how to fit in analysis and design for Fiori and embedded analytics is tough.

Many projects will create an analytics work stream. In my view, this doesn't work well. Team members working on analytics need to understand the core model.

I can't emphasise enough how important it is to focus on core elements of FI/CO. Many organisations suffer for years due to poor design of profit centres, ledgers, business area etc.

The sheer number of Fiori apps is a challenge in itself. But as we've seen in this article, we can filter the list down to a more manageable focus area for finance.

When it comes to Fiori, on implementations, my suggestion is to start small. Target the Fiori apps that deliver the most value for an initial go-live, then follow up with a continuous improvement program to investigate more apps.

Core apps for go-live might look like:

- The top few KPIs per function as Smart Business KPI tiles
- Multi-dimensional reports for classic roles such as cost accountants, to replace any manual extraction and excel manipulation.

However, I recognise that some consultants may promote a 'Fiori first' approach: put Fiori at the centre of the project. This may be a better approach, but you must be careful not to lose focus on the core design.

In the case where S/4HANA is already implemented, an organisation is free to choose their own path depending on their current goals and available resources.

They could initiate a larger formal project to implement Fiori and/or embedded analytics. A business case could be constructed based on time saving and IT cost reduction (elimination of other apps).

On the other hand, this could be done through a longer running continuous improvement program driven by product managers or centres of excellence. I would generally lean towards the latter, as it poses less of a change impact on an organisation.

## User-role mapping

Fiori is built around roles. It's good to see SAP moving towards a more nuanced understanding of business roles.

Smart business KPIs and overview pages align well to user roles, team roles, and function roles. However, one thing I'd like to highlight is how much these roles vary by:

- Organisation type (public vs. private sector)
- Organisation size (local vs. international organisations)
- Industry (e.g. manufacturing vs. financial services)
- Current challenges and opportunities (e.g. accounting issues, ongoing acquisitions etc.).

We need to be careful to ensure KPIs and overview page cards are relevant.

The best way to think about what’s relevant is to look at the organisation and function objectives. These translate into responsibilities and accountabilities for a team or user.

Responsibilities and accountabilities are executed by actions that are informed by the information.

To illustrate, my design thinking would work something like this:

Role: Accounts Payable clerk - Accountability: 98% payment on time

- Payment on time KPI tile on launchpad, drill down to nearly due / overdue items
- Blocked invoices tile on launchpad, drill down to line items

Role: Cost accountant – Accountability: Monitor plan vs. actual on production costs

- Tiles or overview pages focussed on certain cost elements, cost centres
- Multidimensional reports to investigate further

When it comes to overview pages, I see potential for them to be designed for working groups, as well as individual roles.

For example, you may have an overview page oriented towards a monthly business review. This would cover all relevant aspects of revenue and cost.

Another overview page might relate to financial operations, which would cover operational metrics.

A further one could be related to financial stewardships and focus on metrics like manual journals or reversals, or transactions above a certain threshold.

These could be a useful tool for the facilitation of meetings and discussions. I think this is also true for review booklets.

## Common pitfalls

**Analytics for the sake of analytics**.

The tiles look pretty. The charts look pretty. It’s tempting to just throw everything at a user.

I’d be very careful about this. Any content that we use should have a clear purpose. That purpose can either be an action or an escalation.

**Reporting duplication**.

Some of the reports in embedded analytics will duplicate or replace other analytical reporting. We should be careful to decide which report is the source of truth, any others should be retired.

I worked for a client once that had about 10 different versions of net profit, depending on which system you took the KPI from.

I've seen a significant number of issues arise during SAP implementations with the boundary between what I'd call 'trusted financial reporting' and broader analytics.

As soon as financial data leaves the finance function and gets into analytic systems, it can be so heavily manipulated it is no longer reconcilable to what's reported externally.

Examples of this include applying alternate hierarchies, running allocations etc. or even just simply filtering out data.

Analytic users may expect they can do similar things with embedded analytics. This is usually due to a lack of understanding of finance data.

There's no right or wrong answer here. I would say there are two truths:

- There must be a clear source of 'accounting truth' for both external and internal management purposes. Everyone should understand what that is.
- Further experimental manipulation should be possible somewhere, but it has to be understood that data is not trusted.

The role of embedded analytics vs. other tools should be clear.

## Conclusions

Overall, embedded analytics are great. The team at SAP have done a great job in two areas:

1. Fiori:
      - Based on standard web technologies
      - Very well documented design system
      - Template approach with emphasis on a customer’s ability to create what they need
2. S/4HANA virtual data model
      - A smart way to define a huge range of data sets and make them available for consumption.

As someone who implemented R/3 and ECC several times, I wish we had embedded analytics and Fiori back then.

On the flip side, as with everything with SAP, it’s highly complex. This article just covered an overview, but each of these apps has a lot of detail to address:

- Technical set up
- Configuration
- User settings
- Options to create customer versions.

Some apps are only available in certain cloud versions, and some apps require certain configuration approaches in FI CO. There's a lot of hidden complexity behind this post.

For an organisation not using Fiori and embedded analytics, I’d suggest starting with those that deliver the most value, based on your current challenges and opportunities. The best way to do this is likely through setting up an expert role and potentially a continuous improvement program.

I’d like to cite and thank SAP for the good quality information that I gathered for this post:

- Various pages on SAP Help
- SAP learning – embedded analytics
- Fiori app library.

If you want to delve deeper I suggest working through the SAP learning course on [Embedded Analytics](https://learning.sap.com/learning-journeys/discovering-sap-s-4hana-embedded-analytics) as a starting point.

If you have any thoughts on this, please share in the comments.