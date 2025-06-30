---
title: "Core Packages on Arch Linux"
slug: "core-packages-on-arch-linux"
timeWritten: "2025-06-30"
lastUpdated: "2025-06-30"
---
# List of Core Packages

There is no order or obligation to download all. Download with intension!

Notation styles:
- `package` or package (AUR, or just notes) [group]
- package1, package2 (AUR), package3 (cool one) [grp1]

---
## Arch Installation
### Linux Kernel & Firmware
- `linux` or `linux-lts`
- linux-firmware
- linux-headers (optional)

### Core Packages
- base, base-devel
- grub, efibootmgr, os-prober
- sudo
- man-db (for manuals and `man` command)
- intel-ucode (or amd-ucode)

### Wireless Internet Connection
- wpa\_supplicant
- dhcpcd
> If intended to use GNOME DE, install `NetworkManager` alone is good enough. It uses `wpa_supplicant` and `dhcp_client` under the hood.

### Text editors
- nano
- vi
- vim
- neovim

### Tools & Drivers
- git
- curl, wget
- `yay` or `yay-bin` (requires `base-devel` above)
```sh
git clone https://aur.archlinux.org/yay
cd yay
makepkg -si
```
- neofetch
- ntfs-3g (to use NTFS drive)
- nvidia, nvidia-utils
- [xorg], wayland
---
## User Interface (post-installation)
### Fonts & Visual
- ttf-firacode-nerd, ttf-fira-code (there is also woff2 version)
- noto-fonts-cjk, noto-fonts-emoji, noto-fonts-extra
- tree
- picom (transparency in X11)
- feh (view picture + set background)
### Shell-related
- zsh, fish
- alacritty
- gnome-console (`kgx`), or gnome-terminal
- tmux
- bashtop, htop, gotop (AUR)
- oh-my-bash-git (AUR), oh-my-zsh-git (AUR)
- bash-completion, zsh-completions
- zsh-autosuggestions (AUR, git), zsh-syntax-highlighting (AUR, git)
- picom (for transparency of Alacritty and X11 transition)
- lf, ranger (file manager)
- xdotool (commandline automation | rofimoji insertion mode)

### Window Manager (WM)
* xorg-xinit (to aquire `startx`)
* i3 experience (See i3Configuration.md for more):
    - i3-wm [i3]
    - i3blocks [i3]
    - i3lock [i3]
    - i3status [i3]
    - dmenu | rofi (dynamic menu)


* Dual Monitors:
    - xrandr
    - arandr


### Utilities
- pipewire, wireplumber, pipewire-audio, pipewire-v4l2
- jack2 (for `obs-studio`), helvum (wiring devices), jack2-dbus & a2jmidid ([Using MIDI devices](https://wiki.archlinux.org/title/JACK_Audio_Connection_Kit#Using_MIDI_devices), see ArchWiki for more)
- bluez, bluez-utils (for `bluetoothctl`)
- blueberry (managing bluetooth devices)
- gnome-keyring (keychain), seahorse (managing keys like GPG)
- touchegg (AUR, touchpad gesture for X11), touche (AUR, GUI for touchegg)
- ibus (multi-lang), ibus-bamboo (AUR, Vietnamese ibus interface [ibus-bamboo GitHub](https://github.com/BambooEngine/ibus-bamboo#arch-linux-v%C3%A0-c%C3%A1c-distro-t%C6%B0%C6%A1ng-t%E1%BB%B1))
- jq, hq, yq: parsing JSON, HTML, YAML, respectively
- android-udev: connecting Android device to linux

### Desktop Environment
* GNOME experience:
    - [gnome]  (select what you want/need)
    - [gnome-extra]
    - gdm, gdm-settings (AUR)
* KDE Plasma experience: [plasma] [kde-applications] [kde-utilities]

### SDK
- jdk-openjdk 
- android-tools
- base-devel, gcc, cmake, clang, ...

### System Controllers
- pactl (PulseAudio controller), amixer (ALSA controller)
- brightnessctl (brightness controller)
- playerctl (Media Player Controller)
- zsa-udev (for ZSA Moonlander Keyboards)

### Everyday apps
* Coding: (open-source version does not have profile sync)
    - visual-studio-code-bin (AUR)
    - code, code-marketplace (AUR)
    - vscodium (AUR), vscodium-marketplace (AUR)
* Communication
    - zoom (AUR)
    - slack-desktop (AUR)
    - discord
* Office Suite, Art & Music
    - onlyoffice-bin (AUR)
    - musescore [pro-audio], muse-hub-bin (AUR but it's broken there. I suggest download `.deb` and unpack using `ar x` and install using `tar` instead)
    - yoshimi [pro-audio lv2-plugins]
    - spotify (AUR)
    - obs-studio
    - vlc
* Entertainment (Games)
    - minecraft-launcher (AUR)
* Quality of life 
    - nautilus [gnome] + sushi [gnome]
    - power-profiles-daemon (Managing power profiles)

---
### Fun ones
- lolcat
- cowsay
- cmatrix, tmatrix (AUR)
- hollywood (AUR)
- obsidian (Markdown Text Editor)
