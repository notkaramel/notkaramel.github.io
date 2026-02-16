---
title: "Sway Configuration"
slug: "sway-configuration"
description: "Cheatsheet for adapting i3-style workflows to Sway on Wayland."
date: "2025-06-30"
lastUpdated: "2025-06-30"
tags: ["linux", "sway", "dotfiles"]
categories: ["Technical Docs"]
---

# Sway configuration

Similar to the i3 experience, sway can simply use the config of i3, with tweaks all around to make things work smoothly with Wayland

## Documentation:

- `man 5 sway`
- https://wiki.archlinux.org/title/wayland
- https://github.com/swaywm/sway/wiki/i3-Migration-Guide
- https://wiki.archlinux.org/title/sway
- https://github.com/swaywm/sway/wiki

## Major configuration

### Utilities

- wl-clipboard: wayland clipboard
- mako: notification daemon
- kanshi: autorandr alt
- wdisplays (AUR): arandr alt
- wtype: xdotool alt
- wlrctl: support wlroots extensions
- ydotool: command-line automation tool (similar to wlrctl)
- wayvnc: remote desktop that works with VNC backend and wlroots
