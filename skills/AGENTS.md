# Maintaining consumer skills

The entire root `skills/` directory is public and distributable. Its skills teach application developers how to use the published packages and migrate between VRX, query libraries, and Nuxt's built-in async data API. Keep the individual skill instructions focused on application usage.

- Keep API guidance consistent with the implementation and exported types. When they disagree, explain the consumer-visible behavior without inventing a supported API.
- Prefer destructuring returned refs and methods in composable examples. Keep single-ref and function return values as direct bindings.
- In Nuxt examples, reserve `useAsyncData` for Nuxt's built-in API. Use VRX's module-provided `$useAsyncData` or an explicit `useAsyncData as useVrxAsyncData` import. Do not imply that module users must repeat its alias configuration, or that `$useAsyncData` is exported by core.
- Keep `SKILL.md` focused on selection and routing. In `vrx`, give each covered API its own `references/<API-name>.md`, with usage, relevant options, return values, and pitfalls. Share cross-cutting async behavior in `async-common.md` and keep framework setup in `integrations.md`.
- In `vrx-migration`, keep one reference per migration direction and shared contracts in `references/common.md`. Verify external APIs against official documentation and the relevant version. Explain behavioral differences, including capabilities without a VRX equivalent.
- Keep each skill independently installable: relative links must resolve within its own folder, including after copying it into an npm package or installing it through the skills CLI.
- `@vrx/core` copies the entire root `skills/` directory to its package root using one Vite+ `pack.copy` entry and cleans the whole generated `skills/` directory. Do not enumerate individual skills or exclude files from this public source directory. Edit only the sources; generated package skills are ignored by Git.
- When changing packaging, check the built directory and the actual package archive, including removal of obsolete generated files. A successful library build alone does not prove the tarball includes the skill.
- Keep Git installation available to users of `@vrx/nuxt`: pnpm only discovers skills from direct dependencies, and the skills are shipped by `@vrx/core`.
