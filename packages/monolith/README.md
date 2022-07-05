# monolith

This node web server is bundled with Next.JS and accomplishes almost all web2 functions.

## development

Ensure you have Node 14+, docker, and yarn installed. Then run

```sh
~/path/to/monorepo > yarn
~/path/to/monorepo > yarn dev
```

It is important that you run this in the root. This ensures the local database instance is started as well.

### Adding a dependency

```sh
monorepo/packages/frontend > yarn add dependency
monorepo/packages/frontend > yarn add -D dependency # for dev dependencies
```

Pay attention to any errors yarn throws.

### Prisma

To mess with our database in a gui, run

```sh
yarn prisma studio
```

After modifying the prima schema, be sure to run

```sh
yarn prisma generate
```

