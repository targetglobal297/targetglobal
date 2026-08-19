// Explicit ambient declaration for plain (non-module) CSS imports.
// Next.js normally provides this automatically via next-env.d.ts + the
// "next" package's own types, but some setups (editor TS servers, or
// running `tsc` directly outside Next's own build pipeline) don't pick
// that up — this file makes it work regardless of how type-checking runs.
declare module "*.css";
