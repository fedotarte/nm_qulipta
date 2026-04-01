---
name: design-layout-pipeline
description: Subagent for screenshot-first layout pipeline with token fitting and visual QA loop.
model: claude-sonnet-4-20250514
readonly: false
---

# Design Layout Pipeline (Screenshot-First)

Единый файл пайплайна вёрстки. Содержит контракты всех stage-агентов.

## Принцип

- Структура UI строится по скриншоту.
- Figma-дерево не используется как source-of-truth структуры.
- Figma используется как источник style-метрик; токенизация делается через `@pulse-web-ui/theme`.

## Вход

- `design/pages/<pageId>/raw/figma-full.png`
- `design/pages/<pageId>/raw/figma-style-metrics.json` (optional)
- `design/config/figma.<pageId>.config.json`
- optional `project-info/*.md`
- optional `denyList`, user constraints

## Этапы и контракты

### 0) Preflight

- Проверить наличие входных артефактов.
- Зафиксировать `constraints` и `denyList`.
- При критических пропусках вернуть `BLOCKED`.

### 1) visual-reasoning

Задача: извлечь layout graph из скриншота (без Figma node names).

Выход:
- `design/pages/<pageId>/derived/visual-structure-notes.md`
- `design/pages/<pageId>/derived/layout-graph.json`

Минимальный контракт:
```json
{
  "pageId": "work-plan",
  "nodes": [],
  "edges": [],
  "repeatingGroups": [],
  "artifactCandidates": []
}
```

### 2) structure

Задача: собрать структурную иерархию по layout graph.

Выход:
- `design/pages/<pageId>/derived/structure-spec.md`

Правило: группировка только по визуальным отношениям (`containment/alignment/repetition`).

### 3) figma-style-extract

Задача: извлечь из Figma только style-метрики (без структурной интерпретации).

Выход:
- `design/pages/<pageId>/derived/style-metrics.json`

Обязательные поля: typography, colors, radius, spacing.

### 4) token-map

Задача: сопоставить style-метрики с `@pulse-web-ui/theme`.

Выход:
- `design/pages/<pageId>/derived/token-map.json`
- `design/pages/<pageId>/derived/non-token-overrides.json`

Минимальный контракт:
```json
{
  "schemaVersion": "2.0",
  "pageId": "work-plan",
  "typography": [],
  "colors": [],
  "spacing": [],
  "radii": []
}
```

### 5) layout

Задача: сделать `layout-plan.md` по `layout-graph + structure + token-map`.

Выход:
- `design/pages/<pageId>/derived/layout-plan.md`

Правило: метрики округлять к сетке 4px/8px.

### 6) component-map

Задача: разбить экран на компоненты, props и states.

Выход:
- `design/pages/<pageId>/derived/component-map.json`

Правило: не добавлять компоненты вне `structure/layout`.

### 7) ui-coding

Задача: реализовать код по `component-map + layout-plan + token-map`.

Ограничения:
- не рендерить `artifactCandidates` без явного разрешения;
- в QA fix-cycle исправлять только пункты из `qa-result.json`.

### 8) layout-qa

Задача: сравнить `render-screenshot` c `figma-full`.

Выход:
- `design/pages/<pageId>/derived/qa-diff-report.md`
- `design/pages/<pageId>/derived/qa-result.json`

Статусы:
- `PASS` — нет failed-пунктов
- `FAIL` — есть исправимые расхождения
- `BLOCKED` — нельзя верифицировать

## QA Loop

- Максимум 5 циклов.
- Цикл: `layout-qa -> fix list -> ui-coding -> recapture -> layout-qa`.
- Остановка: `PASS`, либо лимит итераций, либо `BLOCKED`.

## Артефакты

- `design/pages/<pageId>/derived/layout-graph.json`
- `design/pages/<pageId>/derived/structure-spec.md`
- `design/pages/<pageId>/derived/style-metrics.json`
- `design/pages/<pageId>/derived/token-map.json`
- `design/pages/<pageId>/derived/non-token-overrides.json`
- `design/pages/<pageId>/derived/layout-plan.md`
- `design/pages/<pageId>/derived/component-map.json`
- `design/pages/<pageId>/derived/qa-result.json`
- `design/pages/<pageId>/derived/qa-diff-report.md`

## Контракт результата

```json
{
  "status": "PASS|FAIL|BLOCKED",
  "pageId": "work-plan",
  "stages": [
    "visual-reasoning",
    "structure",
    "figma-style-extract",
    "token-map",
    "layout",
    "component-map",
    "ui-coding",
    "layout-qa"
  ],
  "qaCycles": 2,
  "outputs": {
    "tokenMap": "design/pages/work-plan/derived/token-map.json",
    "layoutPlan": "design/pages/work-plan/derived/layout-plan.md",
    "qaResult": "design/pages/work-plan/derived/qa-result.json"
  }
}
```
