#!/bin/bash
# Stop hook: после завершения задачи автоматически запускает ревью кода.
# Возвращает followup_message — Cursor отправит его как следующий user message.

if ! command -v jq >/dev/null 2>&1; then
  echo '{}'
  exit 0
fi

input=$(cat)
status=$(echo "$input" | jq -r '.status // empty')
changed_files_count=$(
  echo "$input" | jq -r '
    if (.changed_files | type) == "array" then (.changed_files | length)
    elif (.changed_files | type) == "object" then (.changed_files | length)
    elif (.changes | type) == "array" then (.changes | length)
    elif (.files | type) == "array" then (.files | length)
    elif (.result.changed_files | type) == "array" then (.result.changed_files | length)
    elif (.payload.changed_files | type) == "array" then (.payload.changed_files | length)
    else -1
    end
  ' 2>/dev/null
)
active_subagent_type=$(
  echo "$input" | jq -r '
    .subagent_type //
    .subagentType //
    .tool_input.subagent_type //
    .tool_input.subagentType //
    .subagent.type //
    .agent.type //
    empty
  '
)
active_subagent_type=$(printf '%s' "$active_subagent_type" | tr '[:upper:]' '[:lower:]' | tr '_' '-')
if [ -z "$changed_files_count" ] || [ "$changed_files_count" = "null" ] || [ "$changed_files_count" = "false" ]; then
  changed_files_count=0
fi
if [ "$changed_files_count" -lt 0 ]; then
  # Unknown payload shape: prefer review trigger over silent skip.
  changed_files_count=1
fi

is_code_review_context=1
if [ "$active_subagent_type" = "code-review" ]; then
  is_code_review_context=0
fi

if [ "$status" = "completed" ] && [ "$changed_files_count" -gt 0 ] && [ "$is_code_review_context" -eq 1 ]; then
  msg='Определи изменённые файлы (git diff --name-only HEAD или из контекста). Вызови subagent_type=code-review и передай список файлов для проверки по .cursor/agents/code-review.md (JSON: summary, violations, suggestions). Внеси правки по всем violations. По suggestions — по возможности. Затем верни итоговый отчёт пользователю.'
  jq -n --arg msg "$msg" '{followup_message:$msg}'
else
  echo '{}'
fi
exit 0
