---
title: Improving the record to report process
author: Alex Roan
date: 2020-05-18
tags: 
hashtags:
project:  ["Finance Transformation"]
subproject: ["Processes"]
image: /assets/images/blog/rtr-cover.jpg
imageAlt: 
description: A detailed look at the record to report process.
---

## “A complex, lengthy process, often not well understood”

Starting from business transactions such as the purchase of materials, payments to employees and sale of goods and services. Ending with reporting and decision making including the submission of detailed annual reports. The 'record to report' process (RtR) is a long, complex process that involves people from across the enterprise.

Despite the critical nature of this process, it’s rare to find RtR clearly documented from start to finish. I've found that few finance employees can describe the complete process. In part, this is because the process touches core operational transactions (purchases, manufacturing, sales etc.). From another perspective, it's because certain parts of the process require a high level of expertise.

To illustrate this consider the differences between manufacturing and banking. In manufacturing, entire finance teams specialise in product cost accounting and profitability analysis. In banking entire teams specialise in liquidity analysis.

The result of this is a world of finance where knowledge tends to be somewhat siloed. Accountants who have worked across various roles in different industries, as well as financial analysts may have the broadest knowledge, but even these people will likely have blind spots in operational or technical accounting areas they haven't worked in before.

For the rest of us; due to the siloed nature of roles, training and books etc. it's difficult to get a broad understanding of record to report.

## Defining record to report

Semantically I'm using 'record to report', but this may also be referred to as 'account to report', 'account to close' etc. I prefer 'record to report' as it allows for a broader interpretation of the scope of the process.

Considering the boundaries of the process there are different definitions out there. From a narrow view such as; the preparation of primary financial statements (balance sheet, proﬁt & loss, cash flow). Through to a wider view; includes source transactions, planning, management reporting/decision making and regulatory reporting.

If we look at the history of accounting (see my post on the [chart of accounts](https://www.linkedin.com/pulse/chart-accounts-concept-sap-design-r3-s4-hana-alexander-roan/?trackingId=70%2FhrVQsdGaz4wTDDFqJ7g%3D%3D&lipi=urn%3Ali%3Apage%3Ad_flagship3_pulse_read%3Bl3tl0KG3ReOpA%2FvZzPN2ig%3D%3D)), I don't think it's right to separate management reporting/decision making from the preparation of the primary statements. After all, a primary purpose of accounting is to allow for the fair comparison of companies for investors. At the end of the day, this is also management decision making.

The best way to think about a complex set of processes is to use 'process management'. As a quick introduction consider that any process has a supplier that provides inputs, these are then processed to deliver the output to a customer. This can easily be remembered with the acronym SIPOC.

In long complex processes, we chain together many processes to take an original input to the final output. For example, the purchase of raw materials leads to a number and associated commentary in the published annual report. In the case of finance; where the knowledge is siloed, the person publishing the annual report doesn't understand the intracacies of procurement. This leads to a high potential for inefficiencies and errors.

To complete this picture we should also consider organisation design. Companies are historically structured by functions. People build advanced levels of knowledge and capability within their own functions. However, they often have little or no knowledge of the function that is responsible for the preceding process steps. As an example, I've worked with accounts focussed on IFRS13 disclosures (fair value measurement) who had little understanding of the different types of originating trade transactions that made up the data they were responsible for analysing and reporting.

It's possible to trace back events like the US subprime crisis and the handling and reporting of collateral debt obligations (CDOs) to this topic. If the financial management and auditors of the banks had the right understanding of upstream steps relating to CDOs they would presumably have been able to manage the risk of assets/liabilities and liquidity better.

To improve the quality and efficiency of complex processes organisations have moved towards 'horizontal process management' or 'value chain management'. This involves moving away from siloed management of individual processes to a broader view from original transactions to ultimate outputs.

This is particularly relevant for 'record to report'. I would strongly urge organisations to take a 'horizontal design' approach to record to report. This applies to process design, role design, data design and system design. If I were to summarise the best approach to working with 'record to report', I would highlight two guiding principles:

- Avoid investing in solutions that 'fix' problems with inputs at the output stages;
- Design the entire process based on the output requirements in a streamlined way.

In this post, I'll take a deeper look at the scope and common issues associated with 'record to report'.

## The big picture

Every step of 'record to report' is beset by problems due to errors in previous steps. This is why it’s important to take a step back and look at the end to end process. It’s important to retain a business view on what the process aims to achieve. It’s possible to find entire accounting teams working exclusively on the preparation of one IFRS disclosure, whilst highly capable they cannot always describe where their input data came from or the originating business transactions. Outside the need to comply with specific requirements on a technical basis a core aim of financial and management reporting is to ensure that information accurately reflects the reality of the business.

When working in ' record to report', I believe context is important. I would recommend developing an understanding of:

- Corporate strategy (targets, markets, risks etc.)
- The current product set (product categories, customer base etc.)
- How does the above with different processes within 'record to report'? – What do the financial numbers represent in the business?

## Start from the customer

Earlier I introduced SIPOC. When analysing processes I always recommend starting from the C (customer). I've lost count of the number of projects over the years that designed a process, role or system based on a presumed requirement. It's critical to question what the customer really wants and needs.

A useful tool I recommend; from six sigma, is the 'voice of the customer'. With this, we clearly identify the customers of the process and then ask them what outputs they want/need. What we deliver on the spectrum from 'need to want' is a matter of cost/benefit analysis.

End customers of 'record to report' include:

- Statutory authorities
  - Filing of accounts & other disclosures (IFRS / local GAAP).
- Tax authorities
  - Filing of tax returns.
- Regulatory bodies
  - Disclosure of required industry-specific reporting, for example;
  - Example; within insurance & banking this includes assets, valuation, product sales, transactions, liquidity etc.;
  - Example; within pharmaceuticals – US FDA or local equivalent requirements.
- Shareholders, market analysts etc.
  - Half-year and annual reports;
  - Ad hoc announcements and reports based on key business events.
- Other external parties
  - Special topics such as sustainability, diversity, health and safety etc. which may include some limited financial information.
- Internal management (reporting/decision making)
  - Financial information as a basis for planning, budgeting, and generation of performance indicators utilised in making decisions to steer the business.

When considering management reporting it’s useful to think of 'record to report' in-line with management models such as “plan – do – check – act”. At a simplified level, the business transactions are recorded and provide a continual way to measure the “do” while the resulting information delivered in reports and analysis provide a basis for “check” and “plan”. Thus the planning process is closely connected, if not part of 'record to report'.

## Further consideration of customer needs and wants

A lot of effort to improve 'record to report' fails by going straight into mid-process improvement without being clear about the required outputs. Requirements are often based on what the customer receives today aka the 'as is' as it's often classified in projects.

Case studies exist of finance functions reducing effort by 80% by re-designing reporting from the ground up.

Why do projects avoid this? An issue lies with the availability of senior management and top experts. CEOs and CFOs rarely have the time to explain to a project team the exact structure and wording they would like to see in their annual report, likewise, general managers rarely have the time to help design every line of a monthly business review reporting pack.

More junior staff can be risk-averse and are only comfortable doing things the way they were always done.

There are also risks and issues in engaging with statutory and regulatory bodies or with external analysts at this level of detail; specifically trying to uncover requirements without giving away sensitive information about the operation of the business. Remember that accounting is a game of portraying a company in the best possible light while complying with the principles of IFRS / GAAP, it's not about sharing 'actual' unadjusted information.

Regardless of these challenges, it’s critical to connect with the end customer in order to define the answer to questions such as:

- What is the minimum that has to be reported to maintain shareholder and market confidence?
- On top of the minimum what extra information should be reported, what beneﬁt does it give and what is the cost?
- Which questions a report is attempting to answer?
- Which decisions a report is enabling?
- How does reporting capability compare to competitors – content, timing, quality?
- How will the requirements change over time for each report/information area?

n particular, the cost of reporting is often overlooked. In an ideal world, a finance function would be able to deliver a baseline cost for 'must-do' reporting and an incremental cost for additional reporting. This would allow smart decision making on nice to have analysis vs. the cost of the finance function.

These answers are not only needed for the design and implementation of reporting and analytics. They are also needed at the stage of data model design for business applications. Enterprise resource planning system projects (such as SAP and Oracle), can fail due to poor data model design. I’ve seen multi-million pound ERP projects occur without any noteworthy discussion on reporting needs. Companies have been known to have to re-implement the same ERP to ﬁx this. My post on chart of accounts concept and design provides an illustration of this.

## Remember The Core Business

On the ﬂip side of understanding the customer is understanding what exactly is being manipulated and consolidated to provide a set of accounts and reports.

Often 'record to report' improvement initiatives focus on ‘turning the handle’ of mechanical processes to produce a set of numbers. Converting an insurance policy to a general ledger entry, consolidating to a group level, eliminating inter-company, summarising into ﬁnancial statement format etc. ERP systems, data integration experts and consultancies traditionally focus on these mechanical steps. In recent years a lot more focus has been placed on data warehousing, analytics, dashboarding, formatted reporting etc. however there is still a gap in knowledge and capability around the process of business analysis.

This involves understanding the context of a business transaction and how it affects the accounts. This context is often provided manually via supplementary ‘outside of the main systems’ excel style reporting. Examples include:

- Comments on variance analysis;
- Comments on current vs. prior period analysis;
- Comments on balance sheet substantiation;
- Comments on unusual transactions.

This is particularly important in industries such as financial services where a business may take part in unique and complex transactions.

The finance team should be able to clearly explain the position of each account or KPI during each reporting period. Systems and processes have some way to go in designing and executing a way to take contextual information from the original transaction through to the final reports.

## The end to end process

To provide more clarity on the 'record to report' process the below diagram illustrates one way to break it down into sub-processes. If 'record to report' is the top-level enterprise process, this consists of many individual processes that chain together. This varies considerably by industry, organisation design and technology. This illustration comprehensive, but includes a set of key processes.

- In this example I break down record to report is broken down into 3 categories; preparation, daily and periodic activities,
- I also separate main steps of financial accounting and management accounting;
- These then break down into 7 sub-processes with another set of sub-processes below each.

![An illustration of a framework summarising the record to report process](/assets/images/blog/record-to-report__one.jpg)

As the illustration shows a large part of 'record to report' is a periodic process. A key part of this is a repeatable standard timetable. It could be suggested that it's more akin to a project than a typical high volume transactional process. Within the periodic timetable, critical path analysis can be applied. This is key to delivering a fast close. If the critical path is understood resources and management attention can be placed on the most important steps. Other activities can be moved around flexibility to help smooth out the peaks of the resource requirements.

This illustration is just a general sample. Each organisation should design their own model based on their industry/business and the parts of record to report that are most critical in their situation.

I identified a large part of record to report as 'periodic'. There is a trend to move towards a 'real-time' close. This refers to the ability to be able to produce accounts at any point in time. While I think this is a big part of the future of finance I would urge caution with 'real-time' close for two main reasons:

- Often this refers simply to system steps. A change from periodic execution to real-time execution. It does not consider any of the off-system thinking, meetings, and analysis that goes into interpreting the numbers.
- Both real-time close and fast close initiatives sometimes fall foul of simply moving periodic activities to daily activities and arguably can create more effort in some cases. So called 'soft close' was guilty of this where companies end up doing multiple 'closes' and having to reconcile them leading to faster numbers, but more work.

## Dealing with common pain points

Record to report improvement can be delivered via new business systems. However, often large parts of the process can be improved without any systems work. This is often overlooked. With a number of clients, I've seen that a few workshops with finance teams can lead to at least ten significant improvements that can be delivered within a number weeks simply by changing policy, process or team roles.

Let's consider some popular pain points as a basis for this discussion:

### Process

- Pain point - Time is wasted during periodic activities – asking questions / discussing the process – a big resource drain and can distract key resources at critical times:
  - Implement - clear and simplified accounting policy, end to end process flows, detailed procedures, clear role descriptions (responsibilities), track known issues and workarounds, these steps will streamline execution.
- Pain point - Silo knowledge in sub-components of the process – upstream inputs are not well understood and downstream requirements not met:
  - Implement - cross-training/work rotation to empower people to better identify the root cause of issues and execute process improvement on an ongoing basis.
- Pain point - Excessive waiting time throughout the process, waiting for data, waiting for management review etc.
  - Implement - a distinction between time factors of “effort vs. elapsed time” when modelling processes, attempt to reduce or eliminate elapsed waiting time. This can be as simple as booking management review time in calendars.
- Pain point - Overproduction – producing reports where not all information is utilised:
  - Implement - A periodic review all outputs with customers on a line by line basis;
  - Note - This is perhaps one of the biggest issues seen in accounting. Requirements are continuously added but never reviewed/removed. A cost/benefit consideration should be made when considering new reporting requirements.
- Pain point - Over-processing; too many reviews take place:
  - Implement - A clear model for review and sign off. This forms part of a good internal controls framework for finance.
- Pain point - Over-processing; excessive time on investigationa and adjustment to minor variances (or other numbers) that may have a negligible impact on customer:
  - Implement - A clear set of guidelines around materiality.

### Data

- Pain points - Multiple non-standard 'chart of accounts':
  - Implement - A CoA simplification initiative. This is straightforward and can be run by an individual or small team. After simplification tight and formalised control on new account requests should be put in place.
- Pain points - Profit and cost centre hierarchies that do not mirror business structure:
  - Implement - All key data hierarchies need to be designed by business and application experts and carefully controlled. This can be difficult to correct but can the approach can be broken down into steps and form a longer-term continuous improvement project.
- Pain points - Poor quality data:
  - Implement - Start with a data governance organisation. Data should be clearly mapped according to processes and systems and steps taken to rationalise the use of data and correct data quality issues.
- Pain points - Over-reliance on data integration technology with custom validations and mappings:
  - Implement - A standardisation around one set of technologies;
  - Implement - Data fixes at source avoiding 'translations' where possible. This is particularly relevant for industries such as insurance and financial services where policies or trades need to be converted to accounting entries. Ideally, accounting requirements should form part of the consideration of front office design.

### Applications

- Pain points - Localised heterogeneous systems with different business language (i.e. many different systems with different terms and data):
  - Implement - Try to standardise systems and technologies. Use data management and interface technologies wisely.
- Pain points - Proliferation of systems to meet different needs w/out consideration on effort to align data and manage the process e.g. business transaction systems to local ERP to group consolidation to group analytics to group publishing with various regulatory engines, tax engines etc.:
  - Implement - a strong enterprise architecture function with a business focus. Ensure that the balance between delivering enhanced functions and retaining simplicity is well managed
  - Avoid - letting individual functions pick technologies based on bias according to existing vendors or 'sales/hype' in the marketplace.
- Pain points - Excessive use of spreadsheets to workaround poorly designed/implemented business applications:
  - Implement - An inventory of all ‘end-user applications’ assess risk and feasibility to replace by systems with adequate controls and reliability. Personally I believe excel is a very useful tool. The key is to make sure that where complex VBA is used it's well managed and supported.

### Organisation

- Pain points - Due to the periodic nature of work in 'record to report' it leads to crunch periods and overtime:
  - Think about - work sharing. Cross-training finance staff to take on multiple roles. Design for a flexible flow to the work during busy periods. Often month-end is delayed due to one or two individuals.
- Pain points - Junior staff dependent on inputs from senior staff:
  - Think about - the ways accountants can interact with senior staff such as head of accounting, CFO, general managers to resolve questions or get review and sign off in a way that doesn't hold up processing.
- Pain points - Too many review cycles – no. of reviews, quality of review inputs, contradictory review points over successive reviews:
  - Think about - the entire business analysis, commentary, interpretation, review and approval process is poorly supported by most business applications. Focus on the full procedure and think about the process steps and human interactions etc.
- Pain points - Misaligned priorities of work between groups – financial accounting vs. management accounting, local finance vs. group finance vs. regulatory vs. tax vs. downstream processes:
  - Implement - End to end process mapping and ensure clear handoff and prioritisation exists between groups.

### Policy & control

- Pain points - The accounting policy is not optimised to deliver the defined level of quality within time constraints. For example; account usage, allowed adjustments, materiality thresholds, number of reviewers, the role of reviewer, no. of times reviews carried out, guidance on the handling of accounting issues:
  - Implement - A clear and practical accounting policy, kept up to date to answer any accounting related questions that repeatedly come up or to address accounting related pain points in the process. This is often under-utilised:
  - Document - Clear demarcation of responsibilities for accounts/issues/policy points between finance, tax, regulatory functional groups including also handover responsibilities in the process
  - Create - an accountability matrix. Often delays result from discussions on the responsibility to resolve issues. There should be clear accountability matrix, this includes ownership per account, ratio, KPI, process step etc. Resolution owner do not necessarily have to be the owner of actions.

## How to approach long term improvement

Whether dealing with small scale continuous improvement or large scale systems implementation there are a number of things that can be done to improve the chance of making long term sustainable improvements to record to report. Most of these deal with organisation structure and culture.

### Assign a horizontal process lead

Assign an owner for the end to end process. It’s important that this person has authority over the full process and can command respect from all participants. Often this role fails as the process lead lacks power outside of their own function. Recommended responsibilities:

- Ensure the process is documented and well understood
- Ensure that appropriate policies are in place
- Maintain issue list, problem list, continuous improvement list
- Approve process, systems and organisation changes
- Escalation contact for policy, process, systems, data issues during process execution.

### Create a design authority

Organise a group with representation from all functions in the scope of the process including IT and internal controls. This is a senior group that can advocate for improvement work and can sponsor work through resource and budget allocation. Recommended responsibilities:

- Review, validate, sign off any proposed change work
- Prioritise change work based on issues/problems and provide budget/resources.

### Create a 'global' issues & problems list

Regardless of the state of process and systems documentation, it’s recommended to start with a log of issues and problems encountered in the current process. This can be developed over time as and when issues are encountered. It’s recommended to use this list to capture a few speciﬁc points:

- Impact of each issue – time, quality etc.
- Root cause – what is the real cause of the problem
- Solution – long term/workaround – can be used to note ideas is solution unknown Once established this list will provide a good basis for discussions around the prioritisation of change work.

### Embed Lean culture

Lean is easy to implement and brings huge potential beneﬁt.

Lean is often misunderstood. There is a pattern in the market of consultancies and experts selling lean as a set of mystical tools; 5S, seven wastes, kaizen etc.

The heart of Lean is not a tool. It's a culture. At its essence it's about empowering people to look for issues and either fix or propose fixes for them.

The people who run a process know best the issues. However, they lack the empowerment to act to fix things. Implement Lean from this perspective and encourage the update of issues lists with the root cause and proposed solutions. Create a forum to review input from across the organisation and ensure the top opportunities are acted upon.

### Focus on change mgmt. & governance

Often continuous improvement and change programs fail not due to the technical approach, but rather to the governance around requirements identiﬁcation / validation, communication of the change purpose etc. therefore it’s highly recommended not to overlook change management roles and governance roles.

## What About Business Applications?

Business applications and data ﬂow are critical to record to report effectiveness, a lot of effort is spent dealing with problems caused by suboptimal data and systems. A simplified application architecture for RtR may look something like the below:

![An illustration of a sample application architecture for record to report](/assets/images/blog/record-to-report__two.jpg)

1. A global standard ERP system that can handle all business transactions – purchasing, manufacturing, sales, marketing, human resources etc. a. Unfortunately, this ideal architecture won’t work for industries that require specialised business applications such as financial services
2. Common data – the ERP has one chart of accounts, one common set of hierarchies and common master data
3. A single data warehouse for all enterprise reporting optimised for the size of the business/volume of data and access/manipulation requirements
4. A limited number of specialised software that provides functionality that the ERP and data warehouse cannot, this would typically include a consolidation engine for multi-nationals and analytical tools that can handle ad hoc reporting, multidimensional analysis, budgeting and planning (scenarios, versions etc.)
5. Software required for formal presentation to internal stakeholders or external parties typically including dashboards, formatted reports, publishing and electronic ﬁle transfer.

Additional considerations:

- Platform or software as a service (i.e. cloud) isn’t mentioned in the diagram however depending on the size and requirements of the business it could be anything from 0-100%
- Theoretically with new technologies ERP and data warehousing could be done on the same technical platform, however, this is not yet common.

This simplified architecture is not realistic for most large businesses. Even in companies that run a global single instance of ERP this tends to be restricted to certain business units. Behind the scenes, a number of other systems are often required to meet special business requirements or deal with data or integration problems.

### A more realistic architecture based on the financial service industry

The below diagram provides an illustration of a more realistic application architecture. In fact, this is still highly simplified versus the real world, but should hopefully highlight some common challenges.

![An illustration of a more complex application architecture for record to report](/assets/images/blogs/record-to-report__three.jpg)

1. Many different business systems used in the front office to deal with client transactions, covering equities, bonds, transaction banking, retail banking, asset management etc. Each of these systems may have different data models and structures
2. Separate financial, management and regulatory processes, they work concurrently on similar data and need to be reconciled throughout the process
3. Many points of data integration as shown by black arrows, potentially different data technologies handling mapping, conversion, cleanup, reconciliation etc.
4. Numerous data warehouses/data stores and various different reporting tools
5. Different software applications used for different purposes, this can exist because of:
  a. Acquisitions of businesses and continued use of their systems:
  b. Development of new processes and systems particularly in the regulatory space each time starting from scratch and adding new technology:
  c. Shadow IT within business functions building product or unit-specific technology solutions where the business unit lead has P&L control to run their own IT spend.

Fixing the kind of complex architectural problems present in multi-nationals is not easy, partly due to the organisation structure and stakeholders involved, with this in mind the most important step is introducing governance to take control on decision making on application usage:

- Employee an Enterprise Architect – ideally not sitting directly in one business or IT but with leverage over both (perhaps the office of COO)
- Ensure that an application repository is maintained so that a current catalogue of all approved technologies with licensing details is available – new projects can easily identify existing technologies to be re-used
- Catalog ‘end-user applications’ i.e. the use of excel, access and user-developed technologies w/out formal IT support so that risk mitigation and replacement plans can be considered – these generally control risks
- Create a set of architecture principles that lay out the recommended software products and principles to select software products where required, these principles should promote things such as:
- Using one data migration technology where possible
- Optimising the use of data warehouses
- Trying to reduce the overall number of different instances of software
- Ensuring software is fit for business needs, for the above to work the organisation managing business applications must have business expertise and provide adequate solutions to business requirements.

## The future of record to report

One thing worth highlighting is the need to think about the process, systems, data and organisation aspects of record to report. Most major consulting firms run their transformation projects with these streams. This does increase the likelihood of delivering effective improvements.

One point not as frequently discussed is disruptive processes and technology, for example:

- Moving towards daily/real-time RtR close;
- Fintech including blockchain as a ledger and it impacts e.g. as a PtP sub-ledger or banking ledger for a particular product;
- New database technologies and machine learning e.g. the ability to data-mine a mass volume of local reporting (internal/external) to generate analysis to explain business performance.

These are worthwhile topics to discuss one by one, however, at this point, none of them will solve the end to end problem of making 'record to report' effective for most large multi-nationals. The less exciting topics of studying policy, roles & org design, process steps will likely deliver the biggest benefits.
