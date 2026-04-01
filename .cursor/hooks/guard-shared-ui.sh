#!/bin/bash
# Блокирует прямую запись в shared/ui основным агентом.
# Запись разрешена только когда активен субагент shared-ui (subagentStart → subagentStop).
# Вызывается из preToolUse при Write/StrReplace.

ACTIVE_FILE=".cursor/hooks/state/active_count"
SHARED_UI_FILE=".cursor/hooks/state/shared_ui_count"
LOCK_DIR=".cursor/hooks/state/lock"
DENY_MESSAGE='Запись в shared/ui запрещена напрямую. Используй subagent_type=shared-ui для изменений в app/src/shared/ui/**.'
STATE_BUSY_MESSAGE='Не удалось проверить состояние shared-ui guard: state busy. Повтори попытку.'

input=$(cat)

read_int() {
  local value="$1"
  case "$value" in
    ''|*[!0-9]*) echo "0" ;;
    *) echo "$value" ;;
  esac
}

# Извлекаем путь из tool_input (разные инструменты используют разные поля)
path=$(
  echo "$input" | jq -r '
    .tool_input.path //
    .tool_input.file_path //
    .tool_input.target_file //
    .tool_input.filePath //
    .tool_input.absolute_path //
    .tool_input.file //
    .tool_input.target //
    .tool_input.uri //
    empty
  ' 2>/dev/null
)

# Если путь не найден в tool_input, пробуем извлечь из других мест
if [ -z "$path" ] || [ "$path" = "null" ]; then
  path=$(
    echo "$input" | jq -r '
      .file_path //
      .path //
      .target_file //
      .filePath //
      .absolute_path //
      .uri //
      empty
    ' 2>/dev/null
  )
fi

# Нормализуем URI/relative paths
path=${path#file://}
path=${path#./}
if [ -z "$path" ] || [ "$path" = "null" ]; then
  echo '{"decision":"allow"}'
  exit 0
fi

# Проверяем, относится ли путь к shared/ui/** (relative/absolute paths)
is_shared_ui_path=0
if [ -n "$path" ] && [ "$path" != "null" ]; then
  case "$path" in
    app/src/shared/ui/*|*/app/src/shared/ui/*|src/shared/ui/*|*/src/shared/ui/*)
      is_shared_ui_path=1
      ;;
  esac
fi

if [ "$is_shared_ui_path" = "1" ]; then
  step=0
  while [ -d "$LOCK_DIR" ] && [ "$step" -lt 500 ]; do
    step=$((step + 1))
    sleep 0.01
  done
  if [ -d "$LOCK_DIR" ]; then
    jq -n --arg reason "$STATE_BUSY_MESSAGE" '{decision:"deny",reason:$reason}'
    exit 2
  fi
  active_count=$(read_int "$(cat "$ACTIVE_FILE" 2>/dev/null || echo "0")")
  shared_ui_count=$(read_int "$(cat "$SHARED_UI_FILE" 2>/dev/null || echo "0")")
  if [ "$active_count" -le 0 ] || [ "$shared_ui_count" -le 0 ]; then
    jq -n --arg reason "$DENY_MESSAGE" '{decision:"deny",reason:$reason}'
    exit 2
  fi
fi

echo '{"decision":"allow"}'
exit 0
