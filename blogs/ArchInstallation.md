---
title: Arch Installation Documentation
slug: arch-install-docs
timeWritten: "2025-06-30"
lastUpdated: "2025-06-30"
---

# Arch Installation Documentation (non dual-boot)
> by @notkaramel

## Prerequisite
- [ ] USB Drive (~800MB) with [archiso](https://archlinux.org/download/)
    - From Windows: Use `rufus` to flash ISO to drive
    - From Linux:
        - Using `rpi-imager` (AUR) via custom image
        - MultiWriter `gnome-multi-writer`

## Network Configuration
- Using wired connection is preferable
- `archiso` has iwctl built-in. It can connect to regular IEEE 802.11x wifi, i.e., Wifi with SSID and passphrase.

## Booting & Partition
- Update system clock 
```sh
timedatectl set-ntp true
```

- Using `fdisk` for partitioning
```sh
fdisk -l # list all partitions
fdisk /dev/device # e.g.: /dev/sda, /dev/nvme0n1
```

- Now you're inside `fdisk` CLI: `m` for help menu
    0. If fresh install, or disk not GPT, do `g` to create new empty GPT table
    1. `n`: new partition
        - Partition number: go by default or your preferred order
        - First sector: rcm go by default
        - Last sector: use `+SIZE` to set partition size (e.g.: +500MiB, +2G)
    2. `t`: change partition type
        - Partition number: remember from previously determined
        - `L` for option menu, `Q` to quit menu
        - Recommend GPT table:

        | Partition         | # | Type (`t` option) | Size      |
        |-------------------|---|-------------------|-----------|
        | EFI System        | 1 | EFI (1)           | +600MiB   |
        | Swap (optional)   | 2 | Linux swap (19)   | +4GiB     |
        | Root              | 3 | Linux root (23)   | +50GiB    |
        | Home              | 4 | Linux home (42)   | the rest  |

> Partition a swap if the PC has low RAM (swap's size should be 2x RAM)
    3. `w`: write table to disk and exit
    4. `q`: quit without saving changes

- Format partitions
```sh
mkfs.fat -F 32 /dev/EFI_Partition
mkswap /dev/SWAP_Partition
mkfs.ext4 /dev/ROOT_and_HOME
```

- Mounting & activate partitions
```sh
swapon /dev/SWAP_Partition
mount /dev/ROOT /mnt			
mount /dev/HOME /mnt/home   
mount --mkdir /dev/EFI /mnt/boot 	// for the EFI file system 
```

- Edit `/etc/pacman.conf` and enable `ParallelDownloads = ...` for faster download
- Install essential packages (see [CorePackages.md](CorePackages.md) for more). `pacstrap` also have flags like `-K` to initialize empty pacman keyring
```sh
pacstrap /mnt base linux linux-firmware base base-devel # ... 
```
- Generate file system table `fstab`
```sh
genfstab -U /mnt >> /mnt/etc/fstab
```

- Now, `arch-chroot` to `/mnt` and go to next steps!

## `arch-chroot` and root configuration

> I highly recommend install `fish` shell of out-of-the-box suggestions.
```sh
pacman -S fish
chsh root
# New shell: /usr/bin/fish
```

- Set timezone
```sh
ln -sf /usr/share/zoneinfo/REGION/CITY /etc/localtime
```
- Set system clock to hardware (or vice versa, do `man hwclock`)
```sh
hwclock --systohc
```

- Get text editor of choice: `nano`, `vim`, `neovim`, etc.

- Localization: uncomment locale in `/etc/locale.gen`
    - e.g.: en\_CA.UTF-8, fr\_CA.UTF-8
```sh
locale-gen
```

- Create `locale.conf` to set up LANG
```
LANG=en_CA.UTF-8 
```

- Network Configuration
    - In `/etc/hostname`:
    ```
    myHostName
    ```
    - In `/etc/hosts`:
    ```
    127.0.0.1		localhost 
    ::1			    localhost 
    127.0.1.1		myHostName 
    ```
- `mkinitcpio`
```
mkinitcpio -P # using all presets, see `man mkinitcpio` for more
```

- Root password using `passwd`
- Add non-root user
```
useradd -m myUser # `-m` create a folder in /home/myUser
passwd myUser # to set password
```

- Add user to access/privilege groups:
```sh
usermod -aG wheel,audio,video,optical,storage myUser
```
> later on, groups like `docker` for Docker dev, or `uucp` for embedded (Arduino) are also required

- Install `sudo` and edit `visudo`. 
```sh
pacman -S sudo
EDITOR=nvim visudo # visudo uses vi by default, but you can specify your preferred text editor
```

- Here, root user can determine how users should have access to sudo. It's good to have password whenever `sudo` is called, but users can opt-out
```txt
%wheel ALL = (ALL) ALL
# %wheel ALL = (ALL) NOPASSWD: ALL
```

- Install GRUB and Dual-boot stuffs
```sh
pacman -S efitbootmgr os-prober grub
```

- Install `grub` to EFI menu (boot menu) && Generate GRUB config: 
```sh
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB –recheck
grub-mkconfig -o /boot/grub/grub.cfg 
```

- Exit, unmount everything, and you're done!
```sh
exit # Ctrl + D
umount -a /mnt # unmount all
```

## Source
- [Arch Wiki Guide](https://wiki.archlinux.org/title/Installation_guide)
- [DistroTube Guide](https://youtu.be/PQgyW10xD8s)
- [Dual boot with Windows - ArchWiki](https://wiki.archlinux.org/title/Dual_boot_with_Windows)
- [Partitioning - ArchWiki](https://wiki.archlinux.org/title/Partitioning#Discrete_partitions)
- [EFI system partition - ArchWiki](https://wiki.archlinux.org/title/EFI_system_partition#Mount_the_partition)
