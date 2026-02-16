---
title: "i3 Configurations"
slug: "i3-configurations"
description: "References and snippets for customizing the i3 window manager."
date: "2024-08-08"
lastUpdated: "2025-06-30"
tags: ["linux", "i3", "dotfiles"]
categories: ["Technical Docs"]
---

## 0. List of config files (relative to `$HOME`)

- General `i3` configuration file: `./config/i3/config`
- Programs configs: (relative to user's `$HOME`)

```sh
alacritty # .alacritty.yml
bash # .bashrc
zsh # .zshrc
fish # .config/fish/config
tmux # .tmux.conf
neofetch # .config
ssh # .ssh/config
```

- Visual themes (folders, rather than config file):

```sh
icons # .icons/
themes # .themes/
oh-my-bash # .oh-my-bash/
oh-my-zsh # .oh-my-zsh/
```

> NOTE: `.icons/` is also home to themes and cursor themes (default by `lxappearence` too!)

## Natural Scrolling

The default config file for libinput is at `/usr/share/X11/xorg.conf.d/40-libinput.conf`. Copy it to `/etc/X11/xorg.conf.d` then edit it your preferred text editor (with `sudo`)

```
nvim /etc/X11/xorg.conf.d/40-libinput.conf
...
Section "InputClass"
    Identifier "libinput touchpad catchall"
    ...
    Option "NaturalScrolling" "on" # add this
EndSection
...
```

## Network Configuration (wpa_supplicant & dhcpcd)

- NOTE: recommend using NetworkManager for out-of-the-box experience, but using wpa_supplicant and dhcpcd directly give better control over network management
- Configuration locations:
  - System-wide: `/etc/wpa_supplicant/wpa_supplicant.conf`
  - User-specific: `$HOME/.config/wpa_supplicant.conf`
  - Example: `/usr/share/wpa_supplicant/wpa_supplicant.conf`
- `wpa_supplicant.conf` configuration:

```yml
nvim ~/.config/wpa_supplicant.conf
---
# for normal wifi
# Can as well do `wpa_passpharse <ssid> <password> > ~/.config/wpa_supplicant.conf` to generate the psk
network={
    ssid=
    psk=
}

# for education wifi
network={
    ssid="SSID"
    key_mgmt=WPA-EAP
    EAP=PEAP
    phase2="auth=MSCHAPV2"
    identity="USERNAME"
    password="PASSWORD"
}
```

- To activate wpa_supplicant:

```sh
sudo wpa_supplicant -B -i wlan0 -D nl80211 -c ~/.config/wpa_supplicant.conf
```

> Note: the interface (`-i` flag) could be something else, e.g. wlo1. You can check it using the following command:

```sh
ip addr
```

- Make sure the interface is up/unblock, using:

```sh
ifstat wlo1 # to check
ip link set wlo1 up # to unblock interfce
```

- Set wpa_supplicant to run at boot (systemd):
  - Create a service file at `/etc/systemd/system/wpa_supplicant@.service`:

```sh
# create file
touch /etc/wpa_supplicant/wpa_supplicant-wlo1.conf
# copy content
cat /home/USER/.config/wpa_supplicant.conf > /etc/wpa_supplicant/wpa_supplicant-wlo1.conf
# enable the service
systemctl enable wpa_supplicant@wlo1
```

> Note: I expected to enable `dhcpcd@wlo1` as well but it seems to be working without it.

## Bluetooth Configuration

- Using `bluetoothctl`, from `bluez-utils` package. Recommend using `blueberry` as the GUI interface.

## Multiple Displays

- hmm

## Clipboard manager

- ***

## THE CONFIG FILE: `.config/i3/config`

### 1. Media Player: `playerctl`

```
bindsym XF86AudioPlay exec playerctl play-pause
bindsym XF86AudioNext exec playerctl next
bindsym XF86AudioPrev exec playerctl previous
```

### 2. Brightness Controller: `brightnessctl`

```
# Increase/Decrease screen brightness
bindsym XF86MonBrightUp exec brightnessctl set 10%+
bindsym XF86MonBrightDown exec brightnessctl set 10%-
```

### 3. Volume Controller: `pactl` of PulseAudio

```
bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ +10% && $refresh_i3status

bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ -10% && $refresh_i3status

bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute @DEFAULT_SINK@ toggle && $refresh_i3status
```

### 4. Transparency in X11

```
exec --no-startup-id picom --shadow --inactive-opacity=0.9 --shadow-radius=60 --shadow-opacity=0.2  --fade-in-step=0.8 &
```

### 5. Wallpaper

```
exec --no-startup-id feh --bg-scale --randomize $HOME/.wallpaper/*
```

### 6. Lock Screen

```
bindsym $mod+l exec i3lock -c 9a4000 -p win -e
```

### 7. Gaps & Coloring

```

# --- Coloring ---
# class                 border  backgr. text    indicator child_border
client.focused          #4c7899 #067A67 #ffffff #2e9ef4   #285577
client.focused_inactive #333333 #161C1A #ffffff #484e50   #5f676a
client.unfocused        #333333 #222222 #888888 #292d2e   #222222
client.urgent           #2f343a #900000 #ffffff #900000   #900000
client.placeholder      #000000 #0c0c0c #ffffff #000000   #0c0c0c

client.background       #ffffff

# --- Gaps ---
# `inner` is like padding in CSS
# gaps inner <gap_size>[px]
gaps inner 8

# `outer` is like margin in CSS
# gaps outer|horizontal|vertical|top|left|bottom|right <gap_size>[px]

# smart_gaps on|off|inverse_outer
smart_gaps inverse_outer
```

### 8. i3bar & i3status

- `.i3/config`

```
# --- i3bar ---
bar {
        status_command i3status
	i3bar_command i3bar --transparency
	position top
	font pango:Fira Code Bold 11
	separator_symbol ":|:"

	colors {
		background #013714b0
		statusline #ffffff
		separator #6666660a

        	focused_workspace  #4c7899 #285577 #ffffff
	        active_workspace   #333333 #5f676a #ffffff
        	inactive_workspace #333333 #222222 #888888
	        urgent_workspace   #2f343a #900000 #ffffff
        	binding_mode       #2f343a #900000 #ffffff
	}
}
```

- `.i3status.conf`

```
# --- i3status ---
```

### 9. Dynamic Menu: rofi

```
bindcode $mod+40 exec "rofi -show drun"
```

Inside `.config/rofi/config.rasi`:

```
configuration {
	modi: "drun,ssh,emoji:rofimoji,window";
	combi-modi: "drun,ssh,emoji:rofimoji";
}
@theme "glue_pro_blue"

```

### Auto-tiling

- Install `autotiling` (AUR)
