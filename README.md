# Service node client

## Table of contents
- [Description](#description)
- [How it works](#how-it-works)
- [License](#license)
- [How to run](#how-to-run)
    - [Prerequisites](#prerequisites)
    - [Build and run process](#build-and-run-process)
    - [Environmental variables](#environmental-variables)
- [How to use](#how-to-use)
    - [Home page](#home-page)
    - [Data uploads page](#data-uploads-page)
    - [Data purchases page](#data-purchases-page)
    - [Wallets page](#wallets-page)
    
## Description

Service node client is a React based client application for [Service node](https://github.com/Prometeus-Network/service-node_net). It provides user interface for interaction with Service node.

## How it works

Service node client is a single-page application (SPA) built with React framework. It interacts with Service node via REST API exposed by the latter.

## License

Prometeus Network is licensed under the Apache software license (see LICENSE [file](https://github.com/Prometeus-Network/prometeus/blob/master/LICENSE)). Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either \express or implied.

Prometeus Network makes no representation or guarantee that this software (including any third-party libraries) will perform as intended or will be free of errors, bugs or faulty code. The software may fail which could completely or partially limit functionality or compromise computer systems. If you use or implement it, you do so at your own risk. In no event will Prometeus Network be liable to any party for any damages whatsoever, even if it had been advised of the possibility of damage.

As such this codebase should be treated as experimental and does not contain all currently developed features. Prometeus Network will be delivering regular updates.

## How to run

### Prerequisites

In order to run Service node client, you need to do the following:

- Run Service node and Billing service on your local machine. You can find installation instructions in their repositories (https://github.com/Prometeus-Network/service-node_net and https://github.com/Prometeus-Network/billing);
- Install NodeJS. You can find installation instructions [here](https://nodejs.org/en/download/);
- Install Docker. You can find installation instructions on 
[official website](https://docs.docker.com/install/).
- Install Docker-compose, which can be found 
[here](https://docs.docker.com/compose/install/)
- Create and configure `.env` file. Environmental variables are described [below](#environmental-variables)
- If you want to run service-node outside of docker container, 
you will need NodeJS and Yarn installed. 
You can find NodeJS installations 
instruction [on the official website](https://nodejs.org/en/download/).
Yarn installation instruction is also available on
[Yarn's official website](https://legacy.yarnpkg.com/en/docs/install/#debian-stable).

### Build and run process

#### Running inside Docker

To run Service Node UI inside Docker, run the following command:

```
docker-compose up --build
```

or 

```
docker-compose up --build -d
```

if you want to run it in detached mode. 

#### Running outside Docker

If you want to run Service Node UI outside of Docker, you'll need to do the following:
- Run `yarn install` to install all required dependencies if you haven't done this yet;
- Run `yarn run production`. This will build application and run it in production mode on port specified in `REACT_APP_PRODUCTION_PORT` variable;
- If you want to run application in development mode, run `yarn run start`. This will run application in development mode on `3000` port.

### Environmental variables

|               Variable                |                                 Description                                |   Required | Default value |
|---------------------------------------|----------------------------------------------------------------------------|------------|---------------|
| `REACT_APP_PRODUCTION_PORT`           | Port which will be used by the application when started in production mode | `true`     |               |
| `REACT_APP_SERVICE_NODE_API_BASE_URL` | Base URL of Service Node API                                               | `true`     |               |

## How to use

Once you launched the application, it's ready to be used. You can open it in browser by on page `http://[host]:[port you specified in .env file]`, for example `http://localhost:3000`.

Right now, service node has the following features:

- Viewing all transactions made through this Service node;
- Viewing data uploads made though this Service node;
- Viewing all data purchases made through this Service node;
- Switching wallets of this Service node and creating a new one

### Home page

The main page contains table with list of all transactions made through this Service node.

<a href="https://ibb.co/T00MWSV" target='_blank'><img src="https://i.ibb.co/B662nxX/Screenshot-from-2020-02-05-15-25-31.png" alt="Screenshot-from-2020-02-05-15-25-31" border="0"></a>

You can view transaction details by clicking on transaction hash.

<a href="https://ibb.co/VLcBvkr" target='_blank'><img src="https://i.ibb.co/FhL7BdN/Screenshot-from-2020-02-05-15-27-22.png" alt="Screenshot-from-2020-02-05-15-27-22" border="0"></a>

### Data uploads page

Data uploads page displays data uploads which were made through this Service node.

<a href="https://ibb.co/VLcBvkr" target='_blank'><img src="https://i.ibb.co/FhL7BdN/Screenshot-from-2020-02-05-15-27-22.png" alt="Screenshot-from-2020-02-05-15-27-22" border="0"></a>

Data upload details can be viewed by clicking on transaction hash

<a href="https://ibb.co/y6jZ59Z" target='_blank'><img src="https://i.ibb.co/jyXQGNQ/Screenshot-from-2020-02-05-15-30-55.png" alt="Screenshot-from-2020-02-05-15-30-55" border="0"></a>

### Data purchases page

Data purchases page shows history of data purchases made through this Service node.

<a href="https://ibb.co/8dGx5Dv" target='_blank'><img src="https://i.ibb.co/1dBXqfy/Screenshot-from-2020-02-05-15-38-28.png" alt="Screenshot-from-2020-02-05-15-38-28" border="0"></a>

Details of data purchase can also be viewed by clicking on transaction hash.

<a href="https://ibb.co/18KSdQb" target='_blank'><img src="https://i.ibb.co/bzLf2m7/Screenshot-from-2020-02-05-15-41-44.png" alt="Screenshot-from-2020-02-05-15-41-44" border="0"></a>

### Wallets page

Wallets page shows list of wallets registered on this Service node.

You can change the default wallet of this Service node by clicking on checkbox of wallet which you want to make default.

<a href="https://ibb.co/HtMrPTs" target='_blank'><img src="https://i.ibb.co/2vLjM3Q/Screenshot-from-2020-02-05-15-45-48.png" alt="Screenshot-from-2020-02-05-15-45-48" border="0"></a>

You can register new wallet by clicking on "Add new wallet" button. You will need to provide address and private key of the wallet.

<a href="https://ibb.co/QQWkzPT" target='_blank'><img src="https://i.ibb.co/W5r0qkM/Screenshot-from-2020-02-05-15-52-06.png" alt="Screenshot-from-2020-02-05-15-52-06" border="0"></a>
