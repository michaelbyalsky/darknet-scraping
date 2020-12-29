import arrow


class Status:

    def __init__(self, status, new_pastes=0):
        self.status = status
        self.new_pastes = new_pastes

    def create_response(self):
        return {"status": self.status, "new_pastes": self.new_pastes, "date": str(arrow.utcnow())}


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
