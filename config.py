"""Configuration defaults. Secrets are loaded from environment variables only."""
import os

OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1")
OPENAI_MAX_OUTPUT_TOKENS = int(os.getenv("OPENAI_MAX_OUTPUT_TOKENS", "1800"))
MAX_IMAGE_BYTES = 8 * 1024 * 1024
PLAYWRIGHT_TIMEOUT_MS = 60_000
