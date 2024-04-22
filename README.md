# SHOGun GIS Client example Plugin

This repository contains an example plugin for the [SHOGun-GIS-Client](https://github.com/terrestris/shogun-gis-client).

## Development 🧑‍💻

Checkout the repository and install all required dependencies via

```
npm i
```

While it's absolutely possible to run the client via

```
npm run start
```

to have the application available at [https://localhost:4000](https://localhost:4000) you usually want to start the
full SHOGun stack for development. Please refer to the [SHOGun-docker](https://github.com/terrestris/shogun-docker)
repository and add the following sequence to your `./shogun-client/config/gis-client-config.js`:

```
plugins: [{
  name: 'ExamplePlugin',
  exposedPaths: [
    './FooterLinks'
  ],
  resourcePath: '/client-plugins/index.js'
}]
```

Additionally you need to expose your new plugin (assumption: webpack dev server of plugin uses port 4123) in your nginx config (e.g. `./shogun-nginx/dev/default.conf`) as follows:

```
location /toBeDefined/client-plugins/ {
    proxy_pass http://my-new-plugin-service:8080/;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Port $server_port;

    # WebSocket support (nginx 1.4)
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
```

And finally add a docker container for the plugin in your `docker-compose.yml`:

```
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

```
shogun-client-plugins:
  container_name: ${CONTAINER_NAME_PREFIX}-gis-client-plugins
```

Since we make use of variables within the `docker-compose.yml` and the `common-services.yml` we would need to add the variable to your `./.env` as follow:

```
SHOGUN_CLIENT_PLUGINS_DIR=../shogun-gis-client-plugins
```

Further information for the plugin development can also be found in the [SHOGun-gis-client Repository](https://github.com/terrestris/shogun-gis-client/tree/main/src/plugin)