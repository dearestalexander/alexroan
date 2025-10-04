---
title: From Web App to SAP S/4HANA with modern integration technology
author: Alexander Roan
date: 2025-08-08
tags: 
hashtags: ["post", "article", "technology", "featured"]
project: 
subproject:
image: /assets/images/blog/integration/integration-cover.jpg
imageAlt:
description:  I've written a detailed guide on the process to create a custom web app and connect it to SAP S/4HANA using a standard API and SAP Integration Suite in SAP Business Technology Platform
---

I came across an SAP event recently which included an exercise to build a modern integration with SAP S/4HANA using their latest toolset.

By intgration we are really talking about interfaces, or more specifically connecting using application programming interfaces (APIs).

S/4HANA is SAP's enterprise resource planning software. The exercise focused on working with one of S/4HANAs standard APIs - the business partner API.

A business partner in SAP is mainly a customer, a supplier, or an employee. These are set up as master data.

There are lot's of use cases where you might want to access business partner data from S/4HANA in another app. Consider a supplier portal or an employee portal. A simple example might be a page to check and update your data.

As a small project I decided to expand on the materials from the SAP event and see if I could build a simple web app to search for business partner data.

This is technically quite complex, and will require:

1) Web frontend
2) Web server
3) Integration software: SAP integration suite on BTP
4) S/4HANA or a simulation of S/4HANA.

I've written this up in two parts. The first provides a broad overview of the whole process and outcome. The second goes into more details on technical settings at each point.

[Part 1: ](/projects/integration-1)
  
[Part 2: ](/projects/integration-2)
