# Reproduction for "Batch has scheduled roots"

```sh
bun install

```

## in first terminal

```sh
bun run dev
```

## in second terminal

```sh
bun run devt
```

Open Browser at <http://localhost:3000>

Press button. It should trigger the error.

## How to edit

The svelte components are at /bundle. When edited the browser will refresh.
It was important to pass the value to another web component to trigger the error.
