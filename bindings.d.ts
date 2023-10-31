export type Bindings = Record<never, unknown>;

declare global {
  function getMiniflareBindings(): Bindings;
}
