---
title: Personal Blog and E-Waste
date: '2024-07-29'
updated: '2024-08-15'
tags:
    - rant
---

This blog is built using [Lume](//lume.land/) static site generator, which is written in TypeScript and runs on [Deno](//deno.land), which not only means countless JavaScript libraries is right on the fingertip to be called, but also, unfortunately, the user and maintainer, have to swallow the bitterness comes out of it.

My very first rant on this project would be how awful Deno's dependency management is. It's like newbie wild survivor packs 500mL of juice instead of 1L of water happily thinking this move not only reduces the weight but also carry extra sugar. Import map helps a lot, but it immediately got beaten to the ground by the fact that Deno has no official tool of upgrading dependencies, despite it has been actively developed for almost *10 years*.

My second rant and main concern would be, will this project become another e-waste?

The remaining of the post will be playground for testing styling and custom features.


# Typography

There's no article without paragraphs, pay some attention to them and the reading experience will level up instantly.

Here I document some tricks I have done or would do to this very website.

## Max Width

Some study says x characters wide is best and other study says y percent is better. I'm comfortable with `70ch` so this website uses it as max width.

## `lang` Attribute

Every HTMLer learnt to write `<html lang="en">` at some point and never gives it another thought ever again.

This may not be relevant in English that much since characters and punctuations are relatively simple, but because

<span lang="ja">「“关复门”」</span>

<span lang="zh">「“关复门”」</span>

<div class="flex flex-row w-full gap-4">
    <figure class="grow">
        <img src="./lang-ja.avif" alt="span lang=ja">
        <figcaption>span lang=ja</figcaption>
    </figure>
    <figure class="grow">
        <img src="./lang-cn.avif" alt="span lang=cn">
        <figcaption>span lang=cn</figcaption>
    </figure>
</div>


# Headings

This is an `<h1>` heading.

Notice that the big bold title at the top is also `<h1>`, but that's its own component and gets styled separately.

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

<figure>
    <img src="./Untitled.avif" alt="The beautiful MDN logo.">
    <figcaption>MDN Logo</figcaption>
</figure>


Can't see the image? Too bad because it's AVIF.
Try upgrading your browser or smashing your old iPhone and never buy one again.


# Tables

*Currently not used anywhere, come back later.*


# Formulas and Charts

*Also not used right now.*