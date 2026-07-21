---
title: LibreDiscord with Dave implemented Setup Guide
date: 2024-01-20
excerpt: Installation and setup process for LibreDiscord on Windows with MSYS2 and Linux distributions
author: Xelph

---
## Prerequisites: libdave Installation


LibreDiscord requires the `libdave` library for Discord protocol support. You can either use the prebuilt release or build it from source.

### Option 1: Download Prebuilt Release (Recommended)

1. Download the prebuilt `libdave` binaries from the [official release](https://github.com/discord/libdave/releases/tag/v1.1.1%2Fcpp)
2. Extract and install the binaries to your system library path

### Option 2: Build from Source

If building libdave from source, make sure to fetch the submodules from the repo of my fork:

```bash
git submodule update --init --recursive
```
it include the libdave source.

Then follow the libdave build instructions in its repository.
After that past your binaries in the MainDir or the Sytem Lib Path. (drop them in the msys2 mingw folder in windows.)

---

## Windows (MSYS2 MinGW)

### Prerequisites
- Download and install [MSYS2](https://www.msys2.org/)
- Use the **MinGW64** shell

### Step 1: Update MSYS2 and install basic packages
Open MSYS2 MinGW64 shell and update the packages:

```bash
pacman -Syu
```
Restart the shell After this and you can run this again to check if they got installed. it will flag it as Reinstalling then cancle the command.

```bash
pacman -Syu
```

```bash
pacman -S base-devel
```

This provides `gcc`, `make`, and other essential build tools.

### Step 3: Install Main Dependencies
Install the required dependencies:

```bash
pacman -S mingw-w64-x86_64-gtk3 mingw-w64-x86_64-libsoup3 mingw-w64-x86_64-json-glib mingw-w64-x86_64-leveldb mingw-w64-x86_64-rtaudio mingw-w64-x86_64-opus mingw-w64-x86_64-libsodium mingw-w64-x86_64-libsecret
```

### "Optional" Use these commands to check if all the build tools are there or no. 
Check that the essential tools are available:
```bash
gcc --version
make --version
pkg-config --version
```

### Step 4: Clone it if you havent done it yet
```bash
git clone https://gitlab.com/xelphhcodes/librediscord.git
cd librediscord
```

### Step 5: Build the damn LibreDiscord
```bash
make -j
```

**Note**: 
The `-j` flag enables parallel compilation for faster builds.

### Step 6: Run LibreDiscord
```bash
make run
```

---

## Linux

### Ubuntu / Debian

#### Step 1: Update Package Manager
```bash
sudo apt update
sudo apt upgrade
```

#### Step 2: Install Build Tools
```bash
sudo apt install gcc make pkg-config
```

#### Step 3: Install Dependencies
```bash
sudo apt install libgtk-3-dev libsoup-3.0-dev libjson-glib-dev libleveldb-dev librtaudio-dev libopus-dev libsodium-dev libsecret-1-dev
```

#### Step 4: Clone If you havent done it yet
```bash
git clone https://github.com/zipdox/librediscord.git
cd librediscord
```

#### Step 5: Build LibreDiscord
```bash
make -j
```

#### Step 6: Run LibreDiscord
```bash
make run
```

---

### Arch Linux

#### Step 1: Update Package Manager
```bash
sudo pacman -Syu
```

#### Step 2: Install Build Tools
```bash
sudo pacman -S base-devel
```

This provides `gcc`, `make`, `pkg-config`, and other essential tools.

#### Step 3: Install Dependencies
```bash
sudo pacman -S gtk3 libsoup3 json-glib leveldb rtaudio opus libsodium libsecret
```

#### Step 4: Clone If you havent done it yet
```bash
git clone https://gitlab.com/xelphhcodes/librediscord.git
cd librediscord
```

#### Step 5: Build LibreDiscord
```bash
make -j
```

#### Step 6: Run LibreDiscord
```bash
make run
```

---

## Build Options

### Standard Build
```bash
make -j
```

### Build with Image Caching Support
```bash
make -j CACHE=1
```

**Note:** Image caching is disabled by default due to a bug in libsoup that can cause crashes if you have many private channels or guilds due to the number of simultaneous cache saves.

### Run Directly (Without Installing)
```bash
make run
```

---

## Troubleshooting

### MSYS2 Specific
- Ensure you are using the **MinGW64** shell
- If packages are not found, update MSYS2: `pacman -Syu`
- Check architecture with: `uname -m` (should show `x86_64`)

### Linux Specific
- If dependencies are missing, verify your package manager has the latest package lists: `sudo apt update` or `sudo pacman -Syu`
- Verify `pkg-config` can find packages: `pkg-config --list-all | grep gtk`
- Check that all dependencies are installed by running the build and reviewing error messages

### General
- If the build fails, ensure all dependencies from Step 3 are properly installed
- Try cleaning previous builds: `make clean` then rebuild

---

## Audio Tweaks if you know what you are doing. 
use miniaudio instead of Rtaudio cause its more easy and literally a single header with more than 10 percent comments in the code which explains everything.

^^ Only do if you want to tweak audio before encoder. 

---

## Next Steps

After successful installation:

Launch LibreDiscord: `make run` (or run the installed binary. (in linux you can simply open but in windows use mingw64 shell and command to run. trust me you wont regret and you can just directly drop the libopus in the main dir to use it instead))

