---
title: Catching accessibility issues early with React Testing Library
hero: /assets/blog/ferenc-almasi-ewlha4t-mso-unsplash.jpg
date: 2024-12-27T16:04:00.000Z
tags:
  - post
---
Accessibility is not just a nice-to-have, it’s a fundamental requirement for creating inclusive and user-friendly web experiences. Forms are the most common interactive elements where accessibility gaps can significantly impact user experience. Issues like missing labels, improper focus management, or inappropriate use of ARIA (Accessible Rich Internet Applications) can make forms unusable—not just for users relying on assistive technologies but for everyone.

Usually I like to keep things pretty plain on this blog and talk about the fundamentals of the web, you know HTML, CSS and some JS. Buuuut one of the tools in a developer’s toolbox is [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (RTL) and with React being one of the most popular frameworks (and one I use daily) it’s worth exploring how RTL can double as a tool for catching and validating accessibility concerns.

## Why not \[inset name of testing library] for accessibility testing?

Unlike traditional testing libraries that focus on implementation details like class names or attributes, RTL emphasises testing the way users interact with them. It’s all about replicating real-world usage: finding elements by accessible names, testing keyboard interactions, and focusing on visible content.

Yet, in my experience, many developers still approach testing with RTL like they’re using old unit testing tools - prioritising the underlying code over the actual in browser experience. RTL offers a shift in mindset, encouraging tests that mimic how users interact with a site.

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

As a good developer you would also write some unit tests to make sure you have great test coverage.

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

Job done, save, commit, push, go take a 15 minute break and get yourself a coffee, cause that tests is now passing.

The problem though is we are testing via implementation details by searching for attributes, specifically the `ID` of the input. Sure you could argue its still a correct passing test but how accessible is it?

Instead of looking for attributes we should change our test to search by label text using `getByLabelText`.

```jsx
test("Form inputs have associated labels", () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput).toBeInTheDocument();
  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});
```

Now we are testing how a user would interact with form fields in the browser, via the label text. Right now the tests would fail because the HTML is incorrect, but if we update the HTML to have `for` attributes on the `label` with the right `ID` everything will pass.

```jsx
function LoginForm() {
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

Lets turn this example into a fully functional form, that means all fields should be required, show error messages if inputs are left empty on submit and focus should be managed when there are errors. My preferred way to handle errors and focus in simple forms is to show errors below each input and send the users focus back to the first input in error.

```jsx
import React, { useState } from "react";

function LoginForm() {
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({ email: "", password: "" });
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";

    const newErrors = {};
    if (!email) newErrors.email = "Enter an email address.";
    if (!password) newErrors.password = "Enter an password.";

    setErrors(newErrors);

    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField) {
      const firstErrorInput = document.getElementById(firstErrorField);
      firstErrorInput?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />
      {errors.email && <span>{errors.email}</span>}

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />
      {errors.password && <span>{errors.password}</span>}

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

As you can see Ive added some state, plus some submit handling which gets the input values via [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) (which is super under utilised in my opinion), setting errors, plus some focus management. 

Lets now add another test using what we have written before, except this time we can check if the fields are required by using the `toBeRequired()` matcher.

```jsx
test("Form inputs are required (have aria-required='true')", () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput).toBeRequired();
  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeRequired();
});
```

Our test fails though because none of the inputs are marked as required, lets add that now making our tests pass, the good thing about the `toBeRequired()` matcher is it works with `aria-required` or `required` attributes, the attribute doesn't matter just if its required or not.

```diff
...
- <input id="email" type="email" />
+ <input id="email" type="email" aria-required="true" />
...
- <input id="password" type="password" />
+ <input id="password" type="password" aria-required="true" />
...
```

Next lets write a test for when the form is submitted and none of the fields are filled and that each field is marked as invalid, conveying to users of assistive technology there is a problem.

```jsx
test("Form inputs are set to invalid (have aria-invalid'true')", () => {
  render(<LoginForm />);

  const submitButton = screen.getByText(/login/i, { selector: 'button' })
  fireEvent.click(submitButton);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  expect(emailInput).toBeInvalid();
  expect(passwordInput).toBeInvalid();
});
```

Again this will fail (its all on purpose obviously). To get the test to pass we will need to make sure `aria-invalid` is managed in the HTML. Lets update out example login form.

```diff
...
- <input id="email" name="email" type="email" aria-required="true" />
+ <input id="email" name="email" type="email" aria-required="true" aria-invalid={!!errors.email} />
...
- <input id="password" name="password" type="password" aria-required="true" />
+ <input id="password" name="password" type="password" aria-required="true" aria-invalid={!!errors.password} />
...
```

Great, our tests are passing, but we should also have a error message associated with our inputs to help users correct the problem lets write a test to make sure the error messages are accessible?

```jsx
test("Error messages are correctly associated with inputs", () => {
  render(<LoginForm />);

  const submitButton = screen.getByText(/login/i, { selector: 'button' })
  fireEvent.click(submitButton);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  expect(emailInput).toHaveAccessibleDescription(/enter an email address./i)
  expect(passwordInput).toHaveAccessibleDescription(/enter an password./i);
});
```

Uhoh, failed. To fix this we need to add to the inputs the `aria-describedby` attribute and an `id` to the `span` that contains the error messages.

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

Now our test will pass.

But what about focus management? I mentioned shifting the users focus to the first input in error. Well we can check that as well.

```jsx
test("Submitting empty form shifts focus to email input", async () => {
  const user = userEvent.setup()
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email/i);

  const submitButton = screen.getByText(/login/i, { selector: 'button' })
  fireEvent.click(submitButton);

  expect(emailInput).toHaveFocus();
});
```

Speaking of focus, we might as well check if the user can navigate through the form without getting stuck.

```jsx
test("User can navigate through form using the keyboard", async () => {
  const user = userEvent.setup()
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByText(/login/i, { selector: 'button' })

  await user.tab();  
  expect(emailInput).toHaveFocus();  

  await user.tab();  
  expect(passwordInput).toHaveFocus();

  await user.tab();  
  expect(submitButton).toHaveFocus();
});
```

Why stop there, lets check if there are appropriate autocomplete attributes on the inputs.

You might be wondering, "Autocomplete? Why focus on this?" Well, it’s one of my biggest gripes with login forms (developers often overlook the importance of properly implementing autocomplete attributes). With the widespread use of password managers, autocomplete is one of the simplest ways to create a seamless and frustration-free user experience.

In fact, I’m working on another piece (well, more of a rant) about this very topic. Once it’s ready, I’ll drop a handy link here for you.

```jsx
test("Form inputs have appropriate autocomplete attributes", () => {
  render(<LoginForm />);

  // Get the inputs
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  // Assert the autocomplete attributes
  expect(emailInput).toHaveAttribute("autocomplete", "email");
  expect(passwordInput).toHaveAttribute("autocomplete", "current-password");
});
```

Now two things with the above test, first it will fail, to fix that we can simply add in the autocomplete attribute and the [appropriate values for the autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values). Second testing `autocomplete` functionality directly can be challenging because it is primarily a browser-native feature that relies on user interaction and stored data. So in this instance we can cheat a little and look for attributes.

```diff
...
- <input id="email" name="email" type="email" aria-required="true" aria-invalid={!!errors.email} aria-describedby="email-error" />
+ <input id="email" name="email" type="email" aria-required="true" aria-invalid={!!errors.email} aria-describedby="email-error" autoComplete="email" />
...
- <input id="password" name="password" type="password" aria-required="true" aria-invalid={!!errors.password} aria-describedby="password-error" />
+ <input id="password" name="password" type="password" aria-required="true" aria-invalid={!!errors.password} aria-describedby="password-error" autoComplete="current-password" />
...
```

## The WCAG guidelines our tests cover

So we have written a number of test and each of them can be tied back to a specific WCAG guideline, here is the complete list of test cases followed by a breakdown of what guidelines are being checked in the test:

### Form inputs have associated labels

* **[WCAG 1.3.1 - Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)**\
  Ensures that form controls have programmatically associated labels to communicate their purpose to users.
* **[WCAG 4.1.2 - Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)**\
  Ensures that user interface components have an accessible name that describes their purpose.

### Form inputs are required

* **[WCAG 3.3.1 - Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)**\
  Ensures required fields are clearly indicated, enabling users to identify errors when submitting forms.

### User can navigate through form using the keyboard

* **[WCAG 2.1.1 - Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)**\
  Guarantees that all functionality of the content is operable through a keyboard interface.
* **[WCAG 2.4.3 - Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)**\
  Ensures a logical and intuitive focus order when navigating using the keyboard.

### Submitting empty form shifts focus to email input

* **[WCAG 2.4.3 - Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)**\
  Ensures the focus moves predictably to the first input in error to streamline error recovery.
* **[WCAG 3.3.3 - Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html)**\
  Guides users to correct errors by focusing on the problematic input.

### Form inputs are set to invalid when in error

* **[WCAG 4.1.2 - Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)**\
  Ensures assistive technologies can identify invalid inputs based on the aria-invalid attribute.
* **[WCAG 3.3.1 - Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)**\
  Communicates errors to users through programmatically determinable states.

### Error messages are correctly associated with inputs

* **[WCAG 1.3.1 - Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)**\
  Ensures the error message is programmatically tied to the input, providing clear context for users of assistive technologies.
* **[WCAG 4.1.2 - Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)**\
  Guarantees that input fields dynamically reflect error information through attributes like aria-describedby.

### Form inputs have appropriate autocomplete attributes

* **[WCAG 1.3.5 - Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html)**\
  Ensures form inputs specify their purpose programmatically (via autocomplete), which helps users, especially those with cognitive disabilities or using assistive technologies.
* **[WCAG 3.3.2 - Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)**\
  Provides additional guidance to users through programmatically determinable input purposes.

## Wrapping up

RTL is great tool for developers to leverage to help test and catch any accessibility issues early and throughout the development lifecycle. Paired with static tests (linters), guided testing (Accessibility Insights for Web), automated testing (aXe) and manual testing (keyboard and screen reader) RTL is a a must in my opinion.

Keep any eye on my blog because ill be writing a few more posts soon, one very ranty and the other about my strategy for testing design system components for accessibility.

Finally, no amount of isolated testing can replace the value of testing with a diverse group of real users. It’s essential to include individuals with varying abilities, ages, languages, and locations. This approach ensures that what you’re building is truly accessible and inclusive for everyone.
