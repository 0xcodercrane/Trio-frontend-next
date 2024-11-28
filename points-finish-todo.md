# Overview

This is a todo list to finish the points/pools system

## Todo

- [x] Test PointAllocations for
  - [x] both types of lottery pools
  - [x] proportionate pool
- [x] Write draw function for lottery pools
- [x] Finish UI/UX for Points Page
- [x] Add admin stats for points page
- [ ] Deploy functions to `prod`, then backfill missing blocks
- [x] Double check and deploy indexes to `prod`
- [x] Double check and deploy rules to `prod`

## Tests

- [x] pointAllocations gets deleted if there was an error
- Can allocation points to...
  - [x] n-winners
  - [x] proportionate pool
  - [x] wta pool
- [x] Can't allocate to WTA/NW pools when user tries to buy more than the number of tickets available
- [x] Can't allocate to WTA/NW pools when user has already bought tickets, and wants to buy more than what is available
- [x] Can't allocate to WTA/NW pools when user has exceeded maxTicketsPerUser
- [x] Can't allocate to proportionate pool when user chooses to allocate less than minPointsAllocation
- [x] Can't allocate to proportionate pool when points exceeds maxPointsAllocation
- [x] If minPointsAllocation is not set, user can allocate as little as 1 point
- [x] totalPointsSpent correctly updates for proporationate pools
- [x] totalPointsSpent correctly updates for lottery pools
- [ ] Test a draw on `dev`

## Deployment Steps

- [ ] Create diagnostic tool to figure out which blocks are missing from synthetic staking
- [x] Configure pointsConfig so it has staking with factor inside of it
- [ ] Port onCall method of allocating points to trio-launch-app. Deploy trio-launch-app.
- [x] Deploy newBlock to `prod`.
- [ ] Configure Signet/Dev updateTrioPrice function to only do it once per day to preserve API key limits AND relative data congruency amongst different environments
