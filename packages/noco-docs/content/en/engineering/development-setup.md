---
title: "Development setup"
description: "How to set-up your development environment"
position: 3200
category: "Engineering"
menuTitle: "Development setup"
---

## Clone the repo
```
git clone https://github.com/nocodb/nocodb
cd nocodb/packages
```

## Build SDK
```
# build nocodb-sdk
cd nocodb-sdk
npm install
npm run build
```

## Build Backend
```
# build backend - runs on port 8080
cd ../nocodb
npm install
npm run watch:run
```

## Build Frontend
```
# build frontend - runs on port 3000
cd ../nc-gui
npm install
npm run dev 
```

Any changes made to frontend and backend will be automatically reflected in the browser.

## Enabling CI-CD for draft PR
CI-CD will be triggered on moving a PR from draft state to `Ready for review` state & on pushing changes to `Develop`. To verify CI-CD before requesting for review, add label `trigger-CI` on Draft PR. 

## Accessing CI-CD failure screenshots
For Cypress tests, screenshots are captured on test failure. These will provide vital clues for debugging possible issues observed in CI-CD. To access screenshots, Open link associated with CI-CD run & click on `Artifacts`
  
![Screenshot 2022-09-29 at 12 43 37 PM](https://user-images.githubusercontent.com/86527202/192965070-dc04b952-70fb-4197-b4bd-ca7eda066e60.png)


