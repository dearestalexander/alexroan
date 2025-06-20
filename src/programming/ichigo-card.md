---
title: Frontend Mentor
subtitle: Card - 'Ichigo' design
author: Alex Roan
date: 2024-11-13
tags: ["programming"]
image: /assets/images/programming/prod-card-ichigo.png
imageAlt: A screenshot of the a 'ichigo' themed web page. Ichigo is the main character of the anime called Bleach.
description: I created a product card page in HTML and CSS based on the character Ichigo from the Anime called Bleach. This was an alternate design for one of the challenges on the Frontend Mentor website.
---

One of the responsive design challenges on [Frontend Mentor](https://www.frontendmentor.com) is a simple product preview card. The trick with this design is the image changes position between narrow screens and wider screens.

This allows for good utilisation of the wider space on laptops and desktops by including a larger image side-by-side with the product text. For narrow screens on tablets and mobiles the image moves to the top and the text flows below.

In addition to moving the text this challenge utiises the 'picture' element in HTMl and the 'srcset' attributes. These allow you to provide different images for different device sizes. A simple approach to images across device sizes is to shrink the image down, but in this case detail may become hard to see. With 'picture' you can provide a large image for devices with large screens and provde a cropped image for devices with smaller screens. This allows you to crop in on detail that you'd like to be visible on smaller devices.

The specification in the Frontend Mentor challenge is a product card for Perfum. After completing this design I decided to create a character card for Ichigo from the anime called Bleach. Instead of 'Add to Cart' I just labelled the button 'Add to favourites'.

Bleach was a very popular anime back in the day with around 260 episodes. I watched them all. Over the last few years they came back with some new seasons. The final arc. It's like meeting an old friend seeing Ichigo on the TV again!

![Ichigo bleach design](/assets/images/programming/prod-card-ichigo.png)

The page is live on [github](https://dearestalexander.github.io/fm_prod-prev-card/).