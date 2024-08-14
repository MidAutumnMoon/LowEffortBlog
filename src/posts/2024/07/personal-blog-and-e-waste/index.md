---
title: Personal Blog and E-Waste
id: WRUkKxLjLLWw
date: '2024-07-29'
updated: '2024-08-14'
tags:
    - rant
---

This blog is built using [Lume](//lume.land/) static site generator,
which is written in TypeScript and runs on Deno, which in turn means it not only has access to
countless JavaScript libraries, but also unfortunately has to swallow the bitter comes out of it.

The remaining of the post will be playground for testing styling and custom features.


# Basics

There's no article without paragraphs, pay some attention to them and
the reading experience will level up instantly.

Here I document some I have done or would do to this very website.

## `lang` Attribute

Every HTMLer learnt to write `<html lang="en">` at some point
and never gives it another thought ever again.

This may not be that relevant to westerners


# Headings

This is an `<h1>` heading.

Notice that the big bold title at the top is also `<h1>`,
but that's its own component and gets styled separately.

## `<h2>` Heading

A little smaller than `<h1>`, used almost as often as `<h1>`.

### `<h3>` Heading

Smaller than `<h2>`.

#### `<h4>` Heading

Styled the same as H3, since it's very rarely used (on this website).

##### `<h5>` and `<h6>` Headings

Never used so they are not styled, Tailwind Preflight would make
look like normal text.


# Text Styling

This part checks out some basic text styling.

*italic*

**bold**

***bold italian***

`Monospace Code`


# Various Blocks

> Quote of another quote
>
> Someone somehow said:
>
> "Somebody at sometime will inevitably do something
> somewhat without some meaning"

```
Code block with no language specified.
```

```rust
// highlight.js works well enough (tm)
fn fw() -> ft {
    let fm = f!();
    fm.fq();
    fm
}
```


# All Sorts of Lists

1. Several lists are more lister than others
2. O
3. M
4. E

- W
- H
- A
- T

* G
    * ET
* B
    * ORED


# Links and Multimedia Resources

[Link to front page](/)

[External link to Wikipedia](https://en.wikipedia.org/wiki/Main_Page)