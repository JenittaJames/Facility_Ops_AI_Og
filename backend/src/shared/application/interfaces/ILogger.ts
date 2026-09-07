export interface ILogger {
  info(message: string, meta?: unknown): void;
  error(message: string, trace?: unknown): void;
  warn(message: string, meta?: unknown): void;
  debug(message: string, meta?: unknown): void;
}