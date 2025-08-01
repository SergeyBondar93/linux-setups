#!/bin/bash

# curl -LO https://raw.githubusercontent.com/SergeyBondar93/organizer/refs/heads/master/basic-arch-linux.sh
# chmod +x arch-install.sh
# ./arch-install.sh

set -e

echo "[*] Проверка EFI..."
ls /sys/firmware/efi/efivars >/dev/null || { echo "Система не в EFI-режиме"; exit 1; }

echo "[*] Поиск дисков..."
DISKS=($(lsblk -dno NAME,TYPE | awk '$2=="disk"{print "/dev/"$1}'))
if [[ ${#DISKS[@]} -ne 1 ]]; then
  echo "Найдено несколько дисков: ${DISKS[*]}. Укажи диск вручную."
  exit 1
fi
DISK="${DISKS[0]}"
echo "[*] Используем диск: $DISK"

echo "[*] Размонтирование, если что-то уже примонтировано..."
umount -R /mnt 2>/dev/null || true
swapoff -a || true
[[ -d /mnt ]] && rm -rf /mnt/*

echo "[*] Создание GPT и разделов..."
parted -s "$DISK" mklabel gpt
parted -s "$DISK" mkpart primary fat32 1MiB 512MiB
parted -s "$DISK" set 1 esp on
parted -s "$DISK" mkpart primary linux-swap 512MiB 2.5GiB
parted -s "$DISK" mkpart primary ext4 2.5GiB 100%

echo "[*] Форматирование разделов..."
mkfs.fat -F32 "${DISK}1"
mkswap "${DISK}2"
mkfs.ext4 "${DISK}3"

echo "[*] Монтирование..."
mount "${DISK}3" /mnt
mkdir -p /mnt/boot
mount "${DISK}1" /mnt/boot
swapon "${DISK}2"

echo "[*] Установка базовой системы..."
pacstrap -K /mnt base linux linux-firmware vim sudo networkmanager grub efibootmgr

echo "[*] Генерация fstab..."
genfstab -U /mnt >> /mnt/etc/fstab

echo "[*] Настройка системы внутри chroot..."
arch-chroot /mnt /bin/bash <<EOF
ln -sf /usr/share/zoneinfo/Europe/Berlin /etc/localtime
hwclock --systohc

echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf

echo "archhost" > /etc/hostname
echo -e "127.0.0.1\tlocalhost\n::1\t\tlocalhost\n127.0.1.1\tarchhost.localdomain\tarchhost" > /etc/hosts

useradd -m -G wheel user
echo user:password | chpasswd
echo root:password | chpasswd
echo "%wheel ALL=(ALL:ALL) ALL" > /etc/sudoers.d/wheel

systemctl enable NetworkManager

grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
EOF

echo "[✔] Установка завершена. Можно перезагружаться!"
