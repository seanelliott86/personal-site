---
title: Catching accessibility issues early with React Testing Library
hero: /assets/blog/ferenc-almasi-ewlha4t-mso-unsplash.jpg
date: 2024-12-27T16:04:00.000Z
tags:
  - post
---
Accessibility is not just a nice-to-have, it’s a fundamental requirement for creating inclusive and user-friendly web experiences. Forms are the most common interactive elements where accessibility gaps can significantly impact user experience. Issues like missing labels, improper focus management, or inappropriate use of ARIA (Accessible Rich Internet Applications) can make forms unusable—not just for users relying on assistive technologies but for everyone.

Usually I like to keep things pretty plain on this blog and talk about the fundamentals of the web, you know HTML, CSS and some JS. Buuuut one of the tools in a developer’s toolbox is React Testing Library (RTL) and with React being one of the most popular frameworks - and one i use daily - it’s worth exploring how RTL can double as a tool for catching and validating accessibility concerns.

## Why not \[inset name of testing library] for accessibility testing?

Unlike traditional testing libraries that focus on implementation details like class names or attributes, RTL emphasizes testing the way users interact with them. It’s about replicating real-world usage: finding elements by accessible names, testing keyboard interactions, and focusing on visible content.

Yet, in my experience, many developers still approach testing with RTL like they’re using old unit testing tools—prioritizing underlying code over user experience. RTL offers a shift in mindset, encouraging tests that mimic how users interact with a site.

## Setting Up React Testing Library

Before we dive in, make sure you have the basics set up. If you’re not already using RTL, install it along with `@testing-library/jest-dom` to enhance your test assertions:

```shell
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

Make sure to add import `'@testing-library/jest-dom';` to your test setup file.

Depending on your setup there might be other things to consider but your smart, you will work it out.

## Let’s get to the code already!

The example form we will be using is a simple login form, nothing special. The form contains email and password inputs, some visible labels and a submit button, pretty simple and easy to build accessibly (nudge, nudge, wink, wink, say no more).

```jsx
function LoginForm() {
  return (
    <form>
      <label>Email</label>
      <input id="email" type="email" />
      <label>Password</label>
      <input id="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

As a good developer you would also write some unit tests to make sure you have great coverage.

```jsx
import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("Form inputs have associated labels", () => {
  const { container } = render(<LoginForm />);
  const emailInput = container.querySelector('#email');
  expect(emailInput).toBeInTheDocument();
  const passwordInput = container.querySelector('#password');
  expect(passwordInput).toBeInTheDocument();
});
```

Job done, save, commit, push, go take a 15 minute break and get yourself a coffee, cause that tests is passing.

The problem though is we are testing via impementation details by searching for attributes, specifically the `ID` of the input. Sure you could argue its still a correct passing test but how accessible is it?

Instead of looking for attributes we change our test to search by label text using `getByLabelText`.

```
Form inputs have associated labels
```

Now we are testing how a user would interact with form fields in the browser, via the label text. Right now the tests would fail because the html is inccorect, but if we update the html to have for attributes on the label with the right ID everything will pass.

```jsx
function RtlA11yTesting() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

The form is very simple and we could leave it there but we can go heaps further with RTL and accessibility testing.

Lets make this example a fully functional form, that means all fields should be required, have error messages if left empty on submit and focus should be managed when there are errors. My preferred way to handle errors in simple forms is to show errors below the input in error and send the users focus back to the first input.

```
Full form
```

As you can see Ive added some state, handling submit which gets the input values via FormData (which is super under utilised in my opinion), errors, plus some focus management. 

Now we can simple add another test using what we have written before, except this time we can double check if the fields are required by using `toBeRequired()` this works with `aria-required` or the `required` attribute.

```
Form inputs are required (have aria-required='true')
```

But our test fails because none of the fields are marked as required, lets add that now making our tests pass.

```diff
...
- <input id="email" type="email" />
+ <input id="email" type="email" aria-required="true" />
...
- <input id="password" type="password" />
+ <input id="password" type="password" aria-required="true" />
...
```

Next lets write a test for when the form is submitted with no fields filled in and check that the inputs have `aria-invalid="true"` conveying to assistive tech there is a problem.

```
Form inputs are set to aria-invalid (have aria-invalid'true')
```

To get the test to pass we will need to also need to make sure `aria-invalid` is managed in the HTML.

```diff
...
- <input id="email" name="email" type="email" aria-required="true" />
+ <input id="email" name="email" type="email" aria-required="true" aria-invalid={!!errors.email} />
...
- <input id="password" name="password" type="password" aria-required="true" />
+ <input id="password" name="password" type="password" aria-required="true" aria-invalid={!!errors.password} />
...
```

But what about the error messages are they associated with the inputs?
Well the below test checks that for us but unfortunatly it fails. 

```
Error messages are correctly associated with inputs using aria-describedby
```

To fix this we need to add to the inputs the `aria-describedby` attribute and an `id` to the `span` that containas the error messages.

```diff
...
- <input id="email" name="email" type="email" aria-required="true" aria-invalid={!!errors.email} />
- {errors.email && <span>{errors.email}</span>}
+ <input id="email" name="email" type="email" aria-required="true" aria-invalid={!!errors.email} aria-describedby="email-error" />
+ {errors.email && <span id="email-error">{errors.email}</span>}
...
- <input id="password" name="password" type="password" aria-required="true" aria-invalid={!!errors.password} />
- {errors.password && <span >{errors.password}</span>}
+ <input id="password" name="password" type="password" aria-required="true" aria-invalid={!!errors.password} aria-describedby="password-error" />
+ {errors.password && <span id="password-error">{errors.password}</span>}
...
```

Now our test will pass. But what about focus management? I mentioned shifting the users focus to the first input in error. Well we can check that as well.

```
Submitting empty form shifts focus to email input
```

Speaking of focus, we might as well check if the user can navigate through the form without getting stuck.

```
User can navigate between form inputs using the keyboard
```

Why stop there, lets check if there are appropriate autocomplete attributes on the inputs.
You might be thinking autocomplete why focus on this aspect, well its one of my biggest gripes with login forms and the general lack of consideration for adding autocomplete. With password managers autocompelete is one of the single biggest helpers to have a seamless experience. Im actually writing another post... well not a post more of a rant and ill add a tasty little link once im done.

```
Form inputs have appropriate autocomplete attributes
```

The above tests will fail, but we can simply add in the autocomplete attribute and the appropirate values for the autocomplete.

```diff
...
- <input id="email" name="email" type="email" aria-required="true" aria-invalid={!!errors.email} aria-describedby="email-error" />
+ <input id="email" name="email" type="email" aria-required="true" aria-invalid={!!errors.email} aria-describedby="email-error" autoComplete="email" />
...
- <input id="password" name="password" type="password" aria-required="true" aria-invalid={!!errors.password} aria-describedby="password-error" />
+ <input id="password" name="password" type="password" aria-required="true" aria-invalid={!!errors.password} aria-describedby="password-error" autoComplete="current-password" />
...
```

I could go on as there are more tests in the example ive been talking through. But you can have a look at the whole thing here.

## The WCAG guidelines our tests cover

In my test file I have the following test written, each of them can be tied back to a specific WCAG guideline, here is the complete list of test cases followed by a breakdown of what guidelines are being checked in the test:

1. Form inputs have associated labels
2. Form inputs are required (have aria-required='true')
3. User can navigate between form inputs using the keyboard
4. Submitting empty form shifts focus to email input
5. Submitting form with email filled shifts focus to password input
6. Form inputs are set to aria-invalid (have aria-invalid'true')
7. Error messages are correctly associated with inputs using aria-describedby
8. Form inputs have appropriate autocomplete attributes

### 1. Form inputs have associated labels

**WCAG 1.3.1 - Info and Relationships**

Ensures that form controls have programmatically associated labels to communicate their purpose to users.

**WCAG 4.1.2 - Name, Role, Value**

Ensures that user interface components have an accessible name that describes their purpose.

### 2. Form inputs are required (have aria-required="true")

**WCAG 3.3.1 - Error Identification**

Ensures required fields are clearly indicated, enabling users to identify errors when submitting forms.

### 3. User can navigate between form inputs using the keyboard

**WCAG 2.1.1 - Keyboard**

Guarantees that all functionality of the content is operable through a keyboard interface.

**WCAG 2.4.3 - Focus Order**

Ensures a logical and intuitive focus order when navigating using the keyboard.

### 4. Submitting empty form shifts focus to email input

**WCAG 2.4.3 - Focus Order**

Ensures the focus moves predictably to the first input in error to streamline error recovery.

**WCAG 3.3.3 - Error Suggestion**

Guides users to correct errors by focusing on the problematic input.

### 5. Submitting form with email filled shifts focus to password input

**WCAG 2.4.3 - Focus Order**

Ensures the focus moves predictably to the first input in error to streamline error.

**WCAG 3.3.3 - Error Suggestion**

Guides users to correct errors by focusing on the problematic input.

### 6. Form inputs are set to aria-invalid (have aria-invalid="true")

**WCAG 4.1.2 - Name, Role, Value**

Ensures assistive technologies can identify invalid inputs based on the aria-invalid attribute.

**WCAG 3.3.1 - Error Identification**

Communicates errors to users through programmatically determinable states.

### 7. Error messages are correctly associated with inputs using aria-describedby

**WCAG 1.3.1 - Info and Relationships**

Ensures the error message is programmatically tied to the input, providing clear context for users of assistive technologies.

**WCAG 4.1.2 - Name, Role, Value**

Guarantees that input fields dynamically reflect error information through attributes like aria-describedby.

### 8. Form inputs have appropriate autocomplete attributes

**WCAG 1.3.5 - Identify Input Purpose**

Ensures form inputs specify their purpose programmatically (via autocomplete), which helps users, especially those with cognitive disabilities or using assistive technologies.

**WCAG 3.3.2 - Labels or Instructions**

Provides additional guidance to users through programmatically determinable input purposes.

\--

## Wrapping up

RTl is great tool for developers to leverage to help test and catch any accessibility issues early and throughout the development lifecycle. Paired with static tests (linters), guided testing (Accessibility Insights for Web), automated testing (aXe) and manual testing (keyboard and screen reader) RTL is a a must in my opinion.

Keep any eye on my blog because ill be writting a few more posts soon one ranty and the other about my strategy for testing design system components for accessibility.
