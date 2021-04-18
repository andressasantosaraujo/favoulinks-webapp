import React from 'react'

const BookMarkGrid = (props) => (
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Category</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            {props.bookMarks.length > 0 ? (
                props.bookMarks.map((bookMark) => (
                    <tr key={bookMark.url}>
                        <td>{bookMark.title}</td>
                        <td>{bookMark.url}</td>
                        <td>{bookMark.category}</td>
                        <td>
                            <button className="button muted-button" onClick={() => {props.updateRow(bookMark)}}>Update</button>
                            <button onClick={() => props.deleteBookMark(bookMark.url)} className="button muted-button">Delete</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={4}>No bookmark</td>
                </tr>
            )}
        </tbody>
    </table>
)

export default BookMarkGrid
