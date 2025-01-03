export class Blog {
    /**
     * @param {string} title 
     * @param {string} slug
     * @param {string} shortDesc
     * @param {string[]} caterogies
     * @param {string} fullDesc
     */
    constructor(title, slug, shortDesc, caterogies, fullDesc) {
        this.title = title;
        this.slug = slug;
        this.shortDesc = shortDesc;
        this.caterogies = caterogies;
        this.fullDesc = fullDesc;
    }
}

export class Project {
    /**
     * @param {string} title 
     * @param {string} slug
     * @param {string} shortDesc
     * @param {string[]} techStack
     * @param {string | null} projectLink
     * @param {string | null} githubLink
     * @param {string} fullDesc
     */
    constructor(title, slug, shortDesc, techStack, projectLink, githubLink, fullDesc) {
        this.title = title;
        this.slug = slug;
        this.shortDesc = shortDesc;
        this.techStack = techStack;
        this.projectLink = projectLink;
        this.githubLink = githubLink;
        this.fullDesc = fullDesc;
    }
}

export class Artwork {
    /**
     * @param {string} title 
     * @param {string} shortDesc
     * @param {string} link
     */
    constructor(title, shortDesc, link) {
        this.title = title;
        this.shortDesc = shortDesc;
        this.link = imageUrl;
    }
}