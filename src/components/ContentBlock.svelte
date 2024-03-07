<div class="content">
    <slot/>
</div>

<style lang="postcss">
.content {
    @apply container mx-auto my-4 p-4;
    @apply flex flex-col gap-4 items-center;
    @apply border-2 rounded-lg shadow-lg border-secondary;
    background-color: hsla(182, 17%, 28%, 0.541);
}
</style>
