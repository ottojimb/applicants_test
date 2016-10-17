# Liftit Test

## Overview

This exercise will have the candidate build a responsive site navigation driven by an AJAX request.

Here are the guidelines for this exercise

* No frameworks or libraries (e.g. jQuery, Angular, React).
* Chrome compliance is all that's required, all functions and features available in Chrome are in play.
* Nav must be responsive.
* Code must run after the following command, please ensure your code runs as you expect it to from a fresh checkout with these commands before submission.

```
$ npm i && npm start
```

Nice to haves:

* Adherence to accessibility standards
* Documentation
* Unit and/or E2E tests

At a high level the navigation will have two main states

* <768px: Mobile. Hamburger icon will display in the top-left of the page. Clicking the hamburger will cause a card to slide in and overlay the content from the left. The card will contain nav and sub-nav items defined in the JSONP response
* \>= 768px: Desktop. The nav will display as a horizontal nav. Top level nav items will display sub-nav items when clicked. No hamburger will be shown.

## Version
0.1.0

## Files

* Mockup - Illustrator file describing how the nav should behave
* server.js - node.js server that will host the site and provie the api to construct the nav

## API

* GET /api/nav.json - returns a JSON response representing the items in the nav.
**Please note** that the first time it will raise a exception that looks like `Error: ENOENT: no such file or directory, stat '/Users/your_user/liftit_test/data/undefined' at Error (native)`, that error is part of the test and you will have to fix it 😅

## Get Started

###Requirements
* Node.js and npm (You get both when you <a href="https://docs.npmjs.com/getting-started/installing-node">install Node.js</a>.)

###Install the exercise locally
```
  1 git@github.com:Liftitapp/applicants_test.git
  2 cd applicants_test
  3 npm install
  4 npm start
```

## Design Specifications
* Please refer to the file located at `../resources/`

### Colors

* **Orange** #FD6538
* **White** #fff
* **Translucent Orange** rgba(254,100,45,0.45)
