<script>
    import academic from "$lib/content/academic.json";
    console.log(academic);
</script>

<title> Academic </title>

<article>
    <h1>Education</h1>
    <h2>{academic.education.school}</h2>
    <p>Major: {academic.education.major}</p>
    <p>
        Minor(s):
        <span>
            {#each academic.education.minor as minor}
                {minor}
            {/each}
        </span>
    </p>
    <p>Graduation: {academic.education.graduation}</p>
    <p>CGPA: {academic.education.cgpa}</p>
    <hr />

    <h1>Publications</h1>
    {#each academic.publications as publication}
        <h2>{publication.title}</h2>
        <p>Author(s): {publication.author.join(", ")}</p>
        <p>Date: {publication.date}</p>
        {#if publication.url}
            <a href={publication.url} target="_blank">
                Link: {publication.url}
            </a>
        {/if}

        {#if publication.journal}
            <p>Journal: {publication.journal}</p>
        {/if}
        {#if publication.conference}
            <p>Conference: {publication.conference}</p>
        {/if}
        {#if publication.book}
            <p>Book: {publication.book}</p>
        {/if}
        <hr />
    {/each}

    <h1>Conference</h1>
    {#each academic.conferences as conference}
        <h2>{conference.name}</h2>
        <p>Date: {conference.date}</p>
        <p>Location: {conference.location}</p>
        <p>Role: {conference.role}</p>

        <h2>Presentation(s)</h2>
        {#each conference.presentations as presentation}
            <h3>{presentation.title}</h3>
            <p>Presenter(s): {presentation.author.join(", ")}</p>
            <p>Date: {presentation.date}</p>
            <br />
        {/each}
        <hr />

        {#if conference.workshops}
            <h2>Workshop(s)</h2>
            {#each conference.workshops as workshop}
                <h3>{workshop.topic}</h3>
                <p>Presenter(s): {workshop.author.join(", ")}</p>
                <p>Date: {workshop.date}</p>
                <br />
            {/each}
            <hr />
        {/if}
    {/each}

    <h1>Letter(s) of recommendation</h1>
</article>

<style lang="postcss">

</style>
