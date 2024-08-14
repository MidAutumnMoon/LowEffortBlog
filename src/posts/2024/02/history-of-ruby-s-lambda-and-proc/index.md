---
title: History of Ruby's Lambda and Proc
id: wY6k6eAEjYf3
date: '2024-02-27'
updated: '2024-02-27'
tags:
    - programming
    - history
    - ruby
---

At the beginning of time, Ruby had `Block`, a data structure that contains block of codes, and optionally accepts arguments.

In version [*v0.95*](https://github.com/ruby/ruby/tree/v0_95) `Block` got renamed to `Proc` with two methods `proc` and `lambda` added to `Kernel`. At that point, they were [aliased to each other](https://github.com/ruby/ruby/blob/fca49a8a69a0f6bb4feae74c6cd0e93d7fac8b36/eval.c#L3025), and the ambiguity just got planted.

Passing Ruby *v1.0* through *v1.7*, these two methods remained the same.

> [!NOTE]
> Ruby didn't have a VM back then, and it's really cute to see it doing GC based on AST :)

Things started to change in *v1.8.0-preview3*, where a new type of block `BLOCK_LAMBDA` [were introduced](https://github.com/ruby/ruby/blob/db6fbda57c03782af44ac2d442d591d252120607/eval.c#L638) and it differs from normal blocks for enforcing the right number of arguments just like methods, and it remained as a trait of today's lambda.

During the lifespan of Ruby *v1.8*, the two global function `proc` and `lambda` create the stricter proc described above, where `Proc.new` instead creates a looser one with no argument checking. The ambiguity is hardening its stem.

> [!NOTE]
> Not sure about the behavior of control flows (return, break etc.) inside proc at that moment because I can't understand the prize-winning usage of `setjmp`/`longjmp` coupled with unhelpful variable names.

Then the big *v1.9.0* came where the YARV virtual machine replaced the old interpreter, alongside with loads of language changes, `proc` and `lambda` started to differ from each other for the first time.

Firstly, [their definition](https://github.com/ruby/ruby/blob/816e8751b1dc600dfcca602524182b1d0558bb67/proc.c#L1592) became different which the VM [was aware of](https://github.com/ruby/ruby/blob/816e8751b1dc600dfcca602524182b1d0558bb67/vm.c#L555). Secondly, the VM gained the ability to [allow control flow](https://github.com/ruby/ruby/blob/a3e1b1ce7ed7e7ffac23015fc2fde56511b30681/insns.def#L1368C5) in lambda, although that "lambda" is not the `lambda` being discussed on. The ambiguity is having its leaves grown bigger and more.

Enter the Ruby *2.0* era. [Feature #8693](https://bugs.ruby-lang.org/issues/8693) was added to Ruby *2.1*, which nailed the `lambda` and `proc` as they are today.

The ambiguity is fully grown, casting its shadow over all Ruby land.

One last problem is that, there were **one** [huge commit](https://github.com/ruby/ruby/commit/a3e1b1ce7ed7e7ffac23015fc2fde56511b30681) that YARV got merged from sources out-of-tree, so consequently history commits are lost. Worse, the `yarv-dev` mailing list is long gone and non indexable, ultimately I can't answer the question of the title :( Asking Matz himself might be the last resort.

To conclude, why does Ruby have both `lambda` and `proc` and they differ?

Dunno. To my guess, maybe "because we want and we can" and "no one wants to clean up" and "everyone will be mad about breaking changes".

<!--
1) Even only reading the tiny portion of the Ruby codebase, the reason why Matz regretting introducing threads to Ruby can be quite understandable.

2) https://docs.ruby-lang.org/ja/latest/method/Kernel/m/lambda.html Ruby Japanese has better doc than ruby-doc.org for some reason.
-->
