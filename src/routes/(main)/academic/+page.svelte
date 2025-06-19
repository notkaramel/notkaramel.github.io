<script>
  import {
    academicRecord,
    publications,
    conferenceWorkshops,
  } from "$lib/content/academic";
</script>

<title> Academic Activities </title>

<div
  class="hero min-h-screen"
  style="
background: linear-gradient(64deg, rgba(34, 193, 195, 1) 0%, rgba(103, 182, 191, 1) 26%, rgba(189, 104, 189, 1) 60%, rgba(253, 187, 45, 1) 100%);"
>
  <div class="hero-content">
    <div class="container m-auto place-self-auto">
      <div class="card rounded-box grid h-fit place-items-center glass">
        <h1 class="text-3xl m-4 border-b-2 w-[80%] text-center py-2">
          Education
        </h1>

        <p>{academicRecord.school}</p>
        <p>{academicRecord.major}</p>
        <p>{academicRecord.minor}</p>
        <p>{academicRecord.duration}</p>

        <h1 class="text-3xl m-4 border-b-2 w-[80%] text-center pb-2">
          Publications
        </h1>
        <ul>
          {#each publications as pub}
            <li>
              <p>
                <span class="italic font-bold"> "{pub.title}", </span>
                by {pub.authors.join(", ")}
                at <span class="font-bold underline"> {pub.conference} </span>
                in {pub.location}, {pub.time}
                {#if pub.doi}
                  DOI: {pub.doi}
                {/if}
              </p>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
