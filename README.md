#!/bin/bash
set -e

disk="/dev/sda"

echo "[*] Подготовка диска $disk (GPT + EFI)"
wipefs -af "$disk"
sgdisk -Z "$disk"
sgdisk -n1:0:+512M -t1:ef00 "$disk"
sgdisk -n2:0:0 -t2:8300 "$disk"

mkfs.fat -F32 "${disk}1"
mkfs.ext4 -F "${disk}2"

mount "${disk}2" /mnt
mkdir /mnt/boot
mount "${disk}1" /mnt/boot

echo "[*] Установка системы"
pacstrap /mnt base linux linux-firmware systemd-boot

genfstab -U /mnt >> /mnt/etc/fstab

arch-chroot /mnt /bin/bash <<EOF
ln -sf /usr/share/zoneinfo/Europe/Berlin /etc/localtime
hwclock --systohc
echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
echo "archlinux" > /etc/hostname
echo "127.0.0.1 localhost" >> /etc/hosts
echo "::1       localhost" >> /etc/hosts
echo "127.0.1.1 archlinux.localdomain archlinux" >> /etc/hosts
echo "root:password" | chpasswd

bootctl --path=/boot install

cat > /boot/loader/loader.conf <<LOADER
default arch
timeout 3
console-mode max
LOADER

cat > /boot/loader/entries/arch.conf <<ENTRY
title   Arch Linux
linux   /vmlinuz-linux
initrd  /initramfs-linux.img
options root=PARTUUID=$(blkid -s PARTUUID -o value ${disk}2) rw
ENTRY
EOF

echo "[*] Установка завершена. Перезагрузка..."
umount -R /mnt
reboot
