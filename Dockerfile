# Based on:
# - https://github.com/jshimko/meteor-launchpad/blob/master/Dockerfile
# - https://github.com/meteor/galaxy-images/blob/master/ubuntu/Dockerfile
FROM ubuntu

ARG FONTAWESOMETOKEN
ENV FONTAWESOMETOKEN ${FONTAWESOMETOKEN}
# Default Meteor version if not defined at build time; see ../build.sh
ARG METEOR_VERSION=1.9


# Install dependencies, based on https://github.com/jshimko/meteor-launchpad/blob/master/scripts/install-deps.sh (only the parts we plan to use)
RUN apt-get update && \
	apt-get install --assume-yes apt-transport-https ca-certificates && \
	apt-get install --assume-yes --no-install-recommends build-essential bsdtar bzip2 curl git python

# Install Meteor
RUN curl https://install.meteor.com/?release=$METEOR_VERSION --output /tmp/install-meteor.sh && \
	# Replace tar with bsdtar in the install script; https://github.com/jshimko/meteor-launchpad/issues/39
	sed --in-place "s/tar -xzf.*/bsdtar -xf \"\$TARBALL_FILE\" -C \"\$INSTALL_TMPDIR\"/g" /tmp/install-meteor.sh && \
	# Install Meteor
	printf "\n[-] Installing Meteor $METEOR_VERSION...\n\n" && \
	sh /tmp/install-meteor.sh

# Fix permissions warning; https://github.com/meteor/meteor/issues/7959
ENV METEOR_ALLOW_SUPERUSER true
WORKDIR /app
COPY ./package*.json /app/
COPY ./.npmrc /app/

RUN meteor npm install

COPY . /app/
RUN meteor build --directory build --server-only 

FROM node:12.14.0-alpine

COPY --from=0 /app/build/bundle /app/
RUN ls

RUN cd /app/programs/server && npm install

WORKDIR /app

CMD ["node", "main.js"]