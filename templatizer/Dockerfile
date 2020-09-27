FROM alpine
RUN apk add nodejs yarn
ADD package.json /app/package.json
WORKDIR /app
RUN yarn install
ADD src /app/src/
ADD tsconfig.json /app/tsconfig.json
EXPOSE 3000
ADD apps.json /app/apps.json
CMD yarn start
