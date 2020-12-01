from models import Page, Fetch, Db_Connection, Db_Actions, Data, Status
import os
import time
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk


URL = "http://nzxj65x32vh2fkhk.onion/all"
CONNECTION_STRING = "mongodb://mongo:27017/paste"

    
def parse(page ,collection):
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
    new_db = Db_Connection(CONNECTION_STRING, "paste") # in case mongo failed to connect the function return False and process will exit
    dark_collection_connection = new_db.connect()
    dark_collection = Db_Actions(dark_collection_connection)
    loges_db = Db_Connection(CONNECTION_STRING, "logs")
    logs_collection_connection = loges_db.connect()
    logs_collection = Db_Actions(logs_collection_connection)
    # data = dark_collection.find()
    # print(data)
    # for document in data:
    #       print(document)
    #       refactor = Data(document["Content"])
    #       refactor.analize()
    if dark_collection == False:
        return exit()
    print('scrawl in process')
    new_main_page = Fetch(URL)
    parsed_page = parse(new_main_page, logs_collection)
    page = Page(parsed_page)
    links = page.get_links()
    new_items = 0
    for link in links:
        internal_page = Fetch(f'{link}')
        parsed_paste = parse(internal_page, logs_collection)
        parsed_paste_page = Page(parsed_paste)
        ## PAGE atr get_info() create a new paste instance
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
    # logs_collection.insert(sucess_status)
    print(f'scrawl finished - added {new_items} new pastes')
         

if __name__ == '__main__':
    while True:
        main()
        time.sleep(116)



