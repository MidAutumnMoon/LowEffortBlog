---
title: A Tale of NOHZ_FULL and Throttled CPU
date: '2023-09-11'
updated: '2023-09-11'
tags:
    - linux
---

> For some background knowledge on Linux dynticks and NOHZ_FULL, checkout the wonderful [*CPU Isolation*](https://www.suse.com/c/cpu-isolation-introduction-part-1/) series from SUSE Labs.

The CPU my laptop equipped is a lovely [R7-4800HS](https://www.amd.com/en/products/apu/amd-ryzen-7-4800h) which has a base frequency of 2.9GHz and can boost up to 4GHz, while only consuming few watts when sitting idle, quite a nice workhorse.

One day I came upon the topic of Linux dynticks and found words on the potential of NOHZ_FULL for saving energy and increasing performance. I decided to yolo a try then *forgot* about it, ...and later found my CPU can't boost past 2.9GHz anymore.

What? Why?? Is my motherboard busted? Is my beloved NixOS betraying me? Is my custom built Kernel punishing me for not RTFM? Frustratedly the situation was beyond what I can debug.

Until, for some miracle, I noticed the two cores specified for housekeeping sparkled 3.8GHz while monitoring high system load.

*Whaaet a coincident*.

Suspicion raised, is NOHZ_FULL the cause of CPU throttling? Several Web searching later, I found this [LWN thread](https://lwn.net/Articles/816801/) which basically confirmed this theory. After reverting the config, I can do compile at full speed[^1] once again.

Probably, *NOHZ_FULL* is best suited for beefy server boxes whose four 512-core CPUs constantly runs at the maximum frequency with no dynamic scaling at all. But on a PC, this isn't something worth the attention of typical users, my thought.

<hr/>

By the way, here's a quick note on how to active NOHZ_FULL.

1. Build kernel with option `CONFIG_NO_HZ_FULL=y`

2. Use `lstopo` from `hwloc` package to find the topology of the CPU

    ![svg](./topo.svg)

    This is the topology of my 4800HS. Each hyper-thread is counted a *core* from kernel's point of view, and notice labels start from 0 instead of 1.

3. Set kernel parameter `nohz_full` to include desired CPUs, for example `nohz_full=2-15`.

    Cores *not included in* the list will *housekeep* interrupts for the others which could potentially stay in deeper C-State longer because of less interrupts, resulting "energy saving".

    One tricky part is that hyper-thread "cores" in the same physical core need to be specified altogether, otherwise it will defeat the purpose of dynticks.

[^1]: Ehh, I mean my laptop, not...me myself.
