<div class="card min-w-fit bg-base-100 shadow-xl m-8 border-4 border-base-300">
    <div class="container card-body content">
        <slot />
    </div>
</div>

<style lang="postcss">
    .content {
        @apply mx-auto my-4 p-4;
        @apply flex flex-col gap-2 items-center;
    }
</style>
