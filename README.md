# Master IPA

Interactive static website for practising the standard 44-phoneme British English IPA model.

## Features

- 12 monophthongs, 8 diphthongs, 24 consonants
- Common spelling patterns and example words
- Original Vietnamese learner-error notes
- Original shadowing sentences for every sound
- Browser-generated English audio (Speech Synthesis API)
- 10-round minimal-pair listening quiz
- In-browser microphone recording for self-comparison
- Local progress tracking with `localStorage`
- Responsive layout for desktop, tablet and mobile

## Files

- `index.html` — page structure
- `styles.css` — visual design
- `data.js` — the 44-sound learning dataset
- `app.js` — filtering, TTS, quiz, recording and progress logic

## Run locally

Open `index.html` in a modern browser. Microphone recording works best on `https://` or `localhost`.

## GitHub Pages

This repository is ready to publish as a static site from the `main` branch, root folder.

> Note: The implementation and teaching text in this repository are original. It does not copy proprietary audio files or reproduce the reference website's full copyrighted text.
