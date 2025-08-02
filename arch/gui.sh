#!/bin/bash

# необходимо переключиться в su для выполнения скритпа
# curl -LO https://raw.githubusercontent.com/SergeyBondar93/linux-setups/refs/heads/master/arch/gui.sh
# chmod +x gui.sh
# ./gui.sh


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
