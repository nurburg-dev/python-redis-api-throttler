import http from "k6/http";
import { check, sleep } from "k6";

const API_HOST = __ENV.API_HOST || "http://localhost:8000";

export const options = {
  scenarios: {
    throttle_test: {
      executor: "ramping-vus",
      startVUs: 1,
      stages: [
        { duration: "30s", target: 10 },
        { duration: "1m", target: 50 },
        { duration: "1m", target: 100 },
        { duration: "30s", target: 0 },
      ],
      tags: { scenario: "throttle_test" },
      exec: "throttleTest",
    },
  },

  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.1"],
  },
};

export function throttleTest() {
  const endpoints = [
    `/a/test${Math.floor(Math.random() * 100)}`,
    `/b/test${Math.floor(Math.random() * 100)}`,
  ];

  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];

  const response = http.get(`${API_HOST}${endpoint}`, {
    tags: { endpoint: endpoint.split('/')[1] },
  });

  check(response, {
    "status is 200 or 429": (r) => r.status === 200 || r.status === 429,
    "response time < 2s": (r) => r.timings.duration < 2000,
  });

  sleep(0.1);
}

export function setup() {
  console.log("Starting throttler load test...");
  console.log(`API Host: ${API_HOST}`);
  return { startTime: new Date().toISOString() };
}

export function teardown(data) {
  console.log("Throttler load test completed");
  console.log(`Started at: ${data.startTime}`);
  console.log(`Completed at: ${new Date().toISOString()}`);
}

export default function () {
  throttleTest();
}