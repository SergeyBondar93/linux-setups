#!/bin/sh

set -e

DISK="/dev/sda"
PART="${DISK}1"
MNT="/mnt"

echo "🚨 ВНИМАНИЕ: ВСЕ ДАННЫЕ НА ${DISK} БУДУТ УДАЛЕНЫ!"
sleep 3

# Проверка наличия диска
if [ ! -b "$DISK" ]; then
  echo "❌ Устройство $DISK не найдено"
  exit 1
fi

echo "📛 Разметка диска $DISK..."
parted --script "$DISK" mklabel gpt
parted --script "$DISK" mkpart primary ext4 1MiB 100%

# Обновление списка разделов
sleep 1
echo "🔁 Обновление списка разделов..."
partprobe "$DISK" || true
sleep 1

# Проверка появления раздела
if [ ! -b "$PART" ]; then
  echo "❌ Раздел $PART не найден. Что-то пошло не так."
  exit 1
fi

echo "🧼 Форматирование $PART в ext4..."
mkfs.ext4 -F "$PART"

# Создание точки монтирования
mkdir -p "$MNT"

echo "📂 Монтирование $PART в $MNT..."
mount "$PART" "$MNT"

# Проверка успешного монтирования
if mountpoint -q "$MNT"; then
  echo "✅ Успешно смонтировано в $MNT"
else
  echo "❌ Не удалось смонтировать $PART в $MNT"
  exit 1
fi
