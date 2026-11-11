---
title: How I Built a 30-Part Malayalam Reel Series
seoTitle: How I Built a 30-Part Malayalam Reel Series
description: How one voice recording became 30 finished Malayalam explainer reels, using topic cuts, a data-driven motion engine, 3D titles and word-synced captions.
category: video-editing
categoryName: Video Editing
published: 2026-11-07
keyword: Malayalam reel series
relatedServices: [motion-graphics, ai-video-editing, video-editor-calicut]
sources:
  - title: Remotion documentation
    url: https://www.remotion.dev/docs/
---

I turned two long voice recordings into 30 finished Malayalam explainer reels by treating video like software. Each reel became a small data file, and one engine rendered all of them with the same quality, so the work did not grow with the number of videos.

Here is how it worked, and what I would do differently.

## The problem with making 30 of anything

Editing one reel by hand is enjoyable. Editing thirty takes weeks, and by the tenth you start cutting corners. Templates fix the time problem, but they create a new one: every video starts to look the same, and viewers scroll past.

So I needed a system that kept the quality high and still changed from reel to reel.

## Step 1: cut the voice by topic

I recorded the voice as two long takes, covering 30 topics back to back. The first job was finding where one topic ended and the next began. I listened for the pauses, wrote the cut points into a file, and split one audio file per reel. Getting these cuts right early saved a lot of fixing later.

## Step 2: describe each reel as data

Each reel got its own folder with its text and a small spec file: the topic, the scenes and the comment keyword viewers could use. Nothing about the animation lived in those files. They only described what should happen.

## Step 3: one engine for every reel

The engine is built with [Remotion](https://www.remotion.dev/docs/), which makes video from React code. It reads a spec and renders the reel, including 3D extruded titles built with three.js and a talking mascot with lip-sync.

To stop the series feeling repetitive, I used six font packs that rotate from reel to reel. It is a small change that made a big difference.

## Step 4: lock captions to the words

Malayalam needs care. Captions came from the real voice, aligned word by word, rather than from the written script, because people rarely read a script exactly. I read through them by hand too, since automatic transcription still makes mistakes.

## Step 5: check every reel

Automation makes it easy to ship mistakes in bulk. Each reel got a sync check, and the second version added a trimmed intro and soft background music, based on what I saw in reference reels.

## What I would change

I would design the end card and the hook first. A motion system makes polishing easy, but no amount of polish saves a weak first three seconds.

The result is in the [30-Day AI Reel Series case study](/projects/reel-series/). If you need a series for your brand, see [motion graphics](/services/motion-graphics/) or [AI video editing](/services/ai-video-editing/).
