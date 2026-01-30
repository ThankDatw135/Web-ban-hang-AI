/**
 * LoggerService - Service ghi log tập trung
 *
 * Sử dụng Winston với:
 * - Console output (development)
 * - File rotation (production)
 * - JSON format cho structured logging
 *
 * Log levels: error, warn, info, debug
 *
 * @author Fashion AI Team
 * @created 30/01/2026
 */

import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common";
import { createLogger, format, transports, Logger } from "winston";
import "winston-daily-rotate-file";
import * as path from "path";

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: Logger;
  private context?: string;

  constructor() {
    this.logger = this.createWinstonLogger();
  }

  /**
   * Tạo Winston logger với các transport
   */
  private createWinstonLogger(): Logger {
    const logDir = path.join(process.cwd(), "logs");

    // Format cho console (có màu)
    const consoleFormat = format.combine(
      format.colorize({ all: true }),
      format.timestamp({ format: "HH:mm:ss" }),
      format.printf(({ timestamp, level, message, context, ...meta }) => {
        const ctx = context ? `[${context}]` : "";
        const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
        return `${timestamp} ${level} ${ctx} ${message} ${metaStr}`;
      }),
    );

    // Format cho file (JSON structured)
    const fileFormat = format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: true }),
      format.json(),
    );

    // Tạo logger
    return createLogger({
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      transports: [
        // Console transport
        new transports.Console({
          format: consoleFormat,
        }),

        // File transport cho tất cả logs
        new transports.DailyRotateFile({
          dirname: logDir,
          filename: "combined-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxSize: "20m",
          maxFiles: "14d", // Giữ 14 ngày
          format: fileFormat,
        }),

        // File transport riêng cho errors
        new transports.DailyRotateFile({
          dirname: logDir,
          filename: "error-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxSize: "20m",
          maxFiles: "30d", // Giữ 30 ngày cho error logs
          level: "error",
          format: fileFormat,
        }),
      ],
    });
  }

  /**
   * Set context cho logger (tên module/class)
   */
  setContext(context: string) {
    this.context = context;
  }

  /**
   * Log level: INFO
   */
  log(message: string, context?: string) {
    this.logger.info(message, { context: context || this.context });
  }

  /**
   * Log level: ERROR
   */
  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, {
      context: context || this.context,
      trace,
    });
  }

  /**
   * Log level: WARN
   */
  warn(message: string, context?: string) {
    this.logger.warn(message, { context: context || this.context });
  }

  /**
   * Log level: DEBUG
   */
  debug(message: string, context?: string) {
    this.logger.debug(message, { context: context || this.context });
  }

  /**
   * Log level: VERBOSE (maps to debug)
   */
  verbose(message: string, context?: string) {
    this.logger.debug(message, { context: context || this.context });
  }

  // ========================================
  // CUSTOM METHODS cho ứng dụng
  // ========================================

  /**
   * Log HTTP request
   */
  logRequest(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
  ) {
    this.logger.info(`${method} ${url} ${statusCode} ${duration}ms`, {
      context: "HTTP",
      method,
      url,
      statusCode,
      duration,
    });
  }

  /**
   * Log database query chậm (> 500ms)
   */
  logSlowQuery(query: string, duration: number) {
    this.logger.warn(`Slow query: ${duration}ms`, {
      context: "Database",
      query: query.substring(0, 200), // Truncate
      duration,
    });
  }

  /**
   * Log business event
   */
  logEvent(event: string, data?: Record<string, any>) {
    this.logger.info(event, {
      context: "Event",
      ...data,
    });
  }

  /**
   * Log security event (login, logout, unauthorized access)
   */
  logSecurity(event: string, userId?: string, ip?: string) {
    this.logger.warn(event, {
      context: "Security",
      userId,
      ip,
    });
  }
}
