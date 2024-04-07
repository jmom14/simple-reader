from ebooklib import epub


class Epub:

    def __init__(self, file_path: str = None):
        self.__book = epub.read_epub(file_path)

    def __repr__(self):
        return "title: {}, authors: {} ".format(self.title, ", ".join(self.authors))

    @property
    def book(self):
        return self.__book

    @property
    def title(self):
        title_items = self.__book.get_metadata("DC", "title")
        if title_items:
            return title_items[0][0]
        
    @property
    def authors(self):
        authors = []
        for author_item in self.__book.get_metadata("DC", "creator"):
            authors.append(author_item[0])
        
        return authors
    

    @property
    def cover_image(self):
        cover_image = self._parse_cover_image()
        return cover_image
    
    def _parse_cover_image(self):
        try:
            item_obj = self.__book.get_metadata("OPF", "cover")
            item_id = item_obj[0][1].get("content")
            cover_img = self.__book.get_item_with_id(item_id)
            if cover_img:
                return cover_img.get_content(), cover_img.get_name()
            return None, None
        except KeyError:
            return None, None
        except IndexError:
            return None, None
