import arrow
from bs4 import BeautifulSoup
import requests
from collections import Counter
import langdetect
import spacy
import json
import time
from models import Paste


def parse_data(html):
    try:
        return BeautifulSoup(html.text, "html.parser")
    except Exception as e:
        print(e)
        return


def get_links(content):
    info = content.findAll('div', class_='pre-info')
    links = []
    for item in info:
        link = item.a
        if link is not None:
            links.append(str(link['href']))
    links = filter(lambda x: "user" not in x, links)
    links = list(links)
    return links


def get_info(html):
    title, username, content, date, lables = '', '', '', '', []
    title_wrapper = html.find('div', class_='pre-info')
    if title_wrapper is not None:
        title = title_wrapper.h4.text.strip()
    username_time_wrapper = html.find(
        'div', class_='pre-footer')
    date_str = ''
    if username_time_wrapper.a is not None:
        username = username_time_wrapper.a.text
        date_str = (str(username_time_wrapper.div.div.text).split()[4:-1])
    else:
        username = 'Anonymous'
        date_str = (str(username_time_wrapper.div.div.text).split()[4:-1])
    if date_str != '':
        date = " ".join(date_str).replace(",", "")
        date = str(arrow.get(date, 'DD MMM YYYY HH:mm:ss').to('UTC'))
    content_wrapper = username_time_wrapper = html.find(
        'div', class_='text')
    if content_wrapper is not None:
        for li in content_wrapper.findAll('li'):
            content += li.div.text.strip()
        lables = analyze(content)
    return Paste(username, title, content, date, lables)


def analyze(text):
    spacy.prefer_gpu()
    nlp = spacy.load("en_core_web_sm")
    data = []
    doc = nlp(text)
    labels_arr = []
    for ent in doc.ents:
        obj = {}
        labels_arr.append(str(ent.label_))
        obj["entity"] = ent
        obj["label"] = ent.label_
        obj["explanation"] = spacy.explain(ent.label_)
        data.append(obj)

    counter = Counter(labels_arr)
    arr = []
    for key, value in counter.items():
        arr.append({key: value})
    return arr
