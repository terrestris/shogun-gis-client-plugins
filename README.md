# SHOGun GIS Client example plugin

This repository contains an example plugin for the [SHOGun GIS client](https://github.com/terrestris/shogun-gis-client). In this example an additional button is rendered to the footer bar of the client.

## Development 🧑‍💻

Checkout the repository and install all required dependencies via

```bash
npm i
```

While it's absolutely possible to run the client via

```bash
npm run start
```

to have the plugin available at [https://localhost:4000](https://localhost:4000) you usually want to start the
full SHOGun stack for development. Please refer to the [SHOGun Docker](https://github.com/terrestris/shogun-docker)
repository for a complete example.

If you want to add the plugin to an existing setup, please ensure the following steps:

1. Ensure you have added the following sequence to your `./shogun-client/config/gis-client-config.js`:

```js
plugins: [{
  name: 'ExamplePlugin',
  resourcePath: '/client-plugins/index.js',
  exposedPaths: [
    './FooterLinks'
  ]
}]
```

2. Expose the plugin in your nginx config (e.g. `./shogun-nginx/dev/default.conf`) as follows:

```
location /client-plugins/ {
  proxy_pass http://shogun-client-plugins:8080/;

  # WebSocket support (nginx 1.4)
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";

  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header X-Forwarded-Port $server_port;
}
```

3. Finally add a compose service for the plugin in your `docker-compose.yml`:

```yaml
shogun-client-plugins:
  extends:
    file: ./common-services.yml
    service: shogun-client-plugins
  build:
    context: ${SHOGUN_CLIENT_PLUGINS_DIR}
    dockerfile: Dockerfile.dev
  volumes:
    - ${SHOGUN_CLIENT_PLUGINS_DIR}:/app
```

And `common-services.yml` if present:

```yaml
shogun-client-plugins:
  container_name: ${CONTAINER_NAME_PREFIX}-gis-client-plugins
```

Since we make use of variables within the `docker-compose.yml` and the `common-services.yml` we would
need to add the variable to your `.env` as follows:

```bash
SHOGUN_CLIENT_PLUGINS_DIR=../shogun-gis-client-plugins
```

4. To integrate SonarQube, add a token to your repository and configure the scanner to run in your CI pipeline.
   
Example job:

```yaml
- name: Get version 🔖
    run: |
      echo "sonar.projectVersion=$(git describe --tags --abbrev=0 | sed 's/^v//')" >> ./sonar-project.properties
         
- name: SonarQube Scan 🔬
    uses: SonarSource/sonarqube-scan-action@v2.3.0
    with:
      projectBaseDir: .
    env:
      SONAR_TOKEN: ${{ secrets.SONARQUBE_TOKEN }}
      SONAR_HOST_URL: ${{ secrets.SONARQUBE_HOST }}
```
Change the project-key in the sonar-project.properties


Further information for the plugin development can also be found in the [SHOGun GIS client repository](https://github.com/terrestris/shogun-gis-client/tree/main/src/plugin).
