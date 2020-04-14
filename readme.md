# 🤔 Common TypeScript Mistakes

This repository contains code from webinar about common TypeScript mistakes.

## Content

### Source

All examples can be found in files:

- [playground/play.ts](./playground/play.ts)
- [playground/types/my-types.d.ts](./playground/types/my-types.d.ts)

### Dist

Distrubution (not versioned) is in `playground/dist` directory.

It is worth to take a look what `.js` code is generated from our `.ts` files.

## How to run it

Code you can play with is in `playground` dir.

1. Go to playground `cd playground`
1. Install dependencies `npm ci`
1. Run it
   - to have `tsc` with `nodemon` in watch mode - run `npm start`
   - to only compile sources, and do it once - run `npm run compile`

## Links

Various resources which were shown or mentioned during webinar

- Runtime types validation
  - [runtypes](https://github.com/pelotom/runtypes)
  - [zod](https://vriad.com/blog/zod/)
  - [io-ts](https://github.com/gcanti/io-ts)
- [TypeScript roadmap](https://github.com/Microsoft/TypeScript/wiki/Roadmap)
- [ts-expect validate/test types](https://github.com/TypeStrong/ts-expect)
