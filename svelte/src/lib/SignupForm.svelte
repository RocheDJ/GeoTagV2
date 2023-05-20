<script lang="ts">
	import { goto } from '$app/navigation';
	import { geotagService } from '../services/geotag-service';
	

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let errorMessage = '';

	async function signup() {
		console.log(`attempting to sign up email: ${email}`);
		const lcEmail = email.toLowerCase()
		let success = await geotagService.signup(firstName, lastName, lcEmail, password);
		if (success) {
			goto('/login');
		} else {
			errorMessage = 'Error Trying to sign up, make sure all data is correct';
		}
	}
</script>

<form on:submit|preventDefault={signup}>
	<div class="field is-horizontal">
		<div class="field-body">
			<div class="field">
				<label for="firstname" class="label">First Name</label>
				<input
					bind:value={firstName}
					id="firstname"
					class="input"
					type="text"
					placeholder="Enter first name"
					name="firstName"
					required
				/>
			</div>
			<div class="field">
				<label for="lastname" class="label">Last Name </label>
				<input
					bind:value={lastName}
					id="lastname"
					class="input"
					type="text"
					placeholder="Enter last name"
					name="lastName"
					required
				/>
			</div>
		</div>
	</div>
	<div class="field">
		<label for="email" class="label">Email</label>

		<input
			bind:value={email}
			id="email"
			class="input"
			type="email"
			placeholder="Enter email"
			name="email"
			required
		/>
	</div>
	<div class="field">
		<label for="password" class="label">Password</label>
		<input
			bind:value={password}
			id="password"
			class="input"
			type="password"
			placeholder="Enter Password"
			name="password"
			minlength="6"
			required
		/>
	</div>
	<div class="field is-grouped">
		<button class="button is-link" >Sign Up</button>
	</div>
</form>

{#if errorMessage}
	<div class="section">
		{errorMessage}
	</div>
{/if}
