# Learnfinity Mobile Roadmap

## Goal

Ship a learner-focused mobile app for iPhone and Android using the existing Learnfinity backend and product model.

## What is included now

- Expo / React Native workspace in `apps/mobile`
- PocketBase-backed authentication for learners
- Learner tabs for dashboard, programs, progress, and profile
- Async session persistence for mobile sign-in

## Recommended release shape

### Phase 1

- Learner login and signup
- Current program snapshot
- Program library browsing
- Basic progress visibility
- Profile and logout

### Phase 2

- Native mission consumption flows
- Push notifications for daily missions and streak reminders
- Offline caching for assigned program data
- Deep links from email and notifications

### Phase 3

- App Store / Play Store production hardening
- Analytics, crash reporting, and in-app feedback
- Subscription or enterprise distribution choices if needed

## Store readiness checklist

- Replace placeholder bundle IDs in `apps/mobile/app.json`
- Add app icons, splash art, and screenshots
- Create Apple and Google developer accounts
- Configure EAS Build and signing credentials
- Verify PocketBase production URL in mobile env
- Review privacy disclosures for analytics, auth, and user content

## Product recommendation

Keep admin tooling on web and make mobile a focused learner companion app first. That gets Learnfinity into the stores faster and avoids forcing complex content-authoring workflows into a phone UI.
