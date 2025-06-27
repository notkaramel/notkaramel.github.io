<script>
  import ResumeSection from "$lib/components/ResumeSection.svelte";
  import {
    academicRecord,
    publications,
    conferenceWorkshops,
    workExperience,
  } from "$lib/content/academic";
</script>

<title> Curriculum Vitae </title>

<div class="min-h-screen bg-base-200 flex flex-row">
  <div class="@container m-auto w-[90%] md:w-2/3 lg:w-1/2 my-12">
    <div
      class="bg-base-100 px-8 lg:px-12 py-8 rounded-2xl text-base-content glass"
    >
      <ResumeSection title="Work Experience">
        {#each workExperience as we}
          <h3>{we.jobTitle}</h3>
          <p class="flex flow-row justify-between place-items-baseline">
            <i>{we.location}</i>
            <i>{we.time}</i>
          </p>
          <ul>
            {#each we.description as wedesc}
              <li><p>{wedesc}</p></li>
            {/each}
          </ul>
        {/each}
      </ResumeSection>

      <ResumeSection title="Education">
        <div class="flex flow-row justify-between place-items-baseline">
          <div>
            <h3>{academicRecord.degree}</h3>
            <p><b>{academicRecord.school}</b></p>
          </div>
          <p class="italic font-sm">{academicRecord.duration}</p>
        </div>
        <ul>
          {#each academicRecord.details as detail}
            <li><p>{detail}</p></li>
          {/each}
        </ul>
      </ResumeSection>

      <ResumeSection title="Publications">
        {#each publications as pub}
          <div class="flex flow-row justify-between place-items-baseline">
            <h3>{pub.title}</h3>
            <!-- <div>
              {pub.details.filter((e) => e.includes("Location"))}
            </div> -->
          </div>
          <ul>
            <li>
              <p>
                <b>Authors</b>: {pub.authors.join(", ")}.
              </p>
            </li>
            <li>
              <p>Details:</p>
              <ul>
                {#each pub.details as detail}
                  <li><p>{detail}</p></li>
                {/each}
              </ul>
            </li>
            {#if pub.doi}
              <li>
                <p>
                  DOI: {pub.doi}
                </p>
              </li>
            {/if}
          </ul>
        {/each}
      </ResumeSection>

      <ResumeSection title="Conference Workshops">
        {#each conferenceWorkshops as cw}
          <div class="flex flow-row justify-between place-items-baseline">
            <h3>{cw.title}</h3>
            <p class="italic">{cw.time}</p>
          </div>
          <p>Presented by {cw.authors.join(", ")} at {cw.location}.</p>
        {/each}
      </ResumeSection>
    </div>
  </div>
</div>
