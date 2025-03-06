# Mantine + TanStack Start Template

The easiest way to initialize a new project with [Mantine](https://mantine.dev/) and [TanStack Start](https://tanstack.com/start).

## Features

This is an **opinionated** template that includes:

- [Mantine](https://mantine.dev/), the best React UI library
- [TanStack Start](https://tanstack.com/start), a sane alternative to Next.js
- Styling with [CSS Modules](https://mantine.dev/styles/css-modules/), the recommended way to style Mantine applications
- Performant linting and formatting with [Biome](https://biomejs.dev/) for most of the codebase and [Prettier](https://prettier.io/) for PostCSS (because Biome lacks PostCSS support at the moment)
- TypeScript, of course
- No TailwindCSS
- [Prisma](https://www.prisma.io/) for database access (should be easy to replace with [Drizzle](https://orm.drizzle.team/) or [Kysely](https://kysely.dev/))
- [SQLite](https://www.sqlite.org/)-file database

## Getting Started

Install dependencies with `pnpm i` and start the development server with `pnpm dev`.

## Why this exists

I've been using Mantine and Next.js for a while to build most of my projects for the past few years.  
Next.js is a great framework, but, to put it bluntly, it's not in a sweet spot right now.  
TanStack Start looks like the perfect alternative, but the process of setting up a new project from scratch with Mantine is a bit cumbersome.

## Q & A

1. **Why/how are Mantine package styles imported in `__root.css` instead of directly in `__root.tsx`?**  
   Mantine package styles are imported in `__root.css` with the help of [postcss-import](https://github.com/postcss/postcss-import) plugin, in order to generate a single static asset in production.

2. **Why Prisma**  
   I've been using Prisma for a while now and I'm content with it. Kysely and Drizzle are great alternatives, but - same as with Prisma - I've found myself reaching for good old [Knex.js Query Builder](https://knexjs.org/guide/query-builder.html) whenever I needed to dynamically build custom, high-performance SQL statements.

3. **Why SQLite**  
   Because it's easy to set up, a great choice for prototyping, local development, and - believe it or not - even production (see [Turso](https://turso.tech/)).  
   I'm using PostgreSQL for large projects, though, but I didn't want to add a Dockerfile to this project.

4. **Why not TailwindCSS && ShadcnUI**  
   To cut short a potentially long debate: Mantine already provides enough properly-styled components.  
   If you're here, you're problably looking for a way to quickly build an application that features truly user-frienly input components out-of-the-box.

## Support the project

If you find this package useful, please consider ❤️ [sponsoring my work](https://github.com/sponsors/icflorescu).  
Your sponsorship will help me dedicate more time to maintaining the project and will encourage me to add new features and fix existing bugs.  
If you're a company using Mantine, [Mantine DataTable](https://icflorescu.github.io/mantine-datatable/), [Mantine ContextMenu](https://icflorescu.github.io/mantine-contextmenu/) or other open-source projects I built, I'd love to hear from you.  
If you need help in a commercial project, you can also hire my services (see [hiring the author](#hiring-the-author) below).  
Starring the repo on GitHub is also greatly appreciated.

## Hiring the author

If you want to hire my services, don’t hesitate to drop me a line at the email address listed in my [GitHub profile](https://github.com/icflorescu).
Mentioning “Mantine and TanStack” will result in a faster response.

## Acknowledgements

Special thanks to [Tanner Linsley](https://github.com/tannerlinsley), [Vitaly Rtishchev](https://github.com/rtivital) and the awesome contributors of [TanStack](https://tanstack.com/) and [Mantine](https://mantine.dev/) for putting countless hours of work into building and maintaining these amazing projects.

## License

The [MIT License](https://github.com/icflorescu/mantine-datatable/blob/master/LICENSE).
