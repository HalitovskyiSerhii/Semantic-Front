FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY . .
ARG PORT
EXPOSE ${PORT}
CMD ["yarn", "start"]

