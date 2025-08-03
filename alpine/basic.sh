#!/bin/sh

set -e

error_exit() {
    echo "❌ Ошибка: $1"
    exit 1
}

info() {
    echo "👉 $1"
}

DISK="/dev/sda"
BOOT_PART="${DISK}1"
ROOT_PART="${DISK}2"
MNT_DIR="/mnt"

# Проверка диска
[ -b "$DISK" ] || error_exit "Диск $DISK не найден"

# Установка утилит
info "📦 Установка необходимых пакетов..."
apk update
apk add parted e2fsprogs util-linux dosfstools || error_exit "Не удалось установить зависимости"

# Размонтирование старых точек монтирования
info "🔎 Проверка на старые монтирования..."
umount -f "$MNT_DIR/boot" 2>/dev/null || true
umount -f "$MNT_DIR" 2>/dev/null || true
umount -f "$ROOT_PART" 2>/dev/null || true
umount -f "$BOOT_PART" 2>/dev/null || true

# Удаление остатков
info "🧹 Очистка старых точек монтирования..."
rm -rf "$MNT_DIR/boot"
rm -rf "$MNT_DIR"

# Удаление старой таблицы разделов
info "⚠️ Удаление старой разметки на $DISK (все данные будут утеряны)..."
dd if=/dev/zero of="$DISK" bs=1M count=10 conv=fsync status=progress || error_exit "Не удалось стереть $DISK"

# Создание новой таблицы
info "🧱 Создание новой GPT-разметки..."
parted -s "$DISK" mklabel gpt

info "📐 Создание разделов..."
parted -s "$DISK" mkpart primary fat32 1MiB 100MiB
parted -s "$DISK" set 1 boot on
parted -s "$DISK" mkpart primary ext4 100MiB 100%

# Обновление информации
partprobe "$DISK"
sleep 1

# Форматирование
info "💾 Форматирование boot-раздела ($BOOT_PART)..."
mkfs.vfat -F32 "$BOOT_PART" || error_exit "Не удалось отформатировать boot-раздел"

info "💾 Форматирование root-раздела ($ROOT_PART)..."
mkfs.ext4 -F "$ROOT_PART" || error_exit "Не удалось отформатировать root-раздел"

# Монтирование
info "📂 Монтирование root-раздела в $MNT_DIR..."
mkdir -p "$MNT_DIR"
mount "$ROOT_PART" "$MNT_DIR" || error_exit "Не удалось примонтировать root-раздел"

info "📂 Монтирование boot-раздела в $MNT_DIR/boot..."
mkdir -p "$MNT_DIR/boot"
mount "$BOOT_PART" "$MNT_DIR/boot" || error_exit "Не удалось примонтировать boot-раздел"

info "✅ Готово! Root: $MNT_DIR, Boot: $MNT_DIR/boot"
