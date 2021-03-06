# html5-video-plugins

Open-source interfaces to video renderers that plug into the Ooyala V4 core player. This README contains introduction, setup, test, and build sections.

## High Level Overview

html5-video-plugin builds js files that are used as unique plugins to the Ooyala core V4 player.  It interfaces with the video technology framework of the Ooyala core V4 player to decode and render videos. All static files necessary to create and run an Ooyala player are hosted and can be accessed publicly. This repo is available to be git cloned or forked and be modified by developers (terms and condition apply).

## Plug and Play capability

core.js is a lightweight core player that enables core player functionality and provides a framework for video plugins. Most additional capabilities such as ads, discovery, and skin are separated from core player JS. To enable this functionality, you may be required to load additional plugins.

# Getting started

1. Install node.js for Mac: http://howtonode.org/how-to-install-nodejs

2. Sync submodules by running the following commands:
   ```bash
   $ git submodule init
   $ git submodule update
   ```

3. Install npm:

   Get https://npmjs.org/install.sh and install with `sh install.sh`. Make sure to install npm 1.1.16 or
   above. If you have an older version of npm, you'll need to do `sudo npm uninstall npm -g` before
   re-installing.

   Also you need the following global npm packages:
   ```bash
   $ npm install -g npm
   $ npm install -g node-gyp
   ```

4. Install the node packages using npm:
   ```bash
   $ npm install
   ```

5. [Optional] Install the node packages for submodules using npm:
   ```bash
   $ cd [submodule]
   $ npm install
   ```
   This is automatically done during building.

## Install FLEX and ANT on Mac for building OSMF Flash Plugin

1. Install Flex SDK v4.6.0 from http://download.macromedia.com/pub/flex/sdk/flex_sdk_4.6.zip

2. Change path of FLEX_HOME in build_flash.xml to the path where Flex SDK is installed
   ```bash
   <property name="FLEX_HOME" value="/opt/flex_sdk_4.6.0"/>
   ```

3. Check if ANT is already installed or not by typing "ant -version". If ant is installed, you will get output. If not, you will receive a 'command not found' error. If it is not already installed install using the steps below.

  a. Check if brew is installed by typing "brew help". If brew is installed, you will receive help information. If not, you will receive a 'command not found' error. If it is not already installed install using
   ```bash
   $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   ```

  b. Install ANT using
   ```bash
   $ brew install ant
   ```

4. Set ANT_HOME environment variable.

  a. In your home folder, open the .bash_profile file.

  b. Add the following lines to the file, substituting the directory where you installed Ant:
   ```bash
   ANT_HOME=/apache-install-dir/apache-ant-version
   PATH=$PATH:$HOME/bin:$ANT_HOME/bin
   export ANT_HOME PATH
   ```

# Testing

Unit tests live in the folder "test".  Unit tests are based on the "jest" framework.
Run tests with the command:
```bash
$ gulp test
```

# Building

Minify and package the plugins by running the following command:
```bash
$ gulp build
```

To automatically build the plugins when a file is changed, run the command:
```bash
$ gulp watch
```

## JS Documentation

To build the jsdocs style documentation, run the command:
```bash
$ gulp docs
```
This will put the documentation into the /docs folder.
Open /docs/index.html to view the docs home page.
