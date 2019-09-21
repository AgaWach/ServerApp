# Task

In Acaisoft we love working with cloud technologies. In this task you will have to create simple UI components that will allow a user to remotely manage many servers located all around the world.

## UI

Marcin, a hardworking DevOps, would like to see the statuses of all the servers Acaisoft currently maintains. He would like to manually turn them on or off and sometimes reboot if neccessary.

Your task is to provide such a functionality. Fortunately, our fantastic
designer Marta made a prototype for us. Here is how it looks:

![img](./images/server-ui.png)

Marta also made the [Invision](https://www.invisionapp.com/) project for us, so we can freely check out the styles.
The credentials are:
```
Email: acaisoft@tryzoe.com
Password: acaisoft248
```

### Tasks
 1. List all the servers.
 2. Add a dropdown on the right with 2 options:
    1. Turn on (or Turn off) - depending on the status
    2. Reboot
 3. When the server is in a `REBOOTING` status you should be pinging the
    API (e.g. every 1s) until the status changes.
 4. Allow user to locally search for server.

### Tips
 - We like small components.
 - Pay attention to code quality, conventions, formatting, etc.
 - Tests are very welcomed.
 - You can use any libraries.

### Requirements

UI was created using Node.js v10.6.0. Other versions may or may not work correctly.

### Installation

In `./ui` run:

```shell
npm install
```

### Run

In `./ui` run:

```shell
npm start
```

## API

To remotely administer the servers we have a REST API located in `./src` directory.
The API provides an interface listed in the table below:

| Method | Endpoint | Response | Description |
|---|---|---|---|
| GET | /servers | Array\<[Server](#types)\> | Returns a list of all servers. |
| GET | /servers/:serverId | [Server](#types) | Returns a server. |
| PUT | /servers/:serverId/on | [Server](#types) | Turns on a server |
| PUT | /servers/:serverId/off | [Server](#types) | Turns off a server |
| PUT | /servers/:serverId/reboot | [Server](#types) | Reboots a server |

#### Types
```typescript
interface Server {
    id: number;
    name: string;
    status: 'ONLINE' | 'OFFLINE' | 'REBOOTING';
}
```

### Requirements

Our API was created using Node.js v10.6.0. Other versions may or may not work correctly.

### Installation

In `./api` run:

```shell
npm install
```

### Run

In `./api` run:

```shell
npm start
```
