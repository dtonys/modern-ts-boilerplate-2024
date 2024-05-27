# modern-ts-boilerplate-2024

A full stack typescript boilerplate.
Featuring react, express, webpack, and MUI.

## Rationale

A modern and reasonable starting point for modern projects with typescript.

## Typescript Integration

There are 2 tsconfig.json. One for the nodejs server and one for the browser client.

```
./tsconfig.json - The server config
./src/client/tsconfig.json - The client config
```

In our `.eslintrc.js`, we'll let eslint know that it should use the most local tsconfig.

```
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
```

eslint config uses best practices for Typescript and React.  Airbnb config is not included in this setup.
Your IDE should be integrated with ESLint to catch errors while writing code.

## Quickstart

### Run app in development mode

```
$ npm run dev           // typescript watch, webpack watch, start server
$ npm run server        // start api server
```
Open http://localhost:8080 in browser

### Run app in production mode:

```
$ npm run start         // typescript build, webpack build, start server
```
Open http://localhost:3000 in browser

### Build assets and deploy to a production environment

```
$ npm run build:zip   // build code, extract to zip file -> "src.zip"
```

Manually upload `src.zip` to your AWS Elastic Beanstalk instance, or other service provider.

## Server - File watching & hot reloading

Server side code is compiled with Typescript.  `tsconfig.json` specifies which files are compiled.
`tsc -w` watches src code, compiles and writes compiled javascript to `build`.

`nodemon` watches `build` directory, along with a few other top level files and restarts the server on change.


## Client - File watching & hot reloading

Webpack is used to compile and bundle all client side code.

Client side code is not processed by `tsc`, `babel-loader` will compile the typescript to commonjs.

`@pmmmwh/react-refresh-webpack-plugin` will hot reload react components on change.
Changes outside the react tree (Example: code changes in the entry point where react has not mounted yet) will trigger a hard page reload.

## Routing

Single page app routing can be achieved without complex libraries or integrations.

Use `onLinkClick` as an onClick handler for all link type components.

This will push to `window.history` to update the url, and dispatch a popstate event which will be caught by a top level router component.

On popstate, the router component will dynamically import (lazy load) the component and re-render the view.

See https://ncoughlin.com/posts/react-navigation-without-react-router/ for details.

## dependencies vs devDependencies

**NOTE: Keep all client side npm modules under devDependencies**

Any of the follow npm modules belongs in devDependencies
  - Client side modules (react, mui, fonts).  These will be bundled by webpack.  So we won't reference the code in node_modules.
  - Development only packages (webpack, @types, ...)

The zip script will exclude devDependencies, resulting in faster execution & smaller code bundle.

Make sure to include only server side production dependencies in `dependencies` and put the rest in `devDependencies`.


## Production logs

Use the AWS cli to tail logs in realtime.

```
aws logs tail /aws/elasticbeanstalk/{environmentName}/var/log/web.stdout.log --follow
```