from models import Page, Fetch, Db_Connection, Db_Actions
import os
import time

URL = "http://nzxj65x32vh2fkhk.onion/all"
CONNECTION_STRING = "mongodb://mongo:27017/paste"

def main():
    time.sleep(4)
    new_db = Db_Connection(CONNECTION_STRING, "paste") # in case mongo failed to connect the function return False and process will exit
    dark_collection_connection = new_db.connect()
    dark_collection = Db_Actions(dark_collection_connection)
    dark_collection.insert
    if dark_collection == False:
        return exit()
    print('scrawl in process')
    new_main_page = Fetch(URL)
    parsed_page = new_main_page.parse()
    page = Page(parsed_page)
    links = page.get_links()
    new_items = 0
    for link in links:
         internal_page = Fetch(f'{link}')
         parsed_paste = internal_page.parse()
         parsed_paste_page = Page(parsed_paste)
         new_paste = parsed_paste_page.get_info()
         paste_obj = new_paste.create_object()
         status = dark_collection.insert(paste_obj)
         if status == True:
             new_items += 1   
    print(f'scrawl finished - added {new_items} new pastes')
         

if __name__ == '__main__':
    while True:
        main()
        time.sleep(116)



