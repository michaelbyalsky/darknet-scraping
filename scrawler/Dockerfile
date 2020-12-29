FROM python:3.8.5 

WORKDIR /app

COPY ./requirements.txt /app

WORKDIR /app

RUN pip install -r requirements.txt

COPY ./src /app/src

WORKDIR /app/src

RUN python -m spacy download en
