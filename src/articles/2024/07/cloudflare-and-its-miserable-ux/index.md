---
title: Cloudflare and Its Miserable UX
date: '2024-07-30'
updated: '2024-07-30'
tags:
    - rant
---

# Cloudflare and Its Miserable UX

To start off, Cloudflare Pages (abbreviated as Pages)
has the concept of "preview" and "production" deployments.

The idea behind this separation is that the each "non-production branch"
(such as a pull request) gets a unique and not changing URL that always follows
the branch so that the developer could easily preview the latest changes.

Once the dev is satisfied with the change, it then can be merged into the
"production branch" so that Cloudflare Pages could make it the latest production deployment.

As another background knowledge, a Pages project can be created by
connecting a Github repo, uploading assets manually, or using Wrangler CLI.

So far so clear, everyone is happy.

And the caveat hits like a truck.

The Github way and the Wrangler way have the option to choose which branch
would be the production branch and also have option to change it later
in the web dashboard, while the manual-uploading way has a implicit "main" branch
and has NO F* WAY to tweak it in the dashboard, as kindly stated in the document:

> If your project is a Direct Upload project, you will not have the option to configure production branch controls. To update your production branch, you will need to manually call the Update Project
endpoint in the API.

So sweet, so miserable, but as long as one sticks with one certain way,
everything should be fine...

Not me apparently.

During the development of this site, this Pages project was created via manual uploading
in order to check the look and feel and setup subdomain etc., and later
a Github Action workflow was added to automate the deployment.

The deployment won't f* go production.

Not a me bug, checked.

Not a Wrangler bug, checked?

Not a Pages bug, checked...supposedly?

Spent around 1 hour of my miserable life poking YAML and trying to find
another miserable person on the web who happens to run into the same miserable situation,
and nope... until the Google decided to sparkle dusts of its knowledge on me somehow.

Of course there is [an official documentation](https://developers.cloudflare.com/pages/configuration/branch-build-controls/).

The project has a implicit "main" production branch,
while the branch the workflow is running against is "master",
which is a "preview branch" as far as Pages concerning.

The miserable matryoshka is completed.

Of course the dashboard is hiding information from the user,
and of course the trusty Wrangler CLI which had been rewritten
who cares how many times gives no feedback,
and of course it's buried in the f* documentation.

And add insult to injury, as stated in the document, an API call is needed
to change the branch for Pages projects created by manual-uploading.

That's far less memorable than going rant in a blog, not gonna do that.
The aftermath can still be seen in the source code of this site,
if you cares enough to dig for that.

Just another day of average devops, and so glad I'm not full-timely one of them.
