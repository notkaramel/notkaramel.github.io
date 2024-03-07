<div class="content">
    <slot/>
</div>

<style lang="postcss">
.content {
    @apply flex flex-col gap-4 align-middle content-center items-center p-8 m-6;
    @apply border-2 rounded-lg shadow-lg border-secondary;
    background-color: hsla(182, 17%, 28%, 0.541);
}
</style>
