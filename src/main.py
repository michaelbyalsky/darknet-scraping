from models import Page, Fetch, Db_Connection, Db_Actions
import os
import time


URL = "http://nzxj65x32vh2fkhk.onion/all"
# CONNECTION_STRING = f"mongodb://{os.environ['MONGODB_USERNAME']}:{os.environ['MONGODB_PASSWORD']}@{os.environ['MONGODB_HOSTNAME']}:27017/{os.environ['MONGODB_DATABASE']}"

def main():
    # time.sleep(10)
    # new_db = Db_Connection(CONNECTION_STRING, "darkdb") # in case mongo failed to connect the function return False and process will exit
    # dark_collection_connection = new_db.connect()
    # dark_collection = Db_Actions(dark_collection_connection)
    # if pastes_collection == False:
    #     return exit()
    print('scrawl in process')
    new_main_page = Fetch(URL)
    parsed_page = new_main_page.parse()
    print(parsed_page)
    # f = open("text.txt", "r")
    # parsed_page = f.read()
    # f.close()
    # print(new_page)
    page = Page(parsed_page)
    links = page.get_links()
    print(links)
    new_items = 0
    for link in links:
         internal_page = Fetch(f'{link}')
         parsed_paste = internal_page.parse()
         parsed_paste_page = Page(parsed_paste)
         new_paste = parsed_paste_page.get_info()
         paste_obj = new_paste.create_object()
         print(paste_obj)
        #  status = dark_collection.insert(new_paste)
        #  if status == True:
        #      new_items += 1   
    print(f'scrawl finished - added {new_items} new pastes')
         

    # links = new_page.fetch_links_from_page()
    # new_items = 0
    # for link in links:
    #     internal_page = Page.fetch_page_html(f'{MAIN_URL}{link}')
    #     new_paste = internal_page.get_page_info()
    #     status = pastes_collection.insert(new_paste)
    #     if status == True:
    #         new_items += 1   

if __name__ == '__main__':
    main()



