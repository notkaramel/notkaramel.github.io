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
  <div class="card justify-center prose">
    <h1>My activities</h1>
  </div>
  <div class="divider divider-horizontal divider-primary-content"></div>

  <div class="@container flex-grow">
    <div class="bg-base-100 p-12 rounded-2xl text-base-content glass">
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
          <h3>
            {academicRecord.school}
          </h3>
          <p class="italic font-sm">{academicRecord.duration}</p>
        </div>
        <ul>
          <li>Major: {academicRecord.major}</li>
          <li>Minors: {academicRecord.minor.join(", ")}</li>
        </ul>
      </ResumeSection>

      <ResumeSection title="Publications">
        <ul>
          {#each publications as pub}
            <li>
              <p class="font-black">{pub.type}</p>
              <p>
                <span class="italic font-bold"> "{pub.title}", </span>
                by {pub.authors.join(", ")}.
              </p>
              <p>
                Time: {pub.time}
              </p>
              <p>
                Details: {pub.details.join(", ")}.
              </p>
              {#if pub.doi}
                <p>
                  DOI: {pub.doi}
                </p>
              {/if}
            </li>
          {/each}
        </ul>
      </ResumeSection>
    </div>
  </div>
</div>
