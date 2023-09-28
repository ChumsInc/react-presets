# CHUMS App React Presets
A generic template for creating React apps without the overhead of create-react-app

## Notes
This includes the basics for publishing an app the Chums Intranet
Included modules are:
* Bootstrap 5.3 & Bootstrap Icons, 
* React 18
* Redux & Toolkit

## Instructions
* clone this repository
* disconnect from the remote
* determine an app name and apply to:
  * package.json name 
  * index.php $bodyPath variable 
  * deployment path: eg, /var/www/intranet.chums.com/apps/{app-name}
* install npm modules
* write some code
* add permissions to access.inc.php
* commit to a new repository
* build and publish the app
* make some user happy with a custom app

## Other Handy Repositories
```
npm install ChumsInc/b2b-types
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

## @TODO
* Make this tool query the app-name and substitute into the appropriate places
* Disconnect from the git remote
* Remove /package-lock.json from .gitignore - it's only there for this repository

