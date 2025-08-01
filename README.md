#!/bin/bash

set -e

DISK="/dev/sda"

# Проверка, монтирована ли система
if mount | grep -q "/mnt"; then
  echo "[!] /mnt уже смонтирован — размонтирую..."
  umount -R /mnt || true
fi

echo "[*] Стираем $DISK"
wipefs -af "$DISK"
sgdisk -Z "$DISK"

echo "[*] Создание разделов GPT: EFI (512MB) + Linux root"
sgdisk -n1:0:+512M -t1:ef00 -c1:"EFI System" "$DISK"
sgdisk -n2:0:0     -t2:8300 -c2:"Linux root" "$DISK"

echo "[*] Форматирование"
mkfs.fat -F32 "${DISK}1"
mkfs.ext4 -F "${DISK}2"

echo "[*] Монтирование"
mount "${DISK}2" /mnt
mkdir -p /mnt/boot/efi
mount "${DISK}1" /mnt/boot/efi

echo "[*] Установка базовой системы"
pacstrap /mnt base linux linux-firmware grub efibootmgr networkmanager vim sudo

echo "[*] Генерация fstab"
genfstab -U /mnt >> /mnt/etc/fstab

echo "[*] Настройка системы"
arch-chroot /mnt /bin/bash <<EOF
ln -sf /usr/share/zoneinfo/Europe/Berlin /etc/localtime
hwclock --systohc

sed -i 's/#en_US.UTF-8/en_US.UTF-8/' /etc/locale.gen
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf

echo "archvm" > /etc/hostname
echo "127.0.0.1   localhost" >> /etc/hosts
echo "::1         localhost" >> /etc/hosts
echo "127.0.1.1   archvm.localdomain archvm" >> /etc/hosts

echo "root:password" | chpasswd

systemctl enable NetworkManager

echo "[*] Установка GRUB"
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
EOF

echo "[✔] Готово! Можешь перезагружаться!"
