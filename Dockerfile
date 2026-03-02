FROM python:3.12-alpine AS build-deps

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apk add gcc python3-dev musl-dev postgresql-dev

COPY ./requirements.txt /app/requirements.txt
COPY ./.python-version /app/.python-version

RUN pip install --no-cache-dir wheel
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

FROM python:3.12-alpine AS runtime

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apk add libpq

RUN --mount=type=bind,from=build-deps,source=/app/wheels,target=/wheels pip install \
    --no-cache-dir \
    --no-index \
    --no-cache \ 
    --no-deps \
    --find-links=/wheels /wheels/*

COPY ./ ./

RUN mv ./scripts/start.sh /app/start.sh \
    && chmod +x /app/start.sh

EXPOSE 8080

ENTRYPOINT [ "/app/start.sh" ]
