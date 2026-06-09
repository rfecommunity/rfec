#!/bin/bash

# Start Serena MCP server for the astro-app project
# Optimized for Claude Code integration with best performance settings
uvx --from git+https://github.com/oraios/serena serena start-mcp-server \
  --project $(pwd) \
  --context claude-code \
  --mode interactive \
  --mode editing \
  --transport stdio \
  --log-level INFO \
  --enable-web-dashboard false
