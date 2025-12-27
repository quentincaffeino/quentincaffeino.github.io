
# Using existing package management solution to automate Godot workflows

Most software projects eventually relearn the same lesson:

> If your tools are not part of your project, they will drift.

This isn’t specific to games, Godot, or even programming languages. It shows up anywhere tooling lives outside version control - editors, compilers, linters, test runners, build systems. Tooling without a lockfile is like camping without a tent - you can do it, but it gets uncomfortable fast.

When tools are installed “out of band”, teams compensate with:

- setup guides
- onboarding docs
- CI bootstrap scripts
- tribal knowledge

These work, until they don’t.

## A familiar pattern from other ecosystems

Other ecosystems have largely converged on a simple idea:
**treat tooling as dependencies, not prerequisites**.

- Node projects install their toolchain locally
- Python projects pin virtual environments
- Rust ships cargo
- Go vendors or pins module versions

At the time (2 to 3 years ago) at least from what I remember, the Godot ecosystem didn't offer anything like this.

## An observation: Godot already has an extension boundary

Godot has a clear, opinionated convention:

```
addons/
```

Everything inside this directory is treated as part of the project:

- plugins
- tools
- test frameworks

In other words, Godot already has a dependency boundary - it just doesn’t ship with a dependency resolver.

That turns out to be an important distinction.

## Borrowing a resolver instead of building one

Rather than invent a new system, I experimented with borrowing an existing one. Modern package managers already know how to:

- resolve dependency graphs
- pin versions
- install reproducibly
- work in CI
- handle binaries as first-class artifacts

The experiment was simple: can one of them install directly into `addons/`?

With `pnpm`, the answer was yes.

## `pnpm` as a Godot add-on manager

With this configuration:

```ini
# .npmrc
modules-dir=addons
```

```jsonc
# package.json
{
  "devDependencies": {
    "gut": "npm:@sometimes_youwin/gut@7.3.0"
  }
}
```

> Normally you'd have the simple notation of "package name": "version", and it would've created `@sometimes_youwin/gut` directory, which might not behave as we expect with Godot. We can use [aliasing](https://docs.npmjs.com/cli/v11/using-npm/package-spec#aliases) here by providing a different package name as a key and specific package details in the value.

> Dependencies don't have to be published to npm registry. Node package managers also support downloading directly [from git](https://docs.npmjs.com/cli/v11/using-npm/package-spec#git-urls).

- `pnpm install` will place [gut](https://github.com/bitwes/Gut) dependency directly into `addons/`
- Godot will pick it up automatically
- no copying, no post-processing, no custom scripts

Under the hood, `pnpm` links packages into `addons/` from its content-addressed store, so Godot sees a normal-looking `addons/` tree without extra plumbing. If you want the nitty-gritty on how `pnpm` lays out `node_modules`, the official [docs](https://pnpm.io/symlinked-node-modules-structure) explain the symlinked structure and the store.
From the engine’s perspective, nothing special is happening.
From the project’s perspective, add-ons are now versioned, reproducible, and documented by a lockfile.

## Godot is Portable

Once add-ons were installed this way, treating the engine similarly became a natural extension.
If add-ons can be pulled in like any other dependency, the engine itself starts looking like "just another tool" the project can pin and ship.

In my setup, Godot itself is packaged as a development dependency. This is a custom wrapper, not an official package; the proof of concept lives here: https://github.com/quentincaffeino/godot-engine-npm/tree/dynamic-download.

Unfortunately, it’s no longer buildable after these years for some reason. Originally it worked like this:

- package artifact published in npm repository
- it consists of package.json, godot.json and install.js files
- when you add it to the project, it automatically runs install.js
- the install script reads the contents of both JSON files to figure out version and where to get godot from, this is what godot.json looked like:
```jsonc
# godot.json
{
  "linux": {
    "32": "Godot_v3.5.1-stable_x11.32.zip",
    "64": "Godot_v3.5.1-stable_x11.64.zip"
  },
  "windows": {
    ...
  },
  "osx": {
    ...
  }
}
```
- install.js figures out your platform, downloads the correct zip file, and extracts it into the Node bin folder
- PROFIT

> Today I wouldn’t use a post-install hook to automatically run the install script. The reason is the recent **Shai‐Hulud** worm which ran malicious code on this same hook. Skipping automatic install isn’t a problem; many tools add an extra setup step.

What we get is:

- version-pinned alongside the project
- available in CI without preinstallation
- treated like a tool, not a machine-level prerequisite

Conceptually, this is no different from how many projects treat compilers, formatters, and test runners. The engine stops being "something you happen to have installed" and becomes part of the project contract.

Here is a small example of how I was using it:

```json
# package.json
{
  "scripts": {
    "test": "./addons/.bin/godot -s addons/gut/gut_cmdln.gd -d --path ../../../demo/ -gconfig=res://addons/quentincaffeino/console/.gutconfig.json",
  },
  "devDependencies": {
    "@quentincaffeino/godot": "file:../../../quentincaffeino-godot-3.5.0.tgz",
    "gut": "npm:@sometimes_youwin/gut@7.3.0"
  }
}
```

> The `file:` notation is just for local testing. Full code can be found [here](https://github.com/quentincaffeino/godot-console/compare/develop...test-workflow).

> Usually, Node-managed binaries in scripts can be invoked without a path, but it didn’t work at the time for some reason.

## Running tests like any other project

With the engine and add-ons available locally, tests can be run the same way as in other ecosystems:

```bash
pnpm test
```

Under the hood:

- Godot runs headless
- GUT executes from `addons/`
- no editor or GUI is involved

This is particularly valuable in CI, where simplicity and determinism matter more than ergonomics.

### CI: no global installs, no GUI

This is the corresponding GitHub Actions workflow. The main idea is that CI does not need a preinstalled Godot or any custom setup outside of `pnpm install`:

```yaml
name: Test

on: push

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout
      - name: Setup pnpm ⚙️
        uses: pnpm/action-setup
      - name: Setup node ⚙️
        uses: actions/setup-node
      - name: Install deps ☁️
        run: pnpm install --frozen-lockfile
      - name: Run tests
        run: pnpm ci:test
```

We add another script to run it headless:

```json
# package.json
...
  "scripts": {
...
    "ci:test": "./addons/.bin/godot --no-window -s addons/gut/gut_cmdln.gd -d --path ../../../demo/ -gconfig=res://addons/quentincaffeino/console/.gutconfig.json",
  }
...
```

No editor, no manual Godot install. The workflow is intentionally boring, which is exactly the point.

## Why `pnpm`?

This approach relies on `pnpm`'s ability to change the installation directory via `modules-dir`. Other node package managers can approximate this with symlinks or scripts, but `pnpm` supports it directly and intentionally. That makes it a good fit for experiments that step outside the JavaScript ecosystem without fighting the tool.

Importantly:

- Node and `pnpm` are build-time tools only
- the exported game remains a normal Godot project

## What this is (and isn't)

This is not:

- a proposal to replace the Godot Asset Library
- a claim that Godot needs npm
- a finished or universal solution

It is simply an example of how well-understood dependency management patterns can be applied to Godot tooling with minimal friction.

## Known limitations (potential, not confirmed)

Windows symlink policy can be restrictive on some machines; `pnpm` documents its Windows behavior and requirements if you hit issues. Here is what they say on the [official doc](https://pnpm.io/faq#does-it-work-on-windows):

> Short answer: Yes. Long answer: Using symbolic linking on Windows is problematic to say the least, however, pnpm has a workaround. For Windows, we use [junctions](https://docs.microsoft.com/en-us/windows/win32/fileio/hard-links-and-junctions) instead.

## Closing

This started as a small experiment and ended up solving a very practical problem: making Godot projects easier to automate and reproduce.

If nothing else, I hope it shows that sometimes the fastest way forward is not to invent new infrastructure, but to reuse mature ideas in unexpected places.
