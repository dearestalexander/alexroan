---
title: Newsletter Sign-Up Page
author: Alexander Roan
date: 2025-08-25
tags: 
hashtags:
project: ["Frontend"]
subproject: ["Frontend Mentor"]
image: /assets/images/frontment/newsletter/newsletter-desktop.png
imageAlt: A screenshot of a newsletter sign up webpage design.
description: In this frontend mentor challenge I created a newsletter sign up page in HTML and CSS with JavaScript to control e-mail validation and a confimation page.
---

## Challenge Details

This is a challenge on [Frontend Mentor](https://www.frontendmentor.io/) to build a newsletter form. The objective is to allow users to::

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if:
- The field is left empty
- The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## My build/design

I built this mobile first, with some media queries to make adaptations to desktop layout.

The JavaScript is fairly simple, the most complex part is using a regular expression (regex) to check the e-mail format.

Other than those, it just takes some time to get the design right.

To switch between form and submission confirmation pages I use display: hide. I do need to go back and ensure that these elements are labelled correctly from an accessibility perspective.

Desktop:

![desktop design](/assets/images/frontment/newsletter/newsletter-desktop.png)
![desktop - incorrect e-mail](/assets/images/frontment/newsletter/newsletter-desktop-2.png)
![desktop - correct e-mailil](/assets/images/frontment/newsletter/newsletter-desktop-3.png)
![desktop - submission confirmation](/assets/images/frontment/newsletter/newsletter-desktop-4.png)

Mobile:

![Mobile design](/assets/images/frontment/newsletter/newsletter-mobile.png)

## Links

The website is live on GitHub:

[Newsletter live page on GitHub](https://dearestalexander.github.io/fm-newsletter/)

And the submission on Frontend Mentor here:

[Newsletter on FrontendMentor](https://www.frontendmentor.io/solutions/newsletter-sign-up-form-with-html-css-js-NpWZUEXkEi)
