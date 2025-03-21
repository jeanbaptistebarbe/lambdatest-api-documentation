# LambdaTest API - Command Guide

LambdaTest API offers a range of endpoints to manage and interact with your automated testing resources. These API commands allow you to programmatically control your test sessions, retrieve data, and integrate LambdaTest capabilities into your workflows.

This document provides an overview of the different API commands available in LambdaTest, allowing you to use the API with ease.

## Build Management

**Retrieve All Builds**
* `GET /builds`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/builds`

**Retrieve Specific Build**
* `GET /builds/{build_id}`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/builds/build_12345`

**Delete a Build**
* `DELETE /builds/{build_id}`
* `curl -u "username:access_key" -X DELETE https://api.lambdatest.com/automation/api/v1/builds/build_12345`

**Update Build Information**
* `PATCH /builds/{build_id}`
* `curl -u "username:access_key" -X PATCH -H "Content-Type: application/json" -d '{"name":"New Build Name"}' https://api.lambdatest.com/automation/api/v1/builds/build_12345`

**Stop All Tests in a Build**
* `PUT /build/stop`
* `curl -u "username:access_key" -X PUT -H "Content-Type: application/json" -d '{"buildID":"build_12345"}' https://api.lambdatest.com/automation/api/v1/build/stop`

## Session Management

**Retrieve All Sessions**
* `GET /sessions`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions`

**Retrieve Session Details**
* `GET /sessions/{session_id}`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345`

**Delete a Session**
* `DELETE /sessions/{session_id}`
* `curl -u "username:access_key" -X DELETE https://api.lambdatest.com/automation/api/v1/sessions/session_12345`

**Update Session Information**
* `PATCH /sessions/{session_id}`
* `curl -u "username:access_key" -X PATCH -H "Content-Type: application/json" -d '{"name":"Login Test"}' https://api.lambdatest.com/automation/api/v1/sessions/session_12345`

**Stop a Running Session**
* `PUT /sessions/{session_id}/stop`
* `curl -u "username:access_key" -X PUT https://api.lambdatest.com/automation/api/v1/sessions/session_12345/stop`

## Session Data Retrieval

**Get Session Screenshots**
* `GET /sessions/{session_id}/screenshots`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/screenshots`

**Get Session Video**
* `GET /sessions/{session_id}/video`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/video`

**Get Command Logs**
* `GET /sessions/{session_id}/log/command`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/log/command`

**Get Selenium Logs**
* `GET /sessions/{session_id}/log/selenium`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/log/selenium`

**Get Network Logs**
* `GET /sessions/{session_id}/log/network`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/log/network`

**Get Console Logs**
* `GET /sessions/{session_id}/log/console`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/log/console`

## Enhanced V2 Logs

**Get Command Logs (V2)**
* `GET /sessions/{session_id}/v2/log/command`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/v2/log/command`

**Get Selenium/Appium Logs (V2)**
* `GET /sessions/{session_id}/v2/log/selenium`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/v2/log/selenium`

**Get Network Logs (V2)**
* `GET /sessions/{session_id}/v2/log/network`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/v2/log/network`

**Get Console Logs (V2)**
* `GET /sessions/{session_id}/v2/log/console`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/sessions/session_12345/v2/log/console`

## Log Upload and Download

**Upload Terminal Logs**
* `POST /sessions/{session_id}/terminal-logs`
* `curl -u "username:access_key" -X POST -H "Content-Type: text/plain" --data-binary @terminal.log https://api.lambdatest.com/automation/api/v1/sessions/session_12345/terminal-logs`

**Upload Assertion Logs**
* `POST /sessions/{session_id}/exceptions`
* `curl -u "username:access_key" -X POST -H "Content-Type: application/json" -d @assertions.json https://api.lambdatest.com/automation/api/v1/sessions/session_12345/exceptions`

**Upload Test Exceptions**
* `POST /tests/{test_id}/exceptions`
* `curl -u "username:access_key" -X POST -H "Content-Type: application/json" -d @exceptions.json https://api.lambdatest.com/automation/api/v1/tests/test_12345/exceptions`

## Tunnel Management

**Get All Tunnels**
* `GET /tunnels`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/tunnels`

**Stop a Running Tunnel**
* `DELETE /tunnels/{tunnel_id}`
* `curl -u "username:access_key" -X DELETE https://api.lambdatest.com/automation/api/v1/tunnels/tunnel_12345`

## Platform Information

**Get Available Platforms**
* `GET /platforms`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/platforms`

**Get Available Resolutions**
* `GET /resolutions`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/resolutions`

**Get Geolocation IPs**
* `GET /geoLocation/ips`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/geoLocation/ips`

## File Management

**Get Prerun Files**
* `GET /files`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/files`

**Upload Prerun File**
* `POST /files`
* `curl -u "username:access_key" -X POST -F "file=@prerun.exe" https://api.lambdatest.com/automation/api/v1/files`

**Delete Prerun File**
* `DELETE /files/delete`
* `curl -u "username:access_key" -X DELETE -H "Content-Type: application/json" -d '{"name":"prerun.exe"}' https://api.lambdatest.com/automation/api/v1/files/delete`

**Get User Files**
* `GET /user-files`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/user-files`

**Upload User File**
* `POST /user-files`
* `curl -u "username:access_key" -X POST -F "file=@testdata.csv" https://api.lambdatest.com/automation/api/v1/user-files`

**Delete User File**
* `DELETE /user-files/delete`
* `curl -u "username:access_key" -X DELETE -H "Content-Type: application/json" -d '{"name":"testdata.csv"}' https://api.lambdatest.com/automation/api/v1/user-files/delete`

## Project Management

**Get All Projects**
* `GET /projects`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/projects`

**Create New Project**
* `POST /project`
* `curl -u "username:access_key" -X POST -H "Content-Type: application/json" -d '{"name":"New Project"}' https://api.lambdatest.com/automation/api/v1/project`

**Get Project Details**
* `GET /project/{id}`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/project/12345`

**Update Project**
* `PUT /project/{id}`
* `curl -u "username:access_key" -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Project Name"}' https://api.lambdatest.com/automation/api/v1/project/12345`

## Organization Information

**Get Organization Concurrency**
* `GET /org/concurrency`
* `curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/org/concurrency`

## Best Practices

* Use appropriate authentication with every API request.
* Include proper error handling in your integrations.
* Implement rate limiting to avoid hitting API usage limits.
* Cache responses for information that doesn't change frequently (like platforms).
* Use pagination parameters (limit, offset) when retrieving large lists.
* Add appropriate filters to API requests to minimize data transfer.
* Always check response status codes to ensure your requests were successful.
* Format timestamps according to the API's requirements (YYYY-MM-DD for date parameters).
