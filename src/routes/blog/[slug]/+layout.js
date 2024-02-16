/** @type {import('./$types').LayoutLoad} */
export async function load() {
    return {
        sections: [
            { slug: "profile", title: "Profile" },
            { slug: "notifications", title: "Notifications" },
        ],
    };
}