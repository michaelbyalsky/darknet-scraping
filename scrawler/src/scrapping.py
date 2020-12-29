import arrow
from bs4 import BeautifulSoup
import requests
from collections import Counter
import langdetect
import spacy
import json
import time
from models import Status
from services import post_data

def parse_data(html):
    parsed_page = None
    while parsed_page == None:
        parsed_page = BeautifulSoup(html.text, "html.parser")  
        if parsed_page == None:
            sleep = 30
            print(f"try again in {sleep} seconds")
            error_status = Status("faild")
            error_status = error_status.create_response()
            post_data('http://server:5000/api/v1/logs', error_status)
            time.sleep(sleep)
    return parsed_page    
        

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
    pass

def analyze(text):
    pass





