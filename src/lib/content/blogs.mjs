import { Blog } from "./types.mjs";


export const demoBlog = JSON.parse(new Blog(
    title = "Blog 1",
    slug = "blog-1",
    shortDesc = "This is a short description of blog 1",
    caterogies = ["category1", "category2"],
    fullDesc = "Lorem ipsum dolor sit amet, \
                consectetur adipiscing elit. \
                Phasellus condimentum dui vel\
                risus vehicula blandit. Sed vel\
                tristique diam. Curabitur at\
                hendrerit nisl. Nulla bibendum\
                tortor eu egestas rutrum."
));

