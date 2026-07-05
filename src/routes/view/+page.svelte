<script lang="ts">
    import { selectedFile } from "$lib/stores/file.svelte";
    import { readMetadata } from "$lib";
    import type { MetadataEntry } from "$lib/types";

    let metadata = $state<MetadataEntry[]>([]);
    let loading = $state(true);
    let error = $state("");

    $effect(() => {
        const file = $selectedFile;

        if (!file) return;

        (async () => {
            try {
                metadata = await readMetadata(file);
            } catch (e) {
                error = e instanceof Error ? e.message : "Unknown error";
            } finally {
                loading = false;
            }
        })();
    });
</script>

<svelte:head>
    <title>View Metadata</title>
</svelte:head>

<div class="page">
    <div class="card">
        <div class="dot"></div>

        <h1>Metadata Viewer</h1>

        <div class="file">
            <h2>{$selectedFile?.name}</h2>

            <p>
                {$selectedFile?.type || "Unknown Type"}
            </p>
        </div>

        {#if loading}
            <div class="loading">
                Reading metadata...
            </div>

        {:else if error}
            <div class="error">
                {error}
            </div>

        {:else if metadata.length === 0}
            <div class="empty">
                No metadata was found.
            </div>

        {:else}
            <div class="metadata">
                {#each metadata as entry}
                    <div class="entry">
                        <div class="key">
                            {entry.label}
                        </div>

                        <div class="value">
                            {entry.value}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}

        <a href="/" class="button">
            ← Back
        </a>
    </div>
</div>

<style>
:global(body) {
    margin: 0;
    background: #0f1117;
    color: #e5e7eb;
    font-family: Inter, system-ui, sans-serif;
}

.page {
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 3rem;
}

.card {
    width: min(900px, 100%);

    animation: fadeIn .25s ease;
}

.dot {
    width: 12px;
    height: 12px;

    border-radius: 50%;

    background: #8b5cf6;

    margin: 0 auto 2rem;

    animation: pulse 2s infinite;
}

h1 {
    text-align: center;
    font-size: 3rem;

    margin-bottom: 2rem;
}

.file {
    text-align: center;

    margin-bottom: 2rem;
}

.file h2 {
    margin: 0;
    font-size: 1.5rem;
}

.file p {
    margin-top: .5rem;

    color: #9ca3af;
}

.metadata {
    display: flex;
    flex-direction: column;

    gap: 1rem;
}

.entry {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 2rem;

    padding: 1rem 1.25rem;

    border-radius: 14px;

    border: 1px solid rgba(255,255,255,.06);

    background: rgba(255,255,255,.03);
}

.key {
    font-weight: 600;

    color: white;
}

.value {
    color: #9ca3af;

    text-align: right;

    word-break: break-word;
}

.loading,
.empty,
.error {
    text-align: center;

    color: #9ca3af;

    margin: 3rem 0;
}

.error {
    color: #ef4444;
}

.button {
    display: inline-block;

    margin-top: 2rem;

    padding: .8rem 1.4rem;

    background: rgba(139,92,246,.15);

    border: 1px solid rgba(139,92,246,.3);

    border-radius: 12px;

    color: white;

    text-decoration: none;

    transition: .2s;
}

.button:hover {
    transform: translateY(-2px);

    background: rgba(139,92,246,.25);
}

@keyframes pulse {

    0%,100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: .5;
        transform: scale(1.3);
    }
}

@keyframes fadeIn {

    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width:700px) {

    .entry {
        flex-direction: column;
        align-items: flex-start;
    }

    .value {
        text-align: left;
    }
}
</style>