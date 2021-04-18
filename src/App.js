import React, {useEffect, useState} from 'react'
import BookMarkGrid from './molecules/BookMarkGrid'
import NewBookMark from './molecules/NewBookMark'
import UpdateBookMark from './molecules/UpdateBookMark'
import axios from 'axios'

const App = () => {

  const [bookMarks, setBookMarks] = useState([])

  const url = 'https://4jtjbb4yi8.execute-api.us-east-2.amazonaws.com/favoulinks';

  useEffect(() => {
    getBookMark();
  }, []);

  const getBookMark = () => {
    axios.get(`${url}/bookmarks`)
        .then((resp) => {
          setBookMarks(resp.data)
        })
        .catch(error => console.log(`Error: ${error}`));
  }

  const newBookMark = (bookMark) => {
    setBookMarks([...bookMarks, bookMark])
  }

  const initialBookMark = { title: '', url: '', category: '' }
  const [currentBookMark, setCurrentBookMark] = useState(initialBookMark)

  const deleteBookMark = (url) => {
    const urlAPI = 'https://4jtjbb4yi8.execute-api.us-east-2.amazonaws.com/favoulinks';
      axios.delete(`${urlAPI}/bookmarks?url=${url}`)
          .then((resp) => {
            if(resp.status === 200) {
              setBookMarks(bookMarks.filter((bookMark) => bookMark.url !== url))
            }
          })
          .catch(error => console.log(`Error: ${error}`));
  }

  const [update, setUpdate] = useState(false)

  const updateRow = (bookMark) => {
    setUpdate(true)
    setCurrentBookMark({ title: bookMark.title, url: bookMark.url, category: bookMark.category })
  }

  const updateBookMark = (url, updatedBookMark) => {
    setUpdate(false)
    setBookMarks(bookMarks.map((bookMark) => (bookMark.url === url ? updatedBookMark : bookMark)))
  }

  return (
      <div className="container">
        <h1>CRUD App with Hooks</h1>
        <div className="flex-row">
          <div className="flex-large">
            {update ? (
                <div>
                  <h2>Update bookmark</h2>
                  <UpdateBookMark setUpdate={setUpdate} currentBookMark={currentBookMark} updateBookMark={updateBookMark} />
                </div>
            ) : (
                <div>
                  <h2>New bookmark</h2>
                  <NewBookMark newBookMark={newBookMark} />
                </div>
            )}
          </div>
          <div className="flex-large">
            <h2>View bookmarks</h2>
            <BookMarkGrid bookMarks={bookMarks} deleteBookMark={deleteBookMark} updateRow={updateRow}/>
          </div>
        </div>
      </div>
  )
}

export default App
