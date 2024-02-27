# Why does Ruby have both Proc and Lambda

At the beginning of time, Ruby had `Block`, a data structure that contains block of codes, and optionally accepts arguments.

In version [*v0.95*](https://github.com/ruby/ruby/tree/v0_95) `Block` got renamed to `Proc` (which stays until this day) with two methods `proc` and `lambda` added to `Kernel`. At that point, they were [aliased to each other](https://github.com/ruby/ruby/blob/fca49a8a69a0f6bb4feae74c6cd0e93d7fac8b36/eval.c#L3025), and the ambiguity just got planted.

Passing Ruby *v1.0* through *v1.7*, these two methods remained the same.

> **Side note**:
> Ruby didn't have a VM back then, and it's really cute to see it doing GC based on AST :)

Things started to change in *v1.8.0-preview3*, where a new type of block `BLOCK_LAMBDA` [were introduced](https://github.com/ruby/ruby/blob/db6fbda57c03782af44ac2d442d591d252120607/eval.c#L638) and it differs from normal blocks for enforcing the right number of arguments just like methods, and it remained as a trait of today's lambda.
