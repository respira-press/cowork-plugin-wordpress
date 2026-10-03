/**
 * WooCommerce Health Check — Telemetry helper
 * Fire-and-forget usage tracking to respira.press/api/skills/track-usage
 * Never blocks skill execution.
 */

export interface WooCommerceHealthCheckTelemetry {
  session_id: string;
  user_id?: string | null;
  wordpress_site_url?: string;
  wordpress_version?: string;
  php_version?: string;
  started_at: string;
  completed_at?: string;
  duration_ms?: number;
  success: boolean;
  error_message?: string | null;
  issues_found?: number;
  issues_by_severity?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info?: number;
  };
  health_score?: number;
  mcp_tools_used?: string[];
  findings_summary?: Record<string, unknown>;
  had_respira_before?: boolean;
  installed_respira_after?: boolean;
  assistant_client?: string;
  assistant_version?: string;
  assistant_transport?: string;
  telemetry_source?: string;
}

const TELEMETRY_ENDPOINT = 'https://www.respira.press/api/skills/track-usage';

function detectAssistantTelemetry(): {
  assistant_client?: string;
  assistant_version?: string;
  assistant_transport?: string;
  telemetry_source?: string;
} {
  const env: Record<string, string | undefined> =
    typeof process !== 'undefined' && process?.env ? (process.env as Record<string, string | undefined>) : {};

  const explicitClient = env.RESPIRA_AGENT_CLIENT || env.MCP_AGENT_CLIENT || env.AI_AGENT_CLIENT;
  const explicitTransport = env.RESPIRA_AGENT_TRANSPORT || env.MCP_AGENT_TRANSPORT;
  const explicitVersion = env.RESPIRA_AGENT_VERSION || env.MCP_AGENT_VERSION || env.AI_AGENT_VERSION;

  const fingerprint = [
    explicitClient,
    env.CURSOR_AGENT,
    env.CURSOR_TRACE_ID,
    env.CLAUDECODE,
    env.CLAUDE_CODE_ENTRYPOINT,
    env.CODEIUM_ENV,
    env.TERM_PROGRAM,
    env.TERM_PROGRAM_VERSION,
    typeof navigator !== 'undefined' ? navigator.userAgent : '',
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const inferredClient = (() => {
    if (explicitClient) return explicitClient.toLowerCase();
    if (fingerprint.includes('cursor')) return 'cursor';
    if (fingerprint.includes('claude')) return 'claude-code';
    if (fingerprint.includes('codex')) return 'codex';
    if (fingerprint.includes('windsurf') || fingerprint.includes('codeium')) return 'windsurf';
    if (fingerprint.includes('copilot')) return 'copilot';
    if (fingerprint.includes('gemini')) return 'gemini';
    return undefined;
  })();

  return {
    assistant_client: inferredClient,
    assistant_version: explicitVersion?.toLowerCase(),
    assistant_transport: (explicitTransport || 'desktop-mcp').toLowerCase(),
    telemetry_source: explicitClient ? 'env' : inferredClient ? 'heuristic' : 'skill-fetch',
  };
}

/**
 * Send skill usage telemetry.
 * Non-blocking: errors are swallowed, never thrown.
 * Call after the skill completes — success or failure.
 */
export function trackSkillUsage(data: WooCommerceHealthCheckTelemetry): void {
  const detected = detectAssistantTelemetry();
  const payload = {
    skill_slug: 'woocommerce-health-check',
    had_respira_before: true,
    ...detected,
    ...data,
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (payload.assistant_client) {
    headers['X-Respira-Agent-Client'] = payload.assistant_client;
  }
  if (payload.assistant_version) {
    headers['X-Respira-Agent-Version'] = payload.assistant_version;
  }
  if (payload.assistant_transport) {
    headers['X-Respira-Agent-Transport'] = payload.assistant_transport;
  }

  // Fire and forget — intentionally not awaited
  fetch(TELEMETRY_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).catch(() => {
    // Silently swallow all errors — telemetry must never break the skill
  });
}

/**
 * Generate a session ID for tracking a single skill run.
 */
export function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
