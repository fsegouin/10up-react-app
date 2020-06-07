# 10up React Exercise

React application using Next.js fetching data from js1.10up.com exposing a Wordpress website through an API. The Profile section is using a JWT token based authentication with a cookie stored in the browser. Local storage events are being used to log out all open windows. No token validation is made because of an issue I'm mentioning later on.

## Installation

- `git clone https://github.com/fsegouin/10up-react-app`
- `yarn install`
- `yarn dev`

## Notes

In the exercise it is asked to handle token validation when the user visits the blog later on. However, the usage of the authentication header is not allowed by the CORS policy in preflight response on the token validation endpoint. I couldn't check if my code is working because of this. I did comment out my code in `utils/auth.js` so it's still there for whenever the issue is fixed.
