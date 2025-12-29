---
title: "Thoughts on daily driving Linux"
slug: "thoughts-on-daily-driving-linux"
description: "Answers to common questions about daily driving Linux alongside Windows."
date: "2025-08-18"
lastUpdated: "2025-08-18"
tags: ["linux", "opinion", "dual-boot"]
---

With Linux how bad can I break things? Like is it always possible to restart or can I brick my laptop by accident

Also I still want to dual boot with windows, my license key is embedded in the firmware of my laptop… will Linux interfere with that at all 

I’m realizing I have a lot of questions I’m not yet sure how to answer with google

I have two physical drives in my laptop, is it better to have each is on a separate drive or to partition a single physical drive into two partitions to act as the boot drive for both OSs 

Also will I be able to access the my files from both operating systems? Is that something I even want or will that lead to permission issues?

My main priority is stability, I’ve headed of window updates breaking the linux partition of a dual boot and I’d like to avoid that 

I see a lot of conflicting information about arch regarding stability online, my impression is that it doesn’t typically randomly break nowadays but I’m not sure 

"even Arch Linux is very stable if you don't update too often" is the consensus. Nothing is "stable", breaking changes happens all the time and it's your responsibility to maintain that stability
Things broke for me back 2-3 years ago because I experimented and of course shit breaks. The past 2 years my Arch system broke only two times because systemd has an issue, then it was the package manager who has an update that I was unaware of
Tldr, stability is relative and it's really up to you to keep it stable, not the distro maintainer 

You can install hyprland on ubuntu, it's really easy. If apt doesn't have it, git clone it and install it from source
There should be documentation for it on their github or the actual docs
Linux is fragile only if you mismanage it, say update a package and don't know about a breaking change, or download some program that breaks dependencies of other programs. Happens quite often at first, and you will need to have a usb thumbdrive on you at all times in case it happens, or just switch to Windows
For dual booting: no, Linux will live in its own partition of the hard drive. Idk if it has changed for Windows, but for the longest time I'm pretty sure the license is linked to your Microsoft account, not the machine. If you mess something up, your license is still there
