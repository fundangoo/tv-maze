# TVMAZE

A sample application that utilizes [TVMAZE API](https://www.tvmaze.com/api), to let the User search and browse amongst TV Shows.

## Layout

| Section | Nature               |
| ------- | -------------------- |
| Header  | static, permanent    |
| Content | dynamic, route-based |
| Footer  | static, conditional  |

### Header

- Wraps a debounced `Search` input
- The results are rendered into a 'floated' dropdown to avoid having an impact on the surrounding layout
- By clicking on any of the results, the User is redirected to the `Details page`

### Content (per route)

- `Dashboard` - displays all the available shows organized into scrollable sections by categories and ordered by popularity
  - By clicking on any of the Shows, details are shown in a `Modal`
- `Details` - displays the details of the selected Show

### Footer

- Contains a single action to return to the Dashboard
- Rendered on every page except the Dashboard

## Utilizied libraries & approaches

| Item                       | Reason                                                                                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| react-rooter-dom           | To enable basic routing                                                                                                                               |
| react-error-boundary       | To enhance error-handling, make it happen separately, above component level, keeping the rendering logic of the components clean                      |
| React.Suspense             | To enable components suspending, keeping the rendering logic of the components clean                                                                  |
| react-query                | To fetch data and apply out-of-the box caching to spare some network traffic and give a better UX. With the proper setting, it also suspense-enabled. |
| debounce                   | To prevent unneccessary network load during typing the Search term                                                                                    |
| generic component          | To make the Search component reusable with different types of data and rendering capabilities                                                         |
| compound component pattern | To build Modals in a flexible, but organized way, with certain restrictions                                                                           |
| react portal               | To render Modal at a different part of the DOM, above and outside of the rest of the page                                                             |

## Manual

The project is bootstrapped with `Vite`, utilizing `Typescript` and `TailwindCSS`.

1. Install

```
npm install
```

2. Run (dev mode)

```
npm run dev
```
