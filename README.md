# Lorax Monorepo Example

## Setup

### Replace the character <TOKEN>

In `apps/lorax-server/lorax_server/main.py`, replace `<TOKEN>` with your API token.

### Install Node Dependencies

```
npm install
```

### Install Python Dependencies

```
npx nx run lorax-server:install
```

## Start the application

Run `npx nx run-many -t serve` to start the development server. Happy coding!

The API application will be available at: `http://127.0.0.1:8000`
The Web application will be available at: `http://127.0.0.1:4200`
