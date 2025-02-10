# iO UpG ReBorn 

![iO UpG ReBorn](docs/logo.png)

## Project and goals

Bootstrap project for JS/TS based in-browser game prototyping playground, similar to previous ActionScript/Starling pair.

Targets best practives of modern web development (to the reasonable extent) but favors simplicity.

Sub-goal - evaluation of coding assistants, are they any help.

## Technology stack

 * Typescript and whatever modern module system there is
 * Bundler (Vite)
 * Tests (Jest)
 * Monorepo but separate library & project for modularity
 * CI integration

## Quick startup

<details>
<summary>Obtain and setup Node.JS &amp; npm</summary>
There is different ways for each platform and respective package manager, probably something along the lines:

  - Windows / WinGet `winget install node.js`
  - Windows / Choco: `choco install nodejs`
  - Windows / Scoop: `scoop install nodejs`
  - Windows Standalone installer: https://nodejs.org/en/download/
  - MacOS / brew: `brew install node`
  - Linux - You guys probaly already know what to do

Don't forget to refresh environment if required then check that npm can be invoked:

```bash
npm -v
```
</details>

Then perform initial npm package installation in the project and run `npm start` to actually perform a build and launch server
```bash
> cd <project-directory>
> npm install
> npm start
# Server running at http://localhost:1234
```

Voila!