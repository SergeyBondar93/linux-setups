#!/bin/bash

# curl -LO https://raw.githubusercontent.com/SergeyBondar93/organizer/refs/heads/master/install-gui.sh
# chmod +x install-gui.sh
# ./install-gui.sh

echo "✅ Установка графического окружения..."

# Установка X сервера и драйверов (для Intel, AMD, Nvidia по необходимости)
pacman -S --noconfirm xorg xorg-xinit xterm

# NetworkManager (если не установлен)
pacman -S --noconfirm networkmanager
systemctl enable NetworkManager

# Установка KDE Plasma + sddm (дисплей-менеджер)
pacman -S --noconfirm plasma kde-applications sddm
systemctl enable sddm

# Браузер
pacman -S --noconfirm firefox

echo "🎉 Графическое окружение KDE Plasma установлено. При следующей загрузке вы попадёте в графическую среду."
