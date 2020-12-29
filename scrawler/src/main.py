from models import Paste, Status
import os
import time
from scrapping import parse_data, get_links, get_info, analyze
from services import post_data, get_data


URL = "http://nzxj65x32vh2fkhk.onion/all"
CONNECTION_STRING = "mongodb://mongo:27017/paste"


def fetch_and_parse(url):
    parsed_page = None
    while parsed_page == None:
        page_html = get_data(url)
        parsed_page = parse_data(page_html)
        if parsed_page == None:
            sleep = 30
            print(f"try again in {sleep} seconds")
            error_status = Status("faild")
            error_status = error_status.create_response()
            post_data('http://server:5000/api/v1/logs', error_status)
            time.sleep(sleep)
    return parsed_page


def main():
    time.sleep(16)
    print('scrawl in process')
    new_main_page = fetch_and_parse(URL)
    pages_links = get_links(new_main_page)
    print(pages_links)
    new_items = 0
    for link in pages_links:
        parsed_paste = fetch_and_parse(link)
        # PAGE atr get_info() create a new paste instance
        new_paste = get_info(parsed_paste)
        paste_obj = new_paste.create_object()
        r = post_data('http://server:5000/api/v1/pastes', paste_obj)
        print(r)
        if r["created"] == "True":
            new_items += 1
    success_status = Status("success", new_items)
    success_status = success_status.create_response()
    post_data('http://server:5000/api/v1/logs', success_status)
    print(f'scrawl finished - added {new_items} new pastes')


if __name__ == '__main__':
    while True:
        main()
        time.sleep(104)
