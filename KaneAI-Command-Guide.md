# KaneAI - Command Guide

KaneAI offers a range of commands to perform various actions on web pages. These commands, called prompts, guide KaneAI in executing specific tasks during your test cases. By using prompts along with descriptive instructions, you can create clear, human-readable test cases.

This document provides an overview of the different prompts available in KaneAI, allowing you to write test cases in plain English with ease.

## Navigation and Page Interaction

### Open a website
* `go to https://www.lambdatest.com`
* `open https://www.lambdatest.com`

### Wait
* `wait for 5 seconds`

### Click
* `click on login button`

### Type or Enter Text
* `enter "random@gmail.com"`
* `type "random@gmail.com"`
* `send keys "random@gmail.com"`

### Clear Input
* `clear email input field`
* `clear the password field`

### Select Date
* `select 21st september date`

### Hover
* `hover on shop by category option`

### Search
* `search for iphone`

### Refresh Page
* `refresh the page`

### Navigate Back/Forward
* `go back`
* `navigate back`
* `go forward`
* `navigate forward`

## Tab Management

### Open New Tab
* `open new lambdatest tab`

### Switch Tabs
* `switch to 2nd tab`
* `switch to lambdatest tab`

### Close Tab
* `close lambdatest tab`
* `close 2nd tab`

## Page Interaction

### Scroll
* `scroll once`
* `scroll by 100px`
* `scroll to the bottom`
* `scroll to the top`
* `scroll 3 times`
* `scroll by 20 percent`

## Assertions and Queries

### Assert Element Text
* `assert if red button text is "subscribe"`

### Assert Element Presence
* `assert if KaneAI is present on the "viewport"`

### Query Information
* `query the current url`
* `query the time mentioned in the poster`

## Conditional Actions

### Conditional Click
* `if pop up is present in the viewport then click on it`

### Conditional Selection
* `if price of the product is less than 200 then click on add to cart else select second product`

## Best Practices

* Use clear and specific commands to ensure accurate execution.
* Combine different command types to create comprehensive test scenarios.
* Utilize conditional statements for more dynamic and robust testing.
* Always include appropriate wait times to account for page load and element visibility.
* Use assertions to verify the expected state of the page or elements.
