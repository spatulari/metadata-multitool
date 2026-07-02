<div class="page">
    <div class="card">
        <div class="dot"></div>

        <h1>Metadata MultiTool</h1>

        <p>
            This tool is under Construction.
            Check back soon.
        </p>

        <div class="status">
            Status: Under Construction
        </div>
        <a href="https://tools.spatulari.com" class="button">
            Back to Tools
        </a>
    </div>
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

        font-family: Inter, system-ui, sans-serif;
        color: #e5e7eb;
    }

    .card {
        text-align: center;
        max-width: 600px;
        padding: 2rem;
        animation: fadeIn 1s ease-out;
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

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #8b5cf6;
        margin: 0 auto 2rem;
        animation: pulse 2s infinite;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    p {
        color: #9ca3af;
        line-height: 1.6;
    }

    .status {
        margin-top: 2rem;
        color: #8b5cf6;
        font-size: 0.9rem;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
        }

        50% {
            opacity: 0.5;
            transform: scale(1.3);
        }
    }

    .button {
        display: inline-block;
        margin-top: 1.5rem;
        padding: 0.8rem 1.4rem;

        background: rgba(139, 92, 246, 0.15);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 12px;

        color: #e5e7eb;
        text-decoration: none;
        font-weight: 500;

        transition:
            transform 160ms ease,
            background 160ms ease,
            border-color 160ms ease;
    }

    .button:hover {
        transform: translateY(-2px);
        background: rgba(139, 92, 246, 0.25);
        border-color: rgba(139, 92, 246, 0.5);
    }
</style>