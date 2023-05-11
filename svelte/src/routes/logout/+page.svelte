<script>
    import { goto } from "$app/navigation";
    import { geotagService } from "../../services/geotag-service";

    geotagService.logout();
    goto("/");
</script>