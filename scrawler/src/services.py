import arrow
from bs4 import BeautifulSoup
import requests
from collections import Counter
import langdetect
import spacy
import json
import time

session = requests.session()


def get_data(url):
    connection = False
    while not connection:
        try:
            result = session.get(url, proxies={
                "http": "http://tor:8118"}, timeout=60)
            connection = True
        except Exception as e:
            print("connection error:", e)
            return None
    # parsed_html = parse_data(result)
    return result


def post_data(url, obj):
    try:
        r = requests.post(url, json=obj)
    except Exception as e:
        print(e)
        return
    return r.json()
