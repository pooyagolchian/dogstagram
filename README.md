## Dogstagram - Dogs photos and information by breed

This project has been developed with the last version of React.js and Redux (Redux toolkit).

- React.js
- Redux toolkit
- Typescript
- Cypress for E2E
- React testing library
- Prettier, ESLint, Husky
- Netlify and GithubAction for CI/CD automate testing

---

## DEMO URL GITHUB Users

- [DEMO URL](https://dogstagram-react.netlify.app/)

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install all the dependencies that are needed for developing.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

---

# Code scaffolding

- I use several mythology of clean code in this frontend project.

### BEM

BEM is used for methodology with SCSS format to create reusable components for this task. I follow the structure developed in the dummy files.

### Prettier

Using [Prettier](https://prettier.io/) for opinionated code formatter.
It will take care of formatting for you.
Prettier creates an abstract syntax tree from your code and uses it to write new code formatted according to a set of rules.
In addition, I check pretty before every commit by add a pre-commit hook. For more detail check package.json, husky section.

### Husky

Husky is used for git hook pre-commit to format all code with Prettier.

### GitHub actions for automated testing

Use GitHub actions for automated testing and run all Unit Test.

### SOLID

Regarding the `S` for `SOLID` I just tried to keep each function(component as a function as well) to
just responsible for a single task. That's why I just created a separate component for every part
and also keep it simple stupid.

---

## Test with React Testing Library

`yarn test`

## Cypress E2E

`yarn cypress open`
