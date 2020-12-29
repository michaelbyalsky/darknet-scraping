from models import Page, Fetch, Data, Status
import os
import time
from scrapping import parse_data, get_links, get_info, analyze
from services import post_data, get_data


URL = "http://nzxj65x32vh2fkhk.onion/all"
CONNECTION_STRING = "mongodb://mongo:27017/paste"


def parse(page):
    parsed_page = None
    while parsed_page == None:
        parsed_page = page.parse()
        if parsed_page == None:
            sleep = 30
            print(f"try again in {sleep} seconds")
            error_status = Status("faild")
            error_status = error_status.create_response()
            err_logs_post = Fetch('http://server:5000/api/v1/logs')
            err_logs_post.post(error_status)
            time.sleep(sleep)
    return parsed_page


def main():
    time.sleep(12)
    print('scrawl in process')
    new_main_page = get_data(URL)
    parsed_page = parse_data(new_main_page)
    pages_links = get_links(parsed_page)
    new_items = 0
    for link in pages_links:
        internal_page = get_data(link)
        parsed_paste = parse(internal_page)
        parsed_paste_page = Page(parsed_paste)
        # PAGE atr get_info() create a new paste instance
        new_paste = parsed_paste_page.get_info()
        paste_obj = new_paste.create_object()
        poster = Fetch('http://server:5000/api/v1/pastes')
        r = poster.post(paste_obj)
        print(r)
        if r["created"] == "True":
            new_items += 1
    sucess_status = Status("success", new_items)
    sucess_status = sucess_status.create_response()
    logs_post = Fetch('http://server:5000/api/v1/logs')
    logs_post.post(sucess_status)
    print(f'scrawl finished - added {new_items} new pastes')


if __name__ == '__main__':
    while True:
        main()
        time.sleep(108)
