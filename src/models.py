from bs4 import BeautifulSoup
from pymongo import MongoClient
import arrow
from bs4 import BeautifulSoup
import requests
session = requests.session()
session.proxies = {}
session.proxies['http'] = 'socks5h://localhost:9150'


class Fetch:

    ## get the page html
    def __init__(self, url):
        self.url = url


    def parse(self):
        try:
            result = session.get(self.url)
        except Exception as e:
            print("error:", e)
            return exit()
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
        print(links)
        return links
    

    def get_info(self):
        title, username, content, date = '', '', '', ''
        title_wrapper = self.content.find('div', class_='pre-info')
        if title_wrapper is not None:
            title = title_wrapper.h4.text.strip()     
        username_time_wrapper = self.content.find('div', class_='pre-footer').div.div.text
        username = str(username_time_wrapper).split()[2]
        date_str = (str(username_time_wrapper).split()[4:-1])
        date = " ".join(date_str).replace(",", "") 
        content_wrapper = username_time_wrapper = self.content.find('div', class_='text')
        print("content:", content_wrapper)
        for li in content_wrapper.findAll('li'):
            content += li.div.text.strip()
        return Paste(username, title, date, content)


class Paste:

    def __init__(self, Author='Anonymous', Title='', Content='', Date=''):
        self.Author = Author
        self.Title = Title
        self.Content = Content
        self.Date = Date  

    def create_object(self):
        return {"Author": self.Author,
            "Title": self.Title,
            "Content": self.Content,
            "Date": self.Date}

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
            print("mongo error:",e)
            return exit()   

    def find(self, data):
        try:
            # count = self.collection.count_documents(data)
            # if count == 0:
            self.collection.find({})
            return True    
        except Exception as e:
            print("mongo error:",e)
            return exit()         




            
            
