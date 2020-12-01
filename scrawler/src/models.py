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
session.proxies = {}
session.proxies['http'] = 'http://tor:8118'


class Fetch:

    # get the page html
    def __init__(self, url):
        self.url = url

    def parse(self):
        conncted = False
        while not conncted:
            try:
                result = session.get(self.url, timeout=60)
                print(result)
                conncted = True
            except Exception as e:
                sleep = 20
                print("connection error:", e)
                print(f"try again in {sleep} seconds")
                time.sleep(sleep)
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
        return links

    def get_info(self):
        title, username, content, date = '', '', '', ''
        title_wrapper = self.content.find('div', class_='pre-info')
        if title_wrapper is not None:
            title = title_wrapper.h4.text.strip()
        username_time_wrapper = self.content.find(
            'div', class_='pre-footer').div.div.text
        username = str(username_time_wrapper).split()[2]
        date_str = (str(username_time_wrapper).split()[4:-1])
        replace_date = " ".join(date_str).replace(",", "")
        date = str(arrow.get(replace_date, 'DD MMM YYYY HH:mm:ss').to('UTC'))
        content_wrapper = username_time_wrapper = self.content.find(
            'div', class_='text')
        for li in content_wrapper.findAll('li'):
            content += li.div.text.strip()
        new_analize = Data(content)
        lables = new_analize.analize()
        new_analize.detect_language()
        return Paste(username, title, content, date, lables)


class Paste:

    def __init__(self, Author='Anonymous', Title='', Content='', Date='', Lables=[]):
        self.Author = Author
        self.Title = Title
        self.Content = Content
        self.Date = Date
        # self.Lables = Lables

    def create_object(self):
        return {"Author": self.Author,
                "Title": self.Title,
                "Content": self.Content,
                "Date": self.Date,
                # "Lables": self.Lables
                }


class Db_Connection:

    def __init__(self, connction_string, collection):
        self.connction_string = connction_string
        self.collection = collection

    def connect(self):
        try:
            client = MongoClient(self.connction_string)
            db = client.db
            collection = db[self.collection]
            print('sucessfully connected to mongo')
            return collection
        except Exception as e:
            print("exeption:", e)
            return False


class Data:
    def __init__(self, text):
        self.text = text

    def analize(self):
        spacy.prefer_gpu()
        nlp = spacy.load("en_core_web_sm")
        # about_doc = nlp(self.text)
        # sentences = list(about_doc.sents)
        # clear_data = ""
        # for sentence in sentences:
        #     clear_data += str(sentence)

        # print(clear_data)
        obj = {}
        data = []
#         # labels = []
#         # explaination = []
#         # position_start = []
#         # position_end = []
#         # spacy.prefer_gpu()
#         # nlp = spacy.load("en_core_web_sm")
#         # for token in doc:
#         #     print(token.text, token.pos_, token.dep_, spacy.explain(token.text))
#         # print("------------------------------------------")
        doc = nlp(self.text)
        labels_arr = []
        for ent in doc.ents:
            labels_arr.append(str(ent.label_))
            obj["entity"] = ent
            obj["label"] = ent.label_
            obj["explanation"] = spacy.explain(ent.label_)
            data.append(obj)

        counter = Counter(labels_arr)
        print(counter)
        arr = [{key, value} for key, value in counter.items()]
        print(arr)
        # return arr
        # print(ent.text, ent.start_char, ent.end_char, ent.label_ ,spacy.explain(ent.label_))

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


class Db_Actions:

    def __init__(self, collection):
        self.collection = collection

    # insert only new pastes
    def insert(self, data):
        try:
            count = self.collection.count_documents(data)
            if count == 0:
                self.collection.insert_one(data)
                return True
            else:
                return False
        except Exception as e:
            print("mongo error:", e)
            return exit()

    def find(self):
        try:
            # count = self.collection.count_documents(data)
            # if count == 0:
            data = self.collection.find({})
            return data
        except Exception as e:
            print("mongo error:", e)
            return exit()

    def update(self, data):
        self.collection.update(
            {"id": data["_id"]},
            {"$set":
             {
                 "Labels": data["Labels"]
             }
             }
        )
