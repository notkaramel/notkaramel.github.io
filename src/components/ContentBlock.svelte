<div class="content">
    <slot name="content"/>
</div>

<style lang="postcss">
.content {
    @apply flex align-middle content-center items-center p-8 m-6;
    @apply border-2 rounded-lg shadow-lg;
    background-color: hsla(203, 17%, 53%, 0.322);
}
</style>
