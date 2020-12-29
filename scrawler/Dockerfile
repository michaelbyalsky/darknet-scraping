FROM python:3.8.5

ADD . /app

WORKDIR /app

RUN pip install -r requirements.txt

RUN python -m spacy download en
