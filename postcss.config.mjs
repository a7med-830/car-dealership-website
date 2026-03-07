// WHAT: PostCSS config — tells Next.js to process Tailwind CSS classes.
// WHY:  Without this file, Tailwind won't work. This is required boilerplate.
const config = {
    plugins: {
        "@tailwindcss/postcss": {},
    },
};

export default config;
