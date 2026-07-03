<script lang="ts">
	import { selectedFile } from '$lib/stores/file.svelte';
	let file = $state<File | null>(null);
	let dragging = $state(false);

	function handleFiles(fileList: FileList | null) {
		if (!fileList || fileList.length === 0) return;

		file = fileList[0];
        selectedFile.set(file);
	}

	function onDrop(event: DragEvent) {
		event.preventDefault();
		dragging = false;

		handleFiles(event.dataTransfer?.files ?? null);
	}

	function onDragOver(event: DragEvent) {
		event.preventDefault();
		dragging = true;
	}

	function onDragLeave() {
		dragging = false;
	}
</script>

<div class="page">
	<div class="card">
		<div class="dot"></div>

		<h1>Metadata MultiTool</h1>

		<p>
			Drag & drop a file below, or click the area to browse.
		</p>

		<label
			class="dropzone"
			class:dragging
			ondrop={onDrop}
			ondragover={onDragOver}
			ondragleave={onDragLeave}
		>
			<input
				type="file"
				onchange={(e) =>
					handleFiles((e.currentTarget as HTMLInputElement).files)}
			/>

            {#if file}
                <div class="placeholder success">
                    <div class="icon">✅</div>

                    <span>{file.name}</span>
                    <small>Choose an action</small>

                    <div class="actions">
                        <a href="/view" class="action">View</a>
                        <a href="/edit" class="action">Edit</a>
                        <a href="/remove" class="action">Remove</a>
                    </div>
                </div>
            {:else}
				<div class="placeholder">
					<div class="icon">📂</div>

					<span>Drop a file here</span>
					<small>or click to browse</small>
				</div>
			{/if}
		</label>

		<a href="https://tools.spatulari.com" class="button">
			Back to Tools
		</a>
	</div>

    <section class="info">
        <div class="section">
            <h2>What is Metadata?</h2>

            <p>
                Metadata is <strong>data about data</strong>. It is information stored
                alongside a file that describes it rather than being part of the visible
                content.
            </p>

            <ul>
                <li>📷 Photos      | Camera model, GPS location, date taken, camera settings.</li>
                <li>📄 Documents   | Author, creation date, editing history.</li>
                <li>🎵 Audio       | Artist, album, genre and cover art.</li>
                <li>🎥 Videos      | Recording device, codec and encoding information.</li>
                <li>📝 Other files | Software used to create or modify them.</li>
            </ul>
        </div>

        <div class="section">
            <h2>Why Remove Metadata?</h2>

            <p>
                Metadata can unintentionally reveal information about you or your device.
                Removing unnecessary metadata helps protect your privacy before sharing
                files online.
            </p>

            <ul>
                <li>🔒 Remove GPS location from photos.</li>
                <li>👤 Remove author names and usernames.</li>
                <li>💻 Remove software and device information.</li>
                <li>📅 Remove timestamps and document history.</li>
                <li>🗂️ Remove hidden comments and revisions.</li>
            </ul>
        </div>

        <div class="section">
            <h2>Don't Remove Everything</h2>

            <p>
                Not all metadata is unnecessary. Some of it helps files work correctly or
                keeps them organized.
            </p>

            <ul>
                <li>🎵 Music titles and artists.</li>
                <li>🖼️ Photo orientation.</li>
                <li>🎨 Color profiles.</li>
                <li>♿ Accessibility information.</li>
                <li>©️ Copyright and licensing information.</li>
            </ul>

            <p>
                Always review metadata before removing it. This tool lets you decide what
                to keep and what to remove.
            </p>
        </div>

        <div class="section">
            <h2>Your Privacy</h2>

            <p>
                Privacy is the reason this tool exists.
            </p>

            <ul>
                <li>✅ Files are processed locally in your browser.</li>
                <li>✅ Files are never uploaded to our servers. (we don't have one)</li>
                <li>✅ We cannot view, collect or store your files.</li>
                <li>✅ Everything stays on your device.</li>
                <li>✅ No account is required.</li>
            </ul>

            <p>
                If your browser can open this website, it can process your files without
                sending them anywhere.
            </p>
        </div>
    </section>
</div>

<style>
	:global(body) {
		margin: 0;
		min-height: 100vh;
		background: #0f1117;
		color: #e5e7eb;
		font-family: Inter, system-ui, sans-serif;
	}

	.page {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}

	.card {
		width: min(650px, 100%);
		text-align: center;
		padding: 2rem;
		animation: fadeIn 0.5s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #8b5cf6;
		margin: 0 auto 2rem;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}

		50% {
			opacity: 0.5;
			transform: scale(1.3);
		}
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	p {
		color: #9ca3af;
		margin-bottom: 2rem;
	}

	.dropzone {
		display: block;
		cursor: pointer;

		padding: 2.5rem;
		border-radius: 18px;

		border: 2px dashed rgba(139, 92, 246, 0.35);
		background: rgba(139, 92, 246, 0.05);

		transition: all 0.18s ease;
	}

	.dropzone:hover,
	.dropzone.dragging {
		border-color: #8b5cf6;
		background: rgba(139, 92, 246, 0.12);
		transform: translateY(-2px);
	}

	input {
		display: none;
	}

	.placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.icon {
		font-size: 3rem;
	}

	.placeholder span {
		font-size: 1.15rem;
		font-weight: 600;
	}

	.placeholder small {
		color: #9ca3af;
		word-break: break-word;
	}

	.success {
		animation: pop 0.2s ease;
	}

	.success small {
		color: #8b5cf6;
		font-weight: 500;
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.96);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.button {
		display: inline-block;
		margin-top: 1.75rem;
		padding: 0.8rem 1.4rem;

		background: rgba(139, 92, 246, 0.15);
		border: 1px solid rgba(139, 92, 246, 0.3);
		border-radius: 12px;

		color: #e5e7eb;
		text-decoration: none;
		font-weight: 500;

		transition: all 160ms ease;
	}

	.button:hover {
		transform: translateY(-2px);
		background: rgba(139, 92, 246, 0.25);
		border-color: rgba(139, 92, 246, 0.5);
	}
    .actions {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    .action {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        padding: 0.75rem 1.25rem;

        border-radius: 12px;
        border: 1px solid rgba(139, 92, 246, 0.3);

        background: rgba(139, 92, 246, 0.12);

        color: #e5e7eb;
        text-decoration: none;
        font-weight: 500;

        transition: 
            transform 160ms ease,
            background 160ms ease,
            border-color 160ms ease;
    }

    .action:hover {
        transform: translateY(-2px);
        background: rgba(139, 92, 246, 0.22);
        border-color: rgba(139, 92, 246, 0.5);
    }

    .page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem 2rem 6rem;
    }

    .card {
        width: min(650px, 100%);
        text-align: center;
        padding: 2rem;
        animation: fadeIn 0.5s ease;
    }

    .info {
        width: min(900px, 100%);
        margin-top: 5rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .section {
        padding: 2rem;

        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;

        background: rgba(255, 255, 255, 0.02);

        backdrop-filter: blur(12px);
    }

    .section h2 {
        margin: 0 0 1rem;
        font-size: 1.8rem;
        color: #fff;
    }

    .section p {
        color: #9ca3af;
        line-height: 1.8;
        margin: 0 0 1rem;
    }

    .section ul {
        margin: 0;
        padding-left: 1.5rem;
        color: #9ca3af;
        line-height: 1.9;
    }

    .section li + li {
        margin-top: 0.4rem;
    }

    @media (max-width: 700px) {
        .info {
            margin-top: 3rem;
        }

        .section {
            padding: 1.5rem;
        }

        .section h2 {
            font-size: 1.5rem;
        }
    }
</style>