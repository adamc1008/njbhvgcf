# interface


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Tests
## Unit Tests
Created using vitest
To run

```sh
npx vitest
```

## E2E tests
Created using Cypress
To run headless
```sh
npx cypress run
```

To run using web UI
```sh
nx cypress open
```
Then in the Cypress UI that opens selest E2E testing. 
Select the browser you wish to use. 
Then select stories.cy. 
The tests will then run. 

### Assumptions
While there is a search bar on the UI there is no functionality implemented for it. Also while the Hackernews site allows the uploading of comments this redesign does not as there is no API to support that.
