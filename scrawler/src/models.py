from collections import Counter
import langdetect
import spacy
import json
import time
from bs4 import BeautifulSoup
from pymongo import MongoClient
import arrow
from bs4 import BeautifulSoup
import requests
session = requests.session()


class Status:

    def __init__(self, status, new_pastes=0):
        self.status = status
        self.new_pastes = new_pastes

    def create_response(self):
        return {"status": self.status, "new_pastes": self.new_pastes, "date": str(arrow.utcnow())}


class Fetch:

    # get the page html
    def __init__(self, url):
        self.url = url

    def post(self, obj):
        try:
            r = requests.post(self.url, json=obj)
        except Exception as e:
            print(e)
            return
        return r.json()

    def parse(self):
        conncted = False
        while not conncted:
            try:
                result = session.get(self.url, proxies={
                                     "http": "http://tor:8118"}, timeout=60)
                conncted = True
            except Exception as e:
                print("connection error:", e)
                return None
        parsed_html = BeautifulSoup(result.text, "html.parser")
        return parsed_html


class Page:
    
    def __init__(self, content):
        self.content = content

    def get_links(self):
        info = self.content.findAll('div', class_='pre-info')
        links = []
        for item in info:
            link = item.a
            if link is not None:
                links.append(str(link['href']))
        links = filter(lambda x: "user" not in x, links)
        links = list(links)
        return links

    def get_info(self):
        title, username, content, date, lables = '', '', '', '', []
        title_wrapper = self.content.find('div', class_='pre-info')
        if title_wrapper is not None:
            title = title_wrapper.h4.text.strip()
        username_time_wrapper = self.content.find(
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
        content_wrapper = username_time_wrapper = self.content.find(
            'div', class_='text')
        if content_wrapper is not None:
            for li in content_wrapper.findAll('li'):
                content += li.div.text.strip()
            new_analize = Data(content)
            lables = new_analize.analize()
        return Paste(username, title, content, date, lables)


class Paste:

    def __init__(self, Author='Anonymous', Title='', Content='', Date='', Lables=[]):
        self.Author = Author
        self.Title = Title
        self.Content = Content
        self.Date = Date
        self.Lables = Lables

    def create_object(self):
        return {"Author": self.Author,
                "Title": self.Title,
                "Content": self.Content,
                "Date": self.Date,
                "Lables": self.Lables
                }


class Data:
    def __init__(self, text):
        self.text = text

    def analize(self):
        spacy.prefer_gpu()
        nlp = spacy.load("en_core_web_sm")
        data = []
        doc = nlp(self.text)
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
 
    def detect_language(self):
        most_use = ""
        cleand = []
        try:
            lan_list = langdetect.detect_langs(self.text)
            value = 0
            for k in lan_list:
                splited = str(k).split(":")
                cleand.append(splited[0])
                if float(splited[1]) >= value and splited[0] == "ru" or splited[0] == "en":
                    value = float(splited[1])
                    most_use = splited[0]
        except Exception as e:
            print(e)
            most_use = "unknown"
        return most_use
