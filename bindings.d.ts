export type Bindings = {
  KEE: string;
};

declare global {
  function getMiniflareBindings(): Bindings;
}
