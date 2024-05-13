<div class="content-container">
    <div class="content">
        <slot />
    </div>
</div>

<style lang="postcss">
    .content-container {
        @apply w-full bg-white;
        @apply border-4 rounded-lg border-sky-100 p-4 m-8;

        .content {
            @apply mx-auto p-4;
            @apply flex flex-col gap-2 items-center;
        }
    }

</style>
