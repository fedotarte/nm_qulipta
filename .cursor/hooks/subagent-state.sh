#!/bin/bash
# Управляет флагом активности субагента для guard-shared-ui.sh
# Вызывается из subagentStart (start) и subagentStop (stop)

STATE_DIR=".cursor/hooks/state"
ACTIVE_FILE="${STATE_DIR}/active_count"
SHARED_UI_FILE="${STATE_DIR}/shared_ui_count"
LOCK_DIR="${STATE_DIR}/lock"
LOCK_PID_FILE="${LOCK_DIR}/pid"
LOCK_TTL_SEC=60
LOCK_WAIT_STEPS=500

mkdir -p "$STATE_DIR"
input=$(cat)

extract_kind() {
  local payload="$1"
  local kind
  kind=$(
    echo "$payload" | jq -r '
      .subagent_type //
      .subagentType //
      .subagent_name //
      .subagentName //
      .tool_input.subagent_type //
      .tool_input.subagentType //
      .tool_input.subagent_name //
      .tool_input.subagentName //
      .subagent.type //
      .subagent.name //
      .agent.type //
      .agent.name //
      empty
    ' 2>/dev/null
  )
  kind=$(printf '%s' "$kind" | tr '[:upper:]' '[:lower:]')
  case "$kind" in
    shared-ui|shared_ui) echo "shared-ui" ;;
    shared-api|shared_api) echo "shared-api" ;;
    code-review|code_review) echo "code-review" ;;
    *) echo "unknown" ;;
  esac
}

acquire_lock() {
  local step=0
  while ! mkdir "$LOCK_DIR" 2>/dev/null; do
    step=$((step + 1))
    if [ "$step" -ge "$LOCK_WAIT_STEPS" ]; then
      local lock_pid lock_mtime now
      lock_pid=$(cat "$LOCK_PID_FILE" 2>/dev/null || echo "")
      if [ -n "$lock_pid" ] && ! kill -0 "$lock_pid" 2>/dev/null; then
        rm -rf "$LOCK_DIR" 2>/dev/null || true
        step=0
        continue
      fi
      lock_mtime=$(stat -f "%m" "$LOCK_DIR" 2>/dev/null || echo "0")
      now=$(date +%s)
      if { [ -z "$lock_pid" ] || ! kill -0 "$lock_pid" 2>/dev/null; } && \
         [ "$lock_mtime" -gt 0 ] && [ $((now - lock_mtime)) -gt "$LOCK_TTL_SEC" ]; then
        rm -rf "$LOCK_DIR" 2>/dev/null || true
        step=0
        continue
      fi
      echo "Failed to acquire lock: stale or busy lock at $LOCK_DIR" >&2
      exit 1
    fi
    sleep 0.01
  done
  echo "$$" > "$LOCK_PID_FILE"
  trap release_lock EXIT INT TERM
}

release_lock() {
  local owner_pid
  owner_pid=$(cat "$LOCK_PID_FILE" 2>/dev/null || echo "")
  if [ "$owner_pid" = "$$" ]; then
    rm -f "$LOCK_PID_FILE" 2>/dev/null || true
    rmdir "$LOCK_DIR" 2>/dev/null || true
  fi
}

read_int() {
  local file="$1"
  local value
  value=$(cat "$file" 2>/dev/null || echo "0")
  case "$value" in
    ''|*[!0-9]*) echo "0" ;;
    *) echo "$value" ;;
  esac
}

case "${1:-}" in
  start)
    kind=$(extract_kind "$input")
    acquire_lock
    active_count=$(read_int "$ACTIVE_FILE")
    shared_ui_count=$(read_int "$SHARED_UI_FILE")
    active_count=$((active_count + 1))
    if [ "$kind" = "shared-ui" ]; then
      shared_ui_count=$((shared_ui_count + 1))
    fi
    echo "$active_count" > "$ACTIVE_FILE"
    echo "$shared_ui_count" > "$SHARED_UI_FILE"
    release_lock
    ;;
  stop)
    kind=$(extract_kind "$input")
    acquire_lock
    active_count=$(read_int "$ACTIVE_FILE")
    shared_ui_count=$(read_int "$SHARED_UI_FILE")
    if [ "$active_count" -gt 0 ]; then
      active_count=$((active_count - 1))
    fi
    if [ "$kind" = "shared-ui" ]; then
      if [ "$shared_ui_count" -gt 0 ]; then
        shared_ui_count=$((shared_ui_count - 1))
      fi
    fi
    if [ "$active_count" -eq 0 ]; then
      shared_ui_count=0
    fi
    echo "$active_count" > "$ACTIVE_FILE"
    echo "$shared_ui_count" > "$SHARED_UI_FILE"
    release_lock
    ;;
  reset)
    acquire_lock
    echo "0" > "$ACTIVE_FILE"
    echo "0" > "$SHARED_UI_FILE"
    release_lock
    ;;
  *)
    echo "Usage: $0 start|stop|reset" >&2
    exit 1
    ;;
esac

exit 0
