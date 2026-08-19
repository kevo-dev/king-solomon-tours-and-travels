# Vercel Image Delivery

The previous `/manus-storage/*` URLs depend on the custom Express server's storage-proxy middleware. Vercel serves the Next.js application directly and does not run that Express route, so those paths return no image asset in the Vercel deployment.

The travel catalogue now uses public `images.unsplash.com` CDN URLs, verified as HTTP 200 responses before release. The selected photo pages are [Kenya safari](https://unsplash.com/s/photos/kenya-safari), [Diani Beach](https://unsplash.com/photos/a-beach-with-trees-and-a-hill-in-the-background-PZ1HKuLdKAc), and [Lake Victoria boat](https://unsplash.com/photos/fishermen-are-sailing-a-boat-on-the-water-T02KQzn_SCU). These direct delivery URLs work independently of the Manus runtime and the Vercel build/runtime configuration.
