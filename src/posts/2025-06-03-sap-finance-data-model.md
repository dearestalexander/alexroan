---
title: Making sense of SAP finance - evolution of the data model
author: Alexander Roan
date: 2025-06-03
tags: ["post", "article", "finance", "featured"]
image: /assets/images/blog/sap-data/sap-data-cover.jpg
imageAlt:
description: The data model for finance has changed considerably from SAP R/3 to S/4HANA. These changes have provided some simplification while also making it easier to access data. Understanding the basics of the model can be useful. This article walks through the data model with a real life example.
---

## Introduction

The main purpose of Enterprise Resource Planning (ERP) for the finance function is to collect information about business activities and prepare it for financial and management analysis.

At its core, this involves saving, manipulating, and retrieving data.

In this context, it's useful for both business and IT people to understand the SAP data model. This is particularly useful when discussing the limitations of systems and considering possible enhancements.

It also reduces the potential for misunderstandings. The interpretation of financial and management results requires a good understanding of the source data and the logic applied to apply any classifications or calculations.

In this article, I'll look at the evolution of the finance data model from SAP R/3 to SAP S/4HANA. The focus will be on several important tables.

## SAP R/3 Architecture

SAP R/3 is an application built on a '3-tier architecture'.

![SAP finance 3-tier architecture](/assets/images/blog/sap-data/architecture.jpg)

This architecture is commonly used for systems with multiple users and large data sets.

The user interface

- Also known as the client
- Locally installed on the desktop
- This is the user point of interaction
- It sends and retrieves data to and from the server

The application

- Executes programs with business logic
- It sends and retrieves data to and from the database

The database

- Manages create, update, and delete processes for data

The database layer for SAP R/3 utilises a relational database management system (RDBMS).

'Relational' is quite descriptive here. An RDBMS typically stores data separated across many small tables.

Consider the scope of data in an ERP system: purchase orders, sales orders, customers, vendors, production orders, invoices, payments, and more. This is a high volume of data, much of it connected according to the flow of business transactions. A purchase order leads to a goods receipt, an invoice, and a payment. All need to be stored in separate but connected tables.

RDBMS was the only feasible option for ERP systems at the time. Later in the article, we will see how SAP HANA has changed this.

## SAP R/3 Modules

SAP R/3 has an internal structure. It's broken down into functionally oriented modules. In recent times, SAP has shifted away from talking about modules. However, if you look at the configuration in S/4HANA, it's still structured this way.

The classic list of modules includes:

- SD - sales & distribution
- MM - materials management
- PP - production planning
- SM - service management
- QM - quality management
- PM - plant maintenance
- HR - human resources
- FI - financial accounting
- CO - controlling
- AM - fixed assets management
- EC - enterprise controlling
- PS - project systems
- WF - workflow
- IS - industry solutions

SAP’s classic illustration of the modules:

![SAP finance 3-tier architecture](/assets/images/blog/sap-data/modules.jpg)

Each of these modules has its own set of tables and programs.

The modules that we are most interested in for finance and will cover in this article are:

- FI financial accounting
- CO controlling
- EC enterprise controlling

Asset management (AM) is also part of finance. However, for brevity, I will skip discussing AM tables here. This is not a big omission, as the finance postings generated in AM end up in FI and CO tables.

Other modules, such as sales and distribution (SD) and materials management (MM), also generate finance postings. Think of these as interfaces to FI and CO.

## Finance (FI and CO) tables

Let's clear up some potential naming confusion.

In business terms, 'finance' usually means both financial accounting and management accounting.

In SAP terms, it is slightly different:

- FI; finance; financial accounting
- CO; controlling; management accounting

When I use 'finance', I refer to the whole of finance from a business perspective. If I want to refer to a part of SAP, I will use either ‘FI’ or ‘financial accounting’.

It’s helpful to think of FI and CO tables in categories:

Category 1: configuration tables:

- Long-term fixed data
- Static data about the organisation (legal entity, reporting currency, etc.)
- Settings on how transactions are processed (tolerances, default values, etc.)
- These must be carefully managed
  - To ensure stability in how the system works
  - To ensure posts are captured in a ‘like for like’ way. Comparability of information is a critical concept in finance.

Category 2: master data tables:

- Relatively stable data, but may change as an organisation does
- For example, general ledger accounts, vendors, and suppliers.

Category 3: transaction tables:

- Point-in-time data that reflects a single business activity
- For example, orders and invoices.

Certain category 1 items, such as cost centers and profit centers, are ‘configured’ however, they lean towards category 2 master data. They are more ‘changeable’ than things like company code, but also need to be carefully managed to ensure reporting consistency and comparability over time.

## A business activity

Systems make more sense when we view them from a business process perspective. We can look at the SAP finance tables through the lens of a finance activity, such as posting an invoice.

Below is a 'mock' invoice I put together for this discussion:

![sample invoice](/assets/images/blog/sap-data/invoice.jpg)

Invoice standards vary by geography but generally include items like those shown.

Typical invoice fields:

- Invoicing party details: name and address of the party that issued the invoice
- Invoiced party details: name and address of the party receiving the invoice
- Invoice date
- A unique reference number
- A purchase order number or a contact name (if no PO)
- Details of the goods or services provided
  - Description
  - When the goods or services were provided
  - Quantity
  - Unit price
  - Total price
- Tax amounts
- Discount amounts
- Terms of payment: at a minimum, the number of days before it's due for payment
- Payment method
- Bank details

## From business activity to accounting

Finance is unique in that we need to translate business activities into double-entry accounting entries.

The accounting equation is:

> Asset = Liabilities + Equity

Every entry into accounting involves at least two 'line items' that balance to zero according to the above accounting equation.

For the above invoice. As a business activity, it states that

- Example client owns Alexander Roan Limited £12,000

This is translated to an accounting entry as:

- A liability of £12,000 should be recorded on the vendor account for Alexander Roan
- An expense of £10,000 should be recorded on the expense account for consultancy services
- A recoverable item of £2,000 should be recorded on the tax account

Or summarised as the accounting equation:

> 2,000 (tax recoverable) = 12,000 (liability) + (-10,000) (P&L / equity)

Which balances to zero.

I go into more detail on this in my article on the chart of accounts:

[Chart of accounts - concept and design](https://alexroan.com/posts/2020-06-25-chart-of-accounts/).

## Finance document posting in SAP

The example invoice translates to one document with three line items.

One of the classic transactions in SAP R/3 to enter an invoice is FB60. We use this transaction to 'post' the invoice:

![FB60](/assets/images/blog/sap-data/FB60.jpg)

A common structure for documents in business systems is to break the document down into a header section and a line items section.

In our invoicing scenario:

Invoice header:

- General information relevant to the entire transaction
- Invoice date, posting date, reference, header text, currency, etc.

Line items:

- Individual accounting entries (i.e., postings to accounts)
- In this example, three line items: vendor, expense, and tax

The FB60 transaction is visually split into two sections. The top half contains fields related to both the header and vendor line item, while the bottom half has a set of rows that are used to enter additional 'offsetting' line items.

The top half of the screen defaults to basic data, but has tabs to switch to views for payment data, tax data, etc.

The information entered in this transaction will be saved to several FI and CO tables. In this example, two or potentially three documents will be created depending on whether profit center accounting is active.

The data saved in tables relating to this transaction goes beyond what is seen on the invoice; it includes internal information and derived or calculated information. You could consider three types of data:

A: Internal information:

Information that is known to SAP and will be added to the tables by default.

- The 'document type' for 'invoice' will be recorded based on using transaction FB60
- The 'user' posting the invoice will be added based on the user login ID
- The entry time (document creation date) will be added based on the system date/time
- etc.

B: Invoice information:

Relevant details from the invoice will be entered.

- The vendor
- The amount
- Payment terms
- Tax amounts

C: Derived and calculated information:

Some data will be either validated or calculated.

- The expense account will be derived based on the service description. The AP clerk will search for the best-matching account
- Payment terms may be included on the invoice, but the default value will be proposed from the vendor master data
- Tax amounts may be automatically calculated based on a tax code and then checked against the invoice rather than entered directly

## Finance document tables

To start, let's look at key accounting tables that will be referenced or updated with this transaction.

Category 1: Configuration data:

- Information that controls how transactions process data
- Organisation data that will be included in the transaction posting.

A sample of important tables for finance

- T001: company codes
- TCURC/TCURT: currency codes
- TCURR: exchange rates
- T003: document types
- (and many more)

Category 2: Master data:

- Information about the organisation model
- Information about its operating environment

Examples of this are general ledger accounts, vendors, customers, cost centers, and profit centers.

Some of the important tables for finance:

- General ledger master data
  - SKA1: G/L general data (CoA)
  - SKB1: G/L company data
- Accounts payable master data
  - LFA1: vendor master general
  - LFB1: vendor company
  - LFBK: vendor bank
- Controlling master data
  - CSKA: cost elements (CoA)
  - CSKB: cost elements (controlling area)
  - CSKS/T: cost center master data
  - CSSK: cost center: cost element
- Enterprise controlling master data
  - CEPC: profit center master data.

Category 3: Transactional data:

Accounting is structured around two main tables, BKPF for header information and BSEG for line item information. General ledger journals, accounts payable invoices, and accounts receivable invoices all go to these tables. Financial postings from materials management, asset management, etc., also go to these tables.

- Accounting documents: line items
  - BKPF: account document header
  - BSEG: accounting document line item
- Accounting documents: secondary indexes
  - BSIS: accounting: secondary index for G/L accounts
  - BSAS: accounting index for G/L (cleared)
  - BSIK: accounting: secondary index for vendors
  - BSAK: accounting index for vendors (cleared)
- Accounting totals
  - GLT0: G/L account transaction figures
- Controlling documents:
  - COBK: controlling document header
  - COEP: controlling document line item
- Profit center accounting documents
  - GLPCA: profit center accounting line items

BSIS, BSAS, BSIK, and BSAK are not additional tables; they are secondary indexes on BSEG.

There is also the totals table GLT0, which includes transaction totals per account per period. This helps with reporting performance when only reporting on balances.

## Accounting document - header (BKPF)

As we enter values in fields in FB60, SAP will validate them. Validations range from 'format' to 'value' checks. For example, a format check would apply to a date field, while a value check may apply to something like the vendor field.

Only once all fields are entered and validated can the document be 'posted'. At this point, SAP will assign a document number.

Let's look at a selection of key fields from the accounting header table (BKPF).

![FB60](/assets/images/blog/sap-data/BKPF.jpg)

All of this information is relevant to the entire invoice (all line items). Note that this is not a complete list of fields, just a sample of fields of interest.

BKPF will also include the accounting document number, but only when posted.

## Accounting document - vendor line item (BSEG)

The first line item to enter is the vendor line item. As transaction FB60 is being used, SAP can default various values for this line item, such as account type, debit/credit, posting key, etc. It also knows that certain vendor-line related items, such as payment terms and payment method, are required.

![FB60](/assets/images/blog/sap-data/BSEG.jpg)

When creating invoices, it's helpful to include clear information to ensure the AP clerk can easily post them. This may include adding things like:

- The customer's reference number for your account (i.e., their vendor number)
- A clear description of the nature of the services
- A clear description of the tax type and rate

## Accounting document - general ledger line item

After entering the header and vendor line item details, next comes the 'offsetting' line items to G/L accounts.

The example invoice is for consultancy services. In this case, it's an overhead cost that is charged to a single expense account.

In some cases, an invoice may total up various sub-services and may need to be split across multiple accounts.

The AP clerk will search for the right expense account based on the description of the goods or services on the invoice.

![FB60](/assets/images/blog/sap-data/BSEG2.jpg)

(This is just a subset of fields.)

In this line item, an entry of £10,000 is recorded on the consulting expense account.

But what if we want to analyse and report on the department that was the source of the cost? Was it £10,000 spent by marketing, or IT, or £5,000 each?

This is where Controlling (CO) and cost centres come in.

In the accounting posting to the financial account, we enter a cost centre in the field BSEG-KOSTL.

While accounts represent the nature of a transaction, a cost centre represents the source of the cost. This usually equates to a team or department within a function.

In order to enter a cost centre with an account, it must be activated as a primary cost element. This means the account can be used in CO.

When an account is activated as a cost element and a line item is entered to it with a cost center, this leads to the creation of a controlling document.

## Controlling document - header (COBK)

As with accounting documents, controlling documents are split into header data and line item data.

![FB60](/assets/images/blog/sap-data/COBK.jpg)

Note that the controlling document header includes some references to the originating FI document.

## Controlling document - line item (COEP)

![FB60](/assets/images/blog/sap-data/COEP.jpg)

Note that rather than company code, the controlling tables contain a controlling area. Controlling is structured by controlling areas. If we want to compare management costs across different parts of our business, we should make sure they are in the same controlling areas.

### How FI and CO work

In this example, our accounting document posts to an expense account with a cost centre, so two documents are created:

- An accounting document
  - BKPF updated with header data
  - BSEG updated with line item data
- A controlling document
  - COBK updated with header data
  - COEP updated with line item data

Why does this split exist? Why isn't everything all in one document?

The design of finance in R/3 was to have a split between financial accounting and management accounting. There are various ways to look at why it's done like this, two that stand out are:

- Hardware and software limitations required the data to be split up across multiple small tables
- Auditability of financial information is improved if any management 'manipulation' is done separately

Consider the example of a management allocation.

Assume our £10,000 consultancy service was delivered over 10 days, with 2 days spent with individual functions. From a financial accounting perspective, all we need to record is:

- £10,000 spent on consultancy

However, from a management perspective, we may want to record:

- £2,000 spent on consultancy by the IT department
- £2,000 spent on consultancy by the logistics department
- £2,000 spent on consultancy by headquarters
- £2,000 spent on consultancy by the marketing department
- £2,000 spent on consultancy by the facilities department

To keep financial accounting as efficient as possible, we can post £10,000 to a simple 'overheads' cost center. We can then distribute the costs in CO to the five functions without affecting the original posting.

This works because CO allows you to make postings within CO that don't affect FI. These are known as secondary postings.

When we posted to a cost centre with an account in FI, we had to activate that account as a primary cost element. To post to an account in CO only, we need to activate it as a secondary cost element.

Many of the financial reports in R/3 allow us to make selections on whether we want to see only primary postings or whether we want to see secondary postings. Using that logic, we could view the above example as either just £10,000 or we could view it split over the five areas.

This brings us to the topic of reconciliation ledger. Due to this ability to post to FI and CO separately, SAP R/3 has a process and set of tables to reconcile FI and CO. These will be noted later in the table diagrams.

## Enterprise controlling - profit center accounting document (GLPCA)

Time to introduce a potential third document!

R/3 has an option to activate profit center accounting.

Profit centers are used to collect revenue and costs. They are oriented towards calculating and reporting profit. Profit centers are generally created by area of profit responsibility. This will vary depending on the organisation, but typically it will often represent a set of products or a brand.

As profit centers collect costs, we add them to overhead cost centres to capture those costs. This means that with PCA active, if we post to a cost centre, we also post to a profit centre, which creates an additional document.

This time, there is no header and line items split, just one main table GLPCA

![FB60](/assets/images/blog/sap-data/GLPCA.jpg)

## Document numbers

After all required information is entered in FB60 and the document is posted, the tables will all be updated with document numbers. For the accounting document, the number goes into the field BKPF-BELNR. This number links header and line item information on a one-to-many basis.

SAP identifies individual documents by the combination of:

- Accounting document number: BKPF-BELNR
- Fiscal year: BKPF-GJAHR
- Company code: BKPF-BUKRS

Profit center and controlling documents are linked back to FI documents, and it's easy to navigate between them.

## Summary of postings

![posting flow via tables](/assets/images/blog/sap-data/flow.jpg)

To summarise the process for posting an invoice and updating transactional tables:

1. Accounting information is entered that updates BKPF and BSEG, there will be at least two line items
2. If a cost center (or other cost object is used), a controlling document will also be created. This will update tables COBK and COEP
3. If PCA is active, a profit center document will also be created. This will update table GLPCA
4. During this process, configuration and master data tables will be referenced both to control how the transaction processes, to add default values, and to check and derive values.

We can adjust this diagram to  represent the table hierarchy better and add some of the additional finance tables for reference.

![posting flow via tables](/assets/images/blog/sap-data/R3tables.jpg)

Note that the process is different for purchase order based invoices.

If, instead of an invoice, we looked at a payment posting, this would likely post a line item to a bank account and a line item to a vendor account. There is no expense account, and hence no cost centre, and no controlling document or profit center accounting document.

## List of noteworthy finance tables

Here is a fuller list of tables for reference:

Noteworthy tables where configuration is stored

- T005: countries
- TCURC/TCURT: currency codes
- TCURR: exchange rates
- T001: company codes
- TKA01: controlling area
- T004: chart of accounts
- T077S: account groups
- T009: fiscal year variants
- T010: posting periods
- T003: document types

Finance - general ledger (FI-GL) tables:

- Master data
  - SKA1: G/L general data (CoA)
  - SKB1: G/L company data
  - BNKA: Bank master record
- Transactions
  - BKPF: Account document (header)
  - BSEG: accounting document (line item)
  - BSIS: accounting: secondary index for G/L accounts
  - BSAS: accounting index for G/L (cleared)
- Totals
  - GLT0: G/L account transaction figures

Finance - accounts receivable (FI-AR) tables:

- Master data
  - KNA1: customer general data
  - KNB1: customer company data
  - KNBK: customer bank data
- Transactions
  - (A/R transactions are stored in G/L tables)
  - BSID: accounting: secondary index for customers
  - BSAD: accounting: index for customers (cleared items)

FInance - Accounts Payable (FI-AP) tables:

- Master data
  - LFA1: vendor master general
  - LFB1: vendor company
  - LFBK: vendor bank
- Transactions
  - (A/P transactions are stored in G/L tables)
  - BSIK: accounting: secondary index for vendors
  - BSAK: accounting index for vendors (cleared)

FInance - Asset Accounting (FI-AA)

- Master data
  - ANKA: asset classes general
  - ANKT: asset classes descriptions
  - ANLU: asset user fields
  - ANLZ: time-dependent asset allocations
  - ANKB: asset classes: depreciation area
- Transactions
  - ANEK: document header asset posting
  - ANEP: asset line items

Cost center accounting (CO)

- Master data
  - CSKA: cost elements (CoA)
  - CSKB: cost elements (controlling area)
  - CSKS/T: cost center master data
  - CSSK: cost center: cost element
- Transactions
  - COBK: cost object header
  - COEP: cost object line items (by period)
  - COST: cost object price totals
  - COSP: cost totals for primary costs
  - COSS: cost totals for secondary costs

Enterprise controlling - profit center accounting (EC-PCA)

- Master data
  - CEPC: profit center master data
- Transactions
  - GLPCA: EC-PCA Actual Line Items.
  - GLPCP: EC-PCA Plan Line Items.
  - GLPCT: EC-PCA Totals Table.
  - GLPCC: EC-PCA Transaction Attributes.
  - GLPCO: EC-PCA Object Table for Account Assignment Element.

Finance special ledger (FI-SL)

- The special ledger utilises BKPF, BSEG, etc., and adds custom totals tables.
- GLT1, GLT2, etc. typical names for custom totals tables used in FI-SL

Finance reconciliation ledger (FI-RE)

- COSP_RE: Primary cost postings
- COSS_RE: Secondary cost postings

## Evolution from R/3 to ECC and NewGL

As R/3 evolved, SAP rebranded it to ECC (enterprise core component).

I discuss this in more detail in my post on HANA and S/4HANA.

[SAP HANA and SAP S/4HANA - A Simple Guide](https://alexroan.com/posts/2020-06-03-sap-s4-hana/)

The new branding represented the strategy of a 'core ERP' connected to various specialist applications. Think of ECC feeding BW, business objects, BPC, etc.

As part of ECC, the NewGL (new general ledger) was introduced. Activation of NewGL was optional. This led to the terms NewGL and classic GL.

NewGL removed a lot of complexity from FI-CO, while also providing new solutions for some challenging requirements.

For context, let's summarise the biggest challenges with SAP R/3 before NewGL

- Multiple reporting standards / multiple valuation
  - Think of an international organisation that reports according to multiple standards: US GAAP, IFRS, Indian GAAP, etc.
  - Think of organisations that may want to value things differently for different purposes. This is particularly relevant for fixed assets and other financial items.
- Full financial statements at levels other than company codes
  - A company may want to see complete financials for a brand or location, not just a statutory legal entity.
- The need to maintain a 'fat' G/L (more on this later)

NewGL provided improved solutions to these. The main functions of NewGL were:

- Introduce multiple ledgers using **leading** and **non-leading** ledgers
  - Meets the requirements of multiple reporting standards or multiple valuations
  - Replace legacy solutions, commonly the 'accounts' approach and special ledger (FI-SL)
- Integration of **profit center** within the main ledger
- Introduction of **segment** for segment reporting
  - Segment refers to legal reporting by line of business or geography (IFRS 8)
- Introduction of **functional area** for cost of sales reporting
  - Cost of sales reporting focuses on classifying expenses by function
- Introduction of **document splitting**
  - Create the ability to prepare a full set of accounts at a level other than company code
  - The most common use case is splitting on 'profit center' or 'segment' levels
- Add real-time integration - most usefully between FI and CO
  - This removed the need to use the FI/CO reconciliation ledger
- Enable faster closing: this is a benefit of all of the above:
  - Elimination of special-purpose ledger or reduction in the number of accounts
  - Elimination of the reconciliation ledger
  - Inclusion of all account assignment objects in the ledgers

As part of the NewGL solution, there are various changes to the tables. Let's visualise

- No longer used / retired tables in orange
- Enhanced tables in green
- New tables in blue

![posting flow via tables](/assets/images/blog/sap-data/newGLtables.jpg)

Retired / no longer used tables:

- Profit center accounting tables (GLPCT, GLPCA, GLPCO): now that profit center is integrated within NewGL, separate tables are no longer required
- GL totals tables (GLT0): replaced by NewGL totals tables
- Special purpose ledger (GLT1, etc.): theoretically no longer needed due to new multiple ledger functionality, which utilises new tables
- Reconciliation ledger (COSP, etc.): NewGL included real-time integration between CO and FI, removing the need for a periodic process and set of reconciliation tables

Enhanced tables:

- Accounting tables BKPF and BSEG:
  - Addition of the new fields: functional area, segment, etc.
  - Addition of the possibility for customer-defined fields

New tables:

- FAGLFLEXT: NewGL totals table
- FAGLFLEXH: NewGL header table
- FAGLFLEXA: NewGL line items table
- BSEG_ADD: Ledger-specific valuation postings (for year-end / periodic parallel valuation)

### Extended field set

As we are discussing tables and fields, it's worthwhile to discuss the set of fields available in the accounting tables.

As discussed BKPF and BSEG contain the header and line item information for accounting documents. The line items in BSEG may represent vendor line items, customer line items, or G/L line items. The G/L line items may relate to balance sheet or profit and loss accounts. This could represent cash, fixed assets, revenue, costs, tax etc.

When we post an accounting document against a general ledger account, we capture a lot of information. As discussed earlier, this may include things like posting date, document type, G/L account, credit/debit, amount, etc.

This set of fields is sometimes referred to as the **G/L code block**.

When ERP was first introduced, the G/L code block was small. Only a limited number of values were captured with accounting postings.

Accounts should represent the nature of a financial item or activity. In the past if an organisation wanted to see more detail, they typically added additional accounts. This is known colloquially as a 'fat' G/L.

To illustrate:

- Account 60001001: Consulting - IT
- Account 60001002: Consulting - Strategy
- Account 60001003: Consulting - Logistics.

In this scenario, three accounts were created. These represent a single nature 'consulting', split across three functions: IT, strategy, and logistics.

As we move from a 'fat' to a 'thin' G/L, we strip accounts back to 'nature' and use other dimensions to meet management reporting needs. In the above example, we would typically use a cost centre to represent a team, department, or function.

- Account 60001001 Consulting:
  - Posted with cost centre 1001 - IT department
  - Posted with cost centre 1002 - Head office department (corporate strategy)
  - Posted with cost centre 1003 - Logistics department.

Over time, both financial and management reporting have added requirements for additional dimensions. A modern finance G/L code block includes fields such as: multiple currencies, transaction type, business area, cost centre, profit centre, material, plant, sales org, functional area, consolidation entity, etc. These and more are all in high demand for analytics programs.

In the past, I've worked on consulting engagements that involved redesign of the code block. It can be surprisingly complex when you consider the logic of how different values are sourced for different posting types.

To recap, NewGL was instrumental in bringing the following fields into the main ledger:

- Profit center (in a more complete way)
- Segment (usually derived from profit center)
- Functional area (usually derived from cost center)
- Allowance for custom-defined fields (via various customising steps)
- Ledger (as part of the ability to post to multiple ledgers).

These fields can be combined with **document splitting** to allow for the creation of a full set of financial statements by those dimensions. This was very hard to achieve before NewGL.

I won't go into detail on document splitting here. But in simple terms, if you want to split on a field included in a GL line item entry, you will split all other lines on the same basis.

Let's illustrate

Basic posting to two profit centers without splitting:

- Vendor: 12,000
- Expense account with cost centre 1 & profit center 1: 5,000
- Expense account with cost centre 2 & profit center 2: 5,000
- Tax: 2,000

Posting with document splitting on a profit center basis:

- Vendor: 6,000 with profit center 1
- Vendor: 6,000 with profit center 2
- Expense account with cost centre 1 & profit center 1: 5,000
- Expense account with cost centre 2 & profit center 2: 5,000
- Tax: 1,000 with profit center 1
- Tax: 1,000 with profit center 2

As you can see with splitting, we can now split financial information across all accounts by profit center.

### Old accounting tables vs. new tables

Looking at the diagram, you may wonder why accounting data is duplicated across BKPF/BSEG and FAGLFLEXA / FAGLFLEXH.

The elephant in the room is that changing or removing BKPF and BSEG is nearly impossible.

- NewGL was optional at first
- BKPF and BSEG are integrated into many hundreds of transactions, reports etc.

Secondly, the tables are not identical; they do serve different purposes.

Role of BKPF/BSEG:

- Focus: Holds original FI entry data, aka 'entry view'
- Primary source of truth for financial audit
- Captures new fields (segment, functional area, customer fields)
- No document splitting
- No ledger-specific postings

Role of FAGLFLEXA / FAGLFLEXH:

- Focus: Ledger-based reporting/management reporting
- Secondary source of truth for financial audit
- Captures new fields (segment, functional area, customer fields)
- Applies document splitting
- Applies ledger-specific postings

Think of BKPF / BSEG as being the source of accounting truth. Think of FAGLFLEXA / FAGLFLEXH as the source of either alternate ledger-based reporting or alternate management views.

As I write this, I do wish the NewGL tables were more concisely named!

## Evolution with 'S/4HANA'

NewGL brought a significant change to finance. However, possibilities were still limited by the IT hardware and RDBMS database.

I have previously written a blog post about HANA and S/4HANA, which might be useful before continuing.

[SAP HANA and S/4HANA - a simple guide](https://alexroan.com/posts/2020-06-03-sap-s4-hana/)

As a recap the HANA database allowed ERP to operate as both a transactional and analytical application, this was due to HANA's

- In-memory computing
- Columnar database
- Parallel processing

ECC therefore, evolved into S/4HANA, an ERP running on the HANA database.

I'd like to be both honest and give credit to SAP. At its core, S/4HANA is still very much R/3. The financial transactions are similar. The processes you work through are similar. However, the core is greatly improved by the NewGL and HANA changes. I do feel that SAP sometimes tries to brand S/4HANA as something completely new. That's not right, it's an evolution of R/3.

The major benefit of S/4HANA is that the RDBMS constraints are gone. The design paradigm of having many tables: BKPF, BSEG, COBK, COEP, FAGLFLEXT, FAGLFLEXH, FAGLFLEXH, etc. is no longer necessary.

To take advantage of this, SAP created the 'Universal Journal' based on the new table ACDOCA. A lot of the complexity of FI-CO is replaced with a single actuals table.

Let's visualise the S/4HANA changes

- Orange: no longer required or retired
- Blue: new
- Grey: tables replaced with 'compatibility views'

![posting flow via tables](/assets/images/blog/sap-data/S4GLtablesChanges.jpg)

- ACDOCA is introduced
  - Central table for all finance information
  - FI, CO (primary and secondary postings)
  - Stores line items, but S/4HANA can calculate totals easily on the fly

- BKPF and BSEG exist, but as compatibility views
  - Views built on top of ACDOCA
  - Older programs can still work
- COBK and COEP exist, but as compatibility views

- All totals are gone
  - GLT0 (classic)
  - GLT1 (FI-SL)
  - FAGLFLEXT (NewGL)

Note that I have excluded planning tables for simplicity. In my experience, planning is not often done in S/4HANA directly.

This brings us to a simplified view for S/4HANA

![posting flow via tables](/assets/images/blog/sap-data/S4GLtables.jpg)

As you might imagine, there are thousands of standard and customer programs that reference the old tables BSEG, GLT0, FAGFLEXA, etc. These remain in SAP, but not exactly as 'tables'. They exist as 'compatibility views' which allow old programs to access the data in the historical structure of those tables.

### What about secondary cost element postings

If you were paying attention, you might ask about what happened to this separation between FI and CO. What if we want to make allocations in CO only for management purposes?

This is managed using statistical postings. An assessment can be done on a statistical basis. A flag is used to choose whether to view financial information with or without these kinds of allocations.

## Core data services (CDS)

If you've read about SAP Fiori, Embedded Analytics, or SAP Analytics Cloud (SAC), you may have seen the term CDS view.

CDS views have become a very important concept within SAP architecture.

### From tables to views

In R/3, we often developed custom reports. In these reports, we used ABAP (SAP's proprietary programming language) to look up data.

ABAP code for looking up data is quite similar to SQL. For example

`SELECT BUKRS from BSEG`
(select company code from table BSEG)

### Modern reporting and S/4HANA

With increasing focus on reporting and analytics, we have come along way from the occasional custom report. ERP now needs to provide a variety of data sets for different applications.

This is where core data services come in.

In IT, we call CDS views 'semantic layers'. At a basic level, it means that a CDS view specifies a set of data with information about that data and how it can be utilised.

Rather than having to code which tables to look up and how to join them, a developer can now refer to a CDS view.

One of the great things about CDS views is that if a standard one doesn't quite fit your need, you can just put a new view on top of it and make adjustments.

Which brings me to layers. CDS views work in layers. Often you have:

- A top-level 'consumption layer' designed to present data to an app
- Intermediate views
- Bottom-level views that get data from tables.

The layering of the views gets complicated. I was looking at a commitment report CDS view in SAP, and I think it had about 10 layers accessing various accounting and purchasing tables at different points.

However, this ability to build in layers does make things easier for developers, especially when it comes to re-usability.

In terms of application runtime, S/4HANA simply flattens all the CDS layers down into a single set of lookup statements from the database tables. There is no added effort from the system to work with multiple layers.

In terms of examples, some common CDS views are:

- I_GLAccountLineItemCube
  - Main cube for GL line items
  - Based on ACDOCA
- I_GLAccountBalanceCube
  - Main cube for GL balances
  - Derives from the line items cube
- I_ActualJournalEntryItem
  - Journal entry details

These start with 'I', indicating they should be used as a basis for other views.

As an example of a view ready to be used, we have, for example, 'C_GLLineItemRawData', which is a 'C' or consumption view that is designed to provide raw data for analytics. This is fed by I_GLAccountLineItemCube.

## Accessing S/4HANA financial data

One of the practical points of understanding the financial data model in S/4HANA is preparing and accessing data for external usage:

- Sending data to analytics
- Sending data to financial consolidation systems
- Extracting data for audit
- Extracting data for systems upgrade

Within S/4HANA, the aforementioned CDS views can be used to access ACDOCA. The current recommended integration service is SAP's OData service.

Alternatively, ABAP can still be used with Select statements to access ACDOCA.

And there are also standard data extractors for BW, Data Warehouse Cloud, and DataSphere.

## Final words

Hopefully, this provides some useful context around tables. I realise we very lightly touched on some functional topics without detailed explanations. Let me know if you have questions.

Please also feel free to comment on topics of interest for my next post.

You may find other posts of interest on my website:

https://alexroan.com/filter/posts/

Finance systems-related posts include:

- SAP HANA and S/4HANA a simple guide
- The chart of accounts - concept and design
- Improving the record-to-report process.
