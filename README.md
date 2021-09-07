# SmartWatt
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

Portfolio and personal website of Smart Wattanapornmongkol (Jimmy/Best). This site is collection of Jimmy's skills, project, certificates and Competitions.

# Installation
Clone this repository by running 
```powershell
$ git clone https://github.com/Jimmy-Tempest/SmartWatt.git
```
**Note**: make sure git is properly install on your machine
[Install Git](https://git-scm.com/downloads)

Change Directory in the cloned directory by
```powershell
$ cd SmartWatt
```

Install nodejs dependacy bu running
```powershell
$ npm install
```
**Note**: make sure node.js is properly install on your machine
[Install Node](https://nodejs.org/en/)

Create a file named `.env.local` with content
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT=
EMAIL_ADDRESS=
EMAIL_PASSWORD=
```
**Note**: fill in each field with labeled content

# Running the app
## Production build (Reccommended)
Compile the project by running
```powershell
$ npm run build
```
Start the site by running
```powershell
$ npm run start
```
The server the start running at [localhost](http://localhost:3000/) on port 3000
## Dev Build
Start the site by running
```powershell
$ npm run dev
```
The server the start running at [localhost](http://localhost:3000/) on port 3000
**Note**: Any edit to any file will affect the appearance of the website in realtime as soon as the file is saved