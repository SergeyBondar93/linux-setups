#!/bin/sh

set -e

# Подготовка
apk add --no-cache sgdisk e2fsprogs dosfstools

# Очистка диска
sgdisk --zap-all /dev/sda

# Разделы: 512M EFI + остальное root
sgdisk -n1:0:+512M -t1:ef00 -c1:EFI /dev/sda
sgdisk -n2:0:0     -t2:8300 -c2:ROOT /dev/sda

# Форматирование
mkfs.vfat -F32 /dev/sda1
mkfs.ext4 /dev/sda2

# Монтирование
mount /dev/sda2 /mnt
mkdir -p /mnt/boot/efi
mount /dev/sda1 /mnt/boot/efi
