---
title: Python Redis API Throttler
video: https://www.youtube.com/watch?v=7ySVWcFHz98
tags:
  - redis
  - python
  - rest-api
summary: This project implements an HTTP request throttler using Python, FastAPI, and Redis with three services including a throttler service and two backend services.
---

## Project Overview

This project implements an HTTP request throttler using Python, FastAPI, and Redis. The system consists of three services:

1. **Throttler Service** - Main API gateway that throttles requests and routes them to backend services
2. **Service A** - Backend service that handles requests with `/a` prefix
3. **Service B** - Backend service that handles requests with `/b` prefix

## Architecture

The throttler acts as a reverse proxy that:

- Receives HTTP requests on different routes (`/a/*` and `/b/*`)
- Uses Redis to track request counts per client/endpoint
- Implements rate limiting to prevent abuse
- Routes requests to appropriate backend services
- Returns responses from backend services to clients

## Services

### Throttler Service (Port 8000)

- **Purpose**: Main API gateway with throttling functionality
- **Routes**:
  - `/a/*` → forwards to Service A
  - `/b/*` → forwards to Service B
  - `/health` → health check endpoint

### Service A (Port 8000)

- **Purpose**: Backend service for `/a` prefixed requests
- **Features**: Simple FastAPI service that returns fixed responses

### Service B (Port 8000)

- **Purpose**: Backend service for `/b` prefixed requests
- **Features**: Simple FastAPI service that returns fixed responses

## Key Components

1. **Rate Limiting**: Uses Redis to track request counts and implement throttling
2. **Request Routing**: Routes requests based on URL prefix to appropriate backend service
3. **Health Monitoring**: All services provide health check endpoints
4. **Configuration**: Environment-based configuration for service URLs and Redis connection

## Getting Started

1. All services are containerized and will run automatically in the development environment
2. The throttler service runs on port 8000 and acts as the main entry point
3. Backend services run on ports 8000
4. Redis is used for request tracking and rate limiting

## API Usage

- Send requests to `/a/anything` to reach Service A through the throttler
- Send requests to `/b/anything` to reach Service B through the throttler
- Monitor service health using `/health` endpoints

This is an excellent project for learning about API gateways, rate limiting, microservices architecture, and Redis usage in Python applications.
