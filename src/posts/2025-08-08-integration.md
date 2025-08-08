---
title: From Web App to S/4HANA, Build A Web App and Connect to S/4HANA with SAP Integration Suite
author: Alexander Roan
date: 2025-08-08
tags: ["post", "article", "technology", "featured"]
image: /assets/images/blog/integration/integration-cover.jpg
imageAlt:
description:  Ever wondered how to connect a custom web app to SAP S/4HANA? I recently built a working prototype using SAP Integration Suite, a frontend built with HTML/CSS/JS, and a mock server that simulates the S/4HANA Business Partner API. I’ve written up the whole flow in a detailed article. It's starts with a business-level overview and then steps through every part of the stack (Custom Web App > SAP BTP > SAP Integration Suite > SAP Cloud Connector > SAP S/4HANA).
---

A big part of the magic behind AI, advanced analytics, and {insert tech buzzword here} is the humble API!

I remember the excitement about service-oriented architecture in the late 1990s and early 2000s. Back when most organisations had 'fat' ERPs with extensive customisation, the idea that we could split things up into different apps and connect in a standardised way was refreshing.

I recently noticed a [SAP CodeJam](https://community.sap.com/t5/sap-codejam/sap-codejam-connecting-systems-and-services-using-sap-integration-suite/ec-p/14110686#M848) on the SAP community events calendar that involved connecting systems to S/4HANA using SAP Integration Suite.

I thought it might be fun to build a web app and see if I could successfully connect it to S/4HANA.

A basic understanding of frontend to enterprise backend via cloud architecture  is useful for everyone; business experts, technology experts, and people experts

The article is broken into three parts: an introduction to the web app, S/4HANA, and business partners; section 1: a step-by-step explanation for generalists; and section 2: detailed technical notes.

## Intro: From web app to S/4HANA

![high level integration flow](/assets/images/blog/integration/integration-1.png)

The rough idea is:

- The frontend is a web page to search for data from within S/4HANA
- The web server handles communication between the frontend and SAP Cloud
- SAP Integration Suite will route and format the message for S/4HANA
- S/4HANA is the source of data.

We can utilise the free trial account for SAP BTP and Integration Suite. We can build the frontend and web app ourselves.

Unfortunately, we can't access S/4HANA. However, the CodeJam provides a S/4HANA mock server that mimics the behaviour of an API within S/4HANA.

If we use a mock system, we will need to run it locally. So, adjusting the architecture.

![high level integration flow 2](/assets/images/blog/integration/integration-2.png)

This adds SAP Cloud Connector which allows an "on-premise" application to connect with SAP Cloud.

## Intro: the front end

Let's start at the end. The completed app offers a summary view and a detailed view.

**Summary view**

This is a screenshot from the web browser (firefox).

![the front end - summary view](/assets/images/blog/integration/integration-3.png)

The top part of the page has a search form that allows you to search for a business partner. The bottom part of the page shows the results with a selection of key fields in a card style layout.

The mock system we are using allows for four different search possibilities:

- Search for a single business partner by number
- Search for all business partners
- Search for a single business partner by number, including address details
- Search for all business partners, including address details.

**Detail view**

![the front end - detail view](/assets/images/blog/integration/integration-4.png)

The detail view shows the results in a table. This table has a horizontal scroll bar, which can be adjusted to view all the fields. The table includes 'raw' results, so there are some 'technical' entries like `[object Object]` and some blanks. This could be refined further.

**Responsive view**

For tablets and mobile, the card view resizes with the browser window.

![the front end - summary view on mobile](/assets/images/blog/integration/integration-5.png)

## Intro: S/4HANA

The value of this flow is being able to design and build a frontend to access real-time, trusted business data from S/4HANA in a standardised way. In a real-world example, our frontend could be an employee portal or supplier portal.

S/4HANA is:

- SAP's enterprise software for large organisations. It handles processes such as purchasing,  manufacturing, sales, shipping, finance, etc.
- An evolution from their earlier ERP products (R/1, R/2, R/3, ECC).
- A complex platform comprising thousands of programs, tables, and customisations used by many large enterprises.

S/4HANA already comes with a web frontend called Fiori, which includes thousands of apps. However, in this example imagine we are building something for a casual user that does not require the full capability of Fiori. Or, just consider it's for fun.

Further reading on S/4HANA:

[SAP help - S/4HANA](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE?locale=en-US)

## Intro: business partner

The mock server simulates one of the business partner APIs for S/4HANA.

A business partner is a reference or master data record that represents a third party that an organisation works with. This includes customers, suppliers, and employees.

Business partner master data is organised by key fields such as "category" and "role".

![Business partner types](/assets/images/blog/integration/Integration-6.png)

All business partners have general data such as name, address, etc., then they have role-specific data, which may include, but are not limited to:

- Purchasing data
- Sales data
- Accounting data
- And so on.

To understand how business partner data is used, consider a typical ERP process like order-to-cash:

![Business partner in a process](/assets/images/blog/integration/Integration-7.png)

This is a summary of the order to cash process. During sales, deliveries, and billing, information from the business partner master record is utilised.

The business partner master stores long-term stable information about the customer. It's used for both reference and validation during transaction entry.

This ensures there is consistency across transactions over time in terms of how they reference business partners. This is critical for reporting. Consider comparability, aggregation, etc.

Further reading on business partners:

[Help - Business Partner](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/74b0b157c81944ffaac6ebc07245b9dc/45653b5856de0846e10000000a441470.html?locale=en-US&version=LATEST)

## Intro: S/4HANA Architecture

The mock server simulates an S/4HANA API. Let's look inside S/4HANA.

![Inside S/4HANA](/assets/images/blog/integration/Integration-8.png)

Starting from the top right, S/4HANA has two primary ways for users to interact. The traditional SAP graphical user interface (GUI) and the modern Fiori web-based user interface.

I've drawn APIs to the left of these. The APIs allow applications to interact with S/4HANA.

Consider the data model in S/4HANA in two separate parts. The first is the traditional HANA database. This is where master data and transactional data are stored. On top of this is the virtual data model. This consists of core data services views. This is a way to define different sets of data to meet the needs of APIs and Fiori Apps.

In this example, we are using a business partner data API. Behind the scenes,  the API sources data from CDS views, which in turn connect to the HANA DB tables.

## Section 1: overview of the integration flow

In this section, I'll summarise the process and technology involved at each step. In section 2 I'll provide more technical details.

![Integration flow detail](/assets/images/blog/integration/Integration-9.png)

### 1 Web communication

Building an integration flow between web connected applications relies on protocols and standards for web communication.

**Client/server**

The terms client and server are used to describe the requester and receiver. For example, the web browser on a computer is a client, and google search is a server.

Internet communications use the HTTP protocol.

![HTTP communication](/assets/images/blog/integration/integration-10.png)

Hypertext Transfer Protocol (HTTP) is a standard protocol for communication between clients and web servers. Web pages are written in Hypertext Markup Language (HTML).

The term Uniform Resource Locator (URL) is used to describe an address.

**The structure of a URLs**

URLs have five key parts.

Protocol: `http://`
Domain: `www.example.com`
Path: `/pages/`
Query string: `?id=1&cat=test`
Fragment: `#article` (an internal page reference, often not present)

When it comes to APIs, the query string provides the ability to specify parameters for search and filter. In this case, the query string could include a business partner number.

**HTTPS**

HTTPS uses the HTTP protocol, but it adds a secure transport layer. HTTPS means the HTTP message is encrypted before transmission.

The only part that isn't encrypted is the domain name.

**Internet protocol (IP) address**

While URLs are designed to be human-readable. An IP is a numerical label like "192.0.2.1" that identifies a computer or network.

URLs are used for navigation. IPs are used for routing and communication. They identify a specific device on a network (laptop, server, etc.).

An IP address can be used in place of a domain name with HTTP and HTTPS

"http://192.0.2.1"

While an IP address represents a computer. The term "port" is used to specific a specific input/output location.

Ports are identified using 4 digits.

"http://{server}:{port}"
"http://192.0.2.1:1000"

A server is often referred to by 'host'

"http://{host}:{port}"

You can access ports on your own computer by using its IP or "localhost"

"http://localhost:1000"

**From domain to IP**

The web browser uses a domain lookup service to translate a URL into an IP address.

"http://www.example.com" becomes "http://192.0.2.1"

This is called the Domain Name System (DNS). Popular look up services include: Cloudflare, Google DNS, and OpenDNS.

**Messages**

The communications themselves can be thought of as messages. They contain a header and a body.

The header includes:

- The URL
- The method, most commonly GET and POST
  - GET sends a request without a body
  - POST sends a request with a body
  - Additional information on the content type and authorisation

The body includes detailed content. For example:

- If you fill in a form on a web page, it would include the form data
- If a server returns a web page, it would include the web page.

**Server Responses**

When a server receives a request, it responds with a status code and a body. Status codes include '200' representing "ok" and '404' representing 'Not Found'.

(404 has definitely reached meme levels of fame!).

The body that's returned depends on the status and the server's purpose.

**Real life examples**

Consider visiting the BBC website from a web browser, a simple GET request would return the home page.

![Communication example - viewing the BBC website](/assets/images/blog/integration/Integration-10-1.png)

On the other hand, consider logging into the BBC website. In this case, the browser sends the login name and password. Therefore, a POST request is used, and the request includes a body.

![Communication example - logging into the BBC website](/assets/images/blog/integration/Integration-10-2.png)

**Web connectivity and SAP**

Most SAP applications can use HTTPS communication. This is possibly one of the simplest ways we could define "Cloud" strategy.

- S/4HANA Cloud Public and S/4HANA Cloud Private can both utilise HTTPS
- SAP BTP which includes SAP Integration Suite can utilise HTTPS

Outside the SAP Cloud, we have systems like S/4HANA On-Premise. This is usually at an SAP customer's data centre or their 3rd party hosting service provider's data centre. On premise systems are usually not directly connected to the public internet. This is where SAP provide Cloud Connector to create a secure tunnel between on-premise and SAP Cloud.

**HTTP data transfer standards**

There are further standards as to how data is transferred using HTTP.

There are multiple standards for data transfer with HTTP. One of the earlier and more common standards is REST (Representational State Transfer).

Many SAP APIs utilise OData (Open data transfer protocol).

### 2 S/4HANA business partner API mock server

**Purpose:** Mimic the business partner API of an S/4HANA system.

**What is it:** A simple JavaScript server that can be run locally.

The mock server provided by the SAP community provides a simple way to simulate the design and test of an S/4HANA API.

- The mock server mimics the business partner (A2X) API
- This is one of the S/4HANA APIs (programmed inside S/4HANA)
- In the case of the mock server, it's a JavaScript server
- The mock server has limited functionality, it supports:
  - Sample data for a few business partners
  - Retrieve all business partners
  - Retrieve a single business partner
  - Include additional address data in the response.

Installing and running the mock server is simple. The instructions are in section 2. When we run it our computer a local address is returned.

On my computer, it runs on "http://localhost:3005/"

This is the address for the Business Partner API. Entering this address in the web browser gives the following response:

![Mock server response](/assets/images/blog/integration/Integration-10-3.png)

The first item refers to the business partner API. This is the first point in the exercise where we can see the path for the Business Partner API:

"/sap/opu/odata/sap/API_BUSINESS_PARTNER"

The API path is just appended to the host, so:

"http://localhost:3005/sap/opu/odata/sap/API_BUSINESS_PARTNER"

Clicking on the link in the browser shows additional information about the API. Note that the only services listed are A_BusinessPartner and A_BusinessPartnerAddress.

![Mock server response - business partner API](/assets/images/blog/integration/Integration-10-4.png)

When building an integration flow, the mix of host names, port names, and paths can quickly become confusing. It's useful to track these as we go.

![Integration flow - mock server](/assets/images/blog/integration/Integration-10-5.png)

Further reading on the mock server:

- [The CodeJam repo](https://github.com/SAP-samples/connecting-systems-services-integration-suite-codejam)
- [GitHub](https://github.com/SAP-archive/cloud-s4-sdk-book/tree/mock-server)
- [SAP Learning](https://learning.sap.com/learning-journeys/develop-advanced-extensions-with-sap-cloud-sdk/exercise-setting-up-the-mock-server_c734679d-9ce9-4905-82c3-ed13603a671d)

### 3 Application programming interface (API)

**Purpose:** Provide a standard way to define and operate services for an application that can be consumed by other applications.

**What is it:** SAP have a large catalogue of standard APIs that come with S/4HANA.

**The Business partner API**

The API that was introduced under the S/4HANA business partner mock server is called 'business partner (A2X)'. It is a SAP standard API that uses the OData V2 standard.

While HTTP is the communication protocol. OData is an open standard related to the data.

When viewing the API details in the web browser, the display was JSON. This is JavaScript Object Notation, which is used in Odata.
  
Point 5. in the flow will show more detail on this API.

Further reading on APIs and Odata:

- Open API spec [openAPIspec](https://spec.openapis.org/oas/latest.html)
- [OData](https://www.odata.org/)

### 4 Business technology platform (BTP)

Skipping Cloud Connector for now, brings us to BTP. Details from BTP are needed to set up Cloud Connector.

**Purpose:** Enable customers to manage and build on SAP applications.

**What is it:** A set of tools encompassing various capabilities and environments.

SAP offer a free trial for BTP, which can be used to build and test integration flows. Instructions on how to register and set up BTP are included in section 2.

The BTP cockpit is where we can search for and set up different services.

It supports multiple infrastructures and runtimes so you can manage/build various types of applications from traditional SAP ABAP to web apps.

- Supports multiple infrastructures/runtimes & languages, including:
  - Cloud Foundry: develop new apps/services, multiple languages, runtimes
  - ABAP: extend ABAP based products (S/4HANA)
  - Kyma: Kubernetes to develop/run cloud-native apps
  - Neo: HTML5, Java, and HANA extended apps

BTP has multiple regions and infrastructure providers

- Regional deployment
- Provided by SAP or Infrastructure-as-a-Provider (IaaS)
  - AWS, Azure, Google Cloud, Alibaba Cloud

The key features of BTP include managing and building:

- Compose business processes
- Application development and automation
  - Build and extend SAP applications
- Integrate data
- Analytics
- Intelligent technologies

SAP Integration Suite utilises the Cloud Foundry environment. After we set up Business Technology Suite and SAP Intelligent Suite, a Cloud Foundry API endpoint will be provided in BTP.

In my case, this is "https://api.cf.ap21.hana.ondemand.com"

![SAP BTP](/assets/images/blog/integration/integration-11.png)

### 5. Business Accelerator Hub

**Purpose:** Provides a central source of information on SAP's APIs

**What is it:** A web page with API details. Highly integrated with BTP.

Business Accelerator hub is a web resource from SAP. I've drawn it inside BTP as it closely relates to BTP content. It's a central repository for APIs from SAP & selected partners.

[api.sap.com](https://api.sap.com/)

Main features

- Discover, explore, and test APIs
- Consume integration and workflow content

The Business Partner (A2X) API that is tested here can be viewed on Business Accelerator Hub.

1. Login to business accelerator hub
2. Search 'business partner (A2X)'
3. Click on the entry in the results

![Business Accelerator Hub](/assets/images/blog/integration/integration-12.png)

Some features of business accelerator hub:

- Try out the APIs (sandbox environment)
  - Useful to view a sample of the response
- View the API capabilities:
  - 'API Reference' tab, scroll down to 'Business Partner' and click on it
  - This shows the list of capabilities of the API
- View the API specification
  - 'Overview' tab, scroll down to 'API Specification' and click on it
  - Download OpenAPI JSON
  - View in web browser, text editor to see extensive details

The API hub is a useful resource in terms of discovering and designing potential API use.

From the mock server specification, we know it's limited to only a few capabilities. We can find the path names for each of these on API hub:

![Business Accelerator Hub - Mock Server Capabilities](/assets/images/blog/integration/Integration-12-1.png)

This confirms the mock server only has a small fraction of the full business partner (A2X) capabilities. This makes sense given how extensive business partner data is in SAP. It's noteworthy that the mock server only supports 'read' activities. We can't test creating or changing a business partner.

The details of each of these requests can be viewed by clicking into them.

While there are three request paths. The address path can be added to the "all business partners" or "single business partner", so there are four possibilities:

- All business partners
  - "/A_BusinessPartner"
- All business partners with address
  - "/A_BusinessPartner/to_BusinessPartnerAddress"
- Single business partner
  - "/A_BusinessPartner('{BusinessPartner}')"
- Single business partner with address
  - "/A_BusinessPartner('{BusinessPartner}')/to_BusinessPartnerAddress"

These paths describe services of the API and are appended to the base URL.For example:

"http://localhost:3005/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('{BusinessPartner}')/to_BusinessPartnerAddress"

The correct terminology for these URLs:

- Base URL/host: http://localhost:3005
- Base path: /sap/opu/odata/sap/API_BUSINESS_PARTNER
- Entity set: /A_BusinessPartner
- Key Access: ('1234567')
- Navigation property: /to_BusinessPartnerAddress

"('{business partner}')" in the example is a placeholder for a business partner number.

Updating the flow diagram with these details:

![Integration flow - with mock server details](/assets/images/blog/integration/Integration-12-2.png)

### 6. SAP Integration Suite

**Purpose:** Design and manage communications between applications.

**What is it:** A service of SAP BTP.

SAP Integration Suite is one of the services available in Business Technology Platform. Therefore, a prerequisite is to register for the BTP free trial.

SAP Integration Suite can then be found under 'Services Marketplace'.

SAP Intelligent suite can be used for Cloud, on-premise, and hybrid scenarios. It includes pre-built, best-practice integration packs

Technically, it's a Java based app, and utilises the Apache Camel framework.

![SAP BTP - Integration Suite App](/assets/images/blog/integration/Integration-13.png)

The steps to install and set up are covered in section 2. After the initial set up you can navigate to the application.

![SAP Intelligent Suite](/assets/images/blog/integration/Integration-14.png)

For this demo/test, the two key menus within Integration Suite are:

- Design > Integrations and APIs
- Monitor > Integrations and APIs

The design area allows us to create an integration flow which involves:

- Specifying source or 'sender' system
- Specifying target or 'receiver' system
- Adding flow steps
  - Modify message header
  - Modify message contents
  - Route steps between sender and receiver.

Within design, there is a graphical editor to build the integration flow.

![Integration Suite - Design](/assets/images/blog/integration/Integration-15.png)

**Business Partner Integration Flow**

Creating the integration flow involves setting the sender details and designing the required transformations to meet the receiver (API) requirements.

As we work through this keep in mind the API expects one of four paths depending on the search scenario:

![Integration Suite Design](/assets/images/blog/integration/Integration-15-A.png)

**The sender**

The sender represents the address that SAP Integration Suite will listen on. This is the address we send a message to from our upstream app. In this case a web app.

This address is built up in three parts:

1. A base which is provided when we deploy the integration flow
2. An 'Address' that we specify in the integration flow
3. Further path details from the web app.

The base of the endpoint is something along the lines of:

https://{trial-account-specific-details}-rt.cfapps.ap21.hana.ondemand.com/http/

For the address name, this demo/test uses the path `/request-business-partners/*` The "`*`" at the end allow us to send requests with additional details that can be utilised in the flow logic.

![Integration Suite Design](/assets/images/blog/integration/Integration-15-2.png)

The web app will send four different types of message to match the four API scenarios, for the demo/test I will use:

- "/api/bp/single"
- "/api/bp/all"
- "/api/bp/single/add"
- "/api/bp/single/all"

The web app will also include the BP number in the message body.

We don't need to specify these in the Integration Flow as the `*` will allow them all to pass as long as they are preceded by "request-business-partners/"

Adding this information to the mapping table.

![Integration Suite Design](/assets/images/blog/integration/Integration-15-B.png)

**Routing and Transformations**

The integration flow routes and transforms the received messages to meet the  API requirements at the receiver. This involves:

- Routing of messages from receiver to sender based on their content
  - 1:1 relationship for each of the four scenarios
- Transform the URLs
- A part of the transformation is extraction of the business partner number from the received message and the placement of it into the API format URL.

**The receiver**

The receiver is set up to match the S/4HANA business partner mock server. 

![Integration Suite Design](/assets/images/blog/integration/Integration-15-3.png)

More detail on the settings of each step are in section 2.

At this point, the integration flow is:

![Integration Suite Flow Updated](/assets/images/blog/integration/Integration-15-4.png)

As an alternative, the web app could have been programmed to send messages that already fit the API requirements. However, in some scenarios sender systems may be inflexible or difficult to develop on, making these transformation capabilities in Integration Suite important.

Further reading on SAP Integration Suite:

- [Help - What is integration suite](https://help.sap.com/docs/integration-suite/sap-integration-suite/what-is-sap-integration-suite?locale=en-US)
- [Apache Camel](https://camel.apache.org/)

### 7. Cloud Connector

**Purpose:** Allow SAP BTP to communicate to On-Premise SAP.

**What is it:** An application that can provide a secure connection between SAP Cloud and On-Premise applications.

In the previous section, we defined the address details of the S/4HANA business partner mock server as:

- Base URL/host: http://localhost:3005
- Base path: /sap/opu/odata/sap/API_BUSINESS_PARTNER
- Entity set: /A_BusinessPartner
- Key Access: ('1234567')
- Navigation property: /to_BusinessPartnerAddress

If you paid attention to the screenshot of the receiver configuration in Intelligent Suite, you will note that it was set to

`http://s4-mock:3006/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('${property.employee_id}')`

The domain was "s4-mock:3006" not "localhost:3005".

This is because we can't connect SAP Cloud directly to an on-premise system. The S/4HANA business partner mock server is a JavaScript server that runs locally on desktop/laptop and is hence considered 'on-premise' or outside the SAP Cloud.

SAP provides "SAP Cloud Connector" to connect on-premise applications to the SAP Cloud.

It's a JavaScript application that can be installed and run locally. Part of the set-up involves entering authentication details from BTP.

After it's set-up, Cloud Connector will accept messages from Integration Suite and forward them to the S/4HANA business partner mock server.

The detailed set-up is covered in section 2.

![SAP Cloud Connector](/assets/images/blog/integration/Integration-16.png)

The screenshot above shows the "Cloud to On-Premise" mapping. A virtual host "s4-mock:3006" is mapped to the S4/HANA business partner mock server running locally on "localhost:3005".

Updating the integration flow.

![Integration flow - updated](/assets/images/blog/integration/Integration-16-2.png)

### 8. Web app: intro

The web app is an application that uses JavaScript as a programming language. Web browsers have JavaScript engines and can run JavaScript code.

There are two parts to the web app. The frontend and the backend.

Think of JavaScript in two categories. frontend JavaScript and server (backend) JavaScript.

**Frontend JavaScript**

- Runs in the web browser, utilising the browsers JavaScript engine
- Is oriented towards manipulating web documents (HTML documents), for example:
  - Retrieve fields from HTML (e.g. sign up form)
  - Update HTML (e.g. show results, dynamically add a new page)
- The JavaScript engine in the browser has limitations.

**Server JavaScript**

- Installed on a server (can also be run on a desktop/laptop)
- A popular engine is Node.js
- Is oriented towards messaging, connectivity, security, authentication
- Has a lot less limitations than the web browser.

We could try to send a request from the frontend to SAP Integration Suite, but because it comes from a browser, it will likely result in errors.

I did try sending a message to Integration Suite from the browser, but received various CORS errors. CORS, or Cross-Origin Resource Sharing, is a browser security feature that controls whether a web page on one domain can access resources from a different domain.

Therefore, the frontend will send a request to the backend, which will then prepare the message and send it as a request to SAP Integration Suite.

Let's look at the frontend first, then the backend.

### 8.1 Web app: frontend

**Purpose:** Search for and display business partner details on a web page.

**What is it:** A simple web app based on HTML, CSS and JavaScript.

The frontend can be built with plain HTML, CSS and JavaScript.

- HTML: Used to define the content of the web page
- CSS: Used to apply styles to the web page (layout, colours, font, etc.)
- JavaScript: Use for programming logic, for example:
  - Get input field values from HTML
  - Fetch data from the server
  - Restructure data for display

HTML, CSS, and JavaScript are written in their own files. They are typically in the same folder.

```
frontend/
├── index.html
├── styles.css
└── script.js
```

The HTML file includes references to the 'styles.css' and 'script.js' documents. These can all be written in simple text editors, but applications like 'visual studio code' help with syntax highlighting and formatting.

For demo/test these files can simply be kept on a computers hard drive. Or they could be hosted on a static web server like Netlify or GitHub pages.

### 8.2 Web app - HTML

Web pages are written with HTML, they are hierarchically structured documents where 'tags' are used to denote different types of element which contain content.

As a simple illustration, the following would create a web page with a title, a text input field, a submit button and a space for results.

```HTML
<header>
  <p>This is the page title</p>
<body>
  <article>
    <form>
      <label>Enter business partner number
        <input type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  <div id="js-results">
    Results go here
  </div>
</body>
```

This would display:

![simple html](/assets/images/blog/integration/Integration-17.png)

- A simple element such as paragraph is denoted by `<p>enter paragraph</p>`
- A more complex element, an input field is denoted by `<input type="text" />`
- In this case, `type` is an attribute set to `text` for text field.

**Getting HTML to talk to CSS and JavaScript**

There are two attributes that allow them to work together:

- "id": for example id="bp-input" (where bp-input is a variable name)
- "class": for example class="bp-input" (where bp-input is a variable name)

These attributes can be added to HTML elements to allow us to access those elements with CSS and JavaScript. The difference between the two is a single "id" value is unique and should only be used once in an HTML document, while a class can be applied to multiple HTML elements.

The body of the web app frontend is:

```HTML
<body>
  <header class="header">
    <div class="header-title">
      <img class="logo" src="assets/team.png">
      <p class="title">Employee portal: business partner search</p>
    </div>
    <nav class="nav">
      <a href="/index.html">Home</a>
    </nav>
  </header>
  <article class="bp-article flow">
    <h2>Search</h2>
    <div class="divider"></div>
    <form id="bp-form" class="bp-search">
      <label for="bp-inp-number">Business partner number:</label>
      <p class="text-small">(Enter 7 digit number or leave blank to return all)</p>
      <input id="bp-inp-number" class="bp-inp-number" name="bp" type="text" />
      <p id="bp-error" class="bp-error"></p>
      <p class="options">Options:</p>
      <div>
        <input id="bp-inp-address" value="add" type="checkbox" />
        <label class="text-small" for="bp-inp-address" name="bp-input-address">Include address details</label>
      </div>
      <div>
        <input id="bp-inp-tab" value="tab" type="checkbox" />
        <label class="text-small" for="bp-inp-tabulate" name="bp-inp-tabulate">Show results in table</label>
      </div>
      <button id="js-inp-sub" type="submit">Submit</button>
    </form>
    <h2>Results</h2>
    <div class="divider"></div>
    <div id="js-bp-results" class="bp-results">      
    </div>
  </article>
</body>
  ```

It's not very complex. Most of the complexity is in the CSS styling and the JavaScript programming to return the results.

This segregation of content (HTML), styles (CSS), and programming logic (JS) makes working with frontend well structured.

The web app initial HTML includes:

- A header bar with the logo, page name and home link
- A search section with search field options
  - BP number
  - Checkbox to get address
  - Checkbox to show results in detail view

This is how this looks without styling.

![Frontend without styling](/assets/images/blog/integration/integration-18.png)

The version with styling was shown at the start of the article.

Here is the [HTML file](/assets/documents/integration/frontend-html.html)

### 8.3 Web app - CSS

Cascading style sheets (CSS) are used to apply styles to HTML documents. Consider an HTML document with three lines of text:

```HTML
<p id="line-one">This is text line one</p>
<p class="other-lines">This is text line two</p>
<p class="other-lines">This is text line three</p>
```

These can be styled with CSS as follows:

```CSS
#line-one {
  color: red;
  font-size: 1.2rem;
}

.other-lines {
  color: blue;
  text-decoration: underline;
}
```

This would show:

![CSS](/assets/images/blog/integration/Integration-19.png)

The complete CSS for the demo/test web app is lengthy. Around 200 lines. Here is a snippet to get an idea of what it looks like:

![A snippet from the CSS file](/assets/images/blog/integration/integration-20.png)

CSS is easy to pick up, but challenging to master!

Looking at the class "bp-search". This applies to the area of the HTML document where the search fields are collected. The CSS here does things like orient those search fields in a column "flex-direction:column" and apply a border and a shadow.

This is how our page looks with styling.

![HTML page with CSS styling](/assets/images/blog/integration/Integration-21.png)

Here is the full [CSS file](/asssets/documents/integration/frontend-css.css)

### 8.4 Web app - JavaScript

Frontend JavaScript is able to retrieve, edit and add elements to the HTML document. Writing the JavaScript is possibly the most challenging part of this demo/test, so I'll just summarise what the code does:

- Listen for a click of the 'submit' button
- Get the value of the form input elements
  - The Business partner number
  - The status of the 'include address details' checkbox
  - The status of the 'show results in table' checkbox
- Check the business partner value is valid
  - It has to be blank or a 7-digit number
- Create a variable object called 'request' to track the request type
  - The variable includes:
    - request URL
    - request method
    - request body
  - (The ability to track multiple values in an Object is a key JS feature)
- Based on the input fields, identify the request type & update the 'request' object.
  - The combinations are:
  - If bp number is blank and get address isn't checked
  - If bp number is blank and get address is checked
  - If bp number is entered and get address isn't checked
  - If bp number is entered and get address is checked.

At this point, the request object will store a set of values based on the input selections. The values will be one of the four options listed in the earlier tables.

The JavaScript now has what it needs to send a request to SAP Integration Suite. The rest of the JavaScript handles various things:

- Use the JavaScript method 'fetch()' to send requests to the server
- Handle security and authorisation
  - Getting a token if needed
  - Sending a token with requests
- Handling errors
- If successful, capturing the returned data
- Working through the returned data and updating the HTML
  - Creating cards for the summary view
  - Creating a table for the detailed view

Here is the [JavaScript](/assets/documents/integration/frontend-javascript.js).

### 9. Web app: backend server

**Purpose:** Allow a web frontend to communicate with SAP BTP.

**What is it:** A JavaScript web backend server for message formatting and routing.

The backend server is locally hosted on our computer for this test/demo, but in reality would be on a web server somewhere.

It's written in express, which is a framework on Node.js. It's quite different from frontend JavaScript.

The logic of the backend is:

- Listen for communication from the frontend
- If a message is received:
  - Do some manipulation of the message related to authorisations
  - Using fetch() try sending a request to SAP Integration Suite
  - More authorisation/security handling
  - If successful, return the response back to the browser
  - If unsuccessful, log and return the error.

Here is the backend [JavaScript code](/assets/documents/integration/backend-javascript.js). This needs to be set up as part of a Node.js server.

The JavaScript server is a bit more complex than the frontend. The server folder contains:

```
web-app-server/
├── node_modules/         # created by npm install
├── package-lock.json     # created/updated by npm install
├── package.json          # you write this (or generate with `npm init`)
└── server.js             # your server code
```

server.js contains the actual JavaScript code for the server.
package.json defines project settings, dependencies, and scripts.
node_modules/ and package-lock.json are automatically generated when dependencies are installed using npm install.

The port can be specified in 'server.js'. I choose port 5000.

This means the server will run on 'http://localhost:5000'.

![Section of server.js](/assets/images/blog/integration/Integration-24.png)

After writing package.json and server.js, the following steps are required in terminal to initialise the server, install express, and then start the server.

- cd web-app-server
- npm init -y
- npm install express
- node server.js

We can now update the flow diagram with the details for the frontend.

![Integration flow](/assets/images/blog/integration/Integration-25.png)

### One flow, many messages

Looking at the diagram, a click on the search button triggers a message that passes through four stages:

1. From the frontend (browser) to the backend web server
2. From the web server to SAP Integration Suite
3. From Integration Suite to Cloud Connector
4. From Cloud Connector to the S/4HANA system

JavaScript doesn’t normally “wait” for things to happen — it’s designed to keep running while other operations (like network requests) complete in the background.

However, the fetch() function is asynchronous, which means it starts a request and immediately returns a kind of “promise” — a placeholder that will eventually be resolved when the response comes back (or if it fails).

When testing this flow, there are multiple layers where errors can occur:

- The browser console (frontend logs)
- The backend server console (Node.js logs)
- Integration Suite’s monitoring tools

The message can fail at any step, and it sometimes takes a bit of detective work to figure out where it failed and why.

If everything works, and S/4HANA returns a successful response (status code 200), that response flows automatically back through the same chain — each layer staying in a “waiting” state until the result is passed back to the frontend and displayed to the user.

Don't worry if it's not 100% clear, it took me a while to figure this out.

## Section 1 conclusions

It's really fun to build your own frontend and connect it to a real enterprise grade system.

A few important considerations:

- Precision is needed with the integration configuration:
  - Host names, types, routing, transformation are all sensitive to mistakes
- The JavaScript is a little complex, but it is all well established. 
  - A JavaScript and Node.js course and some googling could enable anyone to create this.
- Using the S/4HANA business partner mock server is a quick and fun way to test out a potential integration with S/4HANA. However, it is just a mock server with limited features and a build and test with a real S/4HANA system would be required.

However, it's easily achievable with a little study and practice and it opens the possibility to develop a wide range of things. The APIs brings together:

- Real-time fast access to a wide range of business data thanks to S/4HANA.
- Extreme flexibility on the frontend side thanks to modern HTML, CSS and JS.

## Section 2: building the integration flow

If interested to experiment with SAP Integration Suite, I'd suggest working through the CodeJam. A lot of effort has been put into the instructions and reference information. It also includes additional mock servers and covers integration with other technologies.

[SAP CodeJam](https://community.sap.com/t5/sap-codejam/sap-codejam-connecting-systems-and-services-using-sap-integration-suite/ec-p/14110686#M848)

The instructions are on a [GitHub repository](https://github.com/SAP-samples/connecting-systems-services-integration-suite-codejam).

In the following section I'll share some tips and recommendations from my own notes. This may be a bit rough.

Building this will involve encountering issues and require some debugging, just reference the documents and use google on errors.

### Information sources & tools

#### SAP Accounts: BTP and Integration Suite

A trial account for business technology platform is required.

[BTP trial](https://developers.sap.com/tutorials/hcp-create-trial-account.html)

And a a trial for Integration Suite

[Integration Suite trial](https://developers.sap.com/tutorials/cp-starter-isuite-onboard-subscribe.html#f55ec71c-2853-4b83-8092-4e3031f8d6e6)

See the pre-requisites [pre-requisites](https://github.com/SAP-samples/connecting-systems-services-integration-suite-codejam/blob/main/prerequisites.md) document in the CodeJam repository.

#### Containerisation & Docker

When running the S/4HANA business partner mock server locally, one option is to install the necessary JavaScript runtime environment and run it manually. Another option is to run it inside a container.

Containers are a key concept in Cloud architecture.

A container packages an app and all it's dependencies together so that it can run independently of the underlying computer (server, laptop, etc.).

This is a key concept for Cloud as it allows applications to run on different hardware and operating systems with minimal set up effort.

Docker is a platform to build and manage containers.

Docker and container features:

- Package an app and all it's dependencies
- A container is like a lightweight virtual machine
- Key terms
  - image: blueprint (.zip) containing app, dependencies, and OS
  - container: running instance of an image
  - dockerfile: instructions to build image
  - volume: how to persist data outside the container
  - port mapping: expose internal port to machine (e.g. 8080 to 3001).

I'll come back to this in the section on running the BP mock server.

#### Data basics

The following data standards/formats are used in this exercise:

**JSON (JavaScript Object Notation)**

- A lightweight, human-readable format for storing and sharing structured data
- Looks like nested key-value pairs (like a shopping list with categories)
- Commonly used in web apps and APIs for sending data between systems.

For example:

```JSON
{
  "employee_id": "1234567",
  "employee_name": "Alexander"
}
```

**XPATH**

- A query language used to navigate and extract data from XML or HTML documents
- Lets you point to specific elements using a path-like syntax 
  - Example: find the third paragraph inside a section
- Used in tools like web scrapers and automation scripts.

For example:

```XPATH
 //title[contains(text(), 'Programming')]
```

**XML (eXtensible Markup Language)**

- A flexible, tag-based format for representing structured data
- Similar to HTML in appearance
  - But used for data storage and exchange, not page display.

For example:

```XML
 <book id="bk01">
      <author>Roan, Alexander</author>
      <title>Front end to S/4HANA</title>
```

**HTML (HyperText Markup Language)**

- The standard language for building web pages and displaying content in browsers
- Uses tags to define elements like headings, paragraphs, links, and images
- Focused on structure and layout, not data exchange.

#### Terminal

I worked through this demo/test on Mac so I used Terminal, which is the Mac default command line interface (CLI).

The CLI is necessary for activities such as setting up and starting servers or working with docker containers.

**Terminal basics**

- Open a folder `cd <folder name>` (change directory)
  - `cd` on it's own will go to the home directory
  - (Note that `~` represents home directory in terminal)
  - `cd ..` will go up a folder
- List folders `ls` (list files in the current directory)
- Open a file `open <file name>` (open a file)
- Quit sub-screen and return to terminal `q`
- Stop a running process hold control and c
- Clear terminal `clear`

To run JavaScript servers, JavaScript runtime is required. It's easier to install and manage things like this using a package manager in Terminal. Homebrew is a popular package manager for Mac.

**Homebrew**

- A package manager for Mac
- To install homebrew homebrew:
  - Launch terminal (launchpad > other > terminal)
  - Visit [Homebrew](https://brew.sh/) in your web browser
  - Copy the installation command
  - Paste it into terminal press enter.

#### Java/JavaScript

To complete the demo/test a few different JavaScript things are needed.

**Node.js**

- This is a JavaScript that can be installed locally to create and run web-servers and web applications
- Install using Homebrew
  - In terminal, enter: `brew install node`
  - Test the installation of Node.js
    - In terminal, enter: `node -v`, it should return the node version number.

**NPM**

- NPM is the node package manager
- It's installed with Node.js
- It's used to run a server
  - Install it in any directory a Node.js server sits in
- To check the installation of NPM
  - In terminal, enter: `npm -v`, it should return the npm version number

**Java development kit (JDK)**

- Cloud Connector is a more complex application and requires JDK
- More notes in the Cloud Connector section.

#### API client (Bruno/Postman)

The CodeJam utilised [Bruno](https://www.usebruno.com/) for API testing.

For the CodeJam a folder of pre-configured settings for Bruno is provided. However I'd suggest to start experimenting without the pre-configuration to build a solid understanding of the basics.

I'll include more notes in later sections.

### Building and testing an integration flow

#### Set up the S/4HANA business partner mock server

Start by setting up the S/4HANA business partner mock server

- Download the mock server from [GitHub](https://github.com/SAP-archive/cloud-s4-sdk-book/tree/mock-server)
- Scroll down to the readme
- Either download the archive linked under 'How to run this server'
- Or if using GitHub clone the repository and checked the branch 'mock-server'
- Move it to a convenient folder of your choice
- I set it a `users/<username>/projects/integration/cloud-s4-sdk-book`

#### Run the server: option 1: use NPM

Node.js and the node package manager (NPM) can be used to run the server directly on a computer.

- Open terminal
- Navigate to `users/<username>/projects/integration/cloud-s4-sdk-book`
  - (or wherever you saved the folder)
- Enter: `npm install` (install node package manager in the folder)
- Enter: `npm start` (start the server)
- This should return something like:

```shell
> bupa-mock-odata@1.0.0 start
> node server.js
Mock server started on port 3000 after 1 ms, running - stop with CTRL+C (or CMD+C)...
```

Terminal tells us which port the server is running on. Port "3000" is accesible in the browser or an API client via "http://localhost:3000".

To stop the server in terminal use `ctrl+c`.

For the curious, you can look at the files that make up the mock server in the above folder. Check out:

- server.js
  - This includes the JavaScript code for the server
  - The code references other files such as app.js
- package.json
  - This is like a configuration file for a node.js server
- business partner > business-partner-data.json
  - This contains the demo test business partner data.

Theoretically you could use this Node.js server as a template to simulate other SAP Odata APIs with some adjustments to these files.

#### Run the server: option 2: use Docker

The mock server can also be run as a Docker container. This is a little more convenient as after the first run we can stop and start it from the Docker desktop app.

Note the server already has a Dockerfile, so it's already set up to run as a container.

If we run something inside a docker container we need to interact with it via ports on the container. The application is really running contained inside a container. When we run a docker container we provide a mapping between a local port on the computer and the container port. We can then access the docker application via this mapping.

To run as a Docker container:

- Launch the docker app
- Open terminal
  - Enter `docker run -p 3005:8080 bp-mock-server`
    - 3005 is the local port
    - 8080 is the docker container port
  - Local port can be any free port on your computer. I choose 3005
  - The container port is 8080
- View the status of the container in the Docker app
- Use the browser to check `http//localhost:3005`

Note if there wasn't already a dockerfile we would need to create one and build the app before running it.

**A simple docker demo**

This was my first time using docker, so I experimented by creating a simple "Hello, World!" style server from scratch. Here it is if you want to try:

- Create a JS file "index.js"
  - Add `console.log("hello from docker");`
  - This just prints text to the console (Terminal)
- Create a package file "package.json"
  - Add the following JSON to "package.json"

```json
{
  "name": "hello-docker",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

- Create a dockerfile "dockerfile"
  - Add the following to "dockerfile"

```Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
```

You can see Docker uses NPM, in the same way we would with a manual run, but it's installing and running NPM inside the container, not on the computer.

To build and run:

- Build docker container `docker build -t hello-docker .`
- Run docker container `docker run hello-docker`

#### Testing with the web browser

The simplest way to test the API is running locally is to put the local address in the web browser.

- For NPM it was "http//localhost:3000"
- For docker image it was "http//localhost:3005"

The main domain should return the API details including the links such as:

"http://localhost:3000/sap/opu/odata/sap/API_BUSINESS_PARTNER"
"http://localhost:3005/sap/opu/odata/sap/API_BUSINESS_PARTNER"

To access the service to return the general data of all business partners we add A_BusinessPartner

"http://localhost:3005/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner"

In the browser, this should return a JSON document containing the list of business partners.

We can pick a business partner number from the list and use it with the path to select a specific business partner:

"http://localhost:3005/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('1003764')"

#### Testing with an API client (Bruno)

Rather than just using the web browser to check the API an API client can be used, this has a few benefits:

- We can build the URLs through a selection of 'input fields'
- We can save different requests for easy and quick re-testing
- We can pass data in the request body

To test with Bruno:

- Launch Bruno
- Use the '...' menu to create a collection
- Name it 'bp-mock'
- Specify a location. I used "users/{username}/projects/integration"

Create a request for all business partners

- Use the '...' menu next to bp-mock and select 'new request'
- Enter request name 'All business partners'
- Under URL select 'GET' and enter the URL that returns all business partners
- `http://localhost:3005/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner`

Run a request

- Look to the right of the 'GET' line on the main page and click the '->' to run
- The right panel will show the JSON response
  - The same response as shown earlier in the web browser.

Create a request for a single business partner (1003765)

- Use the '...' menu next to bp-mock and select 'new request'
- Enter request name 'Specific business partners'
- Enter the same URL details as above.
- In the 'params' tab click '+ param' and enter
  - Name: `&filter`
  - Path: 'BusinessPartner eq '1003766'
- Run the request. A single business partner should be returned.

Note as the params are entered the URL dynamically updates.

**Basics on OData API URLs**

- The base for the API is "/API_Business_Partner"
- A service of the API is then appended  "/A_BusinessPartner"
- Queries can then by added, OData queries include:
  - Filtering: `/A_BusinessPartner?$filter=Name eq 'Max'`
  - Selecting fields: `/A_BusinessPartner?$select=Name,City`
  - Pagination: `/A_BusinessPartner?$top=5&$skip=10`
  - Accessing nested data: `/A_BusinessPartner?$expand=Address`
- When working with OData:
  - Field names are case sensitive
  - String values in single quotes

Keep in mind the S/4HANA mock business partner server only includes limited functionality. The above filters and selects won't work.

#### Java SDK for SAP Cloud Connector

The next step is to set up SAP Cloud Connector

Recall Cloud Connector will provide a secure tunnel allowing SAP Cloud to talk to the S/4HANA business partner mock server.

Cloud Connector requires a full Java Development Kit (JDK).

- You can use "javac -version" in terminal to check if you already have JDK
- There is a SAP Help page for [Cloud Connector](https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/cloud-connector?locale=en-US)
  - Check the [prerequisites](https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/prerequisites?locale=en-US#jdks) section, it lists the JDK options
- I choose SAP machine 21 JDK
- You can download this from [GitHub](https://sap.github.io/SapMachine/)
  - I have a dev folder for items like this in my home folder
    - "Users/{username}/dev"
  - Use Homebrew to install
  - Open terminal and enter "brew install openjdk@21"

It's likely you may run into version, compatibility, authorisation issues. These are all very common and a web search should help.

#### Install Cloud Connect

Next install Cloud Connector.

Cloud connector is listed under the SAP development tools page under [Cloud](https://tools.hana.ondemand.com/#cloud).

- Download the cloud connector file for your OS
- My Mac is Apple Silicon so I chose 'sapcc-2.18.1.2-macosx-aarch64.tar.gz'
- Unzip and move it to a folder of your choice
- Navigate inside the downloaded folder in terminal
  - Check contents with 'ls', you should see a 'go.sh' file
- Enter: './go.sh' this will run Cloud Connector
- Cloud connector should now be running, note the address in the terminal log
- Login with default account: 'Administrator' and password: 'manage'
- Change password
- Keep a note of the account and password.

I received authorisation issues on the first attempt to run it:

- Click through them, then goto apple > settings > privacy&security
- Scroll down to security and click 'allow anyway'
- Try: './go.sh' again.

#### Install and set up SAP Integration Suite

To continue from here SAP Integration has to be installed and active as per the earlier instructions.

#### Connect SAP Cloud Connector to SAP Integration Suite

As Cloud Connector bridges between SAP Cloud and the S/4HANA business partner mock server we need to set it up to connect to SAP Cloud. We get the security/authentication data to do this from our SAP BTP trial account.

- After logging into Cloud Connector click '+Add Subaccount'
- Hit 'next' to skip the HTTPS settings
- Select 'Configure using authentication data'
- Select 'Add subaccount authentication data from file '
- In your browser got to your SAP BTP trial homepage
  - Click on your subaccount
  - On the left menu expand Connectivity and select Cloud Connectors
  - Click on 'download authentication data'
- Return to Cloud Connector
- Click browse and select the downloaded file 'authentication.data'
- Click next
- Leave location ID blank
  - (This would be relevant if there were multiple Cloud Connectors)
- Click finish.

Double check the settings in the subaccount overview:

- BTP trial region = Cloud Connector region
- BTP Subaccount ID = Cloud Connector Subaccount
- The region host in Cloud Connector = Cloud Foundry API Endpoint in BTP.

#### Cloud Connector to Mock BP Server

There's no security on S/4HANA business partner mock server so it is simply a matter of adding the address.

- In Cloud Connector, on the left sidebar click 'Cloud to On-Premise'
- To the right of 'Mapping Virtual to Internal Systems' click `+`
- Select back-end, enter: "Non-SAP system", click 'next'
- Select protocol: "HTTP", click 'next'
- For internal host enter "localhost"
- For internal port enter:  "3005"
- For virtual host: "s4-mock"
- For virtual Port: "3006"
- Uncheck allow principal propagation
- Click through to finish.

Replace the internal port name with the one your mock server is running on locally. You are free to choose the virtual host and port.

It's critical to select "Non-SAP system" and HTTP, not HTTPS.

A new entry will appear under 'Mapping Virtual to Internal Systems'

- Make sure your mock bp server is still running on the host and IP you entered  
- From the icons on the right, click on 'check availability..'
- You should see status 'reachable'

At this stage `https://localhost:3005` is now mapped to `https://s4-mock:3005` in the SAP Cloud.

You can also check in integration suite to see if Cloud Connector is connected.

- In the left hand menu select connectivity > cloud connectors.

Errors at this stage are likely related to

- Mistakes in the host name, port name, or system type
- The mock server or cloud connector is not running.

#### Design integration flow

##### Create an integration flow

- Login to BTP trial home
- From the left hand menu expand Services and select Instances and subscriptions
- Under 'Subscriptions' click on 'Integration Suite'
- On the left menu select expand 'Design' and select 'Integrations and APIs'
- Choose 'Create' on the top right to create a new package.
- Give it a name
- Shift to the 'Artifacts' tab
- Select 'Add' and choose 'Integration Flow' from the list
- Give it a name
- Click add
- Click on the newly created integration flow

The integration flow screen is read-only by default, click edit.

**Set up the sender**

Define an 'address' for the SAP Integration Suite endpoint.

- Click on sender
- Click connector arrow
- Drag to start event
- In adapter type pop-up select HTTPS
- To configure the adapter click on the drawn line (if not selected)
- The settings are in the bottom panel, drag it up to expand it
- Navigate to 'connection' tab, enter the following:
  - Address: `/request-business-partners`
  - Authorisation:  `User Role`
  - User Role: `ESBMessaging.send`
  - CSRF Protected: `Unchecked` (Cross-site request forgery).

**Add flow elements**

The CodeJam has excellent instructions for walking through different flow steps as per their exercises.

I will summarise a few elements I used in my design.

**Router**

![Router](/assets/images/blog/Integration-23-A.png)

- The router allows you to split the flow based on a condition.
- This example splits the flow into 4 based on the incoming URL
- For example where the incoming URL ends in "single/add"
  - Re-call our integration flow address was "request-business-partners"
  - In this case a message arrives to "request-business-partners/single/add"
  - Intelligent Suite assigns the last part to the variable CamelHttpPath
  - Which is part of the message header hence: header.CamelHttpPath.

The route path we are looking at in this example is the one that returns a single business partner with address data.

**Content modifier - case 1**

Case 1:

- The content modifier allows us to modify the message header or body.
- In the above screenshot a content modifier is added directly after the routing.
- This deletes the CamelHttpPath, in this case "single/add"
- After routing we no longer need this part of the URL in the message header.

**JSON to XML converter**

- This converts the JSON in the message body to XML.
- In the case of searching for a single BP the message body includes JSON:

```JSON
{
  "employee_id": "1234567"
}
```

- This will be converted to XML

```XML
<root>
  <employee_id>1234567</employee_id>
</root>
```

**Content modifier - case 2**

![Content modifier](/assets/images/blog/Integration-23-B.png)

- In this case the content modifier gets "employee_id" from the message body
- And assigns it to a new variable
- XPath can be used to access the XML value
  - "/root/employee_id"
- The variable name is set as employee_id
- The data type is set as a Java string.
  
**Request Reply**

Request reply let's us send a request to a server.

- Click on the Set employee_id
- Click add flow step on the canvas
- Select 'Request Reply' under call > external call
- Click on 'Request Reply'
- Click on 'connector' and drag to the receiver
- Select adapter type 'HTTP'
- Under 'HTTP' in the connector properties, select 'Connection'
- Enter the address of the cloud connector:
- The path for a single business partner with address data involves updating:
  - Address: "http://s4-mock:3006/sap/opu/odata/sap/API_Business_Partner/A_BusinessPartner('${property.employee_id}')"
  - Query: "$expand=to_BusinessPartnerAddress"
- Proxy Type: `On-premise`
- Method: `GET`
- Authentication: `None`
- Save
- Deploy

To check deployment status go to Monitor > Integration and APIs. On this page the endpoint to access the service is shown:

"https://{your trial}-cpitrial03-rt.cfapps.ap21.hana.ondemand.com/http/request-business-partners"

##### Test Cloud Integration with API client

At this point we can test consuming the API through SAP Integration Suite.

Unlike testing the local mock server, we need to deal with authentication and security. The way this works is:

- We pass a "client id" and "secret" to a "token URL"
- BTP passes back a "token" which is valid for a certain period of time
- This "token" has to be attached to any requests to the API in Intelligent Suite.

**Accessing security details**

- Navigate to your BTP trial account
- Expand services and click on 'instances and subscriptions'
- Scroll down to instances and look for your integration flow instance
  - Integration Suite uses Cloud Foundry so the runtime will be cloud foundry
  - It will likely be named 'default_it-rt_integration-flow'
- Scroll down to service keys and click on the service key, note the values for:
  - "clientid"
  - "clientsecret"
  - "url"
  - "tokenurl"

For local testing we can hardcode these values in our test tools, but be careful not to upload or share these anywhere.

In production, never hardcode secrets or tokens. Use environment variables or a secure credential store.

**Request a token with Bruno**

In Bruno create a new request:

- Name: `TOKEN`
- Method: `POST`
- URL: enter the "tokenurl" from above
- Navigate to the Params tab:
  - Select 'Add Param'
  - Enter name: `grant_type` path: `client_credentials`
- Navigate to Auth
- Switch 'Inherit' to 'Basic Auth' and enter:
  - Username: `client_id`
  - Password: `client_secret`
- Save

Send the request. This should return a JSON document with a long value in "access_token". There should also be a expiry time e.g. 4199 seconds.

When sending a request, if the token is not valid Integration Suite will return a 401 error code. This means we need to request a new token.

Within Bruno we can save this token value to a variable. This saves us from copying and pasting it into other requests.

- Goto Environments > Configure > Create Environment
  - Name: 'integration-flow'
  - Click '+ Add Variable'
  - Enter name: 'access_token'
  - For value, leave it blank
  - Save and close

Navigate to 'scripts' under the TOKEN request. Under Post Request enter:

```JS
if (res.status == 200) {
  const token = res.body.access_token;
  bru.setEnvVar("access_token",token); 
}
```

- If the request receives a response (status 200)
- Get the access_token value from the response
- Assign to environment variable "access_token".

Save and run the TOKEN request.
Goto the environment and click 'configure'. You should see the access_token variable updated with the value from the response.

**Test the API with a request with for a single BP**

- In Bruno create a new request
- Name: "BP via integration suite"
- URL: "https://{your-trial}.it-cpitrial03-rt.cfapps.ap21.hana.ondemand.com/http/request-business-partners"
  - Replace the above with your actual endpoint from Intelligent Suite.
- Navigate to the 'Auth' tab
  - Click on 'Inherit' and change to 'Bearer Token'
  - In Token enter: `{{access_token}}`
    - This eferences an environment variable in Bruno
- Add the request body
  - The JSON with our employee ID

```JSON
{
  "employee_id": "1003764"
}
```

### Building and testing a frontend

At this point a request to SAP Integration Suite should be successfully routed and transformed to the S/4HANA business partner mock server.

The next part would be building and testing the web app. However, there is too much to cover in building and testing the frontend to cover in this post. I may produce a video on this if anyone is interested.