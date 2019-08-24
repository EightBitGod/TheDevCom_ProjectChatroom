### This is boilerplate code for our ChatRoom Project

> I have listed out TODO as comments to work for dev

### Run Project

```
1. yarn install
2. yarn start
```

## Branching

Branch naming: `taskType/taskName-yourName`, example: `feature/registerComponent-Xyx`, or `bug/fix-registerPage`.

When task is complete, push to `origin branchName` and create a new pull request and add `anujraval24` or `EightBitGod` as reviewer

### Components and CSS classes naming

Each component's name (name of constant of a functional component or name of Class) should match its location, for ex. `components/CreateReview/Card` should be named `CreateReviewCard`:

```
class CreateReviewCard extends ...
...or...
const CreateReviewCard = () => ...
```

There should be only one top-level className that matches the name of component in `styles.scss` file. In this case it should be `.createReviewCard`. This prevents from CSS classes clashes across the app.

We group sibling components like this:

```
components
|__ ParentComponent
   |__ ChildComponent
   |__ ChildComponent
```

### Assets

Here we store scss or css files

### Enum

1. Constants
2. InternalLinks

Constants are for static values, InternalLinks are for Links

## Don't use static values directly to routing export from InternalLinks and use in routes file

# Javascript

## Containers vs components, pages

Components are encapsulated React components that are driven solely by props and don't talk to Redux. Same as “dumb components”. They should stay the same regardless of router, data fetching library, etc. This makes components easily reusable and testable.

Containers are React components that are aware of Redux, Router, etc. They are more coupled to the app. Same as “smart components”.

Pages are mostly containers but they can also be components, for example a simple text page like "Terms of service". The main idea of pages is to have a separate entry point for every route.

## Sagas

Sagas are files where we keep all constants, actions, reducers, selectors and redux-saga generator functions. It is very convenient to have all these related things in one place as they are senseless separately.

We use declarative-ish constants for actions like: `REGISTER_REQUESTED`, `REGISTER_SUCCEEDED` and so on. The first part in this case (REGISTER) is called `base` and the second is `verb`. To reduce the number of constants in every saga, we keep verbs in `container/constants`, import the needed ones and concatenate with bases declared in every saga.
