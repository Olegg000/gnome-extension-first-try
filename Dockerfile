FROM ubuntu:latest
LABEL authors="wsr"

ENTRYPOINT ["top", "-b"]