## Dogstagram - Dog's photos and information by breed

This project has been developed with the last version of React.js and Redux (Redux toolkit).

- React.js
- Redux toolkit
- Typescript
- Cypress for E2E
- React testing library
- Prettier, ESLint, Husky
- Netlify and GithubAction for CI/CD automate testing

---

## DEMO URL

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

### `yarn cypress open`

Cypress is a next-generation front-end testing tool built for the modern web. We address the key pain points developers and QA engineers face when testing modern applications.
This command has been used to run the E2E test with Cypress. I have used cypress for E2E and mock data.

### `yarn build`

- This command builds the Dogstagram application for production.

### `yarn format`

- This command formats all files with Prettier.

---

# Code scaffolding

- I have used several mythologies of clean code in this frontend project.
- I have used React Testing Library to test the redux reducer to test the main functionality of the Dogstagram application.
- I have isolated all folders for each functionality. I have used the API factory for HTTP requests. Helper, components, pages, interfaces, assets, and store that I have separated in isolated folders. For components, I have used S in SOLID principles, each component uses single functionality in Dogstagram.

```
├── node_modules (.gitignore)
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── img(image folder)
│   └── manifest.json
├── .husky
│       └── precommit
├── .github
│       └── workflows
│            └── build.yml (Github action on push rules and configuration)
├── src
│   ├── assets
│   │   ├── fonts (Fonts folder)
│   │   └── style.scss (Main folder of SCSS modules)
│   ├── helper
│   │   └── Http.tsx (Axios instance)
│   ├── components
│   │   ├── DogCard.tsx
│   │   ├── DogInfo.tsx
│   │   ├── Header.tsx
│   │   ├── Loader.tsx
│   │   └── FavDogCard.tsx
│   ├── pages
│   │   │   └── assets
│   │   │          └── id.tsx (Dynamic page for more information by id)
│   │   ├── Favorites.tsx
│   │   └── TimeLine.tsx
│   ├── services (API factories of REST API)
│   │   └── DogsService.ts
│   ├── interfaces
│   │   └── IDog.ts  (Typescript interface)
│   ├── store
│   │   ├── dogs.ts (Dogs reducers + actions)
│   │   └── index.ts (store [combineReducers, redux-thunk, persistReducer])
│   ├── test
│   │   └── dogs.test.tsx (Unit test for testing reducers and test with mock data)
│   ├── index.tsx
│   ├── EnvConfig.ts
│   ├── reportWebVitals.ts
│   ├── react-app-env.d.ts
│   └── App.tsx
│
├── cypress
│  │   │── fixtures
│  │   │    ├── dogs.josn (Mock data for dogs - [One item of pagination])
│  │   │    └── fav-dog.json (Mock data for favorite dog - [One item of favorite])
│  ├── integration
│  │        └── dogstagram.spec.ts (Cypress test, E2E and Unit Test)
│  ├── mock
│  │     └── api.ts (Mock API call)
│  ├── plugins
│  └── support
├── .gitignore
├── package.json
├── .babelrc.json (Babel configuration)
├── cypress.json (Cypress configuration)
├── netlify.toml (Netlify configuration)
├── tsconfig.json
├── .prettierrc.json (Prettier configuration for code format)
└── README.md
└── yarn.lock
```

### SOLID

Regarding the `S` for `SOLID` I just tried to keep each function(component as a function as well)
just be responsible for a single task. That's why I just created a separate component for every part
and also keep it simple stupid.

### BEM

BEM has been used for methodology with SCSS format to create reusable components for this task. I have followed the structure developed in the dummy files.

### Prettier

Using [Prettier](https://prettier.io/) for opinionated code formatter.
It will take care of the formatting for you.
Prettier creates an abstract syntax tree from your code and uses it to write new code formatted according to a set of rules.
In addition, I check pretty before every commit by adding a pre-commit hook. For more detail check package.json, husky section.

### Husky

Modern native Git hooks made easy. Husky is used for git hook pre-commit to format all code with Prettier.

## Test with React Testing Library

`yarn test`

## Cypress E2E

`yarn cypress open`

---

### GitHub actions for automated testing

I have used GitHub actions for automated testing and run all Unit Test.
