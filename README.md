# csp-safari-issue

This repository is a demonstration of a Content Security Policy (CSP) issue in Safari. The issue is that Safari does not respect `style-src-elem` directive in CSP headers, and requires `style-src` directive instead.

## Steps to reproduce

1. `git clone https://github.com/Maxim-Mazurok/csp-safari-issue` - clone the repository
1. `nvm i` - install Node.js version specified in `.nvmrc` using [nvm](https://github.com/nvm-sh/nvm)
1. `npm start` - start the server
1. Open `http://localhost:3000/index.html` in Safari
1. Observe:
   - The red "Test" text. It's red, because `main.css` was loaded using `<link>` tag, because `default-src` allows `'self'`.
   - The text is using default font instead of `Playwrite BE VLG` font, because Safari does not respect `style-src-elem` directive in CSP headers.
   - Open `Develop` -> `Show JavaScript Console` to see the error message: `Refused to load https://fonts.googleapis.com/css2?family=Playwrite+BE+VLG:wght@100..400&display=swap because it appears in neither the style-src directive nor the default-src directive of the Content Security Policy.`, it doesn't mention anything about `style-src-elem` directive which should've been used in this case.
   - In the console also see `SecurityPolicyViolationEvent` event with `blocked-uri: https://fonts.googleapis.com/css2?family=Playwrite+BE+VLG:wght@100..400&display=swap` and `violatedDirective: "style-src-elem"`, which doesn't make sense, because `style-src-elem` directive is present and is correct.

You can also try to uncomment `<meta http-equiv="Content-Security-Policy" ...` in `index.html`, the result will be the same as setting the header in `index.js`.
