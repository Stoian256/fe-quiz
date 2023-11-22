# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Setup and run

- Clone the repo
- Run 'npm install'
- Run 'npm run dev'
- Enjoy!


# UI Components

The projects uses [shadcn/ui]() component collection

To add a new component from the collection use the command.

` npx shadcn-ui@latest add <component_name> `

The components can be found [here](https://ui.shadcn.com/docs/components/), and each component has the command at the start.


After executing the command, a new file will be added in `src/component/ui` and you can customize the component as you need it.

## Configuration File .env

The project needs configuration file .env

Please create `.env` file, copy the content from `.env.example` and add from Auth0 the proper value to each variable.

In [Auth0](https://auth0.com/) go to your Applications: SPA - there you will find the domain, client_id and callback.

In [Auth0](https://auth0.com/) go to your Applications: API - there you will find audiance (as api identifier) and server_url.