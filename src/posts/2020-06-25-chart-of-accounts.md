---
title: Business and technology transformation
titletwo: ~ by Alex Roan
subtitle: The chart of accounts, concept & design
author: Alex Roan
date: 2020-06-25
tags: ["post", "article", "finance", "featured"]
image: /assets/images/blog/coa__cover.jpg
imageAlt: An abstract cover image with the article title
description: The chart of account (CoA) is one of the most important structures in business. It reflects all the activities a business is involved in and it provides a foundation for the majority of financial and management reporting. Correct use of the chart of accounts can both simplify operations and improve decision making capability.
---

The chart of account (CoA) is one of the most important structures in business. It reflects all the activities a business is involved in and it provides a foundation for the majority of financial and management reporting. Correct use of the chart of accounts can both simplify operations and improve decision making capability.

Often on accounting projects, there is a gap between accounting expertise and systems expertise, this can result in a poor CoA design. This can easily be overcome by understanding the historical context and modern-day principles that surround the CoA. We can then better understand the implementation options in business systems. This article will look at three topics:

- Part I: Accounting: history & modern principles;
- Part II: Implementing within business systems with SAP as an example;
- Part III: Common pain points and improvement initiatives.

## Part I: Accounting: history & modern principles

### Ancient civilizations had accountants!

To fully appreciate the general ledger concept and the CoA we need to step back over 500 years to the origins of accounting and the first documentation of double-entry bookkeeping.

The exact origin of accounting is not known, but basic practices are evident as far back as 2800 B.C. with the Sumerians. These ancient inhabitants of Mesopotamia (modern-day Iraq) were one of the first major civilizations in the world. One of their biggest cities was Uruk; with a population of between 40,000 and 80,000 people. It's easy to imagine this as a bustling centre for trade at the time.

The Sumerians developed a wedge-shaped script called "Cuneiform" consisting of several hundred characters that scribes would mark on wet clay and then bake. This is thought to have been used to keep records of business transactions (source). The diagram below shows an early bill of sale written in cuneiform. This record-keeping could be considered an early form of accounting.

![A photograph of a bill of sale in cuniform](/assets/images/blog/coa__one.png)

### A friend of Leonardo da Vinci

Accounting in the above form has been found throughout history, it’s mentioned in the Christian Bible, and the Quran.

The shift from simple record keeping to modern accounting depends on the concept of double-entry bookkeeping. It's unclear exactly when this was first used in practice. The earliest recorded documentation is found in the following two books:

- [Della Mercatvra et del Mercante Perfetto](https://en.wikipedia.org/wiki/Della_mercatura_e_del_mercante_perfetto) (On Trade and the Perfect Merchant) by croatian merchant named Benedetto Cotrugli, written in 1458
- ["Summa de arithmetica, geometria, propotioni et proportionanlit](https://en.wikipedia.org/wiki/Summa_de_arithmetica) (Summary of arithmetic, geometry, proportions and proportionality) by Fru Luca Pacioli; a close friend of Leonardo da Vinci, first published in Venice in 1494

The work by Pacioli is quite complete in that it describes a system of accounting that resembles closely the modern-day approach. It's thought that a lot of what he describes was already in use by merchants and traders at the time.

![A photo of the covers of the above mentioned books](/assets/images/blog/coa__two.png)

### Double-entry what?

The key principle of double-entry bookkeeping is; any business transaction creates two financial changes within a business. To illustrate:

- Purchasing a raw material - an increase in the value of raw material, a decrease in value of cash;
- Selling a finished product - an increase in the value of cash, a decrease in the value of the finished product.

The two financial changes have to be equal and opposite for a transaction to balance and be complete. These financial changes are categorised into what we know as accounts. The main categories of accounts that exist in business are:

- Assets - what is owned (e.g. cash, property, finished products);
- Liabilities - what is owed to others (e.g. supplier invoices, loans);
- Income - sources of cash (e.g. sale of products);
- Expenses - costs incurred (e.g. rent);
– Equity:
  - Capital: amount invested (by owners);
  - Reserves: profit owners receive (i.e. income - expenses).

In practice, the double entries are posted using debits and credits to the accounts. To understand debits and credits requires an understanding of the accounting equation.

### The accounting equation

Consider a business startup. The amount invested by the owner will be equal to the cash assets held i.e. equity = assets. If the business then takes a loan from a bank this will represent an increase in assets (cash from the bank) and liabilities (cash owed to the bank). It can be said that equity = assets - liabilities. This is a key relationship between the account categories discussed earlier.

*The accounting equation: Equity = Assets - Liabilities*

Now if the business starts operations it will start to incur expenses and generate revenue, on a periodic basis we can calculate revenue - expense which will result in a profit or loss. This will change the value of equity i.e. equity = capital + revenue - expense. With this in mind, we can rearrange the accounting equation to:

*Expanded accounting equation: Asssets + Expenses = Capital + Income + Liabilities*

### Debits and credits

This accounting equation is the key to understanding debits and credits; one of the mysterious topic of accounting. Debits and credits are used to make the double entries discussed earlier.

- A debit denotes an increase in the left-hand side of the accounting equation; assets or expenses, or a decrease in the right-hand side of the accounting equation; capital, income or liabilities;
- A credit denotes a decrease in the left-hand side of the accounting equation; assets or expenses, or an increase in the right-hand side of the accounting equation; capital, income or liabilities.

![An illustration showing how debits and credits apply to different account types](/assets/images/blog/coa__three.png)

To illustrate let's look at a manufacturing example; the purchase of raw materials:

- Goods & invoice received: credit the vendor (increase in liability) and debit the raw material inventory (increase in an asset)
- Pay the invoice: debit the vendor (decrease in a liability) and credit cash (decrease in an asset).

(those who are experienced with systems will know that in reality there are actually more steps, one of which involves a control account (GR/IR). We will ignore that for now for the sake of simplicity).

It takes time to get used to working with accounts and debits and credits. When working on accounting projects I always recommend drawing out all the accounting entries with [t-accounts](https://www.investopedia.com/terms/t/t-account.asp). With a little practice, it becomes second nature.

### A simple illustration of the value of double-entry bookkeeping

Consider a merchant in ancient Mesopotamia selling apples. A basic record-keeping approach to accounting could be a simple recording of each sale. On the other hand, a double-entry bookkeeping approach will allow them to track stock and sales in parallel.

![An illustration of a sales list converted into double-entry bookkeeping](/assets/images/blog/coa__four.png)

Even in this simple example, a number of benefits become apparent:

- Stock and cash are updated at the same time. That the net of both entries should be zero provides a mathematical check that the record was correctly made;
- A running total on stock and cash can be kept and it's easier to make decisions on whether to change prices based on e.g. stock levels or cash targets;
- Additional accounts could be added to advance credit to buyers and track receivables vs. cash.

### From the historical context, accounts were a management reporting structure

When working on accounting projects I often see confusion with the terms financial reporting vs. management reporting and internal reporting vs. external reporting. In reality, there isn't a black and white separation between these things. Accounts are often described as an external or financial reporting structure. Sometimes they are excluded from discussions on management reporting. This is not the case. Accounts were historically developed for management purposes and form the basis of internal management reporting.

### The accounting process

In his 500-year-old book, Pacioli introduced the concept of the financial statements; balance sheet, income statement and cash flow. To prepare these statements we need to record all business transactions against accounts. Pacioli describes three stages of accounting:

1. Record transactions in a journal or book of primary entry:
    - Sometimes called a subsidiary book or sub-ledger;
    - Records all transactions in chronological order;
    - Highlights two accounts affected (debit / credit);
    - Includes notes / narration;
    - Different journals/books are used for different purposes e.g. cash receipts, cash payments, purchases, sales.
2. Transfer to a ledger or principal book:
    - Transactions are posted to separate accounts;
    - The set of accounts is known as the ledger.
3. Summary (final accounts):
    - At certain periods the ledgers are balanced and trial balance is prepared, which is further used for calc. financial position or profit and loss.

It's quite shocking to think that modern ERP systems such as SAP S/4HANA still work largely in line with the steps laid out in this 500-year-old book. ERP systems such as SAP tend to have different modules or functional areas which represent the books of primary entry e.g.

- A purchasing book;
- A sales book;
- A fixed asset register.

When these books of primary entry are updated the financials are transferred to the principal book or general ledger. The main advantage of ERP is the integrated design which makes this transfer occur in real-time.

### Modern-day accounting

Accounting has grown in complexity over the years and many organisations have hundreds or in some cases thousands of accounts, there are plenty of valid reasons for growing no. of accounts, a few examples:

- As trade grew in volume the need to break up business transactions into more detailed categories for analysis and reporting grew;
- With the advent and increase in statutory and regulatory reporting a number of mandated categories of reporting appeared;
- With the development of enterprise systems, the ability to capture more transactional detail and run higher volume transactional businesses evolved and these systems came to significantly influence how the CoA works.

The first step in optimising the chart of accounts is being clear about the role of accounts. Accounts are often described as a structure for external reporting, with different structures used for internal reporting. This is a misleading simplification.

I propose that it's better to think of the CoA as the foundation for all financial information whether that reporting is for external users or internal users, compliance or decision making.

The balance and line items on the accounts can then be further analysed by other dimensions which cover factor such as:

- Team or department
- Business unit
- Site (e.g. factory, warehouse or headquarters)
- Brand
- Product
- Responsible person (e.g. director with profit and loss responsibility)

The key to a good CoA design is being very clear about the purpose of, and usage of accounts vs. other structures and how it fits together to provide a full set of financial and management reporting.

A common mistake on accounting projects is to set up each structure; legal entities, CoA, cost centers, profit centers etc. in a silo-based on basic instructions from software vendors. These structures need to be designed in an integrated way with a view to how they will interact to provide reporting and analysis.

### Accounting bodies

Modern-day accounting is governed by various bodies, the key ones to be aware of are:

- US: The financial accounting standards board (FASB) issues financial accounting standards (FAS) which comprise US GAAP;
- UK: The financial reporting council (FRC); with its subsidiary the accounting standards board (ASB), sets financial reporting standards (FRS) which comprise UK GAAP (more or less aligned to IFRS now);
- International: Originating from a joint effort of Australia, Canada, France, Germany, Mexico, the Netherlands, the UK and the US, an international accounting standards committee (IASC) was formed and issued international accounting standards (IAS). In 2001 the international accounting standards board (IASB) issues international financial reporting standards (IFRS).

Outside of the U.S., it's generally best to be familiar with IAS / IFRS and supplement that with local GAAP if and when working in a country that is not closely aligned to the international standards.

We need to be aware of the different standards as they will impact a few factors relating to the CoA:

- The accounts we have;
- The number and name of the accounts (some countries mandate specifics);
- The way we post to the accounts; principles of valuation.

For organisations that operate across multiple countries, they may need to maintain more than one CoA and produce reports according to more than one standard.

It’s important to note that the accounting standards do not represent an exact set of rules that can be programmed into a system. Accounting works on principles and requires interpretation. This is why we come across terms such as “fair representation", "comparability", and "materiality" in accounting.

This means that the exact details of transactions as they are captured are often not appropriate for external reporting. Accountants need to strike a balance of presenting information in a true and fairway, but a way that also benefits the company and it's shareholders. This means there is always interpretation and consideration and potentially adjustment before reporting.

### Accounting standards

A useful for resource for accounting information in the UK is the institute of chartered accountants for England and Wales (ICAEW). The ICAEW has a reference list of [model accounts](https://www.icaew.com/library/key-resources/model-accounts).

Another useful reference is [iasplus.com](https://www.iasplus.com/en-gb) maintained by Deloitte.

I would recommend a skim read of [IAS 1 - presentation of financial statements](https://www.iasplus.com/en-gb/standards/ias/ias1).

IAS 1 lists the financial account as taking the form of:

- A statement of financial position
- A statement of profit and loss or comprehensive income
- A statement of changes in equity
- A statement of cash flow
- Notes

Two pictures from IAS 1 follow as illustrations of how they describe the content of the statement of financial positions and comprehensive income:

![A picture of part of the content of IAS 1 to illustrate the rules provided by IAS](/assets/images/blog/coa__five.png)
![A picture of part of the content of IAS 1 to illustrate the rules provided by IAS](/assets/images/blog/coa__six.png)

### Multiple charts of accounts

Organisations that operate across multiple legal entities and/or countries will often require more than one chart of accounts, to illustrate these scenarios:

- Organisations with more than one legal entity will need to consolidate their financial information at a ‘group’ level. With this in mind, they may have a different chart of accounts at the group level than at the legal entity level.
- Organisations that operate across different countries will have multiple legal entities and in addition to the need for legal entity level chart of accounts and a group chart of accounts they may also have to deal with the legal entity CoA being different based on different accounting standards.
- Even if an organisation has only one legal entity the accounts required to execute all business transactions at the operational level are more numerous than the accounts required to be shown on the ultimate external statements:
- There may be reconciliation accounts or other accounts required by the way systems work
- Accounts may be used to breakdown info. for management reporting but not be required for statutory reporting.

### The general ledger code block

In accounting systems we 'post' transactions to the general ledger. When this happens more than just the amount is captured. The information recorded is sometimes referred to as the GL code block. Basic examples include:

- The legal entity;
- The account;
- The date;
- Whether it’s a debit or credit;
- The amount;
- The user who posted it.

In addition to this other information relating to the original transaction may be captured. This can be information that is useful for management reporting. Examples include; department, brand, fixed asset, product etc.

## Part two: implementing within business systens with SAP as an example

To illustrate the considerations for implementing the CoA within business systems I'll walk through the main steps of configuring the CoA within the popular enterprise resource planning products from SAP. I'll cover a few versions from R/3 to S/4HANA.

If you are not interested in system specifics please skip to Part III.

If you want more background information on SAPs ERP systems a starting point is my [post](https://www.alexroan.com/2020/06/03/sap-hana-and-s-4hana/) on the difference between SAP R/3 and SAP S/4HANA.

### SAP version

The chart of accounts is part of the finance general ledger component of SAP. The structure and naming of the modules have changed over recent versions, highlights include:

![An illustration of the timeline of release of SAP ERP products](/assets/images/blog/coa__seven.png)

R/3 started with the FI - finance module which included GL. This is connected to a separate CO - controlling module for additional management reporting. As of ECC 6.0, it was possible to activate NewGL; a simplification and evolution of FI and CO. As the HANA platform was introduced simple finance became available. Finance has then gone through slightly different namings as S/4HANA has delivered further simplification and enhancements.

Despite different versions and names, elements of FI and CO are still present in the latest release. The latest release should be considered as a simplification and evolution rather than a totally different system.

### R/3 and ERP modules

SAP systems are broken down into modules and components. These are separate sets of tables and programs that deal with particular sets of activities. A rough illustration of R/3 and ERP could look like this:

![An illustration of the high level architecture of SAP ERP modules or components](/assets/images/blog/coa__eight.png)

- Within FI we have GL as a central component;
- All the components in grey can be considered sub-ledgers from a financial perspective. Some; such as materials management are separate modules outside of finance. Others; such as asset accounting, are part of FI. These all post to the general ledger;
- The GL is connected to controlling via cost element accounting for additional management reporting capability. Controlling components are shown in green;
- A noteworthy component is FI - special ledger; shown in yellow. The special ledger is a separately configurable ledger that can collect data from various application components.

### Configuring FI - setting up the CoA and accounts

We configure SAP using the implementation guide (IMG). In this section, I will highlight key steps and structures relevant to the CoA. I won't step through the implementation guide. There are plenty of good books and help guides that walk through the details of the configuration step by step.

### A note on the instance and client

We install SAP as an instance, within the instance we can define multiple clients:

- All programs and a few configurations are common across an instance;
- The majority of configurations can be defined independently in a client.

Everything from here on will be within one client.

### Define key financial structure

Step one: Chart of accounts: The first step is to create a chart of accounts. This can be created, copied from an SAP template or imported. If copying this will can copy the CoA, all the G/L accounts and other settings. From a technical perspective starting by copying the SAP template is a good idea as it can simplify configuration. However it's critical to define an optimal CoA for your own business, therefore, I recommend extensive review and adjustment of any template.

Step two: Fiscal year variant: This defines the no. of posting periods in a year, typically 12 regular periods (1 per month) and 4 special periods.

Step 3: Posting period variant: This defines which periods are open for posting.

Step 4: Create company codes: A company code usually represents a separate legal entity. A full set of accounting records can be produced at the company code level - balance sheet, income statement, including tax. It's important to note that there are challenges and difficulties getting a full set of accounts at a level below company code. This should be a key factor in considering the right structure for your business. This changes slightly in NewGL we will see later.

![An illustration of how CoA related configuration objects relate to company codes](/assets/images/blog/coa__nine.png)

Step 5: Create account groups: in line with the way financial statements are structured, accounts are categorised by type using account groups. These account groups let us control what type of posting the account can receive and what information is collected. Typically we create account groups for accounts such as assets, liabilities, revenue and expenses etc.

Step 6: GL accounts - accounts can initially be created centrally with basic information. At this level, they can't be posted to.

Step 7: GL accounts are then activated per company code and additional settings are added to control postings within that company code.

![An illustration of how accounts relate to the chart of accounts](/assets/images/blog/coa__ten.png)

When setting up the company code, CoA, account groups and creating accounts there are various configuration points that control the information captured in GL postings and the fields that appear on the transaction screens. This can be seen working through the implementation guide step by step.

### Other key factors closely connected to the CoA in FI

**Currencies**: Traditionally in R/3 and ECC it’s possible to track several currencies:

- Transaction currency;
- Company code currency;
- Two additional currencies e.g. hard currency or group currency.

Within financials there are also two additional reporting dimensions that form part of the company code - CoA - account group - accounts set up, these are:

**Business area**: originally designed to provide a cross-company code view on the financial statements. Note that it is hard to reconcile business area to company code, this can make use of them difficult. BA can be generated based on things like plant/sales area/cost centre/fixed assets etc.

**Functional areas**: the idea is to split the view of accounts by functions, an example is having one GL account for labour and using different functional areas for sales, R&Dm marketing, production etc. This is closely connected to management reporting through controlling.

### The link between financials and controlling

As this article is focussed on the CoA I won't go into the details of management reporting in controlling. However, the CoA is the link between FI and CO. A very brief explanation:

- To re-cap FI uses accounts to capture summarised information on business transactions e.g. amount, business area etc;
- CO is a separate module which captures and manages additional data on management structures e.g. cost centers, internal orders, profit centers;
- If a transaction has a financial and cost management impact then documents are posted in both FI and CO;
- These documents are connected by cost elements. A cost element is created based on identifying a GL account being relevant for profit/loss.

![An illustration of the link between SAP FI and SAP CO](/assets/images/blog/coa__eleven.png)

### Issues with GL in R/3 and ECC

As can be seen above the basic structure related to the CoA in R/3 is not complicated. Having worked through a number of R/3 and ECC implementations the challenges I have seen with design and set up include:

- Account concept not correctly implemented. For example, rather than having one account for labour costs and using cost centres to split labour cost by department, we have one labour account per department;
- Inability to handle multiple valuation requirements for regional or global projects;
- Limitations with data that could be tracked in the GL especially within. For example in financial services it's often important to track sub-ledger information such as policy or agreement number;
- Limitations with the no. of currencies;
- Inability to get a full set of accounts below company code level e.g. in the case of monitoring financials for a manufacturing site.

Enhancements with NewGL and S/4HANA improve the ability to cater to several of these. However, it's still key to design and implement the correct concept for accounts.

### Parallel valuation

The ability to meet record and report multiple according to multiple accounting standards is an important topic. In R/3 there were [three ways to do this](https://help.sap.com/viewer/736fdba9485c4f608cad9f0f25a2d0fa/6.00.31/en-US/a9e1d25320cd4608e10000000a174cb4.html):

- Use additional accounts (creating extra accounts)
- Use an additional ledger (using special ledger)
- Use an additional company code

Each of these options creates some additional complexity and effort. The second option uses Special Purpose Ledger; a separate application where ledgers can be defined for reporting purposes.

### ECC 6.0 NewGL

As part of ECC 6.0, SAP introduced NewGL. This is a step in the right direction for FI resolving a number of key issues.

Within NewGL company codes, a CoA, account groups and accounts are defined as before. In addition, there is a range of enhancements which help resolve the key issues faced with R/3:

**Parallel accounting**: NewGL allows for the specification of a leading ledger and non-leading ledgers. This makes it possible to handle parallel valuation without having to rely on the accounts approach or special ledger. A leading ledger can be defined according to the group accounting standard (e.g. IFRS) and a non-leading ledger can be defined for local standards (e.g. local GAAP) and these ledgers can be used to track the transactions that have to be valued in different ways.

**IAS 14 Segmentation**: International accounting standard 14 brought with it the requirement to split accounts by business segment or geography. This means that a company code may now need to provide a full set of financial statements at a lower level. NewGL added the new field, "segment" to the GL code block. The segment can be updated based on the profit centre.

**Document splitting**: Also connected to IAS 14 it's possible to get a full set of accounts at a level below company code by using document splitting. Prior to NewGL a company may have wanted to see a full set of accounts by a dimension such as profit centre. It was possible to have profit centre included in the majority of account postings, but not all e.g. tax account postings don't include any account assignments. Document splitting essentially forces at the time of posting the account assignment to be included on every account line in a document.

**Customer fields**: Addition of a number of customer-defined fields to the GL code block.

More info on [SAP help](https://help.sap.com/viewer/b73116e0bcf84e5b81eae44831723d6b/6.00.31/en-US/fbf38d5377a0ec23e10000000a174cb4.html)

Note that NewGL also involved simplifications to the underlying FICO tables and the way FI and CO reconcile, which I won't cover here.

### S/4HANA

#### Fiori UI

One of the biggest changes S/4HANA brings is the Fiori front end and a new approach to user experience on desktop/tablet and mobile. It's now possible to customise a launchpad to the role of the G/L accountants working with the CoA. A range of apps are available. One of the new Fiori apps I noticed in S/4HANA 1909 that I like is the t-account [view](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F3664')/S17OP) on account postings:

![A screenshot of the Fiori UI](/assets/images/blog/coa__twelve.png)

T-accounts make it much easier to understand debits and credits at a glance. To browse Fiori apps use the [app library](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#).

#### Universal journal

The [universal journal](https://help.sap.com/viewer/3cb1182b4a184bdd93f8d62e3f1f0741/1809.001/en-US/523b8a55559ad007e10000000a44538d.html) is one of the biggest changes to FICO. Enabled by the HANA platform, SAP has been able to rationalise the table design in SAP.

A new table; ACDOCA, and set of journal transactions allow GL entries to be made as a single source of info, including e.g. cost centers, internal orders, WBS elements, CO-PA characteristics and other info. from other modules.

#### Extension ledgers

In NewGL SAP introduced leading and non-leading ledgers to cover requirements for parallel valuation. Extension ledgers are a continuation of advancements in this space. The benefits of extension ledgers being that they only capture entries that are different for the multiple valuations in question. I came across a good blog post from Martin Schmidt on [extension ledgers](https://blogs.sap.com/2020/04/02/sap-s-4hana-extension-ledger-use-cases/).

#### 8 definable currencies

SAP has increased the no. of currencies that can be captured in G/L postings.

#### Table simplification and compatability views

With the inclusion of the new universal journal; and table ACDOCA, a lot tables have been eliminated. To avoid the need to re-design a lot of historical functionality old programs can access ACDOCA through 'compatibility views'.

The latest version of S/4HANA at the time of writing is 1909. A summary of the new features can be found on the [product page](https://help.sap.com/viewer/product/SAP_S4HANA_ON-PREMISE/1909/en-US?task=discover_task) on SAP help. Both the features and scope and the simplification list can be found there.

There are many other changes that come with S/4HANA, the above represents only the key highlights from a CoA perspective.

## Part three: common pain points and improvement initiatives

After summarising the concept and SAP design implications for the CoA, I'd like to summarise some of the common pain points, and guidelines on improvement initiatives.

### Pain points

#### Dealing with multiple charts of accounts

There is a valid reason to have alternative accounts to cater to multiple accounting standards (parallel valuation), however, organisations often have multiple accounts due to other reasons:

- No central governance of finance; individual business units or countries freely configure their own systems;
- Central finance governance in place, but implementation in systems is not controlled; leading to variation;
- Making acquisitions w/out carrying out full integration.

This can lead to the following pain points:

- No standard financial language across the business, no common way to refer to the financial impact of business transactions.
- Mapping needs to be maintained for group consolidation;
- Interpretation is difficult at the group level as original postings are made to a different account structure.

#### CoA not well aligned to the financial structure

The operational CoA may not be well aligned to the financial statements that need to be prepared at a group level. This can happen in a few ways:

- Too many accounts are created to reflect not only financial transaction type but also departments, teams or products;
- Accounts are not well named or described and no guidance is available on correct usage.

This can make it difficult to maintain a mapping to the financial statements.

#### Poor quality accounting policy

- Transactions entered against inappropriate accounts; leading to statutory reporting being misleading or business performance being misinterpreted;
- Incorrect valuation methods, approvals, materiality limits etc. applied to certain postings.

#### Accounts not governed to meet changing requirements

- New statutory or regulatory requirements met using workarounds with existing accounts;
- No longer required accounts still used - missed opportunity to streamline transaction capture, close and reporting.

#### Different CoA across different systems

- No ability to ‘drill-down’ from consolidated reports to originating transactions - increased time and reduced transparency to queries

#### CoA not used as ‘main basis’ for management and regulatory reporting as well as statutory

As the CoA is primarily finance owned (statutory), management and regulatory reporting needs are given secondary status:

- Parallel similar structures maintained in management reporting tools but not well aligned to the financial CoA;
- The effort to reconcile statutory, management and regulatory numbers is increased;
- Potential confusion between stakeholders on ‘correct final numbers’ versus various estimate, flash etc.

#### Too many accounts

An excessive number of accounts; excessive use of ‘nice to have’, excessive detail, creates difficulties in:

- Identifying the right account for posting;
- Maintaining controls and policy;
- Interpreting account balances.

#### Account design based on systems

Software companies may provide a sample CoA, however, they are not experts in an individual business. Blindly following the logic of a system from an accounting perspective can provide an inefficient structure for financial and management reporting.

#### Effective flow of numbers, but lack of contextual information

The process of recording transactions through to preparing financial statements is heavily based on numbers coded with data dimensions, careful consideration needs to be placed on how commentary for business analysis fits with this flow on key transactions.

This is the biggest gap I've seen with accounting systems. None of them provide a good solution to capturing contextual information at the point of transaction entry and carrying that through to periodic analysis. This is not necessarily a bit issue in industries such as manufacturing where the structures in product cost control make context less important. However, in financial services, this can be critical.

#### The extent of usage of GL code block

There is a trade-off between simplicity of the GL for maintenance and number of dimensions populated in the GL code block. For example for any dimension that full accounts are required e.g. there is a desire to see a full set of accounts by profit centre or business segment, then these fields have to be updated during all relevant GL postings. From an SAP perspective, the improved performance that comes with HANA makes it easier to update and store a lot of dimensions in the GL code block.

### Considerations for good practice

Discussion of ‘best practice’ is not necessarily useful based on the different requirements across enterprises by industry, size, focus etc.

And with the 80/20 rule in mind it’s often better to focus on eliminating major pain points and pursuing the more obvious elements of ‘good practice’.

With that in mind, a few examples of good practice include:

- The volume of accounts reflect a sensible view of level of detail that needs to be captured in order to meet statutory and regulatory requirements and support the management and regulatory processes;
- The usage and control requirements of each account is clearly defined;
- The majority of transactions are automatically posted to the general ledger based on originating entries in business systems e.g. financial trades, invoices etc.;
- Use of manual accounts are minimised;
- Use of reconciliation accounts are minimised to those truly required;
- The Chart of Accounts and associated GL code block has a systems agnostic basis meaning that any change to the IT landscape does not lead to extra complexity and acquisitions and divestitures can be easily handled;
- A clear strategy should be in place to handle multiple valuation methods e.g. different depreciation rules in different countries. Depending on systems there are various approaches from multiple accounts to multiple ledgers, as this adds complexity the right solution should be carefully identified;
- A limited number of manual adjustments at the period-end close. Adjustments logged and reason for adjustment clearly documented. Accounting policy and CoA design constantly reviewed in order to reduce required adjustments;
- Group and operational CoA closely aligned, similar financial language at all levels;
- The CoA is designed in accordance with an overall conceptual data/information model which clearly defines how accounts vs. other objects work e.g. profit centres, countries, business areas etc.

#### Structure of the CoA and conceptual data models

When it comes to the structure of the Chart of Accounts there are some reasonably well established good practices, which include:

- Follow the structure of the financial statements;
- Within that follow a natural order of importance to the business (consider Account Balance);
- Set number ranges to follow the structure, avoid alphanumeric, leave gaps for future accounts;
- Clearly capture requirements - statutory & management;
- Create a conceptual data model to layout how other dimensions are used, this is helpful in avoiding the creation of accounts which duplicate the function of other dimensions e.g. accounts for departments vs. transaction types;
- Clearly identify and limit the use of special accounts for manual control or reconciliation purposes;
- Avoid accounts for system reasons as far as possible, look at other control methods.

A conceptual information model is also extremely useful. This isn’t a formal technical data model, but rather a simple matrix which shows by account/value / KPI which dimension needs to be tracked.

![An illustration of a sample conceptual data model for finance](/assets/images/blog/coa__thirteen.png)

This is a useful way to decide what information needs to be captured within the general ledger vs. what will be captured and recorded via other reports.

A classic example is where a full set of accounts are needed e.g. by IFRS Segment, this has to be captured in the GL, however, a variety of sales-related reporting could be provided directly from the sales systems e.g. sales by salesperson or sales organisation.

This is an excellent tool to align stakeholders and to cross-reference with report requirements from individual reports.

#### Governance

One of the major factors that separate the more effective organisations from the rest is governance; this is particularly true when it comes to managing hierarchies, master data, processes, systems etc. Chart of Accounts may be a complex area, but if well governed, it can be effectively managed. Key governance considerations include:

- Move towards one master reference CoA;
- Maintain the master CoA in one system;
- Assign a centre of excellence owner for the CoA with approval on create / update etc.;
- Create policy for the CoA including principles for account creation and usage;
- Formalise workflow for CoA maintenance with appropriate approvals;
- Provide training to non-finance users who have ‘posting’ contact with the general ledger e.g. purchasing, sales, payroll to ensure they understand how their data relates to the GL.

In some circles, a highly flexible CoA is recommended, in others a highly controlled CoA. The truth is that each enterprise; in particular with respect to different industries will have different requirements. A balance has to be made in ensuring the CoA is as simple as possible, and transparent, but in addition to this, it provides the required information for statutory, regulatory and management reporting and decision making. Within management reporting, the planning and budgeting process should also be considered.

#### Project approach to improving the CoA

Continuous improvement and big bang approaches are both valid to improve the CoA. As with many finance transformation projects care should be taken around year to date and current vs. previous period reporting:

- Changes to the CoA during fiscal year reporting may confuse year to date reporting and may require manual mapping at the period end;
- Changing at fiscal year-end will not affect year to date, but will affect the current vs. past period analysis particularly at year-end.

There are different steps to work through, one suggestion is to start with requirements and an analysis of existing issues. A simple illustration:

![An illustration of the flow of activities in a CoA improvement project](/assets/images/blog/coa__fourteen.png)

## Conclusion

There are a number of other systems worth considering which relate to the CoA and accounts, these include:

- Integration layers that connect sub-ledgers with G/L (especially in financial services);
- Consolidation engines e.g. SAP BCS, BPC, S/4HANA Central finance;
- BI tools (a vast array of financial and management analysis and reporting);
- Add ons such as blackline;
- Master data management tools.

However, regardless of the systems used the same design conceptual design and governance points need to be considered.

As I was writing this I was wondering about the experience of other people with the CoA:

- What challenges have you faced with the CoA in your organisation?
- What features of ERP around CoA do you find most useful?

For the future, technologies such as cloud and AI provide potential to better analyse how we use the CoA and post transactions. However, one area that's harder to analyse is the gap between "system produced accounts" and "published accounts" where there is a significant amount of interpretation and adjustment. Automatic generation of summary commentary using NLP based on original documents might be an interesting concept for the future.
