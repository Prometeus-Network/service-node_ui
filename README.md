# Service node client

## Table of contents
- [Description](#description)
- [How it works](#how-it-works)
- [License](#license)
- [How to run](#how-to-run)
    - [Prerequisites](#prerequisites)
    - [Build and run process](#build-and-run-process)
- [How to use](#how-to-use)
    - [Main page](#main-page)
    - [Data upload page](#data-upload-page)
    - [Account registration page](#account-registration-page)
    - [Settings page](#settings-page)
- [Demo](#demo)
    

## Description

Service node client is a React based client application for [Service node](https://github.com/Prometeus-Network/service-node_net). It provides user interface for interaction with Service node, e.g. for uploading files. 

## How it works

Service node client is a single-page application (SPA) built with React framework. It interacts with Service node via REST API exposed by the latter.

## License

Prometeus Network is licensed under the Apache software license (see LICENSE [file](https://github.com/Prometeus-Network/prometeus/blob/master/LICENSE)). Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either \express or implied.

Prometeus Network makes no representation or guarantee that this software (including any third-party libraries) will perform as intended or will be free of errors, bugs or faulty code. The software may fail which could completely or partially limit functionality or compromise computer systems. If you use or implement it, you do so at your own risk. In no event will Prometeus Network be liable to any party for any damages whatsoever, even if it had been advised of the possibility of damage.

As such this codebase should be treated as experimental and does not contain all currently developed features. Prometeus Network will be delivering regular updates.

## How to run

### Prerequisites

In order to run Service node client, you need to do the following:

- Run Service node and Billing service on your local machine. You can find installation intructions in their repositories (https://github.com/Prometeus-Network/service-node_net and https://github.com/Prometeus-Network/billing);
- Install NodeJS. You can find installation instructions [here](https://nodejs.org/en/download/);
- Run `npm install` to install all necessary dependencies.
- Create and configure `.env` file
    - `REACT_APP_SERVICE_NODE_API_BASE_URL` variable is a base URL of Service node API, e.g. `http://localhost:3002/api/v1`;
    - `REACT_APP_PRODUCTION_PORT` is a port which will be used by Service node client in production mode. E.g. `3000`;
    - `REACT_APP_WEB3_HTTP_PROVIDER` variable is a URL for Web3 HTTP provider. Web3 is needed for dynamic creation of data
    owners. Example value: `http://localhost:7545`
### Build and run process

- Run `npm run production`. This will build application and run it in production mode on port specified in `REACT_APP_PRODUCTION_PORT` variable;
- If you want to run application in development mode, run `npm run start`. This will run application in development mode on `3000` port.

## How to use

Once you launched the application, it's ready to be used. You can open it in browser by on page `http://[host]:[port you specified in .env file]`, for example `http://localhost:3000`.

Right now, service node has the following features:

- Registering new service node, data validator and data owner accounts;
- Selecting and persisting service node and data validator accounts in settings;
- Data uploading.

### Main page

The main page contains brief description of service node client.

<a href="https://ibb.co/7NTxBK4" target='_blank'><img src="https://i.ibb.co/yBMmKqS/2019-11-04-18-30-19.png" alt="2019-11-04-18-30-19" border="0"></a><br/>

### Data upload page

Data upload page allows you to upload files to the Service node. 

To upload data, you will need to fill the following fields:

- Name -- name of uploaded data;
- Data owner address -- address of the data owner. You will have to register it first if you haven't done it previously;
- Keep until -- date until which file will be kept;
- Attached file -- the data itself;

<a href="https://ibb.co/w7SGrzb"><img src="https://i.ibb.co/LrxjhZq/2019-11-04-18-41-15.png" alt="2019-11-04-18-41-15" border="0"></a><br />

In order to add metadata to your file, click on the plus button. This will open a modal dialog for adding metadata to your file. It can be seen on a screenshot below

<a href="https://imgbb.com/"><img src="https://i.ibb.co/kGG04Lf/2019-11-04-18-49-30.png" alt="2019-11-04-18-49-30" border="0"></a>

Click on "Add metadata" button to add metadata entry. It will be added in metadata table.

<a href="https://ibb.co/0QB1Rs5"><img src="https://i.ibb.co/LvQBXNK/2019-11-04-18-51-36.png" alt="2019-11-04-18-51-36" border="0"></a><br />

To remove metadata entry, click on minus button.

After file have been uploaded, you will see the information about uploaded file, such as its ID and storage cost. You can upload another file by clicking on "Upload another file" button.

<a href="https://ibb.co/MPVYJZK"><img src="https://i.ibb.co/dk2dHjX/2019-11-04-19-05-13.png" alt="2019-11-04-19-05-13" border="0"></a><br />

Please note that if you have not selected service node and/or data validator accounts previously, you will be prompted to do so before uploading data.

<a href="https://ibb.co/T82yzDb"><img src="https://i.ibb.co/Hz4ZmLx/2019-11-04-19-13-05.png" alt="2019-11-04-19-13-05" border="0"></a><br />

### Account registration page

Account registration allows you to register new accounts. In order to register new account, you will need to provide its address and select its type.

<a href="https://ibb.co/1T9WJXf"><img src="https://i.ibb.co/BBgMK6V/2019-11-04-19-16-04.png" alt="2019-11-04-19-16-04" border="0"></a><br />

### Settings page

On settings page, you can select Service node account and Data validator account which will be submitted upon file uploading. Selected accounts are persisted to browser's local storage.

<a href="https://ibb.co/WtSvh4w"><img src="https://i.ibb.co/16HGgt5/2019-11-04-19-20-11.png" alt="2019-11-04-19-20-11" border="0"></a><br />

Please not that if you have not registered service node and/or data validator accounts previously, you will be prompted to do so.

## Demo

The demonstration of Service node client is available [here](http://34.66.195.4/)
