FROM node:14.17-alpine

WORKDIR /code

ENV NODE_ENV=production

COPY ./backend/package.json package.json
COPY ./backend/yarn.lock yarn.lock

RUN apk --no-cache add --virtual builds-deps build-base python3 && yarn install --prod && yarn cache clean && apk del builds-deps && rm -rf /var/cache/apk/* /root/.cache /tmp/*

COPY backend/dist ./dist
COPY frontend/build ./client

COPY ./backend/start.sh .
CMD ["sh", "/code/start.sh"]
