#!/bin/sh

set -e

# Установка базовой системы
apk --root /mnt --initdb add alpine-base

# Настройка fstab
genfstab -U /mnt >> /mnt/etc/fstab

# Копирование DNS
cp /etc/resolv.conf /mnt/etc/

# Chroot и настройка
cat <<EOF | chroot /mnt /bin/sh

# Сетевое имя
echo alpine-mini > /etc/hostname

# Службы
rc-update add networking
rc-update add bootmisc
rc-update add urandom
rc-update add crond

# Установка и настройка OpenRC
apk add openrc
rc-update add dbus

# Ядро, загрузчик
apk add linux-lts grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=alpine
grub-mkconfig -o /boot/grub/grub.cfg

# Пользователь
adduser -D user
echo "user:1111" | chpasswd

# Графика и браузер
apk add xorg-server xfce4 xfce4-terminal lightdm lightdm-gtk-greeter
apk add firefox-esr

rc-update add lightdm

EOF
