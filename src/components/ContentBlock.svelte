<div class="container">
    <div class="content">
        <slot />
    </div>
</div>

<style lang="postcss">
    .content {
        @apply flex flex-col gap-2 items-center;
    }
</style>
