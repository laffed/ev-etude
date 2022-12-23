# EV-Energy Etude App

Please run with expo-go
`yarn start` or `expo start`

## Overview

This RN app uses [my own expo template](https://www.npmjs.com/package/@laffed/expo-redux-template). 
As such certain design decisions have been made by default. Stack and package choices are further explored in depth below. 

### I. Directory Struct

The codebase follows a containerization pattern which I slightly prefer over a purely feature first model or a purely atomic model. 

```
-src
  -components
  -containers
  -core
    -network
    -store
  -navigation
```

In my personal experience, structuring an MVP in a container model gives the most flexibility as features are added. 
Having complete independence of views and state is ideal when an apps full feature sets are unknown. 
Ideal feature first structures are planned and too often the ideal case is missed and codebase becomes a mess. 

That said, I'm comfortable working in both structures and it doesn't matter too much. 

### II. Stack

- Expo 47
- React Navigation 6
- RTK with thunks

**Why RTK?** 
Primarily...becomes my template is configured with RTK. Beyond that, redux is proven, well known by most React devs, 
and flexible. 

I have no preference with regards to independent state managers be it Redux, MobX, etc. 

**Why Thunks?**
Personally I prefer Sagas. But I find working with a team of varying degrees of skill, RTK thunks pull slightly ahead. 
This also could have been React Query or RTK Query, which have become beloved async tools. 
But much like the choice of RTK and the containerization model, I find having state, actions, reducers completely independent from views a much more flexible approach. 

### III. Additional Project Inclusions

- Husky git hooks
- Very strict TS rules
- Jest unit testing for hooks, methods, and selectors
- Custom API clients

### III. Areas for improvement (time allowing)

Currently the map region calls and subsequent OpenChargeMap api requests are made onPress of a button. 
We might prefer to update our points of interests on the map view as a user navigates in the map. 

Boiler cleanup. Because this repo started with my template, it inherited boiler plate Nav containers. 
The app probably doesn't need a bottomTabNav for example. 

