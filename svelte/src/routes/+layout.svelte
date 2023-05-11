<script>
    import { beforeUpdate } from "svelte";
    import { geotagService } from "../services/geotag-service";

    beforeUpdate(() => {
        geotagService.reload();
    });
</script>
<div class="container">
    <slot />
</div>