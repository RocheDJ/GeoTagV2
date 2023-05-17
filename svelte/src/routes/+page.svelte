<!-- src/routes/+page.svelte -->
<script>
	import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<Header />

<div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <img width="300" src="logo_1.jpg" alt="logo" />
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Sign Up</h1>
        <p>Click the button below to sign up and get started.</p>
        <a href="/signup">
            <button class="button is-warning">Sign Up Now</button>
        </a>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">Geo Tag</p>
        <p class="subtitle">Point of interest tracker.</p>
        <div class="content">
          <p>Keeping Track of those hard to reach places. One point at a Time.</p>
        </div>
      </article>
    </div>
  </div>

  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <Footer />
      </article>
    </div>
   </div> 
    

    

  